const ClientError = require('../../exeptions/ClientError');

class PlaylistSongsHandler {
  constructor(service, playlistsService, validator) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.deletePlaylistSongHandler = this.deletePlaylistSongHandler.bind(this);
    this.getPlaylistSongHandler = this.getPlaylistSongHandler.bind(this);
  }
  async postPlaylistSongHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId, any } = request.params;
      if (any !== 'songs') {
        throw new NotFoundError('Resource not found');
      }
      this._validator.validatePlaylistSongPayload(request.payload);
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
      const playlistsongId = await this._service.addSongPlaylist(playlistId, songId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
        data: {
          playlistsongId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
  async getPlaylistSongHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId, any } = request.params;
      if (any !== 'songs') {
        throw new NotFoundError('Resource not found');
      }
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
      const songs = await this._service.getPlaylistSongs(playlistId);
      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistSongHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId, any } = request.params;
      if (any !== 'songs') {
        throw new NotFoundError('Resource not found');
      }
      this._validator.validatePlaylistSongPayload(request.payload);
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
      await this._service.deletePlaylistSongs(playlistId, songId);
 
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
module.exports = PlaylistSongsHandler;