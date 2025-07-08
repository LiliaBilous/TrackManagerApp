import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useFocusTrap(target: Ref<HTMLElement | null>) {
  const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusableElements = target.value?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusableElements || focusableElements.length === 0) return

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (!first || !last) return

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    target.value?.focus()
    document.addEventListener('keydown', trapFocus)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', trapFocus)
  })
}
