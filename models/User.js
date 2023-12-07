import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
    },

    coverPhoto: {
        type: String,
    },

    description: {
        type: String
    },

    followers: {
        type: Array,
        defaultValue: []
    },

    following: {
        type: Array,
        defaultValue: []
    }

}, {timestamps: true})

export default mongoose.model('User', userSchema)
