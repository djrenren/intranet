/**
 * Handles news posts et al
 */
var mongoose = require('mongoose');
var db = require('./db');
/**
 * Mongoose Schema for Post collection
 */
exports.PostSchema = mongoose.Schema({
	author:{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	title: String,
	text: String,
	postDate: Date,
	updateDate: {
		type: Date,
		default:
			Date.now
	},
	groups: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Group'
	}]
});
exports.Post = db.mongo.model("Post", exports.PostSchema);

exports.createPost = function(author,title,text,groups){};

exports.getNewsByUid = function (uid, fn, lim, con) {
	con = con || db.connect();
	con.model("Post").find({
		groups.members.uid: uid
	}, [], {
		limit: lim || 10
	}, fn);
	if (arguments.length != 4) con.close();
}