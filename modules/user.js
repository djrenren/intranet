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
 */
exports.auth = function (uname, passwd) {
	if (uname && passwd) return true;
	return false;
};

/**
 * Verify login state
 * @param {RESTObject} data - Processed req object containing the user's session
 */
exports.isLogged = function (data) {
	return data.session.hasOwnProperty('uid');
};

/**
 * Acquire full user info from user id
 * @param {Number}    uid       - User id
 * @param {Function}  callback  - Function to be called on completion
 */
exports.getUser = function (uid, callback) {
	db.connect().model("User").findOne({
		uid: uid
	}, callback);
};

exports.init = function () {
	var con = db.connect();
	con.model("User", exports.schemaUser);
	con.close();
	return true;
}.call(module);