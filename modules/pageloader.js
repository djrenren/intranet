/**
 * Provide wrapper content for page loading
 * @module pageloader
 */

var user = require('./user');

var DEF_RENDER = function(session){
  return {
    layout: 'layout',
    styles: genTheme(user.getUser(session.uid).theme)
  };
};

this.render = function(tmplt, obj,req,res){
  var rendobj = DEF_RENDER(req.session);
  for(var i in obj)
    rendobj[i] = obj[i];
  res.render(tmplt,rendobj);
};

function genTheme(theme){
  return ['light'];
}