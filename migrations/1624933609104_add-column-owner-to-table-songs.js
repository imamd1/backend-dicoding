/* eslint-disable indent */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addColumn('songs', {
        owner: {
            type: 'VARCHAR(50)',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropColumn('songs', 'owner');
};
