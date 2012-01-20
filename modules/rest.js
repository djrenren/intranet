/**
 * Provides REST access to public functions
 * @module rest
 */
var router = require('./router');

/**
 * Create routes for designated public functions of a module
 * @public
 * @param {object} module - Imported module the functions come from
 * @param {string} root   - Base path for routes
 * @param {[strings]} fns - Names of functions to be routed.
 */
this.activateModule = function (mod, root, fns) {
	fns.forEach(function (i) {
		router.route('all', '/' + root + '/' + i, function (req, res) {
			res.json(mod[i].call(this, new exports.RESTObj(req)));
		});
	});
};

/**
 * Create informational object from req object
 * @constructor
 * @param {request} req - Express request object to draw info from
 */
this.RESTObj = function (req) {
	this.session = req.session;
	for (var i in req.body)
	this[i] = req.body[i];
};