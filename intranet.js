var util = require('util');
var express = require('express');

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

var mods = require('./modules.json');
util.log("Initializing modules...");

for (var i in mods) {
	util.log('---' + i);
	require(mods[i].path);
}
require('./modules/router').init(srv);


srv.listen(3001);
console.log("listening on port 3001");