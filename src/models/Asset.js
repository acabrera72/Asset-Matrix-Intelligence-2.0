const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del activo es obligatorio'],
        trim: true
    },
    symbol: {
        type: String,
        required: [true, 'El símbolo (ej. BTC, AAPL) es obligatorio'],
        uppercase: true,
        trim: true
    },
    type: {
        type: String,
        required: [true, 'El tipo de activo es obligatorio'],
        enum: ['crypto', 'stock', 'fiat', 'commodity', 'other']
    },
    price: {
        type: Number,
        required: [true, 'El precio actual es obligatorio']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Cada activo debe pertenecer a un usuario
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema);
