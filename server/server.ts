import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'

import PostsRouter from './routes/Posts.ts'
import UsersRouter from './routes/Users.ts'

const app = express()

dotenv.config()
app.set('port', process.env.PORT)
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

mongoose.connect(process.env.DB_PORT as string)

mongoose.connection.on('connected', () => {
  console.log('[OK] MongoDB is connected to ' + process.env.DB_PORT)
})
mongoose.connection.on('error', (err) => {
  console.error('[ERR]' + err)
  throw err
})
mongoose.connection.on('disconnected', () => {
  console.log('[INFO] MongoDB is disconnected')
})

app.use('/api/posts', PostsRouter)
app.use('/api/users', UsersRouter)

app.listen(app.get('port'), () => {
  console.log('[OK] Server is running on http://localhost:' + app.get('port'))
})
