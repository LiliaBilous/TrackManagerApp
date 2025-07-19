<template>
  <BaseModal @close="$emit('close')">
    <template #title>
      <h2 class="modal-title">Create New Track</h2>
    </template>
    <template #content>
      <form @submit.prevent="handleSubmit" id="create-track-form" class="form">
        <BaseInput id="title-input" v-model="form.title" label="Title" :error="errors.title" data-testid="title-input"
          errorTestid="error-title" />

        <BaseInput id="input-artist" v-model="form.artist" label="Artist" :error="errors.artist"
          data-testid="input-artist" />

        <BaseInput id="input-album" v-model="form.album" label="Album" data-testid="input-album" />

        <BaseInput id="input-cover-image" v-model="form.coverImage" label="Cover Image URL" :error="errors.coverImage"
          data-testid="input-cover-image" :placeholder="DEFAULT_COVER_IMAGE" />
        <GenreSelector v-model:selected="form.genres" />
        <p v-if="errors.genres" class="input-error">{{ errors.genres }}</p>
        <div class="form-group">
          <img loading="lazy" :src="form.coverImage ? form.coverImage : DEFAULT_COVER_IMAGE" alt="cover image preview"
            class="cover-image-preview" />
        </div>

      </form>
    </template>
    <template #footer>
      <div class="modal-actions">
        <BaseButton :buttonClass="'button button-danger'" aria-label="Cancel create" data-testid="cancel-button"
          @click="$emit('close')" type="button">Cancel</BaseButton>
        <BaseButton :buttonClass="'button button-primary'" aria-label="Create track" data-testid="submit-button"
          type="submit" form="create-track-form">Create</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/modal/BaseModal.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import GenreSelector from '@/shared/components/GenreSelector.vue'
import type { TrackForm, ValidationErrors } from '@/features/tracks/schema/trackFormSchema'
import { validateTrackForm } from '@/shared/utils/formValidation.ts'
import { DEFAULT_COVER_IMAGE } from '@/shared/constants.ts'
import { defaultTrackForm, defaultValidationErrors } from '@/features/tracks/utils/defaultTrackForm'
import BaseInput from '@/shared/components/ui/BaseInput.vue'

const emit = defineEmits<{
  (e: 'close'): void
  (
    e: 'new-track',
    payload: {
      title: string
      artist: string
      album?: string
      coverImage: string
      genres: string[]
    }
  ): void
}>()

const form = ref<TrackForm>({
  ...defaultTrackForm,
})

const errors = ref<ValidationErrors>({
  ...defaultValidationErrors,
})

function handleSubmit() {
  const result = validateTrackForm(form.value)
  errors.value = result.errors
  if (!result.isValid) return

  emit('new-track', form.value)
  emit('close')
}
</script>
