var http = require('http'),
  request = require('request'),
  path = require('path'),
  async = require('async'),
  socketio = require('socket.io'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  baseUrl = 'http://query.yahooapis.com/v1/public/yql?q=';


//Register Middleware
app.use(bodyParser.json());

//serve static assets and bower components
app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//


app.get('/stocks', function(req, res) {
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


});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
