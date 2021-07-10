const { nanoid } = require('nanoid');
const InvariantError = require('../../exeptions/InvariantError');
const NotFoundError = require('../../exeptions/NotFoundError');


class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({title, year, performer, genre, duration}) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newSong = {
      title, year, performer, genre, duration, id, createdAt, updatedAt,
    };

    songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(songId) {
    const song = this._songs.filter((s) => s.songId === id)[0];

    if (!song) {
      throw new NotFounError('Lagu tidak ditemukan');
    }
    return song;
  }

  editSongById(id, {title, year, performer, genre, duration}) {
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui Lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString;

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.filter((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
