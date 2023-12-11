import Notif from '../models/Notif.js';
import Tweet from '../models/Tweet.js';

export const getNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const allNotifications = await Notif.find({ userId }).sort({
      createdAt: -1,
    });

    const notificationPromises = allNotifications.map(async (notif) => {
      if (notif.type === 'like') {
        const tweet = await Tweet.findById(notif.tweetId);
        if (tweet) {
          return notif;
        }
      }
      else if (notif.type === 'follow') return notif
      
      else return null;
    });

    const notifications = await Promise.all(notificationPromises);

    // Filter out null values (notifications without a corresponding tweet)
    const filteredNotifications = notifications.filter((notif) => notif !== null);

    res.status(200).json(filteredNotifications);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};