import { ref, shallowRef } from 'vue'
import type { Component } from 'vue'

interface ModalPayload {
  props?: Record<string, object>
  listeners?: Record<string, (...args: unknown[]) => void>
}

const component = shallowRef<Component | null>(null)
const show = ref(false)
const modalPayload = ref<ModalPayload | null>(null)

export function useModal() {
  return {
    component,
    show,
    modalPayload,
    showModal: (comp: Component, payload: ModalPayload = {}) => {
      component.value = comp
      modalPayload.value = payload
      show.value = true
    },
    hideModal: () => {
      component.value = null
      modalPayload.value = null
      show.value = false
    },
  }
}
