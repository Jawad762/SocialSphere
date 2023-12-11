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
        const tweet = await Tweet.findById(newComment.tweetId)
        const user = await User.findById(tweet.userId)
        const notification = new Notif({ userId: user._id, value: `${user.username} commented under your post.` })
        await notification.save()
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
    
        if (comment.likes.includes(likerId)) {
            comment.likes.pull(likerId)
            await comment.save()
            res.status(200).json('Unliked tweet')
        }
    
        else {
            comment.likes.push(likerId)
            await comment.save()
            res.status(200).json('Liked tweet.')
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}