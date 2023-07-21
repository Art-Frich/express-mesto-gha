const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const options = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};

const handleError = (err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`);

try {
  const {
    PORT = 3000,
    MONGO_URI = 'mongodb://localhost:27017/mestodb',
  } = process.env;

  const app = express();
  mongoose.connect(MONGO_URI, options).catch(handleError);

  app.use(bodyParser.json());
  app.use('/users', require('./routes/users'));

  app.listen(PORT, () => {
    console.log('###################################################### -_- #####################################################');
    console.log(`App listening on port  ${PORT}`);
  });
} catch (err) {
  handleError(err);
}
