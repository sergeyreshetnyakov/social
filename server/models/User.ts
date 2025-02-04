import { Schema, model } from 'mongoose'

export const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
})

export default model('User', UserSchema)
