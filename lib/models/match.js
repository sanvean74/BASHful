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
  },
  location: [{
    city: {
      type: String,
      required: true
    }, 
    state: {
      type: String,
      required: true
    }
  }],
  image: {
    Type: Buffer,
    required: true
  },
  minAge: {
    type: Number,
    required: true, 
    min: 18
  },
  maxAge: {
    type: Number,
    required: true,
    max: 120
  }
});

module.exports = mongoose.model('Match', schema);