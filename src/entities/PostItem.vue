<template>
  <div class="flex gap-4 mt-4 mb-2">
    <h3 class="text-xl font-medium">{{ props.title }}</h3>
    <user-link :author="props.author" />
  </div>
  <p>{{ props.content }}</p>
  <div class="flex gap-2 mt-2">
    <rating-button :_id="props._id" :rating="props.rating" />
    <router-link class="flex gap-2 button-inline hover:bg-blue-300" :to="'/posts/' + props._id">
      <i class="pi pi-comment text-xl my-auto"></i>
      <span class="text-xl font-semibold">{{ props.comments.length }}</span>
    </router-link>
    <div class="flex ml-auto gap-1">
      <span class="font-medium text-zinc-700 my-auto">{{ date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import RatingButton from './RatingButton.vue'
import UserLink from './UserLink.vue'
import usePostStore from '@/features/postStore'
import type { post } from '@/features/postStore'

const props = defineProps<post>()
const post = usePostStore()
const date = new Date(props.date).toString().split(' ').slice(0, -5).toString().replaceAll(',', ' ')
</script>
