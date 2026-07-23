const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { swaggerUi, swaggerDocs } = require('./config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'AssetMatrix API está funcionando correctamente.',
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/assets', require('./routes/assetRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/crypto', require('./routes/cryptoRoutes'));

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;
