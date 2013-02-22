var http = require('http');
var dateutil = require('./bsdate');

var requestAction = function(request, response) {
  var content = '{"error":true, "message":"invalid format"}';
  var err = content;
  var url = request.url;

  var requestForm = /\/(bikram|ad)\/(\d{4})\/(\d{1,2})\/(\d{1,2})/;
  
  var matched = requestForm.exec(url);
  if (matched) {

  var origin = matched[1];
  var year = parseInt(matched[2]);
  var month = parseInt(matched[3]);
  var date = parseInt(matched[4]);

  try {
  if (origin==='bikram') {
    content = dateutil.convertToAd(year, month, date);
  } else {
    content = dateutil.convertToBikram(year, month, date);
  }
    var display = content.displayValue();
    content = JSON.stringify({date: content, display: display});
  } catch (e) {
    content = err;
  }
  }
  var data = {status: 200, content: content, contentType:'application/json'};
  

  response.writeHead(data.status, {"Content-Type": data.contentType,
    "Server-Time": new Date()
  });
  response.write(data.content);
  response.end();
};

http.createServer(requestAction).listen(8097);
console.log("HTTP Server started");



