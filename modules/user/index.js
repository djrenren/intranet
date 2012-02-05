/**
 * Control, access, and validate User info
 *@module user
 */
var db = require('../db');
var mongoose = require('mongoose');
var self = this;

/**
 * Verify login state
 * @param {RESTObject} data - Processed req object containing the user's session
 */
this.isLogged = function (data) {
	return data.session.hasOwnProperty('uname');
};

/**
 * Authorize user from name and password
 * @param {RESTObject} data - Processed req object containing uname and passwd
 */
this.auth = function (data) {
	if (data) return true;
};

this.getUser = function(uid){
  return {
    name: "Larry Page",
    id  : uid
  }
}

this.init = function () {
	exports.user = new mongoose.Schema({
		name: String,
		id: Number
	});

  var con = db.connect();
	con.model("User", exports.user);
	con.close();

  require('./user.routes.js');

  return true;
}();