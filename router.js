var fs = require("fs");
var cache = {};
var router = function(req, res){
  fileName = req.url;
  if(fileName === '/') {
    fileName = '/public/index.html';
  }
  getFile(fileName, function(data){
    if (!data ) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("404 Not Found");
    } else {
      res.end(data);
    }
  });
};

var getFile = function(name, callback){
  if (cache[name]) {
    callback(cache[name]);
    console.log("reloading data: " + name);
  } else {
    fs.readFile('.' + name, {encoding: 'utf8'},function(err, data){
      console.log("getting data: " + name)
      cache[name] = data;
      callback(data);
    });
  }
};

exports.router = router;