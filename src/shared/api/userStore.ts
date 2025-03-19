import useAlertStore from '@/shared/lib/alertStore'
import router from '@/app/router'
import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface login {
  username: string
  password: string
}

export interface register extends login{
  email: string
}

export interface user extends register {
  description: string
}

const url = 'http://localhost:5000/api/users/'

const useUserStore = defineStore('user', () => {
  const alert = useAlertStore()

  const data = ref<login>()
  const authToken = ref<string>()
  const isLogedIn = ref<boolean>(false)

  async function register(user: register) {
    await axios
      .post(url + 'register', user)
      .then((res) => {
        alert.set(res.data.header, res.data.message)

        if (res.status === 201) {
          login(user)
        }
      })
      .catch((err) => {
        return alert.set(err.response.data.header, err.response.data.message)
      })
  }

  async function login(user: login) {
    await axios
      .post(url + 'login', user)
      .then((res) => {
        isLogedIn.value = true
        data.value = user
        authToken.value = res.data.token
        alert.set(res.data.header, res.data.message)
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken.value}`
        router.push({ path: '/', replace: true })
      })
      .catch((err) => {
        return alert.set(err.response.data.header, err.response.data.message)
      })
  }

  async function getByUsername(username: string): Promise<user> {
    const res = await axios.get(url + username)

    if (res.status !== 200) {
      alert.set(res.data.header, res.data.message)
    }

    return res.data
  }

  return { register, login, getByUsername, data, isLogedIn }
})

export default useUserStore
