var express = require('express'),
  http = require('http'),
  path = require('path'),
  passport = require("passport"),
  httpProxy = require('http-proxy');
  var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

require('./config/passport')(passport, config);

var proxy =  httpProxy.createProxyServer({});
var app = express();

app.configure(function() {
app.set('views', __dirname+'/app/views');
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({secret: 'qwertyuiopasdfghjlk'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(function(req, res) {
proxy.web(req,res,{target:"http://localhost:8080"});
});
app.use(express.static(__dirname + 'public'));
});


require('./config/routes')(app, config, passport);
console.log(config);
console.log(env);

http.createServer(app).listen(config.app.port, function () {
    console.log("Proxy listening on port " + app.get('port'));
});
