const { NOT_FOUND_STATUS } = require('../../helpers/constants');

class NotFoundError extends Error {
  constructor(msg = 'Что-то потерялось...') {
    super(msg);
    this.status = NOT_FOUND_STATUS;
  }
}

module.exports = NotFoundError;
