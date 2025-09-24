const express = require('express')
const router = express.Router()

const activityController = require('../controllers/activity.controller.js')

router.post('/', activityController.create)
router.get('/search', activityController.searchActivities)
router.get('/:id', activityController.getActivityById)
router.get('/', activityController.getAll)
router.delete('/:id', activityController.deleteById)
router.put('/:id', activityController.updateById)

module.exports = router