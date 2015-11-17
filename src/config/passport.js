var SamlStrategy = require('passport-saml').Strategy

module.exports = function (passport, config) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
config.SamlStrategy=new SamlStrategy(
  {
    path: config.passport.saml.path,
    entryPoint: config.passport.saml.entryPoint,
    issuer: config.passport.saml.issuer,
    callbackUrl: config.passport.callbackUrl,
		cert: config.passport.saml.cert,
		validateInResponseTo: config.passport.saml.validateInResponseTo

  },
  function(profile, done) {
  return done(null,
    {
      id : profile.uid,
      email : profile.email,
      displayName : profile.cn,
      firstName : profile.givenName,
      lastName : profile.sn,
			nameID : profile.nameID
    });
  });
	passport.use(config.SamlStrategy);

}
