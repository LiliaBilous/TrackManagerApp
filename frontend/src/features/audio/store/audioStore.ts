import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import { getTrackBySlug, getTrackAudioUrl } from '@/shared/services/api.ts'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'

export const useTrackAudioStore = defineStore('trackAudioStore', () => {
  const trackBySlug = ref<Track | null>(null)
  const fetchTrackBySlug = async (slug: string): Promise<Result<Track, Error>> => {
    const result = await getTrackBySlug(slug)

    if (result.isOk()) {
      const track = result.value
      const fullTrack = {
        ...track,
        ...(track.audioFile && { audioFile: getTrackAudioUrl(track.audioFile) }),
      }
      trackBySlug.value = fullTrack
    }
    return result
  }
  return {
    trackBySlug,
    fetchTrackBySlug,
  }
})
