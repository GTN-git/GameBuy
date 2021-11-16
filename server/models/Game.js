const { Schema }, mongoose = require('mongoose');

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

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;