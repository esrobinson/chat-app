var io = require('socket.io')
var guestNumber = 1;
var nicknames = {};
var namesUsed = {};
var roomUsers = {};


var createChat = function(server){

  var chatServer = io.listen(server);
  chatServer.sockets.on('connection', function(socket){
    var id = socket.id;
    var currentRoom;
    namesUsed[nicknames[id]] = true;

    nicknames[id] = "guest_" + guestNumber;
    var joinRoom = function(room) {
      var oldRoom = currentRoom;
      socket.join(room);
      socket.leave(oldRoom);
      if (!roomUsers[room]) {
        roomUsers[room] = [];
      }
      roomUsers[room].push(nicknames[id]);

      currentRoom = room;
      if (oldRoom) {
        roomUsers[oldRoom].splice(roomUsers[oldRoom].indexOf(nicknames[id]), 1);
        sendUserList(oldRoom);
        chatServer.sockets.in(oldRoom).emit('message',
            nicknames[id] + " has left the room.");
      }
      socket.emit('newRoom', room);
      sendUserList(room);
      chatServer.sockets.in(room).emit('message',
          nicknames[id] + " has joined the room.");
    };

    var updateName = function(name){
      socket.emit('nicknameChangeResult', {
        success: true
      });
      roomUsers[currentRoom].splice(roomUsers[currentRoom].indexOf(nicknames[id]), 1);
      roomUsers[currentRoom].push(name);
      namesUsed[nicknames[id]] = false;
      nicknames[id] = name;
      namesUsed[name] = true;
      sendUserList(currentRoom);
    };

    var sendUserList = function(room) {
      chatServer.sockets.in(room).emit("nicknameList", roomUsers[room]);
    };

    joinRoom('lobby');
    guestNumber++;

    socket.on('message', function(data){
      console.log("Message: " + data);
      chatServer.sockets.in(currentRoom).emit('message',
                 nicknames[id] + ": " + data);
    });

    socket.on('nicknameChangeRequest', function(data){
      if (allowedNickname(data)) {
        updateName(data);
      } else {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Invalid Name'
        });
      }
    });

    socket.on('changeRoom', function(room) {
      joinRoom(room);
    });

    socket.on('disconnect', function(){
      chatServer.sockets.in(currentRoom).emit('message',
          nicknames[id] + " has left the room.");
      namesUsed[nicknames[id]] = false;
      roomUsers[currentRoom].splice(roomUsers[currentRoom].indexOf(nicknames[id]), 1);
      nicknames[id] = null;
      sendUserList(currentRoom);
    });
  });
};

var allowedNickname = function(name) {
  if ((namesUsed[name]) || name.slice(0,5) == 'guest'){
    return false;
  }
  return true;
};

exports.createChat = createChat