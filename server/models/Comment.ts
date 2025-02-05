import { Schema, model } from 'mongoose'

export const CommentSchema = new Schema({
  author: String,
  content: String,
  rating: Array,
  date: Date,
})

export default model('Comment', CommentSchema)
