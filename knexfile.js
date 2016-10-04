"use strict"
var dotenv = require('dotenv').config();
// var pg = require('pg');


module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'techblogdb'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
  			directory:'./db/migrations',
        tableName: 'knex_migrations'
      }
  }

};

// development: {
//   client: 'pg',
//   database: 'techblogdb',
//   migrations: {
//     directory: './db/migrations'
//   }
