const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { login, createUser } = require('./controllers/users');
const {
  NOT_FOUND_STATUS, NOT_ROUTE_MSG, UNCORRECT_DATA_STATUS,
  UNCORRECT_DATA_TEXT, NOT_CARD_TEXT, NOT_USER_TEXT,
  ERROR_DEFAULT_STATUS, USER_EXIST_TEXT, USER_EXIST_STATUS,
  options, fullerConsoleLine,
  handleAppError: handleError,
} = require('./helpers');

const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

try {
  const app = express();
  mongoose.connect(MONGO_URI, options).catch(handleError);

  app.use(helmet());
  app.use(bodyParser.json());
  app.post('/sigin', login);
  app.post('/signup', createUser);
  app.use(require('./middlewares/auth'));
  app.use('/users', require('./routes/users'));
  app.use('/cards', require('./routes/cards'));
  app.use((req, res) => {
    res.status(NOT_FOUND_STATUS).send(NOT_ROUTE_MSG);
  });
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    let { statusCode = ERROR_DEFAULT_STATUS, message } = err;

    if (err.name === 'ValidationError' || err.name === 'CastError') {
      statusCode = UNCORRECT_DATA_STATUS;
      message = UNCORRECT_DATA_TEXT + err.message;
    }
    if (err.name === 'RangeError' && /cards/.test(err.stack)) {
      statusCode = NOT_FOUND_STATUS;
      message = NOT_CARD_TEXT;
    }
    if (err.name === 'RangeError' && /users/.test(err.stack)) {
      statusCode = NOT_FOUND_STATUS;
      message = NOT_USER_TEXT;
    }
    if (err.code === 11000) {
      statusCode = USER_EXIST_STATUS;
      message = USER_EXIST_TEXT;
    }

    res
      .status(statusCode)
      .send({
        message: statusCode === ERROR_DEFAULT_STATUS
          ? 'На сервере произошла ошибка'
          : message,
      });
  });

  app.listen(PORT, () => {
    console.log(fullerConsoleLine);
    console.log(`App listening on port  ${PORT}`);
  });
} catch (err) {
  handleError(err);
}
