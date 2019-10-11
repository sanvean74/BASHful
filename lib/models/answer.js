const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  answers: [{
    type: String || Number,
    required: true,
  }],
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Answer', schema);