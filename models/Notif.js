import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    sourceId: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
    tweetId: { type: String }
}, { timestamps: true })

export default mongoose.model('Notif', notifSchema)