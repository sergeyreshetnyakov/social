import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const url = 'http://localhost:5000/api/posts/'

export interface ICreateComment {
  content: String
  rating: Array<string>
}

export interface IComment extends ICreateComment {
  author: String
  date: Date
}

export interface ICreatePost {
  title: string
  content: string
  hidden: boolean
}

export interface IPost extends ICreatePost {
  author: string
  date: Date
  rating: Array<string>
  comments: Array<IComment>
  _id: string
}

const usePostStore = defineStore('post', (store) => {
  const authToken = ref<string>()

  async function getAll(): Promise<Array<IPost>> {
    const res = await axios.get(url)

    return res.data
  }

  async function getById(id: string) {
    const res = await axios
      .get<IPost>(url + id)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        throw err
      })
  }

  async function create(post: ICreateComment) {
    const res = await axios.post(url, post)

    return res.status
  }

  async function update(id: string, post: IPost) {
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

  async function addComment(id: string, comment: ICreateComment) {
    const res = await axios.post(url + id + '/comments', comment)

    return res.status
  }
  return { getAll, getById, create, update, deleteById, updateRating, addComment, authToken }
})

export default usePostStore
