"use strict";
var express = require('express');
var core = require(__dirname + '/modules/core');
var db = require(__dirname + '/modules/db');
var conf = require(__dirname + '/config/server.json');

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

db.connect(conf.mongo.host, conf.mongo.database, conf.mongo.port, conf.mongo.user, conf.mongo.password);
core.cacheModules();
core.routeAll(srv);
core.initializeRest(srv);
srv.listen(conf.port);
console.log("listening on port " + conf.port);