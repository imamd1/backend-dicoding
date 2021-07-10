/* eslint-disable indent */
/* eslint-disable no-tabs */
const InvariantError = require('../../exeptions/InvariantError');
// const NotFoundError = require('../../exeptions/NotFoundError');
const {UserPayloadSchema} = require('./schema');


const UsersValidator = {
  validateUserPayload: (payload) => {
	const validationResult = UserPayloadSchema.validate(payload);
		if (validationResult.error) {
			throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
