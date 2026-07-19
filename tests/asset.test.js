const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');

require('dotenv').config();

let userToken;
let userId;

beforeAll(async () => {
    let testUri = process.env.MONGODB_URI;
    if (testUri) {
        testUri = testUri.replace('assetmatrix?', 'assetmatrix_test?');
    } else {
        testUri = 'mongodb://localhost:27017/assetmatrix_test';
    }
    
    mongoose.set('strictQuery', false);
    await mongoose.connect(testUri);

    // Crear un usuario de prueba para poder obtener un token (ya que Assets está protegido)
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Inversor Test',
            email: 'inversor@ejemplo.com',
            password: 'password123'
        });
    
    userToken = res.body.token;
    userId = res.body.user.id;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Módulo de Activos (Assets)', () => {

    const newAsset = {
        name: 'Bitcoin',
        symbol: 'BTC',
        type: 'crypto',
        price: 60000
    };

    it('Debería rechazar la creación de un activo si no se envía Token', async () => {
        const res = await request(app)
            .post('/api/assets')
            .send(newAsset);

        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/No estás autorizado/);
    });

    it('Debería crear un activo exitosamente cuando se envía Token válido', async () => {
        const res = await request(app)
            .post('/api/assets')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newAsset);

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Bitcoin');
        expect(res.body.data.owner).toBe(userId);
    });

    it('Debería rechazar un activo con tipo incorrecto (Validación Zod)', async () => {
        const res = await request(app)
            .post('/api/assets')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                ...newAsset,
                type: 'moneda_falsa' // Este tipo no está en el enum
            });

        expect(res.statusCode).toEqual(400); // Bad Request por Zod
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].path).toBe('body.type');
    });

    it('Debería listar los activos del usuario', async () => {
        const res = await request(app)
            .get('/api/assets')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.count).toBeGreaterThan(0);
        expect(res.body.data[0].symbol).toBe('BTC');
    });
});
