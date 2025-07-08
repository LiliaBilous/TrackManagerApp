<template>
  <BaseModal @close="$emit('close')">
    <!-- Title -->
    <template #title> Confirm Delete </template>
    <!-- Main content -->
    <template #content>
      <p>
        Are you sure you want to delete <strong>{{ track.title }}</strong
        >?
      </p>
    </template>
    <!-- Footer buttons -->
    <template #footer>
      <div class="button-row">
        <button
          type="button"
          class="button button-cancel"
          @click="$emit('close')"
          data-testid="cancel-delete"
          aria-label="Cancel deletion"
        >
          Cancel
        </button>
        <button
          type="button"
          class="button button-submit"
          @click="confirmDelete"
          data-testid="confirm-delete"
          aria-label="Confirm deletion"
        >
          Delete
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/shared/components/modal/BaseModal.vue'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', id: number): void
}>()

const props = defineProps<{
  track: { id: number; title: string }
}>()

function confirmDelete() {
  emit('confirm', props.track.id)
  emit('close')
}
</script>
