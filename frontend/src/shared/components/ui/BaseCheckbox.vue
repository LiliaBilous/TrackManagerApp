<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" :checked="checked" @change="handleChange" :id="id"
      :data-testid="dataTestid" :aria-label="ariaLabel" />
    <span class="checkbox__box">
      <svg v-if="checked" class="checkbox__check" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    </span>
    <span class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  checked: boolean
  id?: string
  dataTestid?: string
  ariaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

function handleChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('change', checked)
}
</script>
