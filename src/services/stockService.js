const axios = require('axios');

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

const getStockPrice = async (symbol) => {
    try {
        const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: symbol,
                apikey: API_KEY
            }
        });
        
        if (response.data['Global Quote']) {
            const data = response.data['Global Quote'];
            return {
                symbol: data['01. symbol'],
                price: parseFloat(data['05. price']),
                volume: parseInt(data['06. volume'], 10),
                latestTradingDay: data['07. latest trading day'],
                changePercent: data['10. change percent']
            };
        }
        throw new Error('Símbolo no encontrado o límite de API alcanzado');
    } catch (error) {
        throw new Error(`Error al obtener datos de Alpha Vantage: ${error.message}`);
    }
};

const getStockHistory = async (symbol) => {
    try {
        const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: symbol,
                apikey: API_KEY
            }
        });

        if (response.data['Time Series (Daily)']) {
            return response.data['Time Series (Daily)'];
        }
        throw new Error('Historial no encontrado o límite de API alcanzado');
    } catch (error) {
        throw new Error(`Error al obtener historial de Alpha Vantage: ${error.message}`);
    }
};

module.exports = {
    getStockPrice,
    getStockHistory
};
