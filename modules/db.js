/**
 * Manage database schemas and connections
 * @module db
 */
var mongoose = require('mongoose');

/**
 * Acquire new connection to mongodb database
 * @returns {Connection} Mongoose Database connection
 */
this.connect = function () {
	var db = mongoose.createConnection('mongodb://web:keyboardcat@ds029837.mongolab.com:29837/intranet');
	return db;
};