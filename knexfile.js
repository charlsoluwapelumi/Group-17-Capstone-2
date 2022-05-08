// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 const DATABASE_CLIENT = process.env.DATABASE_CLIENT
 const MYSQL_HOST= process.env.MYSQL_HOST
 const MYSQL_DATABASE_NAME= process.env.MYSQL_DATABASE_NAME
 const MYSQL_USER= process.env.MYSQL_USER
 const MYSQL_PASSWORD= process.env.MYSQL_PASSWORD
 
 module.exports = {
 
   development: {
     client: DATABASE_CLIENT,
     connection: {
       host: MYSQL_HOST,
       database: MYSQL_DATABASE_NAME,
       user:     MYSQL_USER,
       password: MYSQL_PASSWORD
     },
     pool: {
       min: 2,
       max: 10
     },
     migrations: {
       tableName: 'knex_migrations',
       directory: __dirname + '/database/migrations'
     },
     seeds: {
       directory: __dirname + '/database/seeds'
     },
     debug: true
   },
 
   production: {
     client: DATABASE_CLIENT,
     connection: {
       host: MYSQL_HOST,
       database: MYSQL_DATABASE_NAME,
       user:     MYSQL_USER,
       password: MYSQL_PASSWORD
     },
     pool: {
       min: 2,
       max: 10
     },
     migrations: {
       tableName: 'knex_migrations',
       directory: __dirname + '/database/migrations',
       
     },
     seeds: {
       directory: __dirname + '/database/seeds'
     }
   },
 
 
 
 };
 