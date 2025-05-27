<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Edit Track</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Title -->
        <div class="form-group">
          <label class="form-label" for="title-input">Title</label>
          <input id="title-input" v-model="form.title" class="form-input" data-testid="title-input" />
          <p v-if="errors.title" class="error-text" data-testid="error-title">{{ errors.title }}</p>
        </div>

        <!-- Artist -->
        <div class="form-group">
          <label class="form-label" for="artist-input">Artist</label>
          <input id="artist-input" v-model="form.artist" class="form-input" />
          <p v-if="errors.artist" class="error-text" data-testid="error-artist">{{ errors.artist }}</p>
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
          <img :src="validImageUrl ? form.coverImage : fallbackImage" class="image-preview"
            :alt="validImageUrl ? 'Cover image preview' : 'Fallback cover image preview'" />
        </div>

        <!-- Genre Selector -->
        <div class="form-group">
          <label class="form-label visually-hidden">Genres</label>
          <GenreSelector v-model:selected="form.genres" />
          <p v-if="errors.genres" class="error-text">{{ errors.genres }}</p>
        </div>

        <!-- Actions -->
        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="button button-cancel" data-testid="cancel-button"
            aria-label="Cancel editing track">
            Cancel
          </button>
          <button type="submit" class="button button-submit" data-testid="submit-button"
            aria-label="Save track changes">
            Save
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import GenreSelector from '@/components/common/GenreSelector.vue'
import { isValidImageUrl, validateTrackForm } from '@/utils/validation'

const props = defineProps({
  track: Object,
})
const emit = defineEmits(['close', 'updated'])

const form = ref({ ...props.track })

const errors = ref({
  title: '',
  artist: '',
  genres: '',
  coverImage: '',
})

watch(() => props.track, (newVal) => {
  form.value = { ...newVal }
})

const fallbackImage = 'https://placehold.co/100'
const validImageUrl = computed(() => isValidImageUrl(form.value.coverImage))


async function handleSubmit() {
  const { isValid, errors: newErrors } = validateTrackForm(form.value)
  errors.value = newErrors

  if (!isValid) return

  emit('updated', form.value)
  emit('close')
}
</script>