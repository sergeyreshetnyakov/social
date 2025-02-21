import { Router } from 'express'

import Comment from '../models/Comment.ts'
import Post from '../models/Post.ts'
import verifyToken from '../middlewares/auth.ts'

const router = Router()

//post routing

router.get('/', async (req, res) => {
  const post = await Post.find().catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  res.status(200).json(post)
})

router.get('/id/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  res.status(200).json(post)
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

  await post.save().catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  res.status(201).json({ header: 'Success', message: 'Your post successfuly published' })
})

router.post('/:id/rating', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  if (!post.rating.includes(req.user.username)) {
    post.rating.push(req.user.username)
    await Post.findByIdAndUpdate(req.params.id, post)

    return res.status(200)
  } else {
    post.rating = post.rating.filter((r) => {
      return r !== req.user.username
    })

    await Post.findByIdAndUpdate(req.params.id, post).catch((err) => {
      return res.json({ header: 'Error', message: err })
    })

    return res.status(200)
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  if (post.author !== req.user.username) {
    return res.status(403).json({ header: 'Error', message: 'Forbidden' })
  }

  await Post.findByIdAndUpdate(req.params.id, req.body).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  res.status(200).json({ header: 'Success', message: 'Your post successfuly edited' })
})

router.delete('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  if (post?.author === req.user.username) {
    await Post.findByIdAndDelete(req.params.id).catch((err) => {
      return res.json({ header: 'Error', message: err })
    })

    return res.status(200).json({ header: 'Success', message: 'Your post successfuly deleted' })
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

  const post = await Post.findById(req.params.id).catch((err) => {
    return res.json({ header: 'Error', message: err })
  })

  post?.comments.push(comment)
  await Post.findByIdAndUpdate(req.params.id, post)

  res.status(201).json({ header: 'Success', message: 'Your comment successfuly posted' })
})

export default router
