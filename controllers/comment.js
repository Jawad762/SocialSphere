import Comment from '../models/Comment.js'
import Notif from '../models/Notif.js'
import Tweet from '../models/Tweet.js'
import User from '../models/User.js'

export const getUserComments = async (req, res, next) => {
    try {
        const { userId } = req.params
        const comments = await Comment.find({ userId: userId}).sort({
            createdAt: -1
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getTweetComments = async (req, res, next) => {
    try {
        const { tweetId } = req.params
        const comments = await Comment.find({ tweetId: tweetId}).sort({
            createdAt: -1
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const createComment = async (req, res, next) => {
    try {
        const newComment = new Comment(req.body)
        await newComment.save()
        const commentUser = await User.findById(newComment.userId)
        const tweet = await Tweet.findById(newComment.tweetId)
        const tweetUser = await User.findById(tweet.userId)
        if (newComment.userId !== tweet.userId) {
            const notification = new Notif({ userId: tweetUser._id, value: `${commentUser.username} commented under your post.`, sourceId: commentUser._id, type: 'comment', tweetId: newComment.tweetId })
            await notification.save()
        }
        res.status(200).json(newComment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params
        await Comment.findByIdAndDelete(id)
        res.status(200).json('Tweet deleted.')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const likeOrUnlike= async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const likerId = req.body.id
        const liker = await User.findById(likerId)
    
        if (comment.likes.includes(likerId)) {
            comment.likes.pull(likerId)
            await comment.save()
            res.status(200).json('Unliked tweet')
        }
    
        else {
            comment.likes.push(likerId)
            await comment.save()
            if (comment.userId !== likerId) {
                const notification = new Notif({ userId: comment.userId ,value: `${liker.username} liked your comment.`, sourceId: likerId, type: 'like', tweetId: comment.tweetId })
                await notification.save()
            }
            res.status(200).json('Liked tweet.')
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}