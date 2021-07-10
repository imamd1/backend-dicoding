/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const Joi = require('joi');

const CollaborationPayloadSchema = Joi.object({
    playlistId: Joi.string().required(),
    userId: Joi.string().required(),
});

module.exports = { CollaborationPayloadSchema };
