/**
 * Provide wrapper content for page loading
 * @module pageloader
 */

var user = require('./user');

var DEF_RENDER = {
    layout: 'layout'
};

this.render = function(tmplt, obj,req,res){
  var rendobj = DEF_RENDER;
  for(var i in obj)
    rendobj[i] = obj[i];
  user.getUser(req.session.uid, function (err, user){
    rendobj.themes = genTheme(user);
  });
  res.render(tmplt,rendobj);
};

function genTheme(theme){
  return ['light'];
}