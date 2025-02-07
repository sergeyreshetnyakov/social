import './shared/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import HomeLayout from './pages/HomeLayout.vue'
import router from './app/router.ts'

const app = createApp(HomeLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')
