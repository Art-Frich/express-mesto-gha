const Card = require('../models/cardModel');
const {
  NOT_FOUND_STATUS, NOT_CARDS_TEXT,
  isExist, getId,
  handleContorllersError: handleError,
  NOT_CARD_MSG: NOT_FOUND_MSG,
} = require('../helpers');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards.length ? cards : NOT_CARDS_TEXT }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => (isExist(card)
      ? res.send({ data: card })
      : res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MSG)))
    .catch((err) => handleError(err, res));
};

module.exports.setLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: getId(req) } },
      { new: true },
    )
    .then((card) => (isExist(card)
      ? res.send({ data: card })
      : res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MSG)))
    .catch((err) => handleError(err, res));
};

module.exports.deleteLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: getId(req) } },
      { new: true },
    )
    .then((card) => (isExist(card)
      ? res.send({ data: card })
      : res.status(NOT_FOUND_STATUS).send(NOT_FOUND_MSG)))
    .catch((err) => handleError(err, res));
};
