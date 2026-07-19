const express = require('express');
const { getPortfolioAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas las rutas de análisis requieren autenticación
router.use(protect);

/**
 * @swagger
 * /api/analytics/portfolio:
 *   get:
 *     summary: Obtener la inteligencia financiera y cálculos del portafolio actual
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen financiero calculado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalValue:
 *                       type: number
 *                     assetCount:
 *                       type: integer
 *                     valueByType:
 *                       type: object
 */
router.route('/portfolio').get(getPortfolioAnalytics);

module.exports = router;
