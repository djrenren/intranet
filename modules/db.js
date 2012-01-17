var mongoose = require('mongoose');
for(var i in mongoose)
	this[i] = mongoose[i];

this.connect('mongodb://localhost:1337/intranet');


