const express = require('express');
const { getStockQuote, watchStock, getStockHistory, removeStock } = require('../controllers/stockController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: Endpoints para mercados bursátiles integrados con Alpha Vantage
 */

/**
 * @swagger
 * /api/stocks/{symbol}:
 *   get:
 *     summary: Consulta precio y volumen real de una acción
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Símbolo de la acción (ej. MSFT)
 *     responses:
 *       200:
 *         description: Datos de la acción obtenidos de Alpha Vantage
 *       400:
 *         description: Error al obtener datos
 */
router.route('/:symbol').get(getStockQuote);

/**
 * @swagger
 * /api/stocks/{symbol}/history:
 *   get:
 *     summary: Análisis de tendencias históricas
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial de la acción
 */
router.route('/:symbol/history').get(getStockHistory);

/**
 * @swagger
 * /api/stocks/watch:
 *   post:
 *     summary: Guarda ticker en lista de seguimiento
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: AAPL
 *               name:
 *                 type: string
 *                 example: Apple Inc.
 *     responses:
 *       201:
 *         description: Ticker guardado en DB
 */
router.route('/watch').post(watchStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     summary: Elimina alerta de precio o de la lista de seguimiento
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Acción eliminada
 */
router.route('/:id').delete(removeStock);

module.exports = router;
