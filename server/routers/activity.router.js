import express from 'express'
const router = express.Router()

import activityController from '../controllers/activity.controller.js'

router.post('/', activityController.create)

export default router