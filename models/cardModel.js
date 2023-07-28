const mongoose = require('mongoose');
// eslint-disable-next-line object-curly-newline
const { regExpUrl, EXPECTED_URL_TEXT, minLen, maxLen } = require('../helpers/constants');

const cardSchema = new mongoose.Schema({
  name: {
    minlength: minLen,
    maxlength: maxLen,
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (value) => regExpUrl.test(value),
      message: EXPECTED_URL_TEXT,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;
