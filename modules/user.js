/**
 * Control, access, and validate User info
 *@module user
 */
var db = require('./db');
var mongoose = require('mongoose');

/**
 * Mongoose Schema for User collection
 */
this.schemaUser = new mongoose.Schema({
	uname: String,
	fname: String,
	lname: String,
	uid: Number
});

/**
 * Authorize user from name and password
 * @public
 * @param {String} uname - Desired username
 * @param {String} passwd - Password corresponding to the uname parameter
 */
this.auth = function (uname, passwd) {
	if (uname && passwd) return true;
};

/**
 * Verify login state
 * @param {RESTObject} data - Processed req object containing the user's session
 */
this.isLogged = function (data) {
	return data.session.hasOwnProperty('uid');
};

/**
 * Acquire full user info from user id
 * @param {Number}    uid       - User id
 * @param {Function}  callback  - Function to be called on completion
 */
this.getUser = function (uid, callback) {
	db.connect().model("User").findOne({
		uid: uid
	}, callback);
};

this.init = (function () {
	var con = db.connect();
	con.model("User", this.schemaUser);
	con.close();
	return true;
}).call(this);