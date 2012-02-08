/**
 * Create Routing rules
 * @module router
 */
var srv;
var pl      = require('./pageloader');
var user    = require('./user');


function RESTObj (req) {
  this.session = req.session;
	for (var i in req.body)
	  this[i] = req.body[i];
};


this.init = function (server) {
	srv = server;

	//Check if logged in
	srv.get(/^\/(?!static\/).*$/, function (req, res, next) {
	console.log(req.session);
		if (!user.isLogged(req)) {
      res.render('user/login.ejs', {
			  pageTitle : "Login",
			  uname     : "Everyone",
        loginFail : req.session.loginFail || false
	    });
      req.session.loginFail = false;
		}
		else next();
	});

	//Login function
	srv.post('/user/login', function (req, res) {
		if (user.auth(req.body.uname,req.body.passwd)) {
      if(req.session.hasOwnProperty('loginFail'))
        delete req.session.loginFail;
			req.session.uid = 1; //Become Larry Page
		}
		else
      req.session.loginFail = true;
    res.redirect('back');
	});

	//Sign in test
	srv.get('/', function (req, res) {
		user.getUser(req.session.uid, function (err, user) {
			pl.render('user/logintest', {
				pageTitle : "Login Test",
				user     : user
			}, req, res);
		});
	});
};
