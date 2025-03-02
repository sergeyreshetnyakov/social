import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import axios from 'axios'
import useDialogStore from '@/shared/lib/dialogStore'

export interface createComment {
  content: String
  rating: Array<string>
}

export interface comment extends createComment {
  author: String
  date: Date
  postId: string
  _id: string
}

const useCommentStore = defineStore('comment', () => {
  const url = 'http://localhost:5000/api/posts/'
  const dialog = useDialogStore()
  const router = useRouter()

  async function create(id: string, comment: createComment) {
    await axios
      .post(url + id + '/comments', comment)
      .then((res) => {
        router.go(0)
        dialog.setAlert(res.data.header, res.data.message)
      })
      .catch((err) => dialog.setAlert(err.response.data.header, err.response.data.message))
  }

  async function updateRating(postId: string, commentId: string) {
    await axios
      .post(url + postId + '/comments/rating/' + commentId)
      .catch((err) => dialog.setAlert(err.response.data.header, err.response.data.message))
  }

  return { create, updateRating }
})

export default useCommentStore
