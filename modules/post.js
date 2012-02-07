/**
 * Handles news posts et al
 */
var mongoose = require('mongoose');
var db = require('./db');
/**
 * Mongoose Schema for Post collection
 */
this.schemaPost = mongoose.Schema({
  title:  String,
  text:   String,
  postDate: Date,
  updateDate: {type: Date, default: Date.now}
});


this.init = (function(){
  var con = db.connect();
  con.model("Post", this.schemaPost);
	con.close();
	return true;
}).call(this);