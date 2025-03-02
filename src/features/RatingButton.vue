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
import usePostStore from '@/shared/api/postStore'
import useUserStore from '@/shared/api/userStore'
import useCommentStore from '@/shared/api/commentStore'

import { storeToRefs } from 'pinia'
import { ref } from 'vue'

interface props {
  type: 'post' | 'comment'
  rating: Array<string>
  postId: string
  commentId: string | undefined
}

const props = defineProps<props>()
const isLiked = ref<boolean>(false)
const rating = ref<Array<string>>(props.rating)

const post = usePostStore()
const comment = useCommentStore()
const user = useUserStore()

const { data: userData } = storeToRefs(user)

if (userData.value?.username) {
  if (rating.value.includes(userData.value?.username)) {
    isLiked.value = true
  } else isLiked.value = false
}

function updateRating() {
  if (props.type === 'post') post.updateRating(props.postId)
  else comment.updateRating(props.postId, props?.commentId)

  if (userData.value) {
    isLiked.value = !isLiked.value
    if (isLiked.value) {
      rating.value = rating.value.push(userData.value?.username)
    } else {
      rating.value = rating.value.pop()
    }
  }
}
</script>
