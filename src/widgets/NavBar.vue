<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface IProps {
  routes: Array<{
    name: string
    path: string
  }>
}

const routes = defineProps<IProps>()
</script>

<template>
  <nav>
    <RouterLink v-for="route in routes.routes" :to="route.path">
      {{ route.name }}
    </RouterLink>
  </nav>
</template>
