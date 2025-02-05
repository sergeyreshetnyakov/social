import { Router } from 'express'

import Comment from '../models/Comment.ts'
import Post from '../models/Post.ts'
import verifyToken from '../middlewares/auth.ts'

const router = Router()

//post routing
router.get('/', async (req, res) => {
  res.json(await Post.find())
})

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    return res.status(200).json(post)
  } else {
    return res.status(404).json({ message: 'Post not found' })
  }
})

router.post('/', verifyToken, async (req, res) => {
  const post = new Post({
    author: req.user.username,
    title: req.body.title,
    content: req.body.content,
    date: Date.now(),
    hidden: req.body.hidden,
    comments: [],
    rating: 0,
  })

  await post.save()
  res.status(201).json({ message: 'success' })
})

router.put('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    if (post.author === req.user.username) {
      await Post.findByIdAndUpdate(req.params.id, req.body)
      return res.status(200).json({ message: 'success' })
    }
  } else {
    return res.status(404).json({ message: 'Post not found' })
  }
})
router.delete('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    if (post?.author === req.user.username) {
      await Post.findByIdAndDelete(req.params.id)
      return res.status(200).json({ message: 'success' })
    }
  } else {
    return res.status(404).json({ error: 'Post no found' })
  }
})

//comment routing

router.post('/:id', verifyToken, async (req, res) => {
  const comment = new Comment({
    author: req.user.username,
    content: req.body.content,
    date: Date.now(),
    rating: 0,
  })

  const post = await Post.findById(req.params.id)

  if (post) {
    post?.comments.push(comment)
    await Post.findByIdAndUpdate(req.params.id, post)
    return res.status(201).json({ message: 'success' })
  } else {
    return res.status(404).json({ error: 'Post no found' })
  }
})
