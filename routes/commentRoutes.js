import express from 'express'
import { getUserComments, getTweetComments, createComment, deleteComment, likeOrUnlike } from '../controllers/comment.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// get user comments
router.get('/user/:userId', getUserComments)

// get tweet comments
router.get('/tweet/:tweetId', getTweetComments)

// create comment
router.post('/create', createComment)

// like or unlike comment
router.put('/likeOrUnlike/:id', likeOrUnlike)

// delete comment
router.delete('/delete/:id', verifyToken, deleteComment)

export default router