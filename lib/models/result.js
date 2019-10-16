const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  result: {
    type: String,
    required: true,
  },
  user: {
    ref: 'User',
    type: mongoose.Types.ObjectId
  },
  match: {
    ref: 'Match',
    type: mongoose.Types.ObjectId
  }
});

module.exports = mongoose.model('Result', schema);