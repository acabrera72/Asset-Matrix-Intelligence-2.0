const Asset = require('../models/Asset');
const stockService = require('../services/stockService');

// @desc    Obtener precio y volumen real de una acción
// @route   GET /api/stocks/:symbol
// @access  Private
const getStockQuote = async (req, res, next) => {
    try {
        const data = await stockService.getStockPrice(req.params.symbol);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Guardar ticker en lista de seguimiento (watchlist)
// @route   POST /api/stocks/watch
// @access  Private
const watchStock = async (req, res, next) => {
    try {
        const { symbol, name } = req.body;
        
        // Obtener precio actual antes de guardar
        const stockData = await stockService.getStockPrice(symbol);
        
        const asset = await Asset.create({
            name: name || symbol,
            symbol: symbol,
            type: 'stock',
            price: stockData.price,
            owner: req.user.id
        });

        res.status(201).json({ success: true, data: asset });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Obtener historial de tendencias (Alpha Vantage)
// @route   GET /api/stocks/:symbol/history
// @access  Private
const getStockHistory = async (req, res, next) => {
    try {
        const data = await stockService.getStockHistory(req.params.symbol);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Eliminar alerta de precio / de watchlist
// @route   DELETE /api/stocks/:id
// @access  Private
const removeStock = async (req, res, next) => {
    try {
        const asset = await Asset.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id,
            type: 'stock'
        });

        if (!asset) {
            return res.status(404).json({ success: false, message: 'Acción no encontrada en tu lista' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: 'ID inválido o error al eliminar' });
    }
};

module.exports = {
    getStockQuote,
    watchStock,
    getStockHistory,
    removeStock
};
