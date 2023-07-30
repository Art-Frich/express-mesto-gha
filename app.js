const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { signinSchema, signupSchema } = require('./celebrateValidation/celebrateSchems');
const {
  handleAppError, handleOtherRouts, handleStartServerConsole, handleError, sendError,
} = require('./helpers/utils');
const { mongooseOptions } = require('./helpers/constants');

const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

try {
  const app = express();
  mongoose.connect(MONGO_URI, mongooseOptions).catch(handleAppError);

  app.use(helmet());
  app.use(bodyParser.json());

  app.post('/signin', celebrate(signinSchema), login);
  app.post('/signup', celebrate(signupSchema), createUser);
  app.use('/users', auth, require('./routes/users'));
  app.use('/cards', auth, require('./routes/cards'));
  app.use(auth, handleOtherRouts);

  app.use(errors()); // celebrate errors handle
  app.use(handleError); // others error handle
  app.use(sendError); // send others error

  app.listen(PORT, handleStartServerConsole(PORT));
} catch (err) {
  handleAppError(err);
}
