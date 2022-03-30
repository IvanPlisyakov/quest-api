const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, changeUser, getUser, newLogin
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required().min(2),
  }).unknown(true),
}), changeUser);

router.put('/me', newLogin)

module.exports = router;
