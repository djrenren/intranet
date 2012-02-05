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

require('./modules/router').init(srv);
var REST = require('./modules/rest');
for(var i in mods){
	util.log('---'+i);
  if(mods[i].hasOwnProperty('REST'))
	  REST.activateModule(require(mods[i].path), i.toLowerCase(), mods[i].REST);
}

srv.listen(3001);