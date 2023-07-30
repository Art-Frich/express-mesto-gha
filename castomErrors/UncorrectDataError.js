const { UNCORRECT_DATA_STATUS, UNCORRECT_DATA_TEXT } = require('../helpers/constants');

class UncorrectDataError extends Error {
  constructor(msg = '') {
    super(UNCORRECT_DATA_TEXT + msg);
    this.status = UNCORRECT_DATA_STATUS;
  }
}

module.exports = UncorrectDataError;
