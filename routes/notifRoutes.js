import express from 'express'
import { getNotifications } from '../controllers/notif'

const router = express.Router()
// get notifications
router.get('/:userId', getNotifications)