const { USER_EXIST_TEXT, USER_EXIST_STATUS } = require('../helpers/constants');

class UserAlreadyExist extends Error {
  constructor() {
    super(USER_EXIST_TEXT);
    this.status = USER_EXIST_STATUS;
  }
}

module.exports = UserAlreadyExist;
