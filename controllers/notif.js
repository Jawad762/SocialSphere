import Notif from "../models/Notif.js";

export const getNotifications = async (req, res, next) => {
    try {
        const { userId } = req.params
        const notifications = await Notif.find({ userId }).sort({
            createdAt: -1
        })
        res.status(200).json(notifications)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}