const { NOT_USER_TEXT } = require('../../helpers/constants');
const NotFoundError = require('./NotFoundError');

class NotFoundUserError extends NotFoundError {
  constructor() {
    super(NOT_USER_TEXT);
  }
}

module.exports = NotFoundUserError;
