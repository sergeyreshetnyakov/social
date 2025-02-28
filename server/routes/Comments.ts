import { Router } from 'express'

import Comment from '../models/Comment.ts'
import Post from '../models/Post.ts'
import verifyToken from '../middlewares/auth'

const router = Router()

router.post('/:id/comments', verifyToken, async (req, res) => {
  const comment = new Comment({
    author: req.user.username,
    content: req.body.content,
    date: Date.now(),
    rating: [],
  })

  const post = await Post.findById(req.params.id).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  post?.comments.push(comment)
  await Post.findByIdAndUpdate(req.params.id, post)

  res.status(201).json({ header: 'Success', message: 'Your comment successfuly posted' })
})

router.post('/:postId/comments/:commentId', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.postId)

  const isLiked = post?.comments.find((comment) => {
    return comment.author === req.user.username
  })
})

export default Router
