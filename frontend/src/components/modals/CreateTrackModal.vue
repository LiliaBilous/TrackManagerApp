<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Create New Track</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="form-group">
          <label class="form-label" for="title-input">Title</label>
          <input id="title-input" v-model="form.title" class="form-input" data-testid="title-input" />
          <p v-if="errors.title" class="input-error" data-testid="error-title">{{ errors.title }}</p>
        </div>

        <!-- Artist -->
        <div class="form-group">
          <label class="form-label" for="input-artist">Artist</label>
          <input id="input-artist" v-model="form.artist" class="form-input" data-testid="input-artist" />
          <p v-if="errors.artist" class="input-error">{{ errors.artist }}</p>
        </div>

        <!-- Album -->
        <div class="form-group">
          <label class="form-label" for="input-album">Album</label>
          <input id="input-album" v-model="form.album" class="form-input" data-testid="input-album" />
        </div>

        <!-- GenreSelector -->
        <div class="form-group">
          <label class="form-label visually-hidden">Genres</label>
          <GenreSelector v-model:selected="form.genres" />
          <p v-if="errors.genres" class="input-error">{{ errors.genres }}</p>
        </div>

        <!-- Cover Image -->
        <div class="form-group">
          <label class="form-label" for="input-cover-image">Cover Image URL</label>
          <input id="input-cover-image" v-model="form.coverImage" placeholder="https://placehold.co/100"
            class="form-input" data-testid="input-cover-image" />
          <p v-if="errors.coverImage" class="input-error">{{ errors.coverImage }}</p>
          <img :src="form.coverImage.trim() && isValidImageUrl(form.coverImage) ? form.coverImage : defaultImage"
            alt="cover image preview" class="cover-image-preview" />
        </div>

        <div class="button-row">
          <button type="button" @click="$emit('close')" class="button button-cancel" data-testid="cancel-button">
            Cancel
          </button>
          <button type="submit" class="button button-submit" data-testid="submit-button">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GenreSelector from '@/components/common/GenreSelector.vue'
import { isValidImageUrl, validateTrackForm } from '@/utils/validation'

const emit = defineEmits(['close', 'new-track'])

const form = ref({
  title: '',
  artist: '',
  album: '',
  coverImage: 'https://placehold.co/100',
  genres: []
})

const errors = ref({
  title: '',
  artist: '',
  genres: '',
  coverImage: ''
})

const defaultImage = 'https://placehold.co/100'

function handleSubmit() {
  const { isValid, errors: newErrors } = validateTrackForm(form.value)
  errors.value = newErrors

  if (!isValid) return
  emit('new-track', form.value)
  emit('close')
}
</script>
