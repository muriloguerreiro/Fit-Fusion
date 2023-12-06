exports.up = function(knex) {
    return knex.schema.table('loads', function(table) {
      table.integer('exercise_id').unsigned().notNullable()
      table.foreign('exercise_id').references('exercises.id').onDelete('CASCADE');
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.table('loads', function(table) {
      table.dropForeign('exercise_id')
      table.dropColumn('exercise_id')
    })
  }