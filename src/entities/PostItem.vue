<template>
  <div class="mt-6 mb-4">
    <div class="flex justify-between gap-4">
      <h3 class="text-xl font-medium">{{ props.title }}</h3>
      <user-link :author="props.author" />
    </div>
    <p class="break-words">{{ props.content }}</p>
    <div class="flex gap-2 mt-2">
      <rating-button type="post" :rating="props.rating" :postId="props._id" commentId="none" />
      <router-link class="flex gap-2 button-inline hover:bg-blue-300" :to="'/posts/' + props._id">
        <i class="pi pi-comment text-xl my-auto"></i>
        <span class="text-xl font-semibold">{{ props.comments.length }}</span>
      </router-link>
      <div class="flex ml-auto gap-1">
        <span class="font-medium text-zinc-700 my-auto">{{ props.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RatingButton from '@/features/RatingButton.vue'
import UserLink from '@/features/UserLink.vue'
import usePostStore from '@/shared/api/postStore'
import type { post } from '@/shared/api/postStore'

const props = defineProps<post>()
const post = usePostStore()
</script>
