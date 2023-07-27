const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  UNCORRECT_AUTH_TEXT, UNCORRECT_AUTH_STATUS, regExpUrl, regExpEmail,
} = require('../helpers');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
    type: String,
  },
  about: {
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
    type: String,
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
    validate: {
      validator: (value) => regExpUrl.test(value),
      message: 'Некорректный URL. Ожидаемый формат: http:// или https:// ',
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (value) => regExpEmail.test(value),
      message: 'Некорректный email. Ожидаемый формат email@domen.source',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics = function findUserByCredentials(email, password) {
  this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      const error = new Error(UNCORRECT_AUTH_TEXT);
      error.status = UNCORRECT_AUTH_STATUS;

      try {
        if (bcrypt.compare(password, user.password)) {
          return user;
        }
        throw error;
      } catch {
        throw error;
      }
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
