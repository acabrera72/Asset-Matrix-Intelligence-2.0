require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assetmatrix_dev';

// Creamos el servidor HTTP usando la aplicación de Express
const server = http.createServer(app);

// Función para inicializar la base de datos y luego el servidor
const startServer = async () => {
    try {
        // 1. Conexión a MongoDB (Ignoramos el warning de strictQuery si aparece en Mongoose 7/8)
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conexión a la Base de Datos (MongoDB) establecida correctamente.');

        // 2. Arrancar el servidor
        server.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en: http://localhost:${PORT}`);
            console.log(`🩺 Health check disponible en: http://localhost:${PORT}/api/health`);
        });

    } catch (error) {
        console.error('❌ Error fatal al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();
