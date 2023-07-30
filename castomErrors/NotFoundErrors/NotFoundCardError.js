const { NOT_CARD_TEXT } = require('../../helpers/constants');
const { NotFoundError } = require('./NotFoundError');

class NotFoundCardError extends NotFoundError {
  constructor() {
    super(NOT_CARD_TEXT);
  }
}

module.exports = {
  NotFoundCardError,
};
