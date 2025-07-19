<template>
  <BaseModal @close="$emit('close')">
    <template #title> Confirm Delete </template>
    <template #content>
      <p>
        Are you sure you want to delete <strong>{{ track.title }}</strong
        >?
      </p>
    </template>
    <template #footer>
      <div class="modal-actions">
        <BaseButton
          :buttonClass="'button button-danger'"
          aria-label="Cancel deletion"
          data-testid="cancel-delete"
          @click="$emit('close')"
          type="button"
          >Cancel</BaseButton
        >
        <BaseButton
          :buttonClass="'button button-primary'"
          aria-label="Confirm deletion"
          data-testid="confirm-danger"
          @click="confirmDelete"
          type="button"
        >
          Delete
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/shared/components/modal/BaseModal.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

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
