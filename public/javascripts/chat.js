var Chat = function(socket){
  this.socket = socket;
};

Chat.prototype.sendMessage = function(message){
  this.socket.emit('message', message);
};

Chat.prototype.changeNickname = function(nickname){
  this.socket.emit('nicknameChangeRequest', nickname);
};

Chat.prototype.processCommand = function(command, callback){
  if(command.slice(0,6) === '/nick '){
    this.changeNickname(input.slice(6));
  } else if (command.slice(0,6) === '/join '){
    this.joinRoom(input.slice(6));
  } else {
    callback("Unrecognized Command");
  }
};

Chat.prototype.joinRoom = function(room) {
  this.socket.emit('changeRoom', room);
};