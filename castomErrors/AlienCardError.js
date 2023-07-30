const { ALIEN_CARD_TEXT, ALIEN_CARD_STATUS } = require('../helpers/constants');

class AlienCardError extends Error {
  constructor() {
    super(ALIEN_CARD_TEXT);
    this.status = ALIEN_CARD_STATUS;
  }
}

module.exports = AlienCardError;
