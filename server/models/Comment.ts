import { Schema, model } from 'mongoose'

export const CommentSchema = new Schema({
  author: String,
  content: String,
  rating: Array,
  date: String,
})

export default model('Comment', CommentSchema)
