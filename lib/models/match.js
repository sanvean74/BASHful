const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'non-binary']
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  location: {
    city: {
      type: String,
      required: true
    }, 
    state: {
      type: String,
      required: true
    }
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Match', schema);