node-saml-proxy
---
This is an example of setting up authenticating reverse proxy using SAML.

#Configuration

To configure the proxy and IDP you need to edit the confg/config.js file

#Proxy
* target : set this to the resource you want to secure

#Session
this is a [express-session](https://github.com/expressjs/session) object 

* secret: key to encrypt the cookie and session
* resave: leave as false
* saveUninitialized: leave as false
* store: set to your session store object, usually a redis server

#refernces
* [passport-saml](https://github.com/bergie/passport-saml)
* [node-http-proxy](https://github.com/nodejitsu/node-http-proxy)

