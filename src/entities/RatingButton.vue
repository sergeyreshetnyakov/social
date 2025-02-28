<template>
  <button @click="updateRating" class="flex gap-2 button-inline hover:bg-rose-300">
    <i
      :class="
        isLiked ? 'pi pi-heart-fill text-rose-500 text-xl my-auto' : 'pi pi-heart text-xl my-auto'
      "
    ></i>
    <span class="text-xl font-semibold">{{ props.rating.length }}</span>
  </button>
</template>

<script lang="ts" setup>
import usePostStore from '@/features/postStore'
import useUserStore from '@/features/userStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

interface props {
  _id: string
  rating: Array<string>
}
const props = defineProps<props>()

const post = usePostStore()
const user = useUserStore()
const { data: userData } = storeToRefs(user)
const isLiked = ref<boolean>(false)

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
