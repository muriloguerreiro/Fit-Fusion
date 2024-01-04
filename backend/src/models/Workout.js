const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development)


const Workout = {
  async createWorkout(name, due, imageUrl, label, userId) {
    try {
      const newWorkout = await knex('workouts').insert({
        name,
        due,
        image_url : imageUrl,
        label,
        user_id : userId
      })
      return newWorkout;
    } catch (error) {
      throw new Error(`Erro ao criar o treino: ${error}`);
    }
  },

  async getAllWorkouts() {
    try {
      const workouts = await knex('workouts').select('*');
      return workouts;
    } catch (error) {
      throw new Error(`Erro ao obter os treinos: ${error}`);
    }
  },

  async getWorkoutById(id) {
    try {
      const workout = await knex('workouts').where({ id }).first();
      return workout;
    } catch (error) {
      throw new Error(`Erro ao obter o treino pelo ID: ${error}`);
    }
  },

  async getWorkoutsByUser(userId) {
    try {
      const workouts = await knex('workouts').where({ user_id: userId })
      return workouts
    } catch (error) {
      throw new Error(`Erro ao obter os treinos para o usuário: ${error}`)
    }
  },

  async updateWorkout(id, name, due, imageUrl, label, userId) {
    try {
      const updatedWorkout = await knex('workouts')
        .where({ id })
        .update({ name, due, image_url : imageUrl, label, user_id : userId, updated_at: knex.fn.now() }, ['id', 'name', 'due', 'image_url','label','user_id']);
      return updatedWorkout;
    } catch (error) {
      throw new Error(`Erro ao atualizar o treino: ${error}`);
    }
  },

  async deleteWorkout(id) {
    try {
      const deletedWorkout = await knex('workouts')
        .where({ id })
        .del();
      return deletedWorkout;
    } catch (error) {
      throw new Error(`Erro ao excluir o treino: ${error}`);
    }
  }

}

module.exports = Workout