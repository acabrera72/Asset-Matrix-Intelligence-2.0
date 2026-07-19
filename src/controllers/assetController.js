const Asset = require('../models/Asset');

// @desc    Obtener todos los activos del usuario logueado
// @route   GET /api/assets
// @access  Privado
exports.getAssets = async (req, res, next) => {
    try {
        // Filtrar activos por el ID del usuario del token (req.user viene del middleware)
        const assets = await Asset.find({ owner: req.user.id });
        res.status(200).json({
            success: true,
            count: assets.length,
            data: assets
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Crear un nuevo activo para el usuario
// @route   POST /api/assets
// @access  Privado
exports.createAsset = async (req, res, next) => {
    try {
        // Inyectar el ID del usuario como owner del activo
        req.body.owner = req.user.id;

        const asset = await Asset.create(req.body);

        res.status(201).json({
            success: true,
            data: asset
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Eliminar un activo
// @route   DELETE /api/assets/:id
// @access  Privado
exports.deleteAsset = async (req, res, next) => {
    try {
        const asset = await Asset.findById(req.params.id);

        if (!asset) {
            return res.status(404).json({ success: false, message: 'Activo no encontrado' });
        }

        // Asegurarse de que el usuario logueado sea el dueño
        if (asset.owner.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'No estás autorizado para eliminar este activo' });
        }

        await asset.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
