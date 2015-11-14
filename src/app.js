var express = require('express'),
  http = require('http'),
  path = require('path'),
  passport = require("passport"),
  httpProxy = require('http-proxy'),
  bodyParser=require('body-parser'),
  cookieParser=require('cookie-parser'),
  session=require('express-session'),
  logger=require('morgan'),
  methodOverride=require('method-override');
  var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

require('./config/passport')(passport, config);

var proxy =  httpProxy.createProxyServer({});
var app = express();

//app.configure(function() {
app.set('views', __dirname+'/app/views');
app.set('view engine', 'jade');
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({secret: 'qwertyuiopasdfghjlk'}));
app.use(passport.initialize());
app.use(passport.session());
var routes = require('./config/routes')(config,passport,express);
app.use("",routes);
app.use(function(req, res) {
proxy.web(req,res,{target:"http://localhost:8080"});
});
app.use(express.static(__dirname + 'public'));
//});


//require('./config/routes')(config, passport);
console.log(config);
console.log(env);

http.createServer(app).listen(config.app.port, function () {
    console.log("Proxy listening on port " + app.get('port'));
});
