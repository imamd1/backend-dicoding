const routes = require('./routes');
const PlaylistSongsHandler = require('./handler');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, {playlistSongsService, playlistsService,validator}) => {
    const playlistSongsHandler = new PlaylistSongsHandler(playlistSongsService, playlistsService, validator);
    server.route(routes(playlistSongsHandler));
  },
};
