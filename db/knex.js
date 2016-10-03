var pg = require('pg');
var enviroment = 'development';

var config = require('../knexfile');

// var config = require('../knexfile')[environment];


module.exports = require('knex')(config);
