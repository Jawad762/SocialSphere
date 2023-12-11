import express from 'express'
import { getNotifications } from '../controllers/notif.js'

const router = express.Router()
// get notifications
router.get('/:userId', getNotifications)

export default router