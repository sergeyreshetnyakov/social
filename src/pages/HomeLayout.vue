<template>
  <nav-bar />
  <dialog-provider />
  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/widgets/NavBar.vue'
import DialogProvider from '@/shared/ui/DialogProvider.vue'
</script>
