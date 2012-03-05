/**
 * Manage database schemas and connections
 * @module db
 */
"use strict";
var mongoose = require('mongoose');
/**
 * Acquire new connection to mongodb database
 * @returns {Connection} Mongoose Database connection
 */
exports.mongo = mongoose.createConnection('mongodb://web:keyboardcat@ds029837.mongolab.com:29837/intranet');