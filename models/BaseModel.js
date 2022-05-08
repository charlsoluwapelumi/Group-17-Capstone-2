const {Model} = require('objection')

const knex = require('../database/knex')
Model.knex(knex)

class BaseModel extends Model {

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

module.exports = BaseModel