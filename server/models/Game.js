const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    cover: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    platform: {
        type: String,
        required: true
    },

    condition: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Game = model('Game', gameSchema);

module.exports = Game;