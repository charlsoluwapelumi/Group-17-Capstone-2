const environmnent = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environmnent]

module.exports = require('knex')(config)