import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/:username',
      name: 'user',
      component: () => import('../pages/UserPage.vue'),
    },
    {
      path: '/posts/:postId',
      name: 'post',
      component: () => import('../pages/PostPage.vue'),
    },
    {
      path: '/post',
      name: 'create post',
      component: () => import('../pages/CreatePostPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/RegisterPage.vue'),
    },
  ],
})

export default router
