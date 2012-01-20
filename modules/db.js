/**
 * Manage database schemas and connections
 * @module db
 */

this.connect = function(){
  var con = require('mongoose');
  con.connect('localhost','intranet',1337);
  return con;
};