require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const {
  NOT_USER_TEXT: NOT_FOUND_MSG,
  NOT_FOUND_STATUS, NOT_USERS_TEXT, UNCORRECT_DATA_STATUS,
  SUCCES_CREATE_STATUS,
} = require('../helpers');

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send({ data: users.length ? users : NOT_USERS_TEXT }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const error = new Error(NOT_FOUND_MSG);
        error.status = UNCORRECT_DATA_STATUS;
        throw error;
      }

      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.status(SUCCES_CREATE_STATUS).send({
        data: {
          _id: newUser._id, name, about, avatar, email,
        },
      });
    })
    .catch(next);
};

module.exports.profileUpd = (req, res, next) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const error = new Error(NOT_FOUND_MSG);
        error.status = NOT_FOUND_STATUS;
        throw error;
      }

      res.send({ data: user });
    })
    .catch(next);
};

module.exports.avatarUpd = (req, res, next) => {
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const error = new Error(NOT_FOUND_MSG);
        error.status = NOT_FOUND_STATUS;
        throw error;
      }

      res.send({ data: user });
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  Promise.resolve(() => res.send(req.user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ data: user });
      res
        .cookie('jwt', token, {
          maxAge: 1000 * 3600 * 24 * 7,
          httpOnly: true,
        })
        .end(); // 7 day
    })
    .catch(next);
};
