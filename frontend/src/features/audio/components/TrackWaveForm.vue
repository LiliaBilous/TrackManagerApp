<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useAudioPlayer } from '@/features/audio/composables/useAudioPlayer'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

const props = defineProps<{
  trackId: string
  audioFile: string
}>()

const emit = defineEmits<{
  (e: 'reset', trackId: string): void
}>()
const audioFileRef = ref(props.audioFile)

watch(
  () => props.audioFile,
  (newVal) => {
    audioFileRef.value = newVal
  }
)
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
    <audio
      ref="audioRef"
      :src="audioFile"
      preload="auto"
      @timeupdate="updateProgress"
      @loadedmetadata="updateDuration"
      class="audio-hidden"
    >
      Your browser does not support the audio element.
    </audio>

    <div ref="waveformRef" class="waveform"></div>

    <div class="controls">
      <BaseButton
        v-if="!isPlaying"
        :buttonClass="'button button-primary'"
        :aria-label="`Play track ${trackId}`"
        :data-testid="`play-button-${trackId}`"
        @click="play"
        type="button"
      >
        Play
      </BaseButton>

      <BaseButton
        v-else
        :buttonClass="'button button-primary'"
        :aria-label="`Pause track ${trackId}`"
        :data-testid="`pause-button-${trackId}`"
        @click="pause"
        type="button"
      >
        Pause
      </BaseButton>

      <span :data-testid="`audio-progress-${trackId}`"> {{ currentTime }} / {{ duration }} </span>
      <BaseButton
        :buttonClass="'button button-danger'"
        aria-label="Cancel upload"
        @click="removeAudioFile"
        type="button"
        >Remove File</BaseButton
      >
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
