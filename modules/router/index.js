/**
 * Create Routing rules
 * @module router
 */
/*jshint loopfunc:true */
"use strict";

var srv;
var rf = require('./routeFunctions');

function initializeRest() {
	var mods = require('../../modules.json');
	for (var m in mods)
		if (mods[m].hasOwnProperty('rest')) {
			var currmod = require('../' + m);
			for (var f in mods[m].rest) {
				console.log(m + '-' + f);
				srv.post('/rest/' + m + '/' + f, function (req, res) {
					var args = [];
					mods[m].rest[f].forEach(function (arg) {
						args.push(req.body[arg]);
					});
					res.json(currmod[f].apply(this, args));
				});
			}
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
	srv.get(/^(?!\/(rest|public)\/).*$/, rf.loginPage);

	//Login function
	srv.post('/user/login', rf.userLogin);

	//Sign in test
	srv.get('/', rf.home);
};