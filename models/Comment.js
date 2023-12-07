import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    image: {
        type: String
    },
    tweetId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        defaultValue: []
    }
}, {timestamps: true})

export default mongoose.model('Comment', commentSchema)