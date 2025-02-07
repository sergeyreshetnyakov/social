import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Router } from 'express'

import User from '../models/User.ts'
import verifyToken from '../middlewares/auth.ts'

const router = new Router()

router.post('/register', async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email })
  const existingUsername = await User.findOne({ username: req.body.username })

  if (existingEmail || existingUsername) {
    return res.status(400).json({ message: 'Email or username are already exist' })
  }

  const user = new User({
    username: req.body.username,
    password: await hash(req.body.password, 10),
    email: req.body.email,
  })

  await user.save()

  res.status(201).json({ message: 'Your account successfuly registered' })
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(401).json({ message: 'Wrong email or password' })
  }

  const passwordMatch = await compare(req.body.password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Wrong email or password' })
  }

  const token = sign({ username: user.username, email: user.email }, 'secret')

  res.status(200).json({ token: token, message: 'You are successfuly login to your account' })
})

router.post('/', verifyToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ username: user.username, email: user.email, message: 'Success' })
})

export default router
