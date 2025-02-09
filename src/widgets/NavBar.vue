<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/" class="pretty-link">Home</RouterLink>
    <div class="flex gap-3">
      <div class="my-auto">
        <RouterLink to="/post" class="button-inline mr-4 hover:bg-green-300">
          <i class="pi pi-pen-to-square text-xl py-2 px-2"></i>
        </RouterLink>
      </div>
      <RouterLink to="/login" class="button-solid">Login</RouterLink>
      <RouterLink to="/register" class="button-outline">Register</RouterLink>
    </div>
  </nav>
</template>
