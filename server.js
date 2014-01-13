var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    router = require('./router.js');

http.createServer(router.router).listen(8080);

console.log("Server running on post 8080");