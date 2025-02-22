<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="flex gap-4 mt-4 mb-2">
    <h3 class="text-xl font-medium">{{ props.title }}</h3>
    <RouterLink
      class="text-base font-medium text-zinc-500 my-auto no-underline hover:text-zinc-800"
      to="/"
    >
      {{ props.author }}
    </RouterLink>
  </div>
  <p>{{ props.content }}</p>
  <div class="flex gap-2 mt-2">
    <button @click="updateRating" class="flex gap-2 button-inline hover:bg-rose-300">
      <i
        :class="
          isLiked ? 'pi pi-heart-fill text-rose-500 text-xl my-auto' : 'pi pi-heart text-xl my-auto'
        "
      ></i>
      <span class="text-xl font-semibold">{{ props.rating.length }}</span>
    </button>
    <RouterLink class="flex gap-2 button-inline hover:bg-blue-300" to="/">
      <i class="pi pi-comment text-xl my-auto"></i>
      <span class="text-xl font-semibold">{{ props.comments.length }}</span>
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
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const props = defineProps<post>()

const post = usePostStore()
const user = useUserStore()
const { data: userData } = storeToRefs(user)

const isLiked = ref<boolean>(false)

const date = new Date(props.date).toString().split(' ').slice(0, -5).toString().replaceAll(',', ' ')

if (userData.value?.username) {
  if (props.rating.includes(userData.value?.username)) {
    isLiked.value = true
  } else isLiked.value = false
}

function updateRating() {
  post.updateRating(props._id)
  if (userData.value) {
    isLiked.value = !isLiked.value
    if (isLiked.value) {
      props.rating = props.rating.push(userData.value?.username)
    } else {
      props.rating = props.rating.pop()
    }
  }
}
</script>
