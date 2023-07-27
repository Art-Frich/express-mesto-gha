const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');
const {
  NOT_FOUND_STATUS, NOT_ROUTE_MSG, UNCORRECT_DATA_STATUS,
  UNCORRECT_DATA_TEXT, NOT_CARD_TEXT, NOT_USER_TEXT,
  ERROR_DEFAULT_STATUS,
  options, fullerConsoleLine, regExpEmail, regExpUrl,
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

  app.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(regExpEmail),
      password: Joi.string().required(),
    }),
  }), login);
  app.post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regExpUrl),
      email: Joi.string().required().pattern(regExpEmail),
      password: Joi.string().required(),
    }),
  }), createUser);
  app.use('/users', auth, require('./routes/users'));
  app.use('/cards', auth, require('./routes/cards'));
  app.use((req, res) => {
    res.status(NOT_FOUND_STATUS).send(NOT_ROUTE_MSG);
  });
  app.use(errors());
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
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
  });

  app.listen(PORT, () => {
    console.log(fullerConsoleLine);
    console.log(`App listening on port  ${PORT}`);
  });
} catch (err) {
  handleError(err);
}
