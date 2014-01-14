var socket = io.connect();

var chat = new Chat(socket);

var getMessage = function(){
  return $('#new-msg').val();
};

var handleInput = function(event){
  event.preventDefault();
  input = getMessage();
  if(input.slice(0,1) === '/'){
    chat.processCommand(input, function(error) {
      alert(error);
    });
  } else {
    sendMessage(input);
  }
  $('#new-msg').val('');
};

var sendMessage = function(event){
  chat.sendMessage(getMessage());
};

var addMessage = function(message){
  $message = $('<p>').text(message)
  $('#msg-box').append($message);
  $('#msg-box').scrollTop($('#msg-box')[0].scrollHeight);
};

var changeNickname = function(nickname){
  chat.changeNickname(nickname);
  $('#new-msg').val('');
};

var renderList = function(list){
  $list = $('#user-list');
  $list.html('');
  list.forEach(function(name){
      $list.append($('<div>').text(name));
  });
};

$(function(){
  socket.on('message', addMessage);
  socket.on('nicknameList', renderList);
  socket.on('newRoom', function(room) {
    $('#current-room').text("Current Room: " + room);
  });
  $('#msg-form').on('submit', handleInput);
});