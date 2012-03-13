"use strict";
var util = require('util');
var express = require('express');
var core = require('./modules/core');

var srv = express.createServer();
srv.configure(function () {
	srv.set('views', __dirname + '/views');
	srv.set('view options', {
		layout: false
	});
	srv.set('view engine', 'ejs');
	srv.use(express.bodyParser());
	srv.use(express.methodOverride());
	srv.use(express.cookieParser());
	srv.use(express.session({
		secret: "keyboard cat"
	}));
	srv.use(srv.router);
	srv.use("/public", express.static(__dirname + '/public'));
	srv.use(express.favicon(__dirname + '/public/favicon.ico'));
});
srv.configure('development', function () {
	srv.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});
srv.configure('production', function () {
	srv.use(express.errorHandler());
});


core.cacheModules();
core.routeAll(srv);
core.initializeRest(srv);
srv.listen(3001);
console.log("listening on port 3001");

