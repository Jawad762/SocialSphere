import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const value = req.params.value;
        const users = await User.find({ username: { $regex: new RegExp(value, 'i') } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const isUsernameTaken = await User.findOne({ username: req.body.username })
        
        if (isUsernameTaken) res.status(400).json('Username already taken')

        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        await Tweet.remove({userId: req.params.id})
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const followOrUnfollowUser = async (req, res, next) => {
    try {
        const follower = await User.findById(req.body.id);
        const followed = await User.findById(req.params.id);

        if (!follower || !followed) {
            return res.status(404).json('User not found');
        }

        if (follower.following.includes(req.params.id)) {
            follower.following.pull(req.params.id);
            followed.followers.pull(req.body.id);
            await Promise.all([
                follower.save(),
                followed.save()
            ]);
            res.status(200).send('User Unfollowed.')
        }

        else if (!follower.following.includes(req.params.id)) {
            follower.following.push(req.params.id);
            followed.followers.push(req.body.id);
            await Promise.all([
                follower.save(),
                followed.save()
            ]);
            res.status(200).send('User followed.')
        }

    } catch (error) {
        next(error);
    }
};

export const getUserFollowers = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const followersPromises = user.followers.map(followerId => {
            return User.findById(followerId)
        })
        const followers =  await Promise.all(followersPromises)
        res.status(200).json(followers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUserFollowing = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        const followingPromises = user.following.map(followedId => {
            return User.findById(followedId)
        })
        const following =  await Promise.all(followingPromises)
        res.status(200).json(following)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUserLikes = async (req, res, next) => {
    try {
        const { id } = req.params
        const tweets = await Tweet.find({likes: {$in: id}})
        res.status(200).json(tweets)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}