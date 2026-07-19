const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función de ayuda para generar el Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// @desc    Registrar un nuevo usuario (reemplaza createUser antiguo)
// @route   POST /api/auth/register
// @access  Público
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Comprobar si ya existe el correo
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }

        // Crear el usuario (se encriptará automáticamente gracias a nuestro hook pre-save)
        const user = await User.create({ name, email, password, role });

        // Devolver Token
        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Autenticar (Login) usuario y obtener Token
// @route   POST /api/auth/login
// @access  Público
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Por favor, proporciona email y contraseña' });
        }

        // Buscar usuario e incluir su contraseña (ya que por defecto a veces no se busca si se configuró en el modelo select: false, aunque aquí no lo hicimos)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Verificar contraseña usando el método que creamos en el esquema
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Si es correcto, devolver Token
        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtener datos del usuario logueado actualmente
// @route   GET /api/auth/me
// @access  Privado
exports.getMe = async (req, res, next) => {
    try {
        // req.user ya viene del authMiddleware
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        next(error);
    }
};
