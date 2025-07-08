<template>
  <BaseModal @close="$emit('close')">
    <!-- Title -->
    <template #title>
      <h2 class="modal-title">Create New Track</h2>
    </template>

    <template #content>
      <form @submit.prevent="handleSubmit" id="create-track-form">
        <!-- Title -->
        <div class="form-group">
          <label class="form-label" for="title-input">Title</label>
          <input
            id="title-input"
            v-model="form.title"
            class="form-input"
            data-testid="title-input"
          />
          <p v-if="errors.title" class="input-error" data-testid="error-title">
            {{ errors.title }}
          </p>
        </div>

        <!-- Artist -->
        <div class="form-group">
          <label class="form-label" for="input-artist">Artist</label>
          <input
            id="input-artist"
            v-model="form.artist"
            class="form-input"
            data-testid="input-artist"
          />
          <p v-if="errors.artist" class="input-error">{{ errors.artist }}</p>
        </div>

        <!-- Album -->
        <div class="form-group">
          <label class="form-label" for="input-album">Album</label>
          <input
            id="input-album"
            v-model="form.album"
            class="form-input"
            data-testid="input-album"
          />
        </div>

        <!-- GenreSelector -->
        <div class="form-group">
          <GenreSelector v-model:selected="form.genres" />
          <p v-if="errors.genres" class="input-error">{{ errors.genres }}</p>
        </div>

        <!-- Cover Image -->
        <div class="form-group">
          <label class="form-label" for="input-cover-image">Cover Image URL</label>
          <input
            id="input-cover-image"
            v-model="form.coverImage"
            placeholder="DEFAULT_COVER_IMAGE"
            class="form-input"
            data-testid="input-cover-image"
          />
          <p v-if="errors.coverImage" class="input-error">{{ errors.coverImage }}</p>
          <img
            loading="lazy"
            :src="form.coverImage ? form.coverImage : DEFAULT_COVER_IMAGE"
            alt="cover image preview"
            class="cover-image-preview"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <div class="button-row">
        <button
          type="button"
          @click="$emit('close')"
          class="button button-cancel"
          data-testid="cancel-button"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="create-track-form"
          class="button button-submit"
          data-testid="submit-button"
        >
          Create
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/modal/BaseModal.vue'
import GenreSelector from '@/shared/components/GenreSelector.vue'
import type { TrackForm, ValidationErrors } from '@/features/tracks/schema/trackFormSchema'
import { validateTrackForm } from '@/shared/utils/formValidation.ts'
import { DEFAULT_COVER_IMAGE } from '@/shared/constants.ts'
import { defaultTrackForm, defaultValidationErrors } from '@/features/tracks/utils/defaultTrackForm'

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
