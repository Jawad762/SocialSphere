import express from "express";
import { createTweet, deleteTweet, getTweet, getTimelineTweets, getUserTweets, getExploreTweets, likeOrUnlikeTweet, getLikedTweets } from "../controllers/tweet.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router()


// Find all tweets
router.get('/all', getExploreTweets)

// Find a tweet
router.get('/:id', getTweet)

// Find timeline tweets
router.get('/timeline/:id', getTimelineTweets)

// Find user tweets
router.get('/userTweets/:id', getUserTweets)

// Find liked tweets
router.get('/likedTweets/:userId', getLikedTweets)

// Create tweet
router.post('/create', createTweet)

// Delete tweet
router.delete('/delete/:id', deleteTweet)

// Like or Unlike tweet
router.put('/likeOrUnlike/:id', likeOrUnlikeTweet)

export default router