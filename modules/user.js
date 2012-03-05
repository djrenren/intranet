/**
 * Control, access, and validate User info
 *@module user
 */
"use strict";
var db = require('./db');
var mongoose = require('mongoose');

/**
 * Mongoose Schema for User collection
 */
exports.schemaUser = new mongoose.Schema({
	uname: String,
	fname: String,
	lname: String,
	uid: Number
});

/**
 * Authorize user from name and password
 * @param {String} uname - Desired username
 * @param {String} passwd - Password corresponding to the uname parameter
 * @param {Function} cb - Callback function(user)
 */
exports.auth = function (uname, passwd, cb) {
	if (!(uname && passwd)) return cb(null);
	exports.getUser({uname: uname},function(err, user){
		if(user)
			return cb(user);
		return cb(null);
	});
};

/**
 * Verify login state
 * @param {RESTObject} data - Processed req object containing the user's session
 */
exports.isLogged = function (data) {
	return data.session.hasOwnProperty('user');
};

/**
 * Acquire full user info from user id
 * @param {Object}    params    - User parameters
 * @param {Function}  cb        - Callback function(err, docs)
 */
exports.getUser = function (params, cb) {
	db.mongo.model("User").findOne(params, cb);
};

(function init() {
	db.mongo.model("User", exports.schemaUser);
	return true;
}).call(module);