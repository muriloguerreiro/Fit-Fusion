exports.up = function(knex) {
    return knex.schema.table('workouts', function(table) {
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.table('workouts', function(table) {
      table.dropColumn('user_id')
    })
  }
  