<template>
  <div class="track-item__actions-wrapper">
    <div>
      <button @click="toggleMenu(track.id)" :class="isMobile ? 'button more-button' : 'more-button-hidden'"
        :aria-label="`Actions for ${track.title}`">⋮</button>
      <div :class="isMobile && activeTrackId === track.id && isDropdownOpen ? 'dropdown-menu' : 'track-item__actions'"
        v-if="!isMobile || (isMobile && activeTrackId === track.id)">
        <button :aria-label="`Upload audio file for ${track.title}`" :data-testid="`upload-track-${track.id}`"
          v-show="!track.audioFile" @click="$emit('upload', track)" class="track-item__button button">Upload</button>
        <button :aria-label="`${isPlayerVisible ? 'Hide' : 'Show'} player for ${track.title}`" v-if="track.audioFile"
          @click="handlePlay(track)" class="track-item__button button">{{
            isPlayerVisible ? "Hide player" : 'Player' }}</button>
        <button :aria-label="`Edit metadata for ${track.title}`" :data-testid="`edit-track-${track.id}`"
          @click="$emit('edit', track)" class="track-item__button button ">Edit</button>
        <button :aria-label="`Delete ${track.title}`" :data-testid="`delete-track-${track.id}`"
          @click="$emit('delete', track)" class="track-item__button button ">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  track: Object,
})
const emit = defineEmits(['edit', 'delete', 'upload', 'play-track']);

const isPlayerVisible = ref(false);
const isMobile = ref(false);
const activeTrackId = ref(null);
const isDropdownOpen = ref(false);


function handlePlay(track) {
  isPlayerVisible.value = !isPlayerVisible.value;
  emit('play-track', track.id);
}

function toggleMenu(id) {
  if (isMobile.value) {
    if (activeTrackId.value === id && isDropdownOpen.value) {
      activeTrackId.value = null;
      isDropdownOpen.value = false;
    } else {
      activeTrackId.value = id;
      isDropdownOpen.value = true;
    }
  }
}

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 800;
  if (!isMobile.value) {
    activeTrackId.value = null;
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>
<style>
.track-item__actions-wrapper {}

.more-button-hidden,
.track-item__actions-mobile-hidden,
.track-item__actions-desktop-hidden {
  display: none;
}

.more-button {
  color: var(--secondary-alt-color);
  cursor: pointer;
  font-size: 1.2em;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: 0.5rem;
}

.more-button:hover,
.more-button:focus-visible {
  border-color: var(--secondary-alt-color);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: -10%;
  background-color: var(--grey-fill-color);
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 6rem;
}

.track-item__actions {
  display: flex;
  gap: 1rem;
}

.track-item__button {
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.track-item__button:hover {
  background-color: var(--white-color);
}

.track-item__actions-wrapper {
  position: relative;
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>