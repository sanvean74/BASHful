const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  result: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  match: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Result', schema);