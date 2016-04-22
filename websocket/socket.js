var symbols = ["YHOO", "AAPL"];

function stockSocket(http) {
   // var server = require('http').Server(app);
    var io = require('socket.io').listen(http);

    io.on('connection', function(client) {
        console.log('client connected...');
        client.emit('join', {symbols: symbols});
    });


}

module.exports = stockSocket;