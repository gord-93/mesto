const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, subtitle, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, subtitle, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id отсутствует');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено удаление чужих карточек');
      }
      Card.findByIdAndRemove(req.params._id)
        .then((removedCard) => res.status(200).send({ removedCard, message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Карточка с данным id отсутствует');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные карточки');
      }
      next(err);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params._id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Карточка с данным id отсутствует');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные карточки');
      }
      next(err);
    })
    .catch(next);
};
