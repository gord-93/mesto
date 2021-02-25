const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');

const {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
    link: Joi.string().required().custom((value, err) => {
      if (validator.isURL(value)) {
        return value;
      }
      return err.message('Невалидный url');
    }),
  }),
}), postCard);

router.delete('/:_id', deleteCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id/likes', dislikeCard);

module.exports = router;
