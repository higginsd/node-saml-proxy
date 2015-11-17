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
//RedisStore = require('connect-redis')(session);
  var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

require('./config/passport')(passport, config);

var proxy =  require('./config/proxy')(httpProxy);

var app = express();

app.set('views', __dirname+'/app/views');
app.set('view engine', 'jade');
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(methodOverride());
app.use(require('express-session')(config.session));
app.use(passport.initialize());
app.use(passport.session());
var routes = require('./config/routes')(config,passport,express);
app.use("",routes);
app.use(function(req, res) {
proxy.web(req,res,{target:config.proxy.target});
});
app.use(express.static(__dirname + 'public'));



http.createServer(app).listen(config.app.port, function () {
    console.log("Proxy listening on port " + config.app.port);
});
