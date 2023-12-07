import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const doesUserExist = await User.findOne({ username: req.body.username })

        if (doesUserExist) res.status(400).json('Username not available')

        const newUser = new User({...req.body, password: hashedPassword})

        await newUser.save()

        const token = jwt.sign({id: newUser._id}, process.env.JWT)

        const { password, ...otherData } = newUser._doc

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).status(200).json(otherData)

    } catch (error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) res.status(404).json('Invalid username or password')

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isCorrect) res.status(400).json('Invalid username or password')

        const {  password, ...otherData  } = user._doc
        
        const token = jwt.sign({ id: user._id }, process.env.JWT)

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).status(200).json(otherData)

    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res) => {
    res.clearCookie('access_token')
    res.status(200).json({message: 'Logout successful'})
}