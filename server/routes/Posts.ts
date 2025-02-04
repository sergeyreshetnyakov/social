import { Router } from 'express'

import Comment from '../models/Comment.ts'
import Post from '../models/Post.ts'
import User from '../models/User.ts'
import verifyToken from '../middlewares/auth.ts'

const router = new Router()

//posts routing
router.get('/', async (req, res) => {
  res.json(await Post.find())
})

router.get('/:author', async (req, res) => {
  res.json(await Post.findMany({ author: req.params.author }))
})

router.get('/:id', async (req, res) => {
  res.json(await Post.findById(req.params.id))
})

router.post('/', verifyToken, async (req, res) => {
  const post = new Post(req.body)
  await post.save()
  res.status(201)
})

router.put('/:id', verifyToken, async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body)
  res.status(202)
})

router.delete('/:id', verifyToken, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.status(200)
})

//comments routing
router.post('/:id/comments', verifyToken, async (req, res) => {
  const comment = new Comment(req.body)
  const post = await Post.findById(req.params.id)

  post.comments.push(comment)
  await post.save()

  res.status(201)
})

router.put('/:id/comments/:commentId', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)

  await post.comments.findByIdAndUpdate(req.params.comments, req.body)
  await post.save()

  res.status(202)
})

router.delete('/:id/comments/:commentId', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)
  await post.comments.findByIdAndDelete(req.params.commentId)
  await post.save()

  res.status(200)
})

export default router
