const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
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
  minPrefAge: {
    type: Number,
    required: true,
    min: 18
  },
  maxPrefAge: {
    type: Number,
    required: true,
    max: 120
  },
  image: {
    type: String,
  },
  genderPref: {
    type: String,
    required: true,
    enum: ['male', 'female', 'non-binary', 'no preference']
  }
});

schema.virtual('password').set(function(password) {
  this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function(password) {
  return bcrypt.compareSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);