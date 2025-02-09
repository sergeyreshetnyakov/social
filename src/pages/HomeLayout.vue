<template>
  <nav-bar />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '../widgets/NavBar.vue'
</script>
