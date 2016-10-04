var pg = require('pg');
var environment = process.env.Node_ENV || 'development';

var config = require('../knexfile.js')[environment];


module.exports = require('knex')(config);
