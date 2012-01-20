/**
 * Control, access, and validate User info
 *@module user
 */
var db = require('./db');
var router = require('./router');
var REST = require('./rest'),
	RESTObj = REST.RESTObj;
var self = this;

/**
 * Verify login state
 * @param {RESTObject} data - Processed req object containing the user's session
 */
this.isLogged = function (data) {
	return data.session.hasOwnProperty('uname');
};

/**
 * Authorize user from name and password
 * @param {RESTObject} data - Processed req object containing uname and passwd
 */
this.auth = function (data) {
	if (data) return true;
};


this.init = function () {
	var con = db.connect();
	db.schemas.user = new con.Schema({
		name: String,
		id: Number
	});
	con.model("User", db.schemas.user);
	con.close();

	router.route('get', /^.*$/, function (req, res, next) {
		if (!self.isLogged(req)) res.render('user/login', {
			"pageTitle": "Howdy!",
			"uname": req.session.uname || "None"
		});
		else next();
	});
	router.route('post', '/user/login', function (req, res, next) {
		if (self.auth(new RESTObj(req))) {
			req.session.uname = req.body.uname;
			res.redirect('back');
		}
	});

  return true;
}();