import { defineStore } from 'pinia'
import { ref, h, type Component } from 'vue'
import DialogWindow from '../ui/DialogWindow.vue'

const useDialogStore = defineStore('dialog', () => {
  const current = ref<Component>()

  function setAlert(header: string, message: string) {
    current.value = h(DialogWindow, null, {
      header: () => header,
      main: () => message,
    })
  }

  function set(dialog: Component) {
    current.value = dialog
  }

  return { current, set, setAlert }
})

export default useDialogStore
