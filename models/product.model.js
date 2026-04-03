const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    unit: String,
    dcescription: String,
    image: String,
    category: String,
});

module.exports = mongoose.model('Product',productSchema)