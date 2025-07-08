<template>
  <div class="modal-overlay" role="dialog" aria-modal="true" :aria-labelledby="ariaLabelledby"
    :aria-describedby="ariaDescribedby" @click.self="handleClose" @keydown.esc="handleClose">
    <div ref="modalContent" class="modal-content" tabindex="-1">
      <!-- Title slot -->
      <header v-if="$slots.title" class="modal-header" :id="ariaLabelledby">
        <slot name="title" />
      </header>

      <!-- Default slot (main content) -->
      <section class="modal-body" :id="ariaDescribedby">
        <slot name="content" />
      </section>

      <!-- Footer slot -->
      <footer v-if="$slots.footer" class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleClose() {
  emit('close')
}

const modalContent = ref<HTMLElement | null>(null)

const ariaLabelledby = 'modal-title'
const ariaDescribedby = 'modal-desc'
import { useFocusTrap } from '@/shared/composables/useFocusTrap'
useFocusTrap(modalContent)
</script>

<style></style>
