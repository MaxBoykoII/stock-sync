var ctrlStocks = {},
    request = require('request'),
    baseUrl1 = 'http://query.yahooapis.com/v1/public/yql?q=',
    baseUrl2 = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?",
    endingUrl2 = "&region=1&lang=en";

ctrlStocks.getStocks = function(req, res) {

    var query = req.query.symbols,
        yql_str = encodeURI(baseUrl1 + query),
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

ctrlStocks.search = function(req, res) {
    var search = req.params.search,
        query = "query=" + search,
        uri = baseUrl2 + query + endingUrl2;
    request({
        "uri": uri,
        "method": "GET"
    }, function(err, response, body) {
        if (err) {
            console.log(err);
        }
        body = JSON.parse(body);
        res.json({
            results: body.ResultSet.Result
        });
    });


};
module.exports = ctrlStocks;