const express = require('express')
const router = express.Router()

const activityController = require('../controllers/activity.controller.js')

router.post('/', activityController.create)



module.exports = router