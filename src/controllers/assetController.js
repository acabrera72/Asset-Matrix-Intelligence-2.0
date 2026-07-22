const Asset = require('../models/Asset');


exports.getAssets = async (req, res, next) => {
    try {
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


exports.createAsset = async (req, res, next) => {
    try {
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


exports.deleteAsset = async (req, res, next) => {
    try {
        const asset = await Asset.findById(req.params.id);

        if (!asset) {
            return res.status(404).json({ success: false, message: 'Activo no encontrado' });
        }

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
