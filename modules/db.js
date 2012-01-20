/**
 * Manage database schemas and connections
 * @module db
 */
var mongoose = require('mongoose');

this.connect = function(){
  var db = mongoose.createConnection('localhost','intranet',1337);
  return db;
};

this.schemas = {};