const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas base
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a AssetMatrix API' });
});

module.exports = app;
