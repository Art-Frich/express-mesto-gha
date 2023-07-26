const router = require('express').Router();
const {
  getUser, getUsers, profileUpd, avatarUpd, getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', getMe);
router.patch('/me', profileUpd);
router.patch('/me/avatar', avatarUpd);

module.exports = router;
