<template>
  <button :class="buttonClass" :aria-label="ariaLabel" :data-testid="dataTestid" @click="onClick" type="button">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  ariaLabel?: string
  dataTestid?: string
  buttonClass?: string | string[]
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
function onClick(event: MouseEvent) {
  emit('click', event)
}
const buttonClass = computed(() => props.buttonClass || '')
const ariaLabel = computed(() => props.ariaLabel || undefined)
const dataTestid = computed(() => props.dataTestid || undefined)
</script>

<style></style>
