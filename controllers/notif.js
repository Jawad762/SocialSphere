import Tweet from "../../client/src/components/Tweet.jsx";
import Notif from "../models/Notif.js";

export const getNotifications = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      const allNotifications = await Notif.find({ userId }).sort({
        createdAt: -1,
      });
  
      const notificationPromises = allNotifications.map(async (notif) => {
        if (notif.type === 'like') {
          const tweet = await Tweet.findById(notif.tweetId);
          if (!tweet) return null;
          return notif;
        }
      });
  
      const notifications = await Promise.all(notificationPromises);
  
      const filteredNotifications = notifications.filter((notif) => notif !== null);
  
      res.status(200).json(filteredNotifications);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };