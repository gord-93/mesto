const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { isValidPassword } = require('mongoose-custom-validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(url) {
        return /^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/.test(url);
      },
      message: 'Неккоректно введен URL-адрес',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неккоректный формат почтового адреса',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: (v) => isValidPassword(v, { minlength: 8 }),
      message: 'Не выполнены требования безопасности пароля: минимум 1 буква, 1 цифра и 1 специальный символ',
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
