/**
 * Handles user groups
 */
var db = require('./db');
var mongoose = require('mongoose');



/**
 * Mongoose Schema for Post collection
 */

exports.GroupSchema = new mongoose.Schema({
	admins: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}],
	name: {
		type: String,
		index: {
			unique: true
		},
		validate: /[a-z ]*/i
	},
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
});

exports.Group = db.mongo.model("Group", exports.GroupSchema);

/**
 * Create New Group
 * @param {String}   name    - Name of Group
 * @param {User}     creator - User creating the group
 * @param {Function} cb      - Callback function(err)
 */
exports.createGroup = function (name, creator, cb) {
	var g = new exports.Group({
		name: name,
		admins: [creator._id],
		members: []
	});
	g.save(cb);
};