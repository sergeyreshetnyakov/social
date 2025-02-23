<template>
  <dialog id="dialog" class="border rounded-lg py-2 px-3 mx-auto mt-[20vh]" open>
    <div class="flex justify-between">
      <h2 class="text-lg font-semibold">
        <slot name="header"></slot>
      </h2>
      <button class="button-inline hover:bg-red-300" @click="close">
        <i class="pi pi-times"></i>
      </button>
    </div>
    <main>
      <slot name="main"></slot>
    </main>
    <div class="flex-col justify-end">
      <footer class="flex justify-center mt-3 mb-2 gap-2">
        <button class="button-solid" @click="close">OK</button>
      </footer>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import useDialogStore from '../lib/dialogStore'

const store = useDialogStore()

const close = () => {
  document.getElementById('dialog')?.close()
  store.set(undefined)
}
</script>
