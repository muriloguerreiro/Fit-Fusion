exports.up = function(knex) {
    return knex.schema.createTable('workouts', function(table) {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.date('due')
      table.string('image_url')
      table.string('label').notNullable()

      table.timestamps(true, true)
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('workouts')
  }  