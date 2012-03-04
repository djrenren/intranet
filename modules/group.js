/**
 * Handles user groups
 */
var mongoose = require('mongoose');
var db = require('./db');

/**
 * Mongoose Schema for Post collection
 */
exports.schemaGroup = mongoose.Schema({
	admins: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	gid: Number,
	name: String,
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
});


(function init() {
	var con = db.connect();
	con.model("Post", this.schemaPost);
	con.close();
	return true;
}).call();