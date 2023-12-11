const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')


const WorkoutController = {
    async createWorkout(req, res) {
        const { name, due, imageUrl } = req.body
        try {
            const newWorkout = await Workout.createWorkout(name, due, imageUrl)
            res.status(201).json({ success: true, workout: newWorkout })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao criar o treino', error: error.message })
        }
    },

    async getAllWorkouts(req, res) {
        try {
            const workouts = await Workout.getAllWorkouts();
            res.status(200).json({ success: true, workouts })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao obter os treinos', error: error.message })
        }
    },

    async getWorkoutById(req, res) {
        const { id } = req.params
        try {
            const workout = await Workout.getWorkoutById(id)
            if (!workout) {
                return res.status(404).json({ success: false, message: 'Treino não encontrado' })
            }
            res.status(200).json({ success: true, workout })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao obter o treino', error: error.message })
        }
    },

    async getWorkoutDetailsById(req, res) {
        const { id } = req.params
        try {
            const workout = await Workout.getWorkoutById(id)     
            if (!workout) {
                return res.status(404).json({ success: false, message: 'Treino não encontrado' })
            }
            const exercises = await Exercise.getExercisesByWorkout(id)
            if (!exercises) {
                return res.status(404).json({ success: false, message: 'Exercício não encontrado' })
            }

            res.status(200).json({ success: true, workout, exercises })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao obter o treino', error: error.message })
        }
    },

    async updateWorkout(req, res) {
        const { id } = req.params
        const { name, due, imageUrl } = req.body
        try {
            const updatedWorkout = await Workout.updateWorkout(id, name, due, imageUrl)
            if (!updatedWorkout) {
                return res.status(404).json({ success: false, message: 'Treino não encontrado' })
            }
            res.status(200).json({ success: true, workout: updatedWorkout })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao atualizar o treino', error: error.message })
        }
    },

    async deleteWorkout(req, res) {
        const { id } = req.params;
        try {
            const deletedWorkout = await Workout.deleteWorkout(id)
            if (!deletedWorkout) {
                return res.status(404).json({ success: false, message: 'Treino não encontrado' })
            }
            res.status(200).json({ success: true, message: 'Treino excluído com sucesso' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao excluir o treino', error: error.message })
        }
    }
}

module.exports = WorkoutController