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
      message: 'Некорректный URL. Ожидаемый формат: http:// или https:// ',
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
