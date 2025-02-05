import { Router } from 'express'

import Comment from '../models/Comment.ts'
import Post from '../models/Post.ts'
import verifyToken from '../middlewares/auth.ts'

const router = Router()

//post routing
router.get('/:id', async (req, res) => {
  if (req.params.id) {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    return res.status(200).json(post)
  }
  res.json(await Post.find())
})

router.post('/', verifyToken, async (req, res) => {
  const post = new Post({
    author: req.user.username,
    title: req.body.title,
    content: req.body.content,
    date: Date.now(),
    hidden: req.body.hidden,
    comments: [],
    rating: [],
  })

  await post.save()
  res.status(201).json({ message: 'success' })
})

router.post('/:id/rating', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  if (!post.rating.includes(req.user.username)) {
    post.rating.push(req.user.username)
    await Post.findByIdAndUpdate(req.params.id, post)

    return res.status(200).json({ message: 'rating increased by ' + req.user.username })
  } else {
    post.rating = post.rating.filter((r) => {
      return r !== req.user.username
    })

    await Post.findByIdAndUpdate(req.params.id, post)
    return res.status(200).json({ message: 'rating decreased by ' + req.user.username })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  if (post.author !== req.user.username) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  await Post.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).json({ message: 'success' })
})
router.delete('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    return res.status(404).json({ error: 'Post no found' })
  }

  if (post?.author === req.user.username) {
    await Post.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: 'success' })
  }
})

//comment routing
router.post('/:id/comments', verifyToken, async (req, res) => {
  const comment = new Comment({
    author: req.user.username,
    content: req.body.content,
    date: Date.now(),
    rating: [],
  })

  const post = await Post.findById(req.params.id)

  if (!post) {
    return res.status(404).json({ error: 'Post no found' })
  }

  post?.comments.push(comment)
  await Post.findByIdAndUpdate(req.params.id, post)

  res.status(201).json({ message: 'success' })
})

router.post('/:id/comments/:commentId')

export default router
