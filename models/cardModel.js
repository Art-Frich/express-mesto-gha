const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (value) => /^(http|https):\/\//.test(value),
      message: 'Некорректный URL',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {},
  createdAt: {},
});

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;
