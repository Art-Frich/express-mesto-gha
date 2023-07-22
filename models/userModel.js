const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    required: true,
    type: String,
  },
  about: {
    minlength: 2,
    maxlength: 30,
    required: true,
    type: String,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: (value) => /^(http|https):\/\//.test(value),
      message: 'Некорректный URL. Ожидаемый формат: http:// или https:// ',
    },
  },
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
