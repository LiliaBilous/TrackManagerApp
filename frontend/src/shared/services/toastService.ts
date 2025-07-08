import { useToast, TYPE } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'

const toast = useToast()

function showToast(type: keyof typeof TYPE, msg: string) {
  toast(msg, {
    type: TYPE[type],
    toastClassName: `toast-${type.toLowerCase()}`,
  } as PluginOptions)
}

export function notifySuccess(msg: string) {
  showToast('SUCCESS', msg)
}

export function notifyError(msg: string) {
  showToast('ERROR', msg)
}

export function notifyInfo(msg: string) {
  showToast('INFO', msg)
}
