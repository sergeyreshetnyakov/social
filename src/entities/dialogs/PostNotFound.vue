<template>
  <dialog-window>
    <template #header>Post not found</template>
    <template #main>This post doesn't exist</template>
    <template #footer><button class="button-solid">OK</button></template>
  </dialog-window>
</template>

<script setup lang="ts">
import DialogWindow from '@/shared/ui/DialogWindow.vue'
</script>
