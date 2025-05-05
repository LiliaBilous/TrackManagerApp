<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Upload File for {{ track.title }}</h2>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="audioFile" class="form-label">Upload Track (MP3, WAV)</label>

          <!-- Аудіоплеєр -->
          <div v-if="form.audioFileUrl" class="audio-player">
            <audio :src="form.audioFileUrl" controls class="audio-control" :data-testid="`audio-player-${track.id}`"
              :aria-label="`Audio preview for ${track.title}`"></audio>
            <button type="button" @click="removeAudioFile" class="button danger small"
              aria-label="Remove uploaded audio file">
              Remove File
            </button>
          </div>

          <!-- Назва файлу -->
          <p v-if="form.audioFile" class="file-name" data-testid="audio-file-name">
            {{ form.audioFile.name }}
          </p>

          <!-- Інпут для завантаження -->
          <div v-else>
            <input type="file" id="audioFile" accept=".mp3, .wav" @change="handleAudioUpload" class="form-input"
              data-testid="input-audio-file" aria-describedby="audio-file-instructions" />
            <p id="audio-file-instructions" class="visually-hidden">
              Accepted formats: MP3 or WAV. Maximum size: 10MB.
            </p>
            <p v-if="errors.audioFile" class="error-text" data-testid="error-audioFile" role="alert">
              {{ errors.audioFile }}
            </p>
          </div>
        </div>

        <!-- Дії -->
        <div class="button-row">
          <button type="button" @click="$emit('close')" class="button button-cancel" data-testid="cancel-button"
            aria-label="Cancel file upload">
            Cancel
          </button>
          <button type="submit" class="button button-submit" data-testid="submit-button"
            aria-label="Save uploaded file">
            Save
          </button>
        </div>
      </form>

    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { validateAudioFile } from '@/utils/validation'
const emit = defineEmits(['close', 'upload',])
const props = defineProps({
  track: Object,
})
const errors = ref({
  audioFile: '',
})

const form = ref({ ...props.track })

function handleAudioUpload(event) {

  const file = event.target.files[0]
  if (!file) return

  const { valid, error } = validateAudioFile(file)

  if (!valid) {
    errors.value.audioFile = error
    return
  }

  form.value.audioFile = file
  form.value.audioFileUrl = URL.createObjectURL(file)
  errors.value.audioFile = ''
}
function handleSubmit() {
  if (!form.value.audioFile) {
    errors.value.audioFile = 'Please upload a file first.'
    return
  }
  emit('upload', form.value.id, form.value.audioFile)
  emit('close')
}
function removeAudioFile() {
  form.value.audioFile = null
  form.value.audioFileUrl = ''
}

</script>