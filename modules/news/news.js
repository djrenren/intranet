/**
 * Handles news posts et al
 */
var mongoose = require('mongoose');
var db = require(__dirname+'/../db');
/**
 * Mongoose Schema for Post collection
 */
exports.PostSchema = new mongoose.Schema({
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
