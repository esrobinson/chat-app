var fs = require("fs");
var router = function(req, res){
  fileName = req.url;
  if(fileName === '/') {
    fileName = '/public/index.html';
  }
  getFile(fileName, function(data){
    res.end(data);
  });
}

var getFile = function(name, callback){
  fs.readFile('.' + name, function(err, data){
    callback(data);
  })
}

exports.router = router;