/**
 * Handles necessary core operations of intranet
 * @module core
 */
"use strict";
var fs = require('fs');

var modInfo = {};
exports.cacheModules = function () {
	console.log("Cacheing modules...");
	fs.readdirSync(__dirname + '/../').forEach(function (f) {
		if (f.charAt(0) !== '.') {
			console.log('--- ' + f);
			require(__dirname + '/../' + f);
			modInfo[f] = require(__dirname + '/../' + f + '/package.json');
		}

	});
};

exports.initializeRest = function (srv) {
	console.log('Initializing REST...');
	for (var m in modInfo)
		if (modInfo[m].hasOwnProperty('rest')) {
			var currmod = require(__dirname + '/../' + m);
			console.log('---' + m);
			for (var f in modInfo[m].rest) {
				console.log('.....' + f);
				srv.post('/rest/' + m + '/' + f, function (req, res) {
					var args = [];
					modInfo[m].rest[f].forEach(function (arg) {
						args.push(req.body[arg]);
					});
					if (req.header("Referrer")) {
						console.log(req.header("Referrer"));
						res.redirect("back");
					}
					else res.json(currmod[f].apply(this, args));
				});
			}
		}
	srv.post(/^\/rest\/.*$/, function (req, res, next) {
		if (req.url === '/rest/user/auth') next();
		res.json({
			'error': 'Not signed in'
		});
	});

};

exports.routeAll = function (srv) {
	coreRoutes(srv);
	for (var m in modInfo) {
		var routes = require('../' + m).routes || {};
		for (var method in routes)
			routes[method].forEach(function (r) {
				routeOne(srv, method, r);
			});
	}
};

function coreRoutes(srv) {
	var user = require('../user');
	routeOne(srv, 'get', [/^(?!\/(rest|public)\/).*$/, function (req, res, next) {
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
	}]);
}

function routeOne(srv, method, arr) {
	if (arr.length < 2) throw new Error("Improper Route Request!");
	// srv namespace MUST be set
	srv[method].apply(srv, arr);
}