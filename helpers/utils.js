require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  ERROR_DEFAULT_STATUS, fullerConsoleLine,
} = require('./constants');
const NotFoundRouteError = require('../castomErrors/NotFoundErrors/NotFoundRouteError');
const NotFoundError = require('../castomErrors/NotFoundErrors/NotFoundError');
const UncorrectDataError = require('../castomErrors/UncorrectDataError');

const checkExistence = (object, Err = NotFoundError) => {
  if (!object) {
    throw new Err();
  }
};

/* eslint-disable no-console */
module.exports.handleAppError = (err) => console.log(`Произошла ошибка: ${err.name} ${err.message}. \n${err.stack}`);
module.exports.handleOtherRouts = (req, res, next) => next(new NotFoundRouteError());
module.exports.handleStartServerConsole = (PORT) => console.log(`${fullerConsoleLine}\nApp listening on port  ${PORT}`);

module.exports.tokenCreate = (id) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const token = jwt.sign(
    { _id: id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    { expiresIn: '7d' },
  );
  return token;
};

module.exports.checkHandleSend = (promise, res, next, Err = NotFoundError, handleError = null) => {
  promise
    .then((data) => {
      checkExistence(data, Err);
      res.send({ data });
    })
    .catch((err) => {
      if (handleError) {
        handleError(err, null, res, next);
      } else {
        next(err);
      }
    });
};

module.exports.handleError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    next(new UncorrectDataError());
  } else {
    next(err);
  }
};

// eslint-disable-next-line no-unused-vars
module.exports.sendError = (err, req, res, next) => {
  const { status = ERROR_DEFAULT_STATUS, message } = err;

  res
    .status(status)
    .send({
      message: status === ERROR_DEFAULT_STATUS
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports.checkExistence = checkExistence;
