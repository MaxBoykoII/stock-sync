var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  routesApi = require('./api/routes/index.js'),
  http = require('http').createServer(app),
  stockSocket = require('./websocket/socket.js');

//establish websocket
stockSocket(http);

//Register Middleware
app.use(bodyParser.json());
app.use('/api', routesApi);


//serve static assets and bower components
app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));



http.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
