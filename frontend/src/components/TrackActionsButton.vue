<template>
    <div class="track-item__actions-wrapper">
            <div v-if="isMobile" class="dropdown-wrapper">
              <button @click="toggleMenu(track.id)"class="track-item__button button more-button" :aria-label="`Actions for ${track.title}`">⋮</button>
              <button :aria-label="`Upload audio file for ${track.title}`" :data-testid="`upload-track-${track.id}`"
                v-show="!track.audioFile" @click="$emit('upload', track)"
                class="track-item__button button upload-button">Upload</button>
              <button :aria-label="`${isPlayerVisible ? 'Hide' : 'Show'} player for ${track.title}`"
                v-if="track.audioFile" @click="handlePlay(track)" class="track-item__button button play-button">{{
                  isPlayerVisible ? "Hide player" : 'Player' }}</button>
              <button :aria-label="`Edit metadata for ${track.title}`" :data-testid="`edit-track-${track.id}`"
                @click="$emit('edit', track)" class="track-item__button button edit-button">Edit</button>
              <button :aria-label="`Delete ${track.title}`" :data-testid="`delete-track-${track.id}`"
                @click="$emit('delete', track)" class="track-item__button button delete-button">Delete</button>
            </div>
            <div v-else class="track-item__actions">
              <button :aria-label="`Upload audio file for ${track.title}`" :data-testid="`upload-track-${track.id}`"
                v-show="!track.audioFile" @click="$emit('upload', track)"
                class="track-item__button button upload-button">Upload</button>
              <button :aria-label="`${isPlayerVisible ? 'Hide' : 'Show'} player for ${track.title}`"
                v-if="track.audioFile" @click="handlePlay(track)" class="track-item__button button play-button">{{
                  isPlayerVisible ? "Hide player" : 'Player' }}</button>
              <button :aria-label="`Edit metadata for ${track.title}`" :data-testid="`edit-track-${track.id}`"
                @click="$emit('edit', track)" class="track-item__button button edit-button">Edit</button>
              <button :aria-label="`Delete ${track.title}`" :data-testid="`delete-track-${track.id}`"
                @click="$emit('delete', track)" class="track-item__button button delete-button">Delete</button>
            </div>
          </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  track: Object,
})

const playingTrackId = ref(null)
const isPlayerVisible = ref(false)


function handlePlay(track) {
  playingTrackId.value = playingTrackId.value === track.id ? null : track.id
  isPlayerVisible.value = !isPlayerVisible.value
}

const isMobile = ref(false)
const menuOpen = ref({})

function toggleMenu(id) {
  menuOpen.value[id] = !menuOpen.value[id]
}

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 800
}
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>