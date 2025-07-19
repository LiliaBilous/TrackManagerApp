<template>
  <div class="bulk__container">
    <BaseCheckbox
      :checked="selectAll"
      data-testid="select-all"
      aria-label="Select All"
      @change="toggleSelectAll"
    >
      Select All
    </BaseCheckbox>
    <BaseButton
      data-testid="bulk-delete-button"
      class="button button-secondary"
      :disabled="!selectedIds.length"
      @click="$emit('delete-selected')"
    >
      Delete {{ selectedIds.length }} Selected
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseCheckbox from '@/shared/components/ui/BaseCheckbox.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
defineProps<{
  selectedIds: string[]
  selectAll: boolean
}>()

const emit = defineEmits<{
  (e: 'update:selectAll', value: boolean): void
  (e: 'delete-selected'): void
}>()

function toggleSelectAll(checked: boolean) {
  emit('update:selectAll', checked)
}
</script>
