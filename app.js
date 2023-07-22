const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  PORT, MONGO_URI, NOT_ROUTE_MSG,
  options, testUserId, fullerConsoleLine,
  handleAppError: handleError,
  NOT_FOUND_STATUS,
} = require('./helpers');

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
