const { NOT_ROUTE_TEXT } = require('../../helpers/constants');
const NotFoundError = require('./NotFoundError');

class NotFoundRouteError extends NotFoundError {
  constructor() {
    super(NOT_ROUTE_TEXT);
  }
}

module.exports = NotFoundRouteError;
