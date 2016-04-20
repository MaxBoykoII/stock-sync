var ctrlStocks = {},
    request = require('request'),
    baseUrl = 'http://query.yahooapis.com/v1/public/yql?q=';

ctrlStocks.getStocks = function(req, res) {

    var query = req.query.symbols,
        yql_str = encodeURI(baseUrl + query),
        yql_query = yql_str + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    request({
        "uri": yql_query,
        "method": "GET"
    }, function(err, response, body) {
        if (err) {
            console.log(err);
        }
        body = JSON.parse(body);

        res.json({
            body: body
        });
    });

};

module.exports = ctrlStocks;