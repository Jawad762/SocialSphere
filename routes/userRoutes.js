import express from 'express'
import { deleteUser, getUser, updateUser, followOrUnfollowUser, getUserFollowers, getUserFollowing, getUsers, getUserLikes } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// get user
router.get('/:id', getUser)

// get users
router.get('/search/:value', getUsers)

// get user followers
router.get('/followers/:id', getUserFollowers)

// get user following
router.get('/following/:id', getUserFollowing)

// get user liked posts
router.get('/likes/:id', getUserLikes)

// update user
router.put('/:id', verifyToken, updateUser)

// delete user
router.delete('/:id', verifyToken, deleteUser)

// follow or unfollow user
router.put('/followOrUnfollow/:id', verifyToken, followOrUnfollowUser)

export default router