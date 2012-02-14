/**
 * Handles user groups
 */
var mongoose = require('mongoose');
var db = require('./db');

/**
 * Mongoose Schema for Post collection
 */
this.schemaGroup = mongoose.Schema({
	gid: Number,
	name: String,
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
});


this.init = (function () {
	var con = db.connect();
	con.model("Post", this.schemaPost);
	con.close();
	return true;
}).call(this);