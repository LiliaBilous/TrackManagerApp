<template>
  <BaseModal @close="$emit('close')">
    <!-- Title -->
    <template #title>
      <h2 class="modal-title">Edit Track</h2>
    </template>
    <template #content>
      <form id="edit-track-form" @submit.prevent="handleSubmit" class="form">
        <!-- Title -->
        <div class="form-group">
          <label class="form-label" for="title-input">Title</label>
          <input
            id="title-input"
            v-model="form.title"
            class="form-input"
            data-testid="title-input"
          />
          <p v-if="errors.title" class="error-text" data-testid="error-title">{{ errors.title }}</p>
        </div>

        <!-- Artist -->
        <div class="form-group">
          <label class="form-label" for="artist-input">Artist</label>
          <input id="artist-input" v-model="form.artist" class="form-input" />
          <p v-if="errors.artist" class="error-text" data-testid="error-artist">
            {{ errors.artist }}
          </p>
        </div>

        <!-- Album -->
        <div class="form-group">
          <label class="form-label" for="album-input">Album</label>
          <input id="album-input" v-model="form.album" class="form-input" />
        </div>

        <!-- Cover Image -->
        <div class="form-group">
          <label class="form-label" for="cover-image-input">Cover Image URL</label>
          <input id="cover-image-input" v-model="form.coverImage" class="form-input" />
          <p v-if="errors.coverImage" class="error-text">{{ errors.coverImage }}</p>
          <img :src="form.coverImage" class="image-preview" :alt="'Cover image preview'" />
        </div>

        <!-- Genre Selector -->
        <div class="form-group">
          <GenreSelector v-model:selected="form.genres" />
          <p v-if="errors.genres" class="error-text">{{ errors.genres }}</p>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="modal-actions">
        <button
          type="button"
          @click="$emit('close')"
          class="button button-cancel"
          data-testid="cancel-button"
          aria-label="Cancel editing track"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="edit-track-form"
          class="button button-submit"
          data-testid="submit-button"
          aria-label="Save track changes"
        >
          Save
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/modal/BaseModal.vue'
import GenreSelector from '@/shared/components/GenreSelector.vue'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import type { ValidationErrors } from '@/features/tracks/schema/trackFormSchema'
import { validateTrackForm } from '@/shared/utils/formValidation.ts'
import { DEFAULT_COVER_IMAGE } from '@/shared/constants.ts'
import { defaultValidationErrors } from '@/features/tracks/utils/defaultTrackForm'

type TrackFormFields = Pick<Track, 'title' | 'artist' | 'album' | 'genres' | 'coverImage'>

// --- Props & Emits ---
const props = defineProps<{
  track: Track
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated', updatedTrack: Track): void
}>()

// --- State ---
const form = ref<TrackFormFields>({
  title: props.track.title,
  artist: props.track.artist,
  album: props.track.album,
  genres: props.track.genres,
  coverImage: props.track.coverImage ?? DEFAULT_COVER_IMAGE,
})

const errors = ref<ValidationErrors>({
  ...defaultValidationErrors,
})

watch(
  () => props.track,
  (newVal) => {
    form.value = {
      title: newVal.title,
      artist: newVal.artist,
      album: newVal.album,
      genres: [...newVal.genres],
      coverImage: newVal.coverImage ?? DEFAULT_COVER_IMAGE,
    }
  }
)

// --- Form submit ---
async function handleSubmit() {
  const result = validateTrackForm(form.value)
  errors.value = result.errors

  if (!result.isValid) return

  const updatedTrack: Track = {
    ...props.track,
    ...form.value,
  }

  emit('updated', updatedTrack)
  emit('close')
}
</script>
