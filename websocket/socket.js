var symbols = ["YHOO", "AAPL"],
    _ = require('lodash');

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
            client.broadcast.emit('stock', {
                symbol: data.symbol
            });
        });
        client.on('remove', function(data) {
            _.remove(symbols, function(sym) {
                return sym === data.symbol;
            });
            client.broadcast.emit('remove', data);
        });
    });


}

module.exports = stockSocket;