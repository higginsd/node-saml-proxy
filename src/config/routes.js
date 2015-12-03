module.exports = function(config,proxy, passport,express,log) {

var router=express.Router();

	router.get("/login",

		passport.authenticate(config.passport.strategy,
		{
			successRedirect : "/",
			failureRedirect : "/login/fail",
		})
	);

	router.post('/login/callback',
		passport.authenticate(config.passport.strategy,
			{
				failureRedirect: '/login/fail',
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


	router.get('/login/fail',
	  function(req, res) {
	    res.status(401).send('Login failed');
	  }
	);

router.get("/metadata",function(req,res){
	 //res.type('application/xml');
 res.render("metadata",{metadata:config.SamlStrategy.generateServiceProviderMetadata()});

});


	router.get('/logout', function(req, res) {
    console.log("logging out");
		req.logout();
		res.redirect('/');
	});
	
	config.proxy.bypassAuth.forEach(function(uri){
	log.info("adding "+uri);
		router.get(uri,function(req,res){
	    proxy.web(req,res,{target:config.proxy.target+uri,ignorePath:true});
	  });
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
