const express = require('express');
const { getCryptoInfo, addToPortfolio, getPortfolioAnalytics, removeTransaction } = require('../controllers/cryptoController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Crypto
 *   description: Criptoactivos integrados con CoinGecko
 */

/**
 * @swagger
 * /api/crypto/analytics:
 *   get:
 *     summary: Balance total de cartera histórica
 *     tags: [Crypto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Análisis de portafolio
 */
router.route('/analytics').get(getPortfolioAnalytics);

/**
 * @swagger
 * /api/crypto/portfolio:
 *   post:
 *     summary: Registra transacción de compra/venta
 *     tags: [Crypto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coin:
 *                 type: string
 *                 example: bitcoin
 *               name:
 *                 type: string
 *                 example: Bitcoin
 *     responses:
 *       201:
 *         description: Transacción registrada
 */
router.route('/portfolio').post(addToPortfolio);

/**
 * @swagger
 * /api/crypto/{coin}:
 *   get:
 *     summary: Consulta market cap y fluctuación 24h
 *     tags: [Crypto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la criptomoneda en CoinGecko (ej. bitcoin)
 *     responses:
 *       200:
 *         description: Datos de la criptomoneda
 */
router.route('/:coin').get(getCryptoInfo);

/**
 * @swagger
 * /api/crypto/{tx_id}:
 *   delete:
 *     summary: Revierte registro de transacción
 *     tags: [Crypto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tx_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transacción eliminada
 */
router.route('/:tx_id').delete(removeTransaction);

module.exports = router;
