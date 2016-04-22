var express = require('express'),
router = express.Router(),
ctrlStocks = require('../controllers/stocks.js');

router.get('/stocks', ctrlStocks.getStocks);
router.get('/stocks/:search', ctrlStocks.search);

module.exports = router;