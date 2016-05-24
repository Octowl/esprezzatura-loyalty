var http = require('http');
var server = http.createServer();
var db = require('./models');

server.on('request', require('./app'));

db.sync()
.then(function () {
  server.listen(5002, function () {
    console.log('Server is listening on port 3001!');
  });
})
.catch(console.error);
