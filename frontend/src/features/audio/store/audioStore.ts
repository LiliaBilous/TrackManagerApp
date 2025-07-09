import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTrackAudioStore = defineStore('trackAudioStore', () => {

  const playingTrackId = ref<string | null>(null)
  const isPlaying = ref(false)

  function togglePlay(id: string) {
    if (playingTrackId.value === id) {
      isPlaying.value = !isPlaying.value
    } else {
      playingTrackId.value = id
      isPlaying.value = true
    }
  }
  return {
    playingTrackId,
    isPlaying,
    togglePlay
  }
})
