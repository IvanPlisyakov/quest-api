const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  group: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {//login
    type: String,
    required: true,
    unique: true,
    /*validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Неправильный Email.',
    },*/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function encryptPassword(email, password) {
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

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('User', userSchema);

// module.exports = mongoose.model('user', userSchema);

// mongoose.models.User || mongoose.model('User', user);

/*
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: true,
  },
*/
