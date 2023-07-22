const router = require('express').Router();
const {
  getUser, createUser, getUsers, profileUpd, avatarUpd,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', profileUpd);
router.patch('/me/avatar', avatarUpd);

module.exports = router;
