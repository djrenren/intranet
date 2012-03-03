/**
 * Create Routing rules
 * @module router
 */
/*jshint loopfunc:true */
"use strict";

var srv;
var pl = require('./pageloader');
var user = require('./user');

function initializeRest() {
	var mods = require('../modules.json');
	for (var m in mods)
		if (mods[m].hasOwnProperty('rest')) {
			var currmod = require('./' + m);
			mods[m].rest.forEach(function (f) {
				console.log('/rest/' + m + '/' + f);
				srv.post('/rest/' + m + '/' + f, function (req, res) {
					res.json(currmod[f](req));
				});
			});
		}
	srv.post(/^\/rest\/.*$/, function (req, res, next) {
		if (req.url === '/rest/user/auth') next();
		res.json({
			'error': 'Not signed in'
		});
	});
}

exports.init = function (server) {
	srv = server;
	initializeRest();
	//Check if logged. Excuse static and rest request
	srv.get(/^(?!\/(rest|public)\/).*$/, function (req, res, next) {
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
	});

	//Login function
	srv.post('/user/login', function (req, res) {
		if (user.auth(req)) {
			if (req.session.hasOwnProperty('loginFail')) delete req.session.loginFail;
			req.session.uid = 1; //Become Larry Page
		}
		else req.session.loginFail = true;
		res.redirect('back');
	});

	//Sign in test
	srv.get('/', function (req, res) {
		user.getUser(req.session.uid, function (err, user) {
			pl.render({
				pageTitle: "Login Test",
				mainPane: {
					view: 'core/home',
					title: 'Welcome Home'
				}
			}, req, res);
		});
	});
};