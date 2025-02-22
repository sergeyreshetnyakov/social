<template>
  <div :v-if="isLoaded">
    <post-item v-for="post in posts" :key="post._id" v-bind="post" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'
import usePostStore, { type post } from '@/features/postStore'
import { ref } from 'vue'

const post = usePostStore()

const posts = ref<post[]>()
const isLoaded = ref<boolean>(false)

post.getAll().then((res) => {
  posts.value = res
  isLoaded.value = true
})
</script>
