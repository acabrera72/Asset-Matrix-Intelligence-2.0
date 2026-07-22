const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};


exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }

        // --- NUEVA API EXTERNA: Validación de Email (Disify) ---
        // Verificamos si el email es real y no es desechable/falso antes de registrar
        const emailValidationResponse = await fetch(`https://www.disify.com/api/email/${email}`);
        if (emailValidationResponse.ok) {
            const emailData = await emailValidationResponse.json();
            if (!emailData.format || !emailData.dns || emailData.disposable) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'El correo proporcionado es inválido, falso o temporal. Usa un correo real.' 
                });
            }
        }
        // --------------------------------------------------------

        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Por favor, proporciona email y contraseña' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};


exports.getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        next(error);
    }
};
