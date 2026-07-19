const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');

// Configurar dotenv para leer variables de entorno si hace falta
require('dotenv').config();

beforeAll(async () => {
    // Se utilizóla BD de Atlas pero apuntando a 'assetmatrix_test'
    // Reemplazamos 'assetmatrix' por 'assetmatrix_test' en la URI
    let testUri = process.env.MONGODB_URI;
    if (testUri) {
        testUri = testUri.replace('assetmatrix?', 'assetmatrix_test?');
    } else {
        testUri = 'mongodb://localhost:27017/assetmatrix_test';
    }

    mongoose.set('strictQuery', false);
    await mongoose.connect(testUri);
});

afterAll(async () => {
    //  Se limpia la base de datos de prueba y cerrar conexión
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Autenticación y Seguridad (Auth)', () => {

    const testUser = {
        name: 'Usuario Test',
        email: 'test@ejemplo.com',
        password: 'password123'
    };

    it('Debería registrar un nuevo usuario exitosamente', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe(testUser.email);
    });

    it('No debería registrar si falta el email (Validación Zod)', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Incompleto',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].path).toBe('body.email');
    });

    it('Debería hacer login exitosamente con las credenciales creadas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
    });

    it('No debería hacer login con contraseña incorrecta', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });
});
