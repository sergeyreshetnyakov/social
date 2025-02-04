import { Schema, model } from 'mongoose'
import CommentSchema from './Comment.ts'

export const PostSchema = new Schema({
  author: String,
  title: String,
  content: String,
  rating: Number,
  date: Date,
  hidden: Boolean,
  comments: [CommentSchema],
})

export default model('Post', PostSchema)
