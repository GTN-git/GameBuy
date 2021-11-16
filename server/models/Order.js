const { Schema }, mongoose = require('mongoose');

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;