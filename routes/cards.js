const router = require('express').Router();
const { celebrate } = require('celebrate');

// eslint-disable-next-line object-curly-newline
const { getCards, createCard, deleteCard, setLike, deleteLike } = require('../controllers/cards');
const { postCardSchema, checkCardIdSchema } = require('../celebrateValidation/celebrateSchems');

router.get('/', getCards);
router.post('/', celebrate(postCardSchema), createCard);
router.delete('/:cardId', celebrate(checkCardIdSchema), deleteCard);
router.put('/:cardId/likes', celebrate(checkCardIdSchema), setLike);
router.delete('/:cardId/likes', celebrate(checkCardIdSchema), deleteLike);

module.exports = router;
