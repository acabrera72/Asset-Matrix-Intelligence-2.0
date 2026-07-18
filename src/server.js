require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Conexión a MongoDB establecida exitosamente.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor AssetMatrix corriendo en el puerto ${PORT}`);
            console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error('❌ Error conectando a MongoDB:', error.message);
        process.exit(1);
    });
