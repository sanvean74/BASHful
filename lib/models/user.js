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
  roles: [String],
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
  image: {
    type: [Buffer],
    // required: true,
  },
  genderPref: {
    type: String,
    required: true,
    enum: ['male', 'female', 'non-binary', 'no preference']
  }
});

schema.virtual('password').set(function (password) {
  this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function (password) {
  return bcrypt.compareSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);