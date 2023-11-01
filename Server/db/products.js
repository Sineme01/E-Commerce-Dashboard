const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    Category: String,
    userId: String,
    brand: String
});

module.exports = mongoose.model("products", productSchema);