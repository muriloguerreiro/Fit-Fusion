exports.up = function(knex) {
    return knex.schema.createTable('loads', function(table) {
      table.increments('id').primary()
      table.float('weight').notNullable()
  
      table.timestamps(true, true)
    })
  }

  exports.down = function(knex) {
    return knex.schema.dropTable('loads')
  }