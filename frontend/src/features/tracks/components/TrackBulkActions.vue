<template>
  <div class="bulk__container">
    <label class="custom-checkbox">
      <input id="select-all" type="checkbox" :checked="selectAll" @change="toggleSelectAll" data-testid="select-all"
        aria-label="Select All" />
      <span class="checkmark"></span>
      Select All
    </label>

    <button data-testid="bulk-delete-button" class="bulk__button button" :disabled="!selectedIds.length"
      @click="$emit('delete-selected')">
      Delete {{ selectedIds.length }} Selected
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedIds: string[]
  selectAll: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectAll', value: boolean): void
  (e: 'delete-selected'): void
}>()

function toggleSelectAll(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:selectAll', checked)
}
</script>
