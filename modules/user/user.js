/**
 * Control, access, and validate User info
 *@module user
 */
"use strict";
var db = require(__dirname+'/../db');
var mongoose = require('mongoose');

/**
 * Mongoose Schema for User collection
 */
exports.UserSchema = new mongoose.Schema({
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
var auth = exports.auth = function (uname, passwd, cb) {
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

exports.User = db.mongo.model("User", exports.UserSchema);

exports.routes = {
	post: [
		['/user/login', function (req, res) {
			auth(req.body.uname, req.body.passwd, function (user) {
				if (user) {
					if (req.session.hasOwnProperty('loginFail')) delete req.session.loginFail;
					req.session.user = user;
				}
				else req.session.loginFail = true;
				res.redirect('back');
			});
		}]
	],
	get: []
};