const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require('../../exeptions/InvariantError');
const NotFoundError = require('../../exeptions/NotFoundError');
const AuthorizationError = require('../../exeptions/AuthorizationError');


class PlaylistsService {

    constructor(collaborationsService) {
        this._pool = new Pool();
        this._collaborationsService = collaborationsService;
    }

    async addPlaylist({name, owner}) {

        const id = `playlist-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
            values: [id, name, owner]
        }

        const result = await this._pool.query(query);

        if(!result.rowCount) {
            throw new InvariantError('Playlist gagal ditambahkan;')
        }
        
        return result.rows[0].id;
    }

    async getPlaylists(owner) {
        const query = {            
            text: `SELECT playlists.id, playlists.name, users.username FROM playlists
            JOIN users on playlists.owner = users.id
            LEFT JOIN collaborations on collaborations.playlist_id = playlists.id 
            WHERE playlists.owner = $1 OR collaborations.user_id = $1`,
            values: [owner]
        };

        const result = await this._pool.query(query);
        return result.rows;
    }

    async deletePlaylistById(playlistId) {
        const query = {
            text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
        }
    }

    async verifyPlaylistOwner(playlistId, owner) {
        const query = {
            text: 'SELECT owner FROM playlists WHERE id = $1',
            values: [playlistId],
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('Playlist tidak ditemukan');
        }

        const playlist = result.rows[0];
        if (playlist.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses playlist ini');
        }
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try{
            await this.verifyPlaylistOwner(playlistId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            try {
                await this._collaborationsService.verifyCollaborator(playlistId, userId);
            } catch {
                throw error;
            }
        }
    }
}

module.exports = PlaylistsService;
