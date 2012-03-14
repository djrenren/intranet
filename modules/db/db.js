/**
 * Manage database schemas and connections
 * @module db
 */
"use strict";
var mongoose = require('mongoose');

var mongo;

/**
 * Connection to mongodb
 */
module.exports = {
	get mongo() {
		return mongo;
	}
};

module.exports.connect = function (host, db, port, user, passwd) {
	mongo = mongoose.createConnection('mongodb://' + user + ':' + passwd + '@' + host + ':' + port + '/' + db);
};