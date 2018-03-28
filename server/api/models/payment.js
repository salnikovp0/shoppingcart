const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: { type: String, require: true },
    email: { type: String, require: true },
});

module.exports = mongoose.model('Payment', paymentSchema);