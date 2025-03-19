<template>
  <div v-if="current !== undefined">
    <component :is="current" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAlertStore from '../lib/alertStore'

const store = useAlertStore()
const { current } = storeToRefs(store)
</script>
