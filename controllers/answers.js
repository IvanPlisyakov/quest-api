const Answer = require('../models/answer');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const { answersConstants } =  require('../constants.js');

const createAnswers = (req, res, next) => {
  return Answer.create({
    owner: req._id
  })
    .then(() => {return req})
    .catch(next)
}

const checkAnswer = (req, res, next) => {
  const { id } = req.params;
  console.log(req.user._id)
  if(answersConstants[id - 1] === req.body.answer) {
    Answer.findOneAndUpdate(
      { owner: req.user._id }, 
      { ["answer" + id]: req.body.answer },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        //upsert: true // если пользователь не найден, он будет создан
      })
      .then(newAnswers => res.send({message: true, newAnswers: newAnswers}))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
    //res.status(200).send("Yes")

  } else {
    res.status(200).send({message: false})
  }
}

const getAnswers = (req, res, next) => {
  Answer.findOne({owner : req.user._id})
    .then((answers) => {
      if (!answers) {
        throw new NotFoundError('There is no user with this id');
      }

      res.status(200).send(answers);
    })
    .catch(next);
}

module.exports = {
  createAnswers, checkAnswer, getAnswers
};