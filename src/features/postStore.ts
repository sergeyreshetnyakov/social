import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

import useDialogStore from '../shared/lib/dialogStore'

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
  const dialogStore = useDialogStore()

  const authToken = ref<string>()

  async function getAll(): Promise<post[]> {
    const res = await axios.get<post[]>(url)

    return res.data
  }

  async function getById(id: string) {
    const res = await axios.get<post>(url + id)

    if (res.status !== 200) {
      return dialogStore.set('PostNotFound')
    }

    return res.data
  }

  async function create(post: createComment) {
    const res = await axios.post(url, post).catch((err) => console.error(err))

    if (res?.status === 201) {
      return dialogStore.set('PostCreated')
    }
  }

  async function update(id: string, post: post) {
    const res = await axios.put(url + id, post)

    return res.status
  }

  async function deleteById(id: string) {
    const res = await axios.delete(url + id)

    return res.status
  }

  async function updateRating(id: string) {
    const res = await axios.post(url + id)

    return res.status
  }

  async function addComment(id: string, comment: createComment) {
    const res = await axios.post(url + id + '/comments', comment)

    return res.status
  }
  return { getAll, getById, create, update, deleteById, updateRating, addComment, authToken }
})

export default usePostStore
