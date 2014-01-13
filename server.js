var fs = require('fs'),
    router = require('./router.js'),
    server = require('http').createServer(router.router),
    path = require('path'),
    mime = require('mime'),
    chat = require('./lib/chat_server.js');

server.listen(8080);

chat.createChat(server);







console.log("Server running on post 8080");