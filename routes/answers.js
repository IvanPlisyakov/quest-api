const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { checkAnswer, getAnswers } = require('../controllers/answers')

router.get('/', getAnswers);
router.patch('/:id', celebrate({
  body: Joi.object().keys({
    answer: Joi.string().required().min(0),
  }).unknown(true),
}), checkAnswer);

module.exports = router;
