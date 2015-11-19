module.exports = function(httpProxy,log){
var proxy= httpProxy.createProxyServer({});


proxy.on('proxyReq', function(proxyReq, req, res, options) {

if(req.user.nameID){
  Object.keys(req.user).forEach(function(key) {
  var val = req.user[key];
  proxyReq.setHeader(key, val );
});

}

});
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  log.error("something went wrong")
  res.end('Something went wrong.');
});



return proxy;


}
