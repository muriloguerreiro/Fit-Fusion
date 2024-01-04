const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')
const Load = require('../models/Load')

const WorkoutController = {
    async createWorkout(req, res) {
        const { name, due, imageUrl, label, userId } = req.body
        try {
            const workouts = await Workout.getWorkoutsByUser(userId)
            if (workouts.length == 5) {
                res.status(422).json({ success: false, message: 'Esse usuário possui o máximo de 5 treinos' })
            } else {
                const newWorkout = await Workout.createWorkout(name, due, imageUrl, label, userId)
                res.status(201).json({ success: true, workout: newWorkout })
            }
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

    async getWorkoutsByLoggedUser(req, res) {
        const userId = req.user.userId
        try {
            const workouts = await Workout.getWorkoutsByUser(userId)
            res.status(200).json({ success: true, workouts })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao obter os treinos desse usuário', error: error.message })
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
                return res.status(404).json({ success: false, message: 'Exercícios não encontrados' })
            }
            const exerciseIds = exercises.map(exercise => exercise.id)
            const loads = await Load.getLoadsByExerciseId(exerciseIds)
            if (!loads) {
                return res.status(404).json({ success: false, message: 'Cargas não encontradas' })
            }

            res.status(200).json({ success: true, workout, exercises, loads})
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao obter o treino', error: error.message })
        }
    },

    async updateWorkout(req, res) {
        const { id } = req.params
        const { name, due, imageUrl, label, userId } = req.body
        try {
            const updatedWorkout = await Workout.updateWorkout(id, name, due, imageUrl, label, userId)
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