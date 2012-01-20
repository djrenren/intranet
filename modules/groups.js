/**
 * Manages User Groups.
 * @module groups
 */
var db = require('./db');



this.init = function () {
  var con = db.connect();
  db.schemas.group = new con.Schema({
    admins  : [Number],
    members : [Number]
  });
  con.schemas.user.add({

  });
  return true;
};