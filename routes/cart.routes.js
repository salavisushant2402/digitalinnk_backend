const express = require('express');
const router  = express.Router();
const cart    = require('../controllers/cart.controller');

router.get('/',cart.getCart);
router.post('/add',cart.addToCart);
router.patch('/update',cart.updateCart);
router.delete('/remove/:productId',cart.removeFromCart);
router.delete('/clear',cart.clearCart);

module.exports = router;