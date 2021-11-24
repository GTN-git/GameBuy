const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Game = require('./Game');
const Order = require('./Order');

// sets up user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
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

    games: [{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }],

    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: true
  }
);

// encrypts user's password before saving to data base
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// sets up a function to test if password is correct
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creates virtual for game count data
userSchema.virtual('gameCount').get(function () {
  return this.games.length;
});

// creates virtual for order count data
userSchema.virtual('orderCount').get(function () {
  return this.orders.length;
});


const User = model('User', userSchema);

module.exports = User;
