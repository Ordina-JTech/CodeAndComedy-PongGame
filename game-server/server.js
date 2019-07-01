const io = require('socket.io').listen(process.env.port || 5000);

io.on('connection', function(socket) {
    socket.on('join', function(player) {
        io.emit('player', player, socket.id);
    });

    socket.on('entered', function(socketId, success, paddle) {
        io.to(socketId).emit('joined', success, paddle);
    });

    socket.on('left', function(up, down) {
        io.emit('left', up, down);
    });

    socket.on('right', function(up, down) {
        io.emit('right', up, down);
    });

    socket.on('disconnect', function() {
        io.emit('leave', socket.id);
    })

    socket.on('readyToStart', function(ready) {
        io.emit('readyToStart', ready);
    });

    socket.on('startGame', function(start) {
        io.emit('startGame', start);
    });

    socket.on('winner', function(winner) {
        io.emit('winner', winner);
    });
});