const User = require('../models/userModel');
const {
  NOT_USERS_TEXT, getId,
  handleContorllersError: handleError,
} = require('../helpers');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.send({ data: users.length ? users : NOT_USERS_TEXT }))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  console.log(req.params);
  User
    .findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => handleError(err, res));
};

module.exports.profileUpd = (req, res) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(getId(req), { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.avatarUpd = (req, res) => {
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(getId(req), { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};
