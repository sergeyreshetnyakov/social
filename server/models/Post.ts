import { Schema, model } from 'mongoose'
import { CommentSchema } from './Comment.ts'

export const PostSchema = new Schema({
  author: String,
  title: String,
  content: String,
  date: String,
  hidden: Boolean,
  rating: Array,
  comments: [CommentSchema],
})

export default model('Post', PostSchema)
