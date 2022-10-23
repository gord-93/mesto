const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  text: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 5000,
  },
  author: {
    type: String,
    default: '',
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/.test(url);
      },
    },
  },
  secondLink: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/.test(url);
      },
    },
    default: '',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  date: {
    type: String,
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
