const axios = require('axios');

const COINGECKO_BASE_URL = 'https://api.coingecko.co/api/v3';

const getCryptoData = async (coinId) => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
            params: {
                ids: coinId,
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true'
            }
        });

        if (response.data[coinId]) {
            return {
                id: coinId,
                price: response.data[coinId].usd,
                marketCap: response.data[coinId].usd_market_cap,
                change24h: response.data[coinId].usd_24h_change
            };
        }
        throw new Error('Criptomoneda no encontrada en CoinGecko');
    } catch (error) {
        throw new Error(`Error al obtener datos de CoinGecko: ${error.message}`);
    }
};

module.exports = {
    getCryptoData
};
