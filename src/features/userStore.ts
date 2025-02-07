import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

interface IUser {
  username: string
  password: string
  email: string
}

const url = 'http://localhost:5000/api/users/'

const useUserStore = defineStore('user', () => {
  const userData = ref<IUser>()

  async function register(user: IUser) {
    const res = await axios.post(url + 'register', user)

    return { status: res.status, res: res.data }
  }

  async function login(user: IUser) {
    const res = await axios.post(url + 'login', user)

    if (res.status !== 400) {
      userData.value = user
    }

    return { status: res.status, res: res.data }
  }

  async function getByEmail(email: string) {
    const res = await axios.post(url, {
      email: email,
    })

    return { status: res.status, res: res.data }
  }

  return { register, login, getByEmail, userData }
})

export default useUserStore
