const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    price: { type: String, require: true },
    popularity: { type: Number, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);