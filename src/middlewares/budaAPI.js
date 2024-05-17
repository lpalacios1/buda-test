const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
BUDA_URL = process.env.BUDA_URL || 'https://www.buda.com/api/v2/';

const getMarkets = async () => {
    try {
        const response = await axios.get(`${BUDA_URL}markets`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getMarketsIds = async () => {
    try {
      const { markets } = await getMarkets();
      const marketsIds = Array.isArray(markets) ? markets.map((market) => market.id) : [];
      return marketsIds;
    } catch (error) {
      console.error("Error in getMarketsIds:", error);
    }
  };

const getSpread = async (marketId) => {
    try {
        const response = await axios.get(`${BUDA_URL}markets/${marketId}/ticker`);
        if (!response.data.ticker) {
            return null;
        }
        const maxBid = parseFloat(response.data.ticker.max_bid[0]);
        const minAsk = parseFloat(response.data.ticker.min_ask[0]);
        return { market: marketId, spread: minAsk - maxBid, currency: response.data.ticker.min_ask[1]};
    } catch (error) {
        console.error("Error in getSpread:", error);
    }
}
  
const getAllSpreads = async () => {
try {
    const markets = await getMarketsIds();
    const spreadPromises = markets.map(async (market) => {
    const response = await axios.get(`${BUDA_URL}markets/${market}/ticker`);

    const maxBid = parseFloat(response.data.ticker.max_bid[0]);
    const minAsk = parseFloat(response.data.ticker.min_ask[0]);
    
    return { market: market, spread: minAsk - maxBid, currency: response.data.ticker.min_ask[1]};
    });

    const spreadResults = await Promise.all(spreadPromises);
    return spreadResults;
} catch (error) {
    console.error("Error in getSpreads:", error);
}
};
  
  

module.exports = { getMarkets, getSpread, getAllSpreads };