/**
 * Provide wrapper content for page loading
 * @module pageloader
 */
"use strict";
var user = require(__dirname + '/../user');

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
	res.render('core/layout', rendobj);
};