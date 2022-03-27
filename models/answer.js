const mongoose = require('mongoose');
// const validator = require('validator');

const answerSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  answer1: {
    type: String,
    required: true,
    default: "No",
  },
  answer2: {
    type: String,
    required: true,
    default: "No",
  },
  answer3: {
    type: String,
    required: true,
    default: "No",
  },
  answer4: {
    type: String,
    required: true,
    default: "No",
  },
  answer5: {
    type: String,
    required: true,
    default: "No",
  },
  answer6: {
    type: String,
    required: true,
    default: "No",
  },
});

module.exports = mongoose.model('answer', answerSchema);
