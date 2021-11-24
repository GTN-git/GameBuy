const { Schema, model } = require('mongoose');

// sets up schema for game data
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

    release_date: {
        type: Number,
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

    seller: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Game = model('Game', gameSchema);

module.exports = Game;