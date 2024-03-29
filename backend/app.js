/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const app = express();
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000, BASE_PATH } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).message('Строка должна содержать минимум 2 символа')
      .max(30)
      .message('Строка должна содержать максимум 30 символов')
      .default('Жак-Ив Кусто'),
    about: Joi.string().min(2).message('Строка должна содержать минимум 2 символа')
      .max(30)
      .message('Строка должна содержать максимум 30 символов')
      .default('Исследователь'),
    avatar: Joi.string().regex(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/).message('Неккоректно введен URL-адрес')
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email().message('Неккоректно указан адрес email'),
    password: Joi.string().required().min(8).message('Пароль должен содержать минимум 8 символов')
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .message('Не выполнены требования безопасности пароля: минимум 1 буква, 1 цифра и 1 специальный символ'),
  }),
}), createUser);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);

app.use(errorLogger);
app.use(errors());
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.listen(PORT, () => {
  console.log(`localhost: ${BASE_PATH}, default: 3000`);
});
