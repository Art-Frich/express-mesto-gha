const { NOT_FOUND_STATUS, NOT_FOUND_TEXT = 'Не удалось найти искомый объект.' } = require('../helpers/constants');

class NotFoundError extends Error {
  constructor() {
    super(NOT_FOUND_TEXT);
    this.status = NOT_FOUND_STATUS;
  }
}

module.exports = {
  NotFoundError,
};
