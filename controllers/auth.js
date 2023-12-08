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

        const token = jwt.sign({id: newUser._id}, process.env.JWT, { expiresIn: '10m' })

        const { password, ...otherData } = newUser._doc

        res.status(200).json({...otherData, token})

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
        
        const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '10m' })

        res.status(200).json({...otherData, token})

    } catch (error) {
        next(error)
    }
}
