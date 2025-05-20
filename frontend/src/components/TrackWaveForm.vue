<template>
  <div v-if="trackData && trackData.audioFile" :data-testid="`audio-player-${trackData.id}`" class="audio-player">
    <audio ref="audioRef" :src="trackData.audioFile" preload="auto" @timeupdate="updateProgress"
      @loadedmetadata="updateDuration" class="audio-hidden">
      Your browser does not support the audio element.
    </audio>

    <!-- Waveform -->
    <div ref="waveformRef" class="waveform"></div>

    <!-- Controls -->
    <div class="controls">
      <button v-if="!isPlaying" @click="play" :data-testid="`play-button-${trackData.id}`" class="button play-button">
        Play
      </button>
      <button v-else @click="pause" class="button play-button" :data-testid="`pause-button-${trackData.id}`">
        Pause
      </button>

      <span :data-testid="`audio-progress-${trackData.id}`">
        {{ currentTime }} / {{ duration }}
      </span>
      <button type="button" @click="removeAudioFile" class="button danger">Remove File</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const emit = defineEmits(['reset'])
const props = defineProps({
  slug: String
})

const audioRef = ref(null)
const waveformRef = ref(null)
const trackData = ref(null)

let waveSurfer = null
const isPlaying = ref(false)
const currentTime = ref('0:00')
const duration = ref('0:00')

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const updateProgress = () => {
  if (audioRef.value) {
    currentTime.value = formatTime(audioRef.value.currentTime)
  }
}

const updateDuration = () => {
  if (audioRef.value) {
    duration.value = formatTime(audioRef.value.duration)
  }
}

const play = () => {
  audioRef.value?.play()
  waveSurfer?.play()
  isPlaying.value = true
}

const pause = () => {
  audioRef.value?.pause()
  waveSurfer?.pause()
  isPlaying.value = false
}

const removeAudioFile = () => {
  emit('reset', trackData.value.id)
  trackData.value.audioFile = null
  trackData.value = null
  isPlaying.value = false
}

const initWaveSurfer = () => {
  if (!waveformRef.value || !audioRef.value || !trackData.value?.audioFile) return

  if (waveSurfer) {
    waveSurfer.destroy()
    waveSurfer = null
  }

  waveSurfer = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: '#B5B7C0',
    progressColor: '#e76026',
    height: 60,
    responsive: true,
    media: audioRef.value,
    interact: true,
  })

  waveSurfer.load(trackData.value.audioFile)
}

const fetchTrackData = async () => {
  try {
    const res = await fetch(`http://localhost:8000/api/tracks/${props.slug}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const data = await res.json()
    data.audioFile = `http://localhost:8000/api/files/${data.audioFile}`
    trackData.value = data

    await nextTick()
    initWaveSurfer()
  } catch (err) {
    console.error('Failed to fetch track:', err)
  }
}

watch(() => props.slug, () => {
  if (props.slug) fetchTrackData()
}, { immediate: true })

onUnmounted(() => {
  waveSurfer?.destroy()
})
</script>

<style scoped>
.audio-player {
  padding: 1rem;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.waveform {
  width: 100%;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  justify-content: space-around;
}

.audio-hidden {
  display: none;
}

.play-button {
  background-color: var(--secondary-alt-color);
}

@media screen and (max-width: 50rem) {
  .audio-player {
    padding: 0.25rem;
    margin-top: 16px;
    flex-direction: column;
    gap: 0.5rem;
  }


}
</style>
