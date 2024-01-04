const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development)


const Exercise = {
  async createExercise(name, series, reps, interval, workoutId, link) {
    try {
      const newExercise = await knex('exercises').insert({
        name,
        series,
        reps,
        interval,
        workout_id: workoutId,
        link
      })
      
      return newExercise;
    } catch (error) {
      throw new Error(`Erro ao criar o exercício: ${error}`)
    }
  },

  async getAllExercises() {
    try {
      const exercises = await knex('exercises').select('*')
      return exercises
    } catch (error) {
      throw new Error(`Erro ao obter os exercícios: ${error}`)
    }
  },

  async getExerciseById(id) {
    try {
      const exercise = await knex('exercises').where({ id }).first()
      return exercise
    } catch (error) {
      throw new Error(`Erro ao obter o exercício pelo ID: ${error}`)
    }
  },

  async getExercisesByWorkout(workoutId) {
    try {
      const exercises = await knex('exercises').where({ workout_id: workoutId })
      return exercises
    } catch (error) {
      throw new Error(`Erro ao obter os exercícios para o treino: ${error}`)
    }
  },

  async updateExercise(id, name, series, reps, interval, workoutId, link) {
    try {
      const updatedExercise = await knex('exercises')
        .where({ id })
        .update({ name, series, reps, interval, workout_id: workoutId, link, updated_at: knex.fn.now() }, ['id', 'name', 'series', 'reps', 'interval', 'workout_id', 'link'])
      return updatedExercise
    } catch (error) {
      throw new Error(`Erro ao atualizar o exercício: ${error}`)
    }
  },

  async deleteExercise(id) {
    try {
      const deletedExercise = await knex('exercises').where({ id }).del()
      return deletedExercise
    } catch (error) {
      throw new Error(`Erro ao excluir o exercício: ${error}`)
    }
  }
}

module.exports = Exercise