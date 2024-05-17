const {Router} = require('express');
const router = Router();
const { getMarkets, getSpread, getAllSpreads } = require('../middlewares/budaAPI');
const { saveAlertSpread, getAlertSpread } = require('../middlewares/alerts');


router.get('/markets', async (req, res) => {
    const markets = await getMarkets();
    res.send(markets);
});
// Cálculo spread de cualquiera de los mercados. 
router.get('/spreads', async (req, res) => {
    const spread = await getAllSpreads();
    res.send(spread);
});

// Spread segun market id
router.get('/spread/:market_id', async (req, res) => {
    const {markets} = await getMarkets();
    if (!markets.some(market => market.id === req.params.market_id)) {
        return res.status(404).send('Market not found');
    }
    const spread = await getSpread(req.params.market_id);
    if (!spread) {
        return res.status(400).send('Invalid Spread');
    }
    res.send(spread);
});

// endpoint para guardar alterta de spread
router.post('/spread/alert/:market_id', async (req, res) => {
    const { spread } = req.body;
    const { market_id: marketId } = req.params;
    saveAlertSpread(marketId, spread);
    res.status(201).send({mensaje: 'Alerta Guardada', spread: spread, marketid: marketId});
});

router.get('/spread/alert/:market_id', async (req, res) => {
    const { market_id } = req.params;
    const alertSpread = getAlertSpread(market_id);
  
    if (!alertSpread) {
      return res.status(404).send('Alert spread not found');
    }
  
    const currentSpread = await getSpread(market_id);
  
    if (!currentSpread) {
      return res.status(500).send('Error fetching current spread');
    }
  
    const isGreaterThanAlert = currentSpread.spread > alertSpread.spread;
    const isLessThanAlert = currentSpread.spread < alertSpread.spread;
  
    res.json({
      currentSpread: currentSpread.spread,
      alertSpread: alertSpread.spread,
      isGreaterThanAlert,
      isLessThanAlert
    });
  });
  

module.exports = router;