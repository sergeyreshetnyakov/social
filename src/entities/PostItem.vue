<script setup lang="ts">
import usePostStore from '@/features/PostStore'
import useUserStore from '@/features/UserStore'
import type { IPost } from '@/features/PostStore'
import { ref } from 'vue'

const postStore = usePostStore()
const userStore = useUserStore()
const post = defineProps<IPost>()
const isLiked = ref<boolean>(false)

if (postStore.authToken && userStore.userData) {
  if (post.rating.includes(userStore.userData.username)) {
    isLiked.value = true
  }
}
</script>

<template>
  <div>
    <RouterLink to="/">{{ post.author }}</RouterLink>
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <div class="flex justify-center">
      <div class="flex gap-4">
        <span>{{ post.rating.length }}</span>
        <button @click="() => postStore.updateRating(post._id)">
          <i :class="isLiked ? 'pi pi-heart-fill text-red-400' : 'pi pi-heart'"></i>
        </button>
        <RouterLink to="/">
          <span>{{ post.comments.length }}</span>
          <i class="pi pi-comment"></i>
        </RouterLink>
      </div>
      <span>{{ post.date.toDateString() }}</span>
    </div>
  </div>
</template>
