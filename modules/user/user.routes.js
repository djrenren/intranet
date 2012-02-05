var pl = require('../pageloader.js');
var router = require('../router');
var REST = require('../rest'),
  RESTObj = REST.RESTObj;
var user = require('./index.js');


router.route('get', /^.*$/, function (req, res, next) {
	if (!user.isLogged(req))
    pl.render('user/login.ejs', {
		  "pageTitle": "Howdy!",
		  "uname": req.session.uname || "None"
	  },req,res);
	else next();
});
router.route('post', '/user/login', function (req, res, next) {
	if (user.auth(new RESTObj(req))) {
		req.session.uname = req.body.uname;
		res.redirect('back');
	}
});