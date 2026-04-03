const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    quantity:  { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);