import useDialogStore from '@/shared/lib/dialogStore'
import router from '@/app/router'
import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface createUser {
  username: string
  password: string
  email: string
}

export interface user extends createUser {
  description: string
}

const url = 'http://localhost:5000/api/users/'

const useUserStore = defineStore('user', () => {
  const dialog = useDialogStore()

  const data = ref<user>()
  const authToken = ref<string>()
  const isLogedIn = ref<boolean>(false)

  async function register(user: user) {
    const res = await axios.post(url + 'register', user).catch((err) => {
      return dialog.setAlert(err.response.data.header, err.response.data.message)
    })

    dialog.setAlert(res.data.header, res.data.header)

    if (res.status === 201) {
      login(user)
    }
  }

  async function login(user: user) {
    await axios
      .post(url + 'login', user)
      .then((res) => {
        isLogedIn.value = true
        data.value = user
        authToken.value = res.data.token
        dialog.setAlert(res.data.header, res.data.message)
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken.value}`
        router.push({ path: '/', replace: true })
      })
      .catch((err) => {
        return dialog.setAlert(err.response.data.header, err.response.data.message)
      })
  }

  async function getByUsername(username: string): Promise<user> {
    const res = await axios.get(url + username)

    if (res.status !== 200) {
      dialog.setAlert(res.data.header, res.data.message)
    }

    return res.data
  }

  return { register, login, getByUsername, data, isLogedIn }
})

export default useUserStore
