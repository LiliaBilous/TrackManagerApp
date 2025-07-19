<template>
  <TrackCard
    :track="track"
    :selected="selected"
    @select="toggleSelect"
    @edit="logAction('edit')"
    @delete="logAction('delete')"
    @upload="logAction('upload')"
    @play="logAction('play')"
    @reset="logAction('reset')"
    isActive="isActive"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TrackCard from '@/features/tracks/components/TrackCard.vue'
import type { Track } from '@/features/tracks/schema/trackSchema'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'

const props = defineProps<{
  track: Track
  selected?: boolean
  isActive?: boolean
  isMobileDropdownOpen?: boolean
}>()

const emit = defineEmits(['update:selected'])

const selected = ref(props.selected ?? false)

function toggleSelect() {
  selected.value = !selected.value
  emit('update:selected', selected.value)
}

function logAction(name: string) {
  console.log(`Triggered: ${name}`)
}

const audioStore = useTrackAudioStore()
audioStore.playingTrackId = props.isActive ? props.track.id : null
audioStore.isPlaying = !!props.isActive
</script>
