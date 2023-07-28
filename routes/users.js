const router = require('express').Router();
const { celebrate } = require('celebrate');

// eslint-disable-next-line object-curly-newline
const { getUser, getUsers, profileUpd, avatarUpd, getMe } = require('../controllers/users');
const { checkUserIdSchema, patchMeSchema, patchAvatarSchema } = require('../celebrateValidation/celebrateSchems');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', celebrate(checkUserIdSchema), getUser);
router.patch('/me', celebrate(patchMeSchema), profileUpd);
router.patch('/me/avatar', celebrate(patchAvatarSchema), avatarUpd);

module.exports = router;
