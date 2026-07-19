const Asset = require('../models/Asset');

// @desc    Obtener un resumen financiero (Inteligencia de Portafolio)
// @route   GET /api/analytics/portfolio
// @access  Privado
exports.getPortfolioAnalytics = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Buscar todos los activos del usuario
        const assets = await Asset.find({ owner: userId });

        if (assets.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    totalValue: 0,
                    assetCount: 0,
                    valueByType: {},
                    message: "Aún no tienes activos en tu portafolio."
                }
            });
        }

        // Variables analíticas
        let totalValue = 0;
        const valueByType = {
            crypto: 0,
            stock: 0,
            fiat: 0,
            commodity: 0,
            other: 0
        };

        // Procesamiento de datos (Calculando la Inteligencia Financiera)
        assets.forEach(asset => {
            totalValue += asset.price;
            
            if (valueByType[asset.type] !== undefined) {
                valueByType[asset.type] += asset.price;
            } else {
                valueByType[asset.type] = asset.price;
            }
        });

        res.status(200).json({
            success: true,
            data: {
                totalValue: parseFloat(totalValue.toFixed(2)), // Redondeado a 2 decimales
                assetCount: assets.length,
                valueByType: {
                    crypto: parseFloat(valueByType.crypto.toFixed(2)),
                    stock: parseFloat(valueByType.stock.toFixed(2)),
                    fiat: parseFloat(valueByType.fiat.toFixed(2)),
                    commodity: parseFloat(valueByType.commodity.toFixed(2)),
                    other: parseFloat(valueByType.other.toFixed(2))
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
