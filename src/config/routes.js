module.exports = function(config, passport,express) {

var router=express.Router();

	router.get("/login",

		passport.authenticate(config.passport.strategy,
		{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);

	router.post('/login/callback',
		passport.authenticate(config.passport.strategy,
			{
				failureRedirect: '/',
				failureFlash: true
			}),
		function(req, res) {
      if(req.body.RelayState){
				  console.log(req.body.RelayState);
        res.redirect(req.body.RelayState);
      }else{

			res.redirect('/');
		}
  }
	);

router.get("/metadata",function(req,res){
 res.render("metadata",{metadata:config.SamlStrategy.generateServiceProviderMetadata()});

});


	router.get('/logout', function(req, res) {
    console.log("logging out");
		req.logout();
		// TODO: invalidate session on IP
		res.redirect('/');
	});

  router.all('/*', function(req, res, next) {
  if(req.isAuthenticated()){

  return next();
  }
  else
  {

   res.redirect("/login?RelayState="+req.originalUrl);

  }
}
);
 return router;
}
