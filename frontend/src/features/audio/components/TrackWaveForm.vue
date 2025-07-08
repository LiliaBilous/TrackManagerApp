<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioPlayer } from '@/features/audio/composables/useAudioPlayer'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'

const props = defineProps<{ slug: string }>()
const emit = defineEmits<{
  (e: 'reset', trackId?: string): void
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const waveformRef = ref<HTMLDivElement | null>(null)

const audioStore = useTrackAudioStore()
const { fetchTrackBySlug } = audioStore
const { trackBySlug } = storeToRefs(audioStore)
const audioUrl = computed(() => trackBySlug.value?.audioFile ?? '')

const {
  isPlaying,
  currentTime,
  duration,
  updateProgress,
  updateDuration,
  play,
  pause,
  initWaveSurfer,
} = useAudioPlayer(audioRef, waveformRef, audioUrl)

watch(audioUrl, (newUrl) => {
  if (newUrl) {
    nextTick().then(() => {
      initWaveSurfer()
    })
  }
})

const fetchData = async () => {
  const result = await fetchTrackBySlug(props.slug)
  if (result.isOk()) {
    await nextTick()
    initWaveSurfer()
  }
}

watch(
  () => props.slug,
  () => {
    if (props.slug) fetchData()
  },
  { immediate: true }
)

const removeAudioFile = () => {
  emit('reset', trackBySlug.value?.id)
  pause()
}
</script>
<template>
  <div
    v-if="trackBySlug && trackBySlug.audioFile"
    :data-testid="`audio-player-${trackBySlug.id}`"
    class="audio-player"
  >
    <audio
      ref="audioRef"
      :src="trackBySlug.audioFile"
      preload="auto"
      @timeupdate="updateProgress"
      @loadedmetadata="updateDuration"
      class="audio-hidden"
    >
      Your browser does not support the audio element.
    </audio>

    <!-- Waveform -->
    <div ref="waveformRef" class="waveform"></div>

    <!-- Controls -->
    <div class="controls">
      <button
        v-if="!isPlaying"
        @click="play"
        :data-testid="`play-button-${trackBySlug.id}`"
        class="button play-button"
      >
        Play
      </button>
      <button
        v-else
        @click="pause"
        class="button play-button"
        :data-testid="`pause-button-${trackBySlug.id}`"
      >
        Pause
      </button>

      <span :data-testid="`audio-progress-${trackBySlug.id}`">
        {{ currentTime }} / {{ duration }}
      </span>
      <button type="button" @click="removeAudioFile" class="button danger">Remove File</button>
    </div>
  </div>
</template>
<style>
.track-item__waveform {
  margin-top: 1rem;
  border-top: 1px solid var(--color-glow-soft);
  padding-top: 0.75rem;
}

.audio-player {
  display: flex;
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
