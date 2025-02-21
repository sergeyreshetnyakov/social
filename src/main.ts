import './shared/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import HomeLayout from './pages/HomeLayout.vue'
import router from './app/router.ts'

const pinia = createPinia()
const app = createApp(HomeLayout)

app.use(pinia)
app.use(router)

app.mount('#app')
