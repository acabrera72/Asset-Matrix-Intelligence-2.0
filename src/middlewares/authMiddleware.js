const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Verificar si el token viene en los headers (formato: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'No estás autorizado para acceder a esta ruta' });
    }

    try {
        // Verificar firma y decodificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar al usuario en la base de datos y agregarlo al objeto req (excluyendo password)
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'El usuario del token ya no existe' });
        }

        next(); // Continuar con la siguiente función (controlador)
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
};

module.exports = { protect };
