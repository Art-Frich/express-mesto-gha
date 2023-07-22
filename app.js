const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  NOT_ROUTE_MSG,
  options, fullerConsoleLine,
  handleAppError: handleError,
  NOT_FOUND_STATUS,
} = require('./helpers');

const testUserId = '64bb0a72b7c30c80352bdf50';
const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

try {
  const app = express();
  mongoose.connect(MONGO_URI, options).catch(handleError);

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    req.user = {
      _id: testUserId,
    };

    next();
  });
  app.use('/users', require('./routes/users'));
  app.use('/cards', require('./routes/cards'));
  app.use((req, res) => {
    res.status(NOT_FOUND_STATUS).send(NOT_ROUTE_MSG);
  });

  app.listen(PORT, () => {
    console.log(fullerConsoleLine);
    console.log(`App listening on port  ${PORT}`);
  });
} catch (err) {
  handleError(err);
}
