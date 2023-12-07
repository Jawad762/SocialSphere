import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    text: {
        type: String,
        max: 400
    },

    image: {
        type: String,
    },

    likes: {
        type: Array,
        default: []
    }

}, { timestamps: true })

export default mongoose.model('Tweet', tweetSchema)
