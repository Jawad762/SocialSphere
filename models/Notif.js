import mongoose from "mongoose";

const notifSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String },
    value: { type: String, required: true }
})

export default mongoose.model('Notif', notifSchema)