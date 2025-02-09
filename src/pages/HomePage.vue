<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'
import usePostStore, { type IPost } from '../features/postStore'
import { ref } from 'vue'

const postStore = usePostStore()

const posts = ref<IPost[]>()
const isLoaded = ref<boolean>(false)

postStore.getAll().then((res) => {
  posts.value = res
  isLoaded.value = true
})
</script>

<template>
  <div v-if="isLoaded">
    <post-item v-for="post in posts" :key="post._id" v-bind="post" />
  </div>
</template>
