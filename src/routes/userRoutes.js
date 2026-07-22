const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico (único)
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         role:
 *           type: string
 *           description: Rol del usuario
 *           default: user
 *       example:
 *         name: Estudiante UCAB
 *         email: estudiante@ucab.edu.ve
 *         password: orgullo_ucabista

 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Aquí se obtiene la lista de todos los usuarios registrados
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.route('/').get(getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Aquí se pueden crear usuarios de forma manual
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error de servidor
 */
router.route('/').post(createUser);

module.exports = router;
