module.exports = function(app, config, passport) {


	app.get("/login",

		passport.authenticate(config.passport.strategy,
		{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);

	app.post('/login/callback',
		passport.authenticate(config.passport.strategy,
			{
				failureRedirect: '/',
				failureFlash: true
			}),
		function(req, res) {
      console.log(req.body.RelayState);
      if(req.body.RelayState){
        res.redirect(req.body.RelayState);
      }else{
			res.redirect('/');
		}
  }
	);

/*	app.get("/signup", function (req, res) {
    //res.send("hello");
    //res.send(config.passport.strategy.getCallbackUrl());

		//res.render("signup");
	});*/

	app.get("/profile", function(req, res) {
    	if(req.isAuthenticated()){
			res.render("profile",
				{
					user : req.user
				});
   		} else {
    	    res.redirect("/login");
	    }
	});
app.get("/metadata",function(req,res){
 res.render("metadata",{metadata:config.SamlStrategy.generateServiceProviderMetadata()});

});


	app.get('/logout', function(req, res) {
    console.log("logging out");
		req.logout();
		// TODO: invalidate session on IP
		res.redirect('/');
	});

  app.all('/*', function(req, res, next) {
  if(req.isAuthenticated()){

  return next();
  }
  else
  {

   res.redirect("/login?RelayState="+req.originalUrl);

  }
}
);

}
