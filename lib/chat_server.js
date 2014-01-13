var io = require('socket.io')


var createChat = function(server){
  var chatServer = io.listen(server);
  chatServer.sockets.on('connection', function(socket){
    socket.on('message', function(data){
      console.log("Message: " + data);
      chatServer.sockets.emit('message', data);
    });
  });
};

exports.createChat = createChat