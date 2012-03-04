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
	if (user.auth(req.body.uname, req.body.passwd)) {
		if (req.session.hasOwnProperty('loginFail')) delete req.session.loginFail;
		req.session.uid = 1; //Become Larry Page
	}
	else req.session.loginFail = true;
	res.redirect('back');
};

exports.home = function (req, res) {
	user.getUser(req.session.uid, function (err, user) {
		pl.render({
			title: "Home",
			mainPane: {
				view: 'core/home',
				title: 'Welcome ' + user.fname
			}
		}, req, res);
	});
};