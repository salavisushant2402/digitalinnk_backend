const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/product.routes');
const cartRoutes    = require('./routes/cart.routes'); 

//ROUTES
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

module.exports = app;