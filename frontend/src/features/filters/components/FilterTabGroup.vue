<template>
  <div class="filter-tabs" role="group" :aria-label="ariaLabel">
    <button
      v-for="option in options"
      :key="option"
      :class="['tab', variant, { active: modelValue === option }]"
      :aria-pressed="modelValue === option"
      :aria-label="modelValue === option ? `Unselect ${option}` : `Select ${option}`"
      @click="toggleOption(option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: string[]
  modelValue: string | undefined
  ariaLabel: string
  variant: 'genre' | 'sort'
}>()

const emit = defineEmits(['modelValue'])

function toggleOption(option: string) {
  emit('modelValue', props.modelValue === option ? '' : option)
}
</script>
<style></style>
