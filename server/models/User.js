const { Schema }, mongoose = require('mongoose');
const Games = require('./Game');

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  games: [Games.schema]
});


const User = mongoose.model('User', userSchema);

module.exports = User;
