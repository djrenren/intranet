/**
 * Manages the home page
 * @module home
 */
"use strict";
var pl = require('../pageloader');
exports.routes = {
	get: [
		['/', loadPage]
	]
};

function loadPage(req, res) {
	pl.render({
		title: "Home",
		mainPane: {
			view: 'core/home',
			title: 'Welcome ' + req.session.user.fname
		}
	}, req, res);
}