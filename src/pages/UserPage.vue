<template>
  <h1 class="text-lg font-semibold flex justify-center">{{ userData?.username }}</h1>
  <p class="flex justify-center">{{ userData?.description }}</p>
  <div class="mt-6" :v-if="isLoaded">
    <h1 class="flex justify-center font-semibold text-xl">Posts</h1>
    <post-item v-for="post in posts" :key="post._id" v-bind="post" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'
import useUserStore, { type user } from '@/shared/api/userStore'
import usePostStore, { type post } from '@/shared/api/postStore'

import { useRoute } from 'vue-router'
import { ref } from 'vue'

const user = useUserStore()
const post = usePostStore()
const route = useRoute()

const userData = ref<user>()
const posts = ref<post[]>()
const isLoaded = ref<boolean>(false)

user.getByUsername(route.params.username as string).then((res) => {
  userData.value = res
})

post.getByAuthor(route.params.username as string).then((res) => {
  if(res) posts.value = res
  isLoaded.value = true
})
</script>
