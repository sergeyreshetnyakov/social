<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '../widgets/NavBar.vue'

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Create Post',
    path: '/post',
  },
]
</script>

<template>
  <nav-bar :routes="routes"></nav-bar>

  <RouterView />
</template>
