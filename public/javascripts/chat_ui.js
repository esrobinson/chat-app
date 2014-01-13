var socket = io.connect();

var chat = new Chat(socket);

var getMessage = function(){
  return $('#new-msg').val();
};

var sendMessage = function(event){
  event.preventDefault();
  chat.sendMessage(getMessage());
  $('#new-msg').val('');
};

var addMessage = function(message){
  $message = $('<p>').text(message)
  $('#msg-box').prepend($message);
};

$(function(){
  socket.on('message', addMessage);
  $('#msg-form').on('submit', sendMessage);
});