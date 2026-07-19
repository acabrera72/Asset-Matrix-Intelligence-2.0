const express = require('express');
const cors = require('cors');

// Inicializamos la aplicación de Express
const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones de otros orígenes (Frontend)
app.use(express.json()); // Permite recibir JSON en los body de las peticiones
app.use(express.urlencoded({ extended: true }));

const { swaggerUi, swaggerDocs } = require('./config/swagger');

// Documentación de la API (Swagger)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta de prueba (Health Check)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'AssetMatrix API está funcionando correctamente.',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rutas de la API (Módulos)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/assets', require('./routes/assetRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Middleware para manejo de rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;
