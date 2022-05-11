/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex .schema.createTable('properties',  table => {
        table.increments('id').primary()
        table.integer('owner').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
        table.string('status').defaultTo('available').notNullable()
        table.float('price').notNullable()
        table.string('city').notNullable()
        table.string('address').notNullable()
        table.string('state').notNullable()
        table.string('type').notNullable()
        table.string('image_url')
        table.datetime('created_on')
        table.timestamps(false, true);
  
  
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('properties')
  };
  
  