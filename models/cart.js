const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema (
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },

        quantity: {
            type: Number,
            // The following is just to make sure that there cant be 0 items and mess everything up!
            default: 1,
            min: 1,
        }
    }
)

const CartSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        items: [cartItemSchema], //It has to be an array because you are adding items to a (list)
    }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;