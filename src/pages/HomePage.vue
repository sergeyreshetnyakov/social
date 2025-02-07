<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'
import usePostStore from '@/features/PostStore'
import { ref } from 'vue'

const postStore = usePostStore()
const posts = postStore.getAll()

const isLoaded = ref<boolean>(false)

console.log(isLoaded.value)

posts.then(() => {
  isLoaded.value = true
  console.log(isLoaded.value)
})
</script>

<template>
  <div :v-if="isLoaded">
    <post-item v-for="post in posts" :key="post._id" v-bind="post" />
  </div>
</template>
