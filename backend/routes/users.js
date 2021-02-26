const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, patchUser, patchAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().hex()
      .length(24)
      .pattern(/^[0-9]/)
      .messages({
        'any.required': 'Обязательное поле',
        'string.hex': 'Строка должна содержать символы 16-ной системы счисления',
        'string.length': 'Строка должна содержать 24 символа',
      }),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/),
  }),
}), patchAvatar);

module.exports = router;
