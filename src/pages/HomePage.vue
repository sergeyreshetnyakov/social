<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'
import usePostStore from '@/shared/api/postStore'
import { ref } from 'vue'

const isLoaded = ref<boolean>(false)

const post = usePostStore()
const posts = post.getAll().then(() => isLoaded.value = true)

console.log(posts)
</script>

<template>
  <div v-if="isLoaded">
    <post-item v-for="item in posts" :key="item._id" v-bind="item" />
  </div>
</template>
