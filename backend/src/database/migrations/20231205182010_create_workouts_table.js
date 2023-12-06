exports.up = function(knex) {
    return knex.schema.createTable('workouts', function(table) {
      table.increments('id').primary()
      table.string('name')
      table.date('due')
      table.string('image_url')

      table.timestamps(true, true)
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('workouts')
  }  