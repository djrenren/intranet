/**
 * Handles news posts et al
 */
var mongoose = require('mongoose');
var db = require(__dirname + '/../db');
/**
 * Mongoose Schema for Post collection
 */
exports.PostSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	title: { type: String, required: true},
	text: { type: String, required: true},
	postDate: { type: Date, required: true},
	updateDate: {
		type: Date,
		default: Date.now,
		required: true
	},
	groups: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Group'
	}]
}, {
	strict: true
});
exports.Post = db.mongo.model("Post", exports.PostSchema);

exports.createPost = function (author, title, text, groups) {};