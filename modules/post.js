/**
 * Handles news posts et al
 */
var mongoose = require('mongoose');
var db = require('./db');
var modelPost;
/**
 * Mongoose Schema for Post collection
 */
this.schemaPost = mongoose.Schema({
	title: String,
	text: String,
	postDate: Date,
	updateDate: {
		type: Date,
	default:
		Date.now
	},
	groups: [mongoose.Schema.ObjectId]
});

this.init = (function () {
	var con = db.connect();
	modelPost = con.model("Post", this.schemaPost);

	con.close();
	return true;
}).call(this);

this.getNewsByUid = function(uid, fn, lim, con){
	con = con || db.connect();
	con.model("Post").find({groups.members.uid: uid},[],{limit: lim || 10}, fn);
	if(arguments.length != 4) con.close();
}

