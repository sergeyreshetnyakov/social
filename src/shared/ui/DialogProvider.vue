<template>
  <div v-if="current !== undefined">
    <component :is="current" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useDialogStore from '../lib/dialogStore'

const store = useDialogStore()
const { current } = storeToRefs(store)
</script>
