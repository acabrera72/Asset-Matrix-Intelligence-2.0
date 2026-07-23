const Asset = require('../models/Asset');
const cryptoService = require('../services/cryptoService');

// @desc    Obtener market cap y fluctuación 24h
// @route   GET /api/crypto/:coin
// @access  Private
const getCryptoInfo = async (req, res, next) => {
    try {
        const data = await cryptoService.getCryptoData(req.params.coin);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Registra transacción de compra/venta en portafolio
// @route   POST /api/crypto/portfolio
// @access  Private
const addToPortfolio = async (req, res, next) => {
    try {
        const { coin, name } = req.body;
        
        // Obtener datos reales de CoinGecko antes de registrar
        const cryptoData = await cryptoService.getCryptoData(coin);
        
        const asset = await Asset.create({
            name: name || coin,
            symbol: coin,
            type: 'crypto',
            price: cryptoData.price,
            owner: req.user.id
        });

        res.status(201).json({ success: true, data: asset });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Balance total de cartera histórica
// @route   GET /api/crypto/analytics
// @access  Private
const getPortfolioAnalytics = async (req, res, next) => {
    try {
        const assets = await Asset.find({ owner: req.user.id, type: 'crypto' });
        
        const totalBalance = assets.reduce((acc, curr) => acc + curr.price, 0);

        res.status(200).json({
            success: true,
            data: {
                totalAssets: assets.length,
                totalInvested: totalBalance,
                assets
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al calcular balance' });
    }
};

// @desc    Revierte registro de transacción
// @route   DELETE /api/crypto/:tx_id
// @access  Private
const removeTransaction = async (req, res, next) => {
    try {
        const asset = await Asset.findOneAndDelete({
            _id: req.params.tx_id,
            owner: req.user.id,
            type: 'crypto'
        });

        if (!asset) {
            return res.status(404).json({ success: false, message: 'Transacción no encontrada' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: 'ID inválido o error al revertir' });
    }
};

module.exports = {
    getCryptoInfo,
    addToPortfolio,
    getPortfolioAnalytics,
    removeTransaction
};
