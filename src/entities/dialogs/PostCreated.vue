<template>
  <dialog-window>
    <template #header>Post created</template>
    <template #main>Your post successfuly created</template>
    <template #footer><button class="button-solid">OK</button></template>
  </dialog-window>
</template>

<script setup lang="ts">
import DialogWindow from '@/shared/ui/DialogWindow.vue'
</script>
