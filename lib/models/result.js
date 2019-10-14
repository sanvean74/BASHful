const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  result: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Result', schema);