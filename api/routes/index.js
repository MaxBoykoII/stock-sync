var express = require('express'),
router = express.Router(),
ctrlStocks = require('../controllers/stocks.js');

router.get('/stocks', ctrlStocks.getStocks);

module.exports = router;