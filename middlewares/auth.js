const jwt = require('jsonwebtoken');
const { NOT_AUTH_TEXT } = require('../helpers/constants');
const AuthError = require('../castomErrors/AuthError');

module.exports = (req, res, next) => {
  const err = new AuthError(NOT_AUTH_TEXT);
  let payload;

  try {
    const token = req.cookies.jwt;
    const { NODE_ENV, JWT_SECRET } = process.env;

    // .verify выкинет ошибку при несоответствии
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch {
    throw err;
  }

  req.user = payload;

  next();
};
