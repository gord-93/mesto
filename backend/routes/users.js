const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, patchUser, patchAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:_id', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages('Минимум 2 символа максимум 30 символов'),
    about: Joi.string().min(2).max(30).messages('Минимум 2 символа максимум 30 символов'),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/),
  }),
}), patchAvatar);

module.exports = router;
