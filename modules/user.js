/**
 * Control, access, and validate User info
 *@module user
 */
var db = require('./db');
var mongoose = require('mongoose');

/**
 * Verify login state
 * @param {RESTObject} data - Processed req object containing the user's session
 */
this.isLogged = function (data) {
	return data.session.hasOwnProperty('uid');
};

/**
 * Authorize user from name and password
 * @param {RESTObject} data - Processed req object containing uname and passwd
 */
this.auth = function (data) {
	if (data) return true;
};

this.getUser = function(uid, callback){
  db.connect().model("User").findOne({uid:uid}, callback);
};

this.init = function () {
	exports.user = new mongoose.Schema({
		uname: String,
    fname: String,
    lname: String,
		uid: Number
	});

  var con = db.connect();
	(new (con.model("User", exports.user))({uname: 'lpage', fname: 'Larry', lname: 'Page', uid: 1})).save();
	con.close();

  return true;
}();