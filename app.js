import express from 'express'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import tweetRoutes from './routes/tweetRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO)
const db = mongoose.connection

db.on('open', () => {
    console.log('connected to db')
})

db.on('err', () => {
    console.log('connection error')
})

const app = express()
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tweet', tweetRoutes)
app.use('/api/comment', commentRoutes)
app.use('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.send('Server is running')
})

app.listen(8000, () => {
    console.log('server listening on port 8000')
})