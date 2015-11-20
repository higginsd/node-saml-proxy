var RedisStore = require('connect-redis')(require('express-session'));
var fs = require('fs');
module.exports = {

	development : {
		app : {
			name : 'SAML reverse proxy',
			port : process.env.PORT || 3000
		},
		proxy:{
			target : process.env.TARGET || "http://localhost:8080"
		},
		session:{
			secret: process.env.SESSION_SECRET || 'dafasdfasfiajnfkjnk',
			resave:false,
			saveUninitialized:false,
			store: new RedisStore({
  			host: process.env.REDIS_HOST || '127.0.0.1',
  			port: process.env.REDIS_PORT || 6379,
				ttl:  process.env.REDIS_TTL || 300
			})
		},
		passport: {
			strategy : 'saml',
			saml : {
				path : '/login/callback',
				entryPoint : process.env.IDP_ENDPOINT || 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
				issuer : process.env.ISSUER || 'node-saml-proxy',
        callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/login/callback',
				validateInResponseTo: true,
				cert : process.env.IDP_CERT || fs.readFileSync(__dirname + '/config/certs/idp_cert.pem', 'utf8')
			}
		}
	}
}
