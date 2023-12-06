const Exercise = require('../models/Exercise')


const ExerciseController = {
  async createExercise(req, res) {
    const { name, series, reps, workoutId, link, done } = req.body
    try {
      const newExercise = await Exercise.createExercise(name, series, reps, workoutId, link, done)
      res.status(201).json({ success: true, exercise: newExercise })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao criar o exercício', error: error.message })
    }
  },

  async getAllExercises(req, res) {
    try {
      const exercises = await Exercise.getAllExercises()
      res.status(200).json({ success: true, exercises })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao obter todos os exercícios', error: error.message })
    }
  },

  async getExerciseById(req, res) {
    const { id } = req.params
    try {
      const exercise = await Exercise.getExerciseById(id)
      if (!exercise) {
        return res.status(404).json({ success: false, message: 'Exercício não encontrado' })
      }
      res.status(200).json({ success: true, exercise })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao obter o exercício', error: error.message })
    }
  },

  async getExercisesByWorkout(req, res) {
    const { id } = req.params
    try {
      const exercises = await Exercise.getExercisesByWorkout(id)
      res.status(200).json({ success: true, exercises })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao obter os exercícios do treino', error: error.message })
    }
  },

  async updateExercise(req, res) {
    const { id } = req.params
    const { name, series, reps, workoutId, link, done } = req.body
    try {
      const updatedExercise = await Exercise.updateExercise(id, name, series, reps, workoutId, link, done)
      res.status(200).json({ success: true, exercise: updatedExercise })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao atualizar o exercício', error: error.message })
    }
  },

  async deleteExercise(req, res) {
    const { id } = req.params
    try {
      const deletedExercise = await Exercise.deleteExercise(id)
      if(!deletedExercise) {
        return res.status(404).json({ success: false, message: 'Exercício não encontrado' })
      }
      res.status(200).json({ success: true, message: 'Exercício excluído com sucesso' })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao excluir o exercício', error: error.message })
    }
  }
}

module.exports = ExerciseController
