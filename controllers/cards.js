const Card = require('../models/cardModel');
const {
  NOT_CARD_TEXT: NOT_FOUND_MSG,
  UNCORRECT_DATA_STATUS, SUCCES_CREATE_STATUS, NOT_CARDS_TEXT,
  ALIEN_CARD_TEXT, ALIEN_CARD_STATUS, NOT_FOUND_STATUS,
} = require('../helpers');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards.length ? cards : NOT_CARDS_TEXT }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card
    .create({ name, link, owner })
    .then((card) => res.status(SUCCES_CREATE_STATUS).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const error = new Error(NOT_FOUND_MSG);
        error.status = NOT_FOUND_STATUS;
        throw error;
      }

      if (card.owner.toString() === req.user._id) {
        card.deleteOne();
        res.send({ data: card });
      } else {
        const error = new Error(ALIEN_CARD_TEXT);
        error.status = ALIEN_CARD_STATUS;
        throw error;
      }
    })
    .catch(next);
};

module.exports.setLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        const error = new Error(NOT_FOUND_MSG);
        error.status = NOT_FOUND_STATUS;
        throw error;
      }

      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        const error = new Error(NOT_FOUND_MSG);
        error.status = NOT_FOUND_STATUS;
        throw error;
      }

      res.send({ data: card });
    })
    .catch(next);
};
