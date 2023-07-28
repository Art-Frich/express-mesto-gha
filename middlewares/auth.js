const jwt = require('jsonwebtoken');
const { NOT_AUTH_TEXT } = require('../helpers/constants');
const { AuthError } = require('../castomErrors/AuthError');

module.exports = (req, res, next) => {
  const err = new AuthError(NOT_AUTH_TEXT);
  let payload;

  try {
    const authorization = req.headers.cookie.split('=')[1];

    // || !authorization.startsWith('Bearer')
    if (!authorization) {
      throw err;
    }

    const token = authorization.replace('Bearer ', '');
    const { NODE_ENV, JWT_SECRET } = process.env;

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch {
    throw err;
  }

  req.user = payload;

  next();
};
