var symbols = ["YHOO", "AAPL"];

function stockSocket(http) {
    // var server = require('http').Server(app);
    var io = require('socket.io').listen(http);

    io.on('connection', function(client) {
        console.log('client connected...');
        client.emit('join', {
            symbols: symbols
        });
        client.on('stock', function(data) {
            symbols.push(data.symbol);
            if (symbols.length > 10) {
                symbols.shift();
            }
            client.broadcast.emit('stock', {symbol: data.symbol});
        });
    });


}

module.exports = stockSocket;