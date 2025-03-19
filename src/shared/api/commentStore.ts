import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import axios from 'axios'
import useAlertStore from '@/shared/lib/alertStore'

export interface createComment {
  content: String
}

export interface comment extends createComment {
  rating: Array<string>
  author: String
  date: Date
  postId: string
  _id: string
}

const useCommentStore = defineStore('comment', () => {
  const url = 'http://localhost:5000/api/posts/'
  const alert = useAlertStore()
  const router = useRouter()

  async function create(id: string, comment: createComment) {
    await axios
      .post(url + id + '/comments', comment)
      .then((res) => {
        router.go(0)
        alert.set(res.data.header, res.data.message)
      })
      .catch((err) => alert.set(err.response.data.header, err.response.data.message))
  }

  async function updateRating(postId: string, commentId: string) {
    await axios
      .post(url + postId + '/comments/rating/' + commentId)
      .catch((err) => alert.set(err.response.data.header, err.response.data.message))
  }

  return { create, updateRating }
})

export default useCommentStore
