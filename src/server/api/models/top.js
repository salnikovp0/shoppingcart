const mongoose = require('mongoose');

const topSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false }],
    email: { type: String, required: true }
});

module.exports = mongoose.model('Top', topSchema);

