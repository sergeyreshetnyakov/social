<<<<<<< HEAD
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

import useDialogStore from '@/shared/lib/dialogStore'
import { type comment } from './commentStore'
=======
import axios from 'axios'
import useDialogStore from '../lib/dialogStore'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

const url = 'http://localhost:5000/api/posts/'
const router = useRouter()

export interface createComment {
  content: String
  rating: Array<string>
}

export interface comment extends createComment {
  author: String
  date: Date
  _id: string
}
>>>>>>> a0c0619be0f0a08b8608abcd7e02eaa37fdf3ae0

export interface createPost {
  title: string
  content: string
  hidden: boolean
}

export interface post extends createPost {
  author: string
  date: string
  rating: Array<string>
  comments: Array<comment>
  _id: string
}

const usePostStore = defineStore('post', (store) => {
  const dialog = useDialogStore()
<<<<<<< HEAD
  const router = useRouter()
  const url = 'http://localhost:5000/api/posts/'

  async function getAll(): Promise<post[] | void> {
    const res = await axios.get<post[]>(url)

    if (res) return res.data
    else return dialog.setAlert('Error', 'Server is broken')
=======

  async function getAll(): Promise<post[]> {
    const res = await axios.get<post[]>(url)

    return res.data
>>>>>>> a0c0619be0f0a08b8608abcd7e02eaa37fdf3ae0
  }

  async function getById(id: string): Promise<post | void> {
    const res = await axios.get<post>(url + 'id/' + id)

    if (res) return res.data
    else return dialog.setAlert('Error', 'Post not found')
  }

  async function getByAuthor(author: string): Promise<post[] | void> {
    const res = await axios.get<post[]>(url + 'byAuthor/' + author)

    if (res) return res.data
    else dialog.setAlert('Error', 'Post not found')
  }

  async function create(post: createPost): Promise<void> {
    await axios
      .post(url, post)
      .then((res) => {
        dialog.setAlert(res.data.header, res.data.message)
        router.push({ path: '/', replace: true })
      })
<<<<<<< HEAD
      .catch((err) => dialog.setAlert(err.response.data.header, err.response.data.message))
=======
      .catch((err) => {
        return dialog.setAlert(err.response?.data.header, err.response?.data.message)
      })
>>>>>>> a0c0619be0f0a08b8608abcd7e02eaa37fdf3ae0
  }

  async function update(id: string, post: post): Promise<void> {
    await axios
      .put(url + id, post)
<<<<<<< HEAD
      .then((res) => dialog.setAlert(res.data.header, res.data.message))
      .catch((err) => dialog.setAlert(err.response.data.header, err.response.data.message))
=======
      .then((res) => {
        dialog.setAlert(res.data.header, res.data.message)
      })
      .catch((err) => {
        return dialog.setAlert(err.response.data.header, err.response.data.message)
      })
>>>>>>> a0c0619be0f0a08b8608abcd7e02eaa37fdf3ae0
  }

  async function deleteById(id: string): Promise<void> {
    await axios
      .delete(url + id)
<<<<<<< HEAD
      .then((res) => dialog.setAlert(res.data.header, res.data.message))
      .catch((err) => dialog.setAlert(err.response.data.header, err.response.data.message))
  }

  async function updateRating(id: string): Promise<void> {
    await axios
      .post(url + id + '/rating')
      .catch((err) => dialog.setAlert(err.response.data.header, err.response.data.message))
  }

  return { getAll, getByAuthor, getById, create, update, deleteById, updateRating }
=======
      .then((res) => {
        dialog.setAlert(res.data.header, res.data.message)
      })
      .catch((err) => {
        return dialog.setAlert(err.response.data.header, err.response.data.message)
      })
  }

  async function updateRating(id: string) {
    await axios.post(url + id + '/rating').catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })
  }

  async function updateCommentRating() {}

  async function createComment(id: string, comment: createComment) {
    await axios
      .post(url + id + '/comments', comment)
      .then((res) => {
        dialog.setAlert(res.data.header, res.data.message)
      })
      .catch((err) => {
        return dialog.setAlert(err.response.data.header, err.response.data.message)
      })
  }
  return { getAll, getByAuthor, getById, create, update, deleteById, updateRating, createComment }
>>>>>>> a0c0619be0f0a08b8608abcd7e02eaa37fdf3ae0
})

export default usePostStore
