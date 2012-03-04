/**
 * Provide wrapper content for page loading
 * @module pageloader
 */
"use strict";
var user = require('./user');

var DEF_RENDER = {
	subPane: false,
	title: "Untitled"
};

function genTheme(theme) {
	return ['light'];
}
exports.render = function (obj, req, res) {
	var rendobj = DEF_RENDER;
	for (var i in obj)
		rendobj[i] = obj[i];
	user.getUser(req.session.uid, function (err, user) {
		rendobj.themes = genTheme(user);
	});
	res.render('core/layout', rendobj);
};