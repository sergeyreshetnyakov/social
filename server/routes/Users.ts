import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Router } from 'express'

import User from '../models/User.ts'
import verifyToken from '../middlewares/auth.ts'

const router = new Router()

router.post('/register', async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email })
  const existingUsername = await User.findOne({ username: req.body.username })

  if (existingEmail) {
    return res.status(400).json({ error: 'Email already exist' })
  }

  if (existingUsername) {
    return res.status(400).json({ error: 'Username already exist' })
  }

  const hashedPassword = await hash(req.body.password, 10)
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  })

  await user.save()
  res.status(201)
})

router.post('/login', async (req, res) => {
  const user = await User.findOne(req.body.email)
  if (!user) {
    return res.status(401)
  }

  const passwordMatch = await compare(req.body.password, user.password)
  if (!passwordMatch) {
    return res.status(401)
  }
  const token = sign({ email: user.email }, 'secret')
  res.status(200).json({ token })
})

router.get('/', verifyToken, async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.status(200).json({ username: user.username, email: user.email })
})

export default router
