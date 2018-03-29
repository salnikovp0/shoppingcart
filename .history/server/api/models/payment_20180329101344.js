const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // products: { type: String, require: true },
    products: [{ type: Schema.ObjectId, ref: 'Product' }],
    email: { type: String, require: true },
});

module.exports = mongoose.model('Payment', paymentSchema);