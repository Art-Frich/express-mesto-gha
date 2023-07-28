const { NOT_FOUND_STATUS, NOT_FOUND_MSG } = require('../helpers/constants');

class NotFoundError extends Error {
  constructor() {
    super(NOT_FOUND_MSG);
    this.status = NOT_FOUND_STATUS;
  }
}

module.exports = {
  NotFoundError,
};
