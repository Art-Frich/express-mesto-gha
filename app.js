const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const {
  handleAppError, handleStartServerConsole, sendError,
} = require('./helpers/utils');
const { mongooseOptions } = require('./helpers/constants');
const routes = require('./routes/index');

const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

try {
  const app = express();
  mongoose.connect(MONGO_URI, mongooseOptions).catch(handleAppError);

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(routes);

  app.use(errors()); // celebrate errors handle
  app.use(sendError); // send others error

  app.listen(PORT, handleStartServerConsole(PORT));
} catch (err) {
  handleAppError(err);
}
