const User = require('../models/User');

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Público (por ahora)
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Excluimos la contraseña
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error); // Pasamos el error al middleware global
    }
};

// @desc    Crear un nuevo usuario
// @route   POST /api/users
// @access  Público
exports.createUser = async (req, res, next) => {
    try {
        // En un futuro aquí validaremos con Zod antes de guardar
        const user = await User.create(req.body);
        
        // No devolver la contraseña en la respuesta
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
};
