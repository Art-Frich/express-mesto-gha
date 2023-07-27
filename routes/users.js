const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, profileUpd, avatarUpd, getMe,
} = require('../controllers/users');
const { regExpObjectId, regExpUrl } = require('../helpers');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(regExpObjectId),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), profileUpd);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExpUrl),
  }),
}), avatarUpd);

module.exports = router;
