import { defineStore } from 'pinia'
import { ref, h, type Component } from 'vue'
import alertWindow from '../ui/alertWindow.vue'

const useAlertStore = defineStore('alert', () => {
  const current = ref<Component>()

  function set(header: string, message: string) {
    current.value = h(alertWindow, null, {
      header: () => header,
      main: () => message,
    })
  }


  function reset() {
    current.value = undefined
  }

  return { current, set, reset }
})

export default useAlertStore
