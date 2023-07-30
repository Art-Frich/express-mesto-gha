const { UNCORRECT_AUTH_STATUS } = require('../helpers/constants');

class AuthError extends Error {
  constructor(msg) {
    super(msg);
    this.status = UNCORRECT_AUTH_STATUS;
  }
}

module.exports = AuthError;
