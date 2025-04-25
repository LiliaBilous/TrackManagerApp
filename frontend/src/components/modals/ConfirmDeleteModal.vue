<template>
    <div class="modal-overlay" @click.self="$emit('close')" data-testid="confirm-dialog" role="dialog" aria-modal="true"
        aria-labelledby="confirm-title" aria-describedby="confirm-message">
        <div class="modal-content">
            <h2 id="confirm-title" class="modal-title">Confirm Delete</h2>
            <p id="confirm-message">
                Are you sure you want to delete <strong>{{ track.title }}</strong>?
            </p>

            <div class="button-row">
                <button type="button" class="button button-cancel" @click="$emit('close')" data-testid="cancel-delete"
                    aria-label="Cancel deletion">
                    Cancel
                </button>
                <button type="button" class="button button-submit" @click="confirmDelete" data-testid="confirm-delete"
                    aria-label="Confirm deletion">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
const emit = defineEmits(['close', 'confirm'])
const props = defineProps({
    track: {
        type: Object,
        required: true
    }
})

function confirmDelete() {
    console.log('Deleting track with ID:', props.track.id)
    emit('confirm', props.track.id)
    emit('close')
}
</script>