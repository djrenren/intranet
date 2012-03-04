var pl = require('../pageloader');
var user = require('../user');

exports.loginPage = function (req, res, next) {
	console.log(req.url);
	if (!user.isLogged(req)) {
		res.render('user/login.ejs', {
			pageTitle: "Login",
			uname: "Everyone",
			loginFail: req.session.loginFail || false
		});
		req.session.loginFail = false;
	}
	else next();
};

exports.userLogin = function (req, res) {
	user.auth(req.body.uname, req.body.passwd, function(user){
		if(user){
			if (req.session.hasOwnProperty('loginFail')) delete req.session.loginFail;
			req.session.user = user;
		}
		else req.session.loginFail = true;
		res.redirect('back');
	});
};

exports.home = function (req, res) {
	pl.render({
		title: "Home",
		mainPane: {
			view: 'core/home',
			title: 'Welcome ' + req.session.user.fname
		}
	}, req, res);
};