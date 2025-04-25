import { useToast } from 'vue-toastification'

const toast = useToast()

function showToast(type, msg) {
  const testId = `toast-${type}`
  toast(msg, {
    type,
    onMounted(el) {
      el?.setAttribute('data-testid', testId)
    }
  })
}

export function notifySuccess(msg) {
  showToast('success', msg)
}

export function notifyError(msg) {
  showToast('error', msg)
}

export function notifyInfo(msg) {
  showToast('info', msg)
}
