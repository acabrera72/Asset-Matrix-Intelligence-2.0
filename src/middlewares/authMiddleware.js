const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'No estás autorizado para acceder a esta ruta' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'El usuario del token ya no existe' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
};

module.exports = { protect };
