const { UNCORRECT_DATA_STATUS, UNCORRECT_DATA_TEXT } = require('../helpers/constants');

class UncorrectDataError extends Error {
  constructor() {
    super(UNCORRECT_DATA_TEXT);
    this.status = UNCORRECT_DATA_STATUS;
  }
}

module.exports = {
  UncorrectDataError,
};
