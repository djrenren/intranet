/**
 * Create Routing rules
 * @module router
 */
var srv;

this.init = function(server){
	srv = server;
};

/** Make a URL route
 * @param {string} method - HTTP Request type (GET or POST)
 * @param {string|regex} rule - Path rule to be routed
 * @param {function} fn - Function to be called on request
 */
this.route = function(method, rule, fn){
  method = method.toLowerCase();
	if(method === 'all' || method === 'get')
		srv.get(rule,fn);
	if(method === 'all' || method === 'post')
		srv.post(rule,fn);
};

/** Make multiple routes at once
 * @param {array} routes - Multiple [method,rule,fn] routing rules
 */
this.routeAll = function(routes){
	for(var i in routes)
		this.route.call(this,routes[i]);
};