<template>
  <div :v-if="isLoaded">
    <post-item v-for="post in posts" :key="post._id" v-bind="post" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import PostItem from '@/entities/PostItem.vue'

import useDialogStore from '@/shared/lib/dialogStore'
import usePostStore, { type post } from '@/features/postStore'
import postNotFound from '@/entities/dialogs/PostNotFound.vue'
import { ref } from 'vue'

const postStore = usePostStore()
const dialogStore = useDialogStore()

const posts = ref<post[]>()
const isLoaded = ref<boolean>(false)

function showDialog() {
  dialogStore.set(postNotFound)
  console.log(dialogStore.current)
}

postStore.getAll().then((res) => {
  posts.value = res
  isLoaded.value = true
})
</script>
