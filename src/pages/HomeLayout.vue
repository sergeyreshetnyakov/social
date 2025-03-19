<template>
  <nav-bar />
  <alert-provider />
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/widgets/NavBar.vue'
import alertProvider from '@/shared/ui/alertProvider.vue'
</script>
