const {Router} = require('express');
const router = Router();
const { getMarkets, getSpread, getAllSpreads } = require('../middlewares/budaAPI');


router.get('/markets', async (req, res) => {
    const markets = await getMarkets();
    res.send(markets);
});
// Cálculo spread de cualquiera de los mercados. 
router.get('/spread', async (req, res) => {
    const spread = await getAllSpreads();
    res.send(spread);
});

// Spread segun market id
router.get('/spread/:market_id', async (req, res) => {
    const spread = await getSpread(req.params.market_id);
    res.send(spread);
});

module.exports = router;