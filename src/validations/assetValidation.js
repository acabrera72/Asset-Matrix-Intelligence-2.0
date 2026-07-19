const { z } = require('zod');

const createAssetSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'El nombre es obligatorio' }).min(1, 'El nombre no puede estar vacío'),
        symbol: z.string({ required_error: 'El símbolo es obligatorio' })
            .min(1, 'El símbolo no puede estar vacío')
            .transform(val => val.toUpperCase()),
        type: z.enum(['crypto', 'stock', 'fiat', 'commodity', 'other'], {
            errorMap: () => ({ message: 'Tipo de activo no válido. Opciones: crypto, stock, fiat, commodity, other' })
        }),
        price: z.number({ required_error: 'El precio es obligatorio', invalid_type_error: 'El precio debe ser un número' })
            .positive('El precio debe ser mayor a 0')
    })
});

module.exports = {
    createAssetSchema
};
