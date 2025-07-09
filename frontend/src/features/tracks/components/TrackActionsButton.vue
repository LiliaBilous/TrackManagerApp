<template>
  <div class="track-item__actions-wrapper">
    <BaseButton class="more-button" :aria-label="`Actions for ${track.title}`" aria-haspopup="menu"
      :aria-expanded="activeTrackId === track.id && isDropdownOpen" aria-controls="track-actions-dropdown"
      @click="toggleMenu(track.id)">
      ⋮
    </BaseButton>

    <div class="track-item__actions" :class="{ dropdown: activeTrackId === track.id && isDropdownOpen }">
      <BaseButton v-show="!track.audioFile" class="track-item__button button button-upload"
        :aria-label="`Upload audio file for ${track.title}`" :data-testid="`upload-track-${track.id}`"
        @click="$emit('upload', track)">
        Upload
      </BaseButton>

      <BaseButton v-if="track.audioFile" class="track-item__button button button-upload"
        :aria-label="`${isActive ? 'Hide' : 'Show'} player for ${track.title}`" @click="emit('play-track', track.id)">
        {{ isActive ? 'Hide player' : 'Player' }}
      </BaseButton>

      <BaseButton class="track-item__button button edit-button" :aria-label="`Edit metadata for ${track.title}`"
        :data-testid="`edit-track-${track.id}`" @click="$emit('edit', track)">
        Edit
      </BaseButton>

      <BaseButton class="track-item__button button delete-button" :aria-label="`Delete ${track.title}`"
        :data-testid="`delete-track-${track.id}`" @click="$emit('delete', track)">
        Delete
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'
const audioStore = useTrackAudioStore()

const props = defineProps<{ track: Track }>()

const emit = defineEmits<{
  (e: 'edit', track: Track): void
  (e: 'delete', track: Track): void
  (e: 'upload', track: Track): void
  (e: 'play-track', id: string): void
}>()
const isActive = computed(
  () => audioStore.isPlaying && audioStore.playingTrackId === props.track.id
)
const activeTrackId = ref<string | null>(null)
const isDropdownOpen = ref(false)

function toggleMenu(id: string) {
  if (activeTrackId.value === id && isDropdownOpen.value) {
    isDropdownOpen.value = false
    activeTrackId.value = null
  } else {
    isDropdownOpen.value = true
    activeTrackId.value = id
  }
}
</script>
