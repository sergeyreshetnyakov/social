<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'
import usePostStore, { type post } from '@/shared/api/postStore'
import { ref } from 'vue'

const isLoaded = ref<boolean>(false)

const post = usePostStore()
const posts = ref<post[]>()

post.getAll().then((res) => {
  posts.value = res
  isLoaded.value = true
})

</script>

<template>
  <div v-if="isLoaded">
    <post-item v-for="item in posts" v-bind="item" :key="item._id" />
  </div>
</template>
