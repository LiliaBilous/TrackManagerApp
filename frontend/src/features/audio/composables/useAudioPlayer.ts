import { ref, onUnmounted, type Ref } from 'vue'
import WaveSurfer from 'wavesurfer.js'

export function useAudioPlayer(
  audioRef: Ref<HTMLAudioElement | null>,
  waveformRef: Ref<HTMLElement | null>,
  audioUrl: Ref<string>
) {
  const isPlaying = ref(false)
  const currentTime = ref('0:00')
  const duration = ref('0:00')
  let waveSurfer: WaveSurfer | null = null

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
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

  const initWaveSurfer = () => {
    if (!waveformRef.value || !audioRef.value || !audioUrl.value) return

    if (waveSurfer) {
      waveSurfer.destroy()
      waveSurfer = null
    }

    waveSurfer = WaveSurfer.create({
      container: waveformRef.value,
      waveColor: '#B5B7C0',
      progressColor: '#e76026',
      height: 60,
      media: audioRef.value,
      interact: true,
    })
  }

  onUnmounted(() => {
    waveSurfer?.destroy()
    waveSurfer = null
  })

  return {
    isPlaying,
    currentTime,
    duration,
    updateProgress,
    updateDuration,
    play,
    pause,
    initWaveSurfer,
  }
}
