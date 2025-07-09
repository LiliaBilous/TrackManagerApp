<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useAudioPlayer } from '@/features/audio/composables/useAudioPlayer'

const props = defineProps<{
  trackId: string
  audioFile: string
}>()

const emit = defineEmits<{
  (e: 'reset', trackId: string): void
}>()
const audioFileRef = ref(props.audioFile)

watch(() => props.audioFile, (newVal) => {
  audioFileRef.value = newVal
})
const audioRef = ref<HTMLAudioElement | null>(null)
const waveformRef = ref<HTMLDivElement | null>(null)

const {
  isPlaying,
  currentTime,
  duration,
  updateProgress,
  updateDuration,
  play,
  pause,
  initWaveSurfer,
} = useAudioPlayer(audioRef, waveformRef, audioFileRef)

onMounted(async () => {
  await nextTick()

  let attempts = 10
  const tryInit = () => {
    if (audioRef.value && waveformRef.value) {
      initWaveSurfer()
    } else if (attempts-- > 0) {
      setTimeout(tryInit, 100)
    } else {
      console.warn('WaveSurfer init failed: refs still not ready')
    }
  }
  tryInit()
})

const removeAudioFile = () => {
  emit('reset', props.trackId)
  pause()
}
</script>
<template>
  <div v-if="audioFile" :data-testid="`audio-player-${trackId}`" class="audio-player">
    <audio ref="audioRef" :src="audioFile" preload="auto" @timeupdate="updateProgress" @loadedmetadata="updateDuration"
      class="audio-hidden">
      Your browser does not support the audio element.
    </audio>

    <div ref="waveformRef" class="waveform"></div>

    <div class="controls">
      <button v-if="!isPlaying" @click="play" :data-testid="`play-button-${trackId}`" class="button play-button">
        Play
      </button>
      <button v-else @click="pause" class="button play-button" :data-testid="`pause-button-${trackId}`">
        Pause
      </button>

      <span :data-testid="`audio-progress-${trackId}`">
        {{ currentTime }} / {{ duration }}
      </span>
      <button type="button" @click="removeAudioFile" class="button danger">
        Remove File
      </button>
    </div>
  </div>
</template>

<style scoped>
.track-item__waveform {
  margin-top: 1rem;
  border-top: 1px solid var(--color-glow-soft);
  padding-top: 0.75rem;
}

.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 1rem;
  gap: 1rem;
  /* background: var(--color-bg-glass);
  border-radius: var(--border-radius-0-5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25); */
  container-type: inline-size;
}

.waveform {
  width: 100%;
  height: 60px;
  flex-shrink: 1;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

audio:is([controls], .audio-hidden) {
  display: none;
}

.play-button {
  color: var(--color-primary-blue);
  border: 1px solid var(--color-primary-blue);
}

.play-button:hover {
  background-color: var(--color-primary-blue);
  color: var(--color-bg-dark);
}

.danger {
  color: var(--color-primary-pink);
  border: 1px solid var(--color-accent-glow);

  &:hover {
    background-color: var(--color-accent-glow);
    color: var(--color-bg-dark);
  }
}

@media (width < 50rem) {
  .audio-player {
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
    align-items: stretch;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .waveform {
    height: 48px;
  }
}
</style>
