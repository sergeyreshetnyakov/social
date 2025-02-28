<template>
  <div class="flex gap-4 mt-4 mb-2">
    <h3 class="text-lg font-semibold flex my-auto">{{ props.author }}</h3>
    <user-link :author="props.author" />
  </div>
  <p>{{ props.content }}</p>
  <div class="flex gap-2 mt-2">
    <rating-button :_id="props._id" :rating="props.rating" />
    <div class="flex ml-auto gap-1">
      <span class="font-medium text-zinc-700">{{ date }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RatingButton from '../features/RatingButton.vue'
import { type comment } from '@/shared/api/postStore'

const props = defineProps<comment>()
const date = new Date(props.date).toString().split(' ').slice(0, -5).toString().replaceAll(',', ' ')
</script>
