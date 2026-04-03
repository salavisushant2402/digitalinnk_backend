const CartItem = require('../models/cart.model');
const Product  = require('../models/product.model');
const { calculateBill } = require('../utils/offers');

exports.getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        const products  = await Product.find();

        const items = cartItems.map(function(item) {
        var product = products.find(function(p) { 
            return p.id === item.productId; 
        });
        return {
            productId: item.productId,
            name: product ? product.name  : item.productId,
            unit: product ? product.unit  : '',
            price: product ? product.price : 0,
            quantity: item.quantity,
            lineTotal: product ? parseFloat((product.price * item.quantity).toFixed(2)) : 0,
        };
        });

        const bill = calculateBill(cartItems, products);

        res.json({ items, bill });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        var { productId, quantity = 1 } = req.body;
        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        var product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        var qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty < 1) {
            return res.status(400).json({ error: 'Quantity must be a positive number' });
        }

        var item = await CartItem.findOneAndUpdate(
            { productId },
            { $inc: { quantity: qty } },
            { upsert: true, new: true }
        );

        res.json({ message: 'Added to cart', item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateCart = async (req, res) => {
    try {
        var { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        var qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty < 0) {
            return res.status(400).json({ error: 'Quantity must be 0 or more' });
        }

        if (qty === 0) {
            await CartItem.deleteOne({ productId });
            return res.json({ message: 'Item removed from cart', productId });
        }

        var item = await CartItem.findOneAndUpdate(
            { productId },
            { quantity: qty },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ error: 'Item not in cart' });
        }

        res.json({ message: 'Cart updated', item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        var { productId } = req.params;
        var item = await CartItem.findOneAndDelete({ productId });
        if (!item) {
            return res.status(404).json({ error: 'Item not in cart' });
        }
        res.json({ message: 'Removed from cart', productId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await CartItem.deleteMany();
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};