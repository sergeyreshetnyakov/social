<template>
  <div class="flex gap-4 mt-4 mb-2">
    <h3 class="text-xl font-medium">{{ post.title }}</h3>
    <RouterLink
      class="text-base font-medium text-zinc-500 my-auto no-underline hover:text-zinc-800"
      to="/"
    >
      {{ post.author }}
    </RouterLink>
  </div>
  <p>{{ post.content }}</p>
  <div class="flex gap-2 mt-2">
    <button @click="updateRating" class="flex gap-2 button-inline hover:bg-rose-300">
      <i
        :class="
          isLiked ? 'pi pi-heart-fill text-rose-800 text-xl my-auto' : 'pi pi-heart text-xl my-auto'
        "
      ></i>
      <span class="text-xl font-semibold">{{ post.rating.length }}</span>
    </button>
    <RouterLink class="flex gap-2 button-inline hover:bg-blue-300" to="/">
      <i class="pi pi-comment text-xl my-auto"></i>
      <span class="text-xl font-semibold">{{ post.comments.length }}</span>
    </RouterLink>
    <div class="flex ml-auto gap-1">
      <span class="font-medium text-zinc-700">{{ date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePostStore from '@/features/postStore'
import useUserStore from '@/features/userStore'
import type { post } from '@/features/postStore'
import { ref } from 'vue'

const postStore = usePostStore()
const userStore = useUserStore()
const post = defineProps<post>()
const isLiked = ref<boolean>(false)

if (postStore.authToken && userStore.userData) {
  if (post.rating.includes(userStore.userData.username)) {
    isLiked.value = true
  }
}

const date = new Date(post.date).toString().split(' ').slice(0, -5).toString().replaceAll(',', ' ')

function updateRating() {
  postStore.updateRating(post._id)
  console.log('popa')
}
</script>
