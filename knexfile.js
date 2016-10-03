var dotenv = require('dotenv').config();
var pg = require('pg');


module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/techblogdb',
    migrations: {
			directory: './db/migrations'
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
