const User = require('../models/userModel');
const {
  NOT_USER_MSG: NOT_FOUND_MSG,
  NOT_FOUND_STATUS, NOT_USERS_TEXT, UNCORRECT_DATA_STATUS, SUCCES_CREATE_STATUS,
  isExist, getId,
  handleContorllersError: handleError,
} = require('../helpers');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.send({ data: users.length ? users : NOT_USERS_TEXT }))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => (isExist(user)
      ? res.send({ data: user })
      : res.status(UNCORRECT_DATA_STATUS).send(NOT_FOUND_MSG)))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User
    .create({ name, about, avatar })
    .then((newUser) => res.status(SUCCES_CREATE_STATUS).send({ data: newUser }))
    .catch((err) => handleError(err, res));
};

module.exports.profileUpd = (req, res) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(getId(req), { name, about }, { new: true, runValidators: true })
    .then((user) => (isExist(user)
      ? res.send({ data: user })
      : res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MSG)))
    .catch((err) => handleError(err, res));
};

module.exports.avatarUpd = (req, res) => {
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(getId(req), { avatar }, { new: true, runValidators: true })
    .then((user) => (isExist(user)
      ? res.send({ data: user })
      : res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MSG)))
    .catch((err) => handleError(err, res));
};
