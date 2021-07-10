const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exeptions/InvariantError');
 
class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async addSongPlaylist(playlistId, songId) {
    const id = `playlistsongs-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }
    return result.rows[0].id;
  }
  async getPlaylistSongs(id) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM playlistsongs JOIN songs ON songs.id = playlistsongs.song_id WHERE playlistsongs.playlist_id = $1 GROUP BY playlistsongs.song_id, songs.id',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylistSongs(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };
 
    const result = await this._pool.query(query);
 
    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal dihapus dari playlist');
    }
  }
  // async verifyPlaylistSongs(playlistId, songId) {
  //   const query = {
  //     text: 'SELECT * FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2',
  //     values: [playlistId, songId],
  //   };
 
  //   const result = await this._pool.query(query);
 
  //   if (!result.rowCount) {
  //     throw new InvariantError('Lagu gagal diverifikasi');
  //   }
  // }
}
module.exports = PlaylistSongsService;