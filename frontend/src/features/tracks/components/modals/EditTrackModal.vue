<template>
  <BaseModal @close="$emit('close')">
    <template #title>
      <h2 class="modal-title">Edit Track</h2>
    </template>
    <template #content>
      <form id="edit-track-form" @submit.prevent="handleSubmit" class="form">
        <BaseInput id="title-input" v-model="form.title" label="Title" :error="errors.title" data-testid="title-input"
          errorTestid="error-title" />
        <BaseInput id="artist-input" v-model="form.artist" label="Artist" :error="errors.artist"
          data-testid="artist-input" errorTestid="error-artist" />
        <BaseInput id="album-input" v-model="form.album" label="Album" data-testid="album-input" />
        <BaseInput id="cover-image-input" v-model="form.coverImage" label="Cover Image URL" :error="errors.coverImage"
          data-testid="cover-image-input" errorTestid="error-coverImage" />
        <GenreSelector v-model:selected="form.genres" />
        <p v-if="errors.genres" class="error-text">{{ errors.genres }}</p>
        <img :src="form.coverImage" class="image-preview" :alt="'Cover image preview'" />
      </form>
    </template>
    <template #footer>
      <div class="modal-actions">
        <BaseButton :buttonClass="'button button-danger'" aria-label="Cancel editing track" data-testid="cancel-button"
          @click="$emit('close')" type="button">Cancel</BaseButton>
        <BaseButton :buttonClass="'button button-primary'" aria-label="Save track changes" data-testid="submit-button"
          type="submit" form="edit-track-form">Save</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/modal/BaseModal.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import GenreSelector from '@/shared/components/GenreSelector.vue'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import type { ValidationErrors } from '@/features/tracks/schema/trackFormSchema'
import { validateTrackForm } from '@/shared/utils/formValidation.ts'
import { DEFAULT_COVER_IMAGE } from '@/shared/constants.ts'
import { defaultValidationErrors } from '@/features/tracks/utils/defaultTrackForm'
import BaseInput from '@/shared/components/ui/BaseInput.vue'

type TrackFormFields = Pick<Track, 'title' | 'artist' | 'album' | 'genres' | 'coverImage'>

const props = defineProps<{
  track: Track
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated', updatedTrack: Track): void
}>()

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
