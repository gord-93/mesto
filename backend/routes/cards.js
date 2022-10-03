const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');

const {
  getCards, postCard, deleteCard, likeCard, dislikeCard, getCardByID,
} = require('../controllers/cards');

router.get('/', getCards);
router.get('/:_id', getCardByID);

router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
      subtitle: Joi.string().min(3).max(100).required()
      .messages({
        'string.min': 'Минимум 3 символа',
        'string.max': 'Максимум 100 символов',
        'any.required': 'Обязательное поле',
      }),
    link: Joi.string().required().custom((value, err) => {
      if (validator.isURL(value)) {
        return value;
      }
      return err.message('Невалидный url');
    }),
    secondLink: Joi.string().required().custom((value, err) => {
      if (validator.isURL(value)) {
        return value;
      }
      return err.message('Невалидный url');
    }),
  }),
}), postCard);

router.delete('/:_id', celebrate({
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
}), deleteCard);

router.put('/:_id/likes', celebrate({
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
}), likeCard);

router.delete('/:_id/likes', celebrate({
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
}), dislikeCard);

module.exports = router;
