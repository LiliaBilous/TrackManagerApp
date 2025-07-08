import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import { uploadTrackFile, deleteTrackFile } from '@/shared/services/api.ts'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import { useTrackStore } from '@/features/tracks/stores/trackStore.ts'

export const useTrackFileStore = defineStore('trackFileStore', () => {
  const trackStore = useTrackStore()
  function updateTrackInStore(updated: Track) {
    const index = trackStore.tracks.findIndex((t) => t.id === updated.id)
    if (index !== -1) trackStore.tracks.splice(index, 1, updated)
  }

  const uploadFile = async (trackId: string, file: File): Promise<Result<Track, Error>> => {
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadTrackFile(trackId, formData)
    if (result.isOk()) {
      updateTrackInStore(result.value)
    }
    return result
  }

  const deleteFile = async (trackId: string): Promise<Result<Track, Error>> => {
    const result = await deleteTrackFile(trackId)
    if (result.isOk()) {
      updateTrackInStore(result.value)
    }
    return result
  }

  return {
    uploadFile,
    deleteFile,
  }
})
