const jwt = require('jsonwebtoken');
const { UNCORRECT_AUTH_STATUS, NOT_AUTH_TEXT } = require('../helpers');

module.exports = (req, res, next) => {
  const error = new Error(NOT_AUTH_TEXT);
  error.status = UNCORRECT_AUTH_STATUS;

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw error;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch {
    throw error;
  }

  req.user = payload;

  next();
};
