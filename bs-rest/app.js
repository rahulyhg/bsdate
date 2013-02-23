var http = require('http');
var router = require('./router');

http.createServer(router.route).listen(8097);
console.log("HTTP Server started");



