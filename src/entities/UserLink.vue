<template>
  <RouterLink
    class="text-base font-medium text-zinc-500 my-auto no-underline hover:text-zinc-800"
    :to="'/' + props.author"
  >
    {{ props.author }}
  </RouterLink>
</template>
<script lang="ts" setup>
import { RouterLink } from 'vue-router'

interface props {
  author: string
}

const props = defineProps<props>()
</script>
