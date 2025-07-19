<template>
  <button :class="classList" :aria-label="ariaLabel" :data-testid="dataTestid" @click="onClick" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  ariaLabel?: string
  dataTestid?: string
  buttonClass?: string
  type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
function onClick(event: MouseEvent) {
  emit('click', event)
}

const ariaLabel = computed(() => props.ariaLabel || undefined)
const dataTestid = computed(() => props.dataTestid || undefined)

const classList = computed(() =>
  typeof props.buttonClass === 'string' ? props.buttonClass.split(' ') : props.buttonClass
)
</script>
