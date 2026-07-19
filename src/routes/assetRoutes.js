const express = require('express');
const { getAssets, createAsset, deleteAsset } = require('../controllers/assetController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createAssetSchema } = require('../validations/assetValidation');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Asset:
 *       type: object
 *       required:
 *         - name
 *         - symbol
 *         - type
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del activo
 *         symbol:
 *           type: string
 *           description: Símbolo del activo (BTC, AAPL)
 *         type:
 *           type: string
 *           enum: [crypto, stock, fiat, commodity, other]
 *         price:
 *           type: number
 *           description: Precio actual
 *       example:
 *         name: Bitcoin
 *         symbol: BTC
 *         type: crypto
 *         price: 65000
 */

router.use(protect);

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Obtener todos los activos del usuario autenticado
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de activos del usuario
 */
router.route('/').get(getAssets);

/**
 * @swagger
 * /api/assets:
 *   post:
 *     summary: Crear un nuevo activo (asociado al usuario)
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     responses:
 *       201:
 *         description: Activo creado
 *       400:
 *         description: Error de validación (Zod)
 */
router.route('/').post(validate(createAssetSchema), createAsset);

/**
 * @swagger
 * /api/assets/{id}:
 *   delete:
 *     summary: Eliminar un activo por ID
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del activo
 *     responses:
 *       200:
 *         description: Activo eliminado
 */
router.route('/:id').delete(deleteAsset);

module.exports = router;
