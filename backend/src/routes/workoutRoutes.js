const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workoutController')

router.post('/', workoutController.createWorkout)
router.get('/', workoutController.getAllWorkouts)
router.get('/user', workoutController.getWorkoutsByLoggedUser)
router.get('/:id', workoutController.getWorkoutById)
router.get('/:id/details', workoutController.getWorkoutDetailsById)
router.put('/:id', workoutController.updateWorkout)
router.delete('/:id', workoutController.deleteWorkout)

module.exports = router;