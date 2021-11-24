const { Schema, model } = require('mongoose');

// sets up order schema
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

const Order = model('Order', orderSchema);

module.exports = Order;