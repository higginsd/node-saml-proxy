var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get("/deep",function(req,res){
  var output="";
  Object.keys(req.headers).forEach(function(key) {
  var val = req.headers[key];
  output+="<strong>"+key+":</strong>&nbsp;"+val+"<br/>";
});
    res.send(output);
});

app.use(function(req, res, next){
  res.status(404);
    res.send("PAGE NOT FOUND");

});



var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
