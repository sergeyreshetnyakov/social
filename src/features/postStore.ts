import axios from 'axios'
import useDialogStore from '../shared/lib/dialogStore'
import useUserStore from './userStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const url = 'http://localhost:5000/api/posts/'

export interface createComment {
  content: String
  rating: Array<string>
}

export interface comment extends createComment {
  author: String
  date: Date
}

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
  const user = useUserStore()

  async function getAll(): Promise<post[]> {
    const res = await axios.get<post[]>(url)

    return res.data
  }

  async function getById(id: string) {
    const res = await axios.get<post>(url + id).catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })

    return res.data
  }

  async function create(post: createPost) {
    const res = await axios.post(url, post).catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })

    dialog.setAlert(res.data.header, res.data.message)
    router.push({ path: '/', replace: true })
  }

  async function update(id: string, post: post) {
    const res = await axios.put(url + id, post).catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })

    dialog.setAlert(res.data.header, res.data.message)
  }

  async function deleteById(id: string) {
    const res = await axios.delete(url + id).catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })

    dialog.setAlert(res.data.header, res.data.message)
  }

  async function updateRating(id: string) {
    const res = await axios.post(url + id + '/rating').catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })
  }

  async function addComment(id: string, comment: createComment) {
    const res = await axios.post(url + id + '/comments', comment).catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })

    dialog.setAlert(res.data.header, res.data.message)
  }
  return { getAll, getById, create, update, deleteById, updateRating, addComment }
})

export default usePostStore
