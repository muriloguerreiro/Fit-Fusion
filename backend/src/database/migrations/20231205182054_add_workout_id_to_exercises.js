exports.up = function(knex) {
    return knex.schema.table('exercises', function(table) {
      table.integer('workout_id').unsigned().notNullable()
      table.foreign('workout_id').references('workouts.id').onDelete('CASCADE')
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.table('exercises', function(table) {
      table.dropForeign('workout_id')
      table.dropColumn('workout_id')
    })
  }