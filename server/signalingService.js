var static = require('node-static');
var http = require('http');
var file = new(static.Server)();
var app = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(2013);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket){

  // convenience function to log server messages to the client
  function log(){
    var array = ['>>> Message from server: '];
    for (var i = 0; i < arguments.length; i++) {
      array.push(arguments[i]);
    }
      socket.emit('log', array);
  }

  socket.on('message', function (message, room) {
    //log('Got message:', message);
    // for a real app, would be room only (not broadcast)
    //socket.broadcast.emit('message', message);
		io.in(room).emit('message', message);
  });

	socket.on('user-created', function(message, room) {
		io.in(room).emit('message', message);
	});

  socket.on('create or join', function (room) {
    //var numClients = io.sockets.clients(room).length;
		//var numClients = io.of('/').in(room).length;

//    log('Room ' + room + ' has ' + numClients + ' client(s)');
    log('Request to create or join room ' + room);

    //if (numClients === 0 || numClients === undefined){
      socket.join(room);
			log('Giving access to room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.emit('joined', room);
    socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
    socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

  });

});

