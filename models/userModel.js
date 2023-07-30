const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  regExpUrl, regExpEmail,
  EXPECTED_URL_TEXT, EXPECTED_EMAIL_TEXT, UNCORRECT_AUTH_TEXT,
  minLen, maxLen,
} = require('../helpers/constants');
const AuthError = require('../castomErrors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    minlength: minLen,
    maxlength: maxLen,
    default: 'Жак-Ив Кусто',
    type: String,
  },
  about: {
    minlength: minLen,
    maxlength: maxLen,
    default: 'Исследователь',
    type: String,
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
    validate: {
      validator: (value) => regExpUrl.test(value),
      message: EXPECTED_URL_TEXT,
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (value) => regExpEmail.test(value),
      message: EXPECTED_EMAIL_TEXT,
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      const err = new AuthError(UNCORRECT_AUTH_TEXT);

      try {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) throw err;
            return user;
          });
      } catch {
        throw err;
      }
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
