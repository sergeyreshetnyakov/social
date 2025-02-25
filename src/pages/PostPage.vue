<template>
  <div :v-if="isLoaded">
    <post-item v-for="post in posts" :key="post._id" v-bind="post" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import usePostStore, { type post } from '../features/postStore'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PostItem from '@/entities/PostItem.vue'

const post = usePostStore()
const route = useRoute()

const postData = ref<post>()
const isLoaded = ref<boolean>(false)

post.getById(route.params.postId as string).then((res) => {
  postData.value = res
})
</script>
