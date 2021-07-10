const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/{any}',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/{any}',
    handler: handler.getPlaylistSongHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/{any}',
    handler: handler.deletePlaylistSongHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];
   
module.exports = routes;