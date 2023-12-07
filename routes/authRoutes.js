import express from 'express'
import { signUp, signIn } from '../controllers/auth.js'
import { logout } from '../controllers/auth.js'

const router = express.Router()

// Sign up
router.post('/signup', signUp)

// Sign in
router.post('/signin', signIn)

// Log out
router.post('/logout', logout)

export default router