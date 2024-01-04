const express = require('express');
const router = express.Router();
const loadController = require('../controllers/loadController');

router.post('/', loadController.createLoad);
router.get('/', loadController.getAllLoads);
router.get('/by-exercise/:exerciseId', loadController.getLoadsByExerciseId);
router.get('/:id', loadController.getLoadById);
router.delete('/:id', loadController.deleteLoad);

module.exports = router;