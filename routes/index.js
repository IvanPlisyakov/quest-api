const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  login, createUsers,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth.js');
const routerMovies = require('./movies.js');
const routerUsers = require('./users.js');
const routerAnswers = require('./answers.js');
const { checkAnswer, getAnswers } = require('../controllers/answers')

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    group: Joi.string().required().min(2),
    link: Joi.string().required().min(2),
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(8),
  }),
}), createUsers);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(8),
  }),
}), login);
router.use('/movies', auth, routerMovies);
router.use('/users', auth, routerUsers);
router.use('/answers', auth, routerAnswers);
router.use(/\//, auth);

module.exports = router;
