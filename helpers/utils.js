require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  NOT_FOUND_STATUS, NOT_ROUTE_MSG, ERROR_DEFAULT_STATUS, UNCORRECT_DATA_STATUS,
  UNCORRECT_DATA_TEXT, NOT_CARD_TEXT, NOT_USER_TEXT, fullerConsoleLine,
} = require('./constants');
const { NotFoundError } = require('../castomErrors/NotFoundError');

const checkExistence = (object, Err) => {
  if (!object) {
    throw new Err();
  }
};

module.exports.handleAppError = (err) => console.log(`Произошла ошибка: ${err.name} ${err.message}. \n${err.stack}`);
module.exports.handleOtherRouts = (req, res) => res.status(NOT_FOUND_STATUS).send(NOT_ROUTE_MSG);
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

module.exports.checkHandleSend = (promise, res, next, Err = NotFoundError) => promise
  .then((data) => {
    checkExistence(data, Err);
    res.send({ data });
  })
  .catch(next);

// eslint-disable-next-line no-unused-vars
module.exports.handleQueryError = (err, req, res, next) => {
  let { status = ERROR_DEFAULT_STATUS, message } = err;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    status = UNCORRECT_DATA_STATUS;
    message = UNCORRECT_DATA_TEXT + err.message;
  }
  if (err.name === 'RangeError' && /cards/.test(err.stack)) {
    status = NOT_FOUND_STATUS;
    message = NOT_CARD_TEXT;
  }
  if (err.name === 'RangeError' && /users/.test(err.stack)) {
    status = NOT_FOUND_STATUS;
    message = NOT_USER_TEXT;
  }

  res
    .status(status)
    .send({
      message: status === ERROR_DEFAULT_STATUS
        ? 'На сервере произошла ошибка'
        : message,
    });
};
