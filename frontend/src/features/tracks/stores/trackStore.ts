import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Result, ok } from 'neverthrow'
import {
  getTracks,
  createTrack,
  updateTrack,
  deleteTrack,
  bulkDeleteTracks,
} from '@/shared/services/graphql/graphql'

import type { Track, BatchDeleteResponse } from '@/features/tracks/schema/trackSchema.ts'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore'

export const useTrackStore = defineStore('trackStore', () => {
  const tracks = ref<Track[]>([])
  const total = ref<number>(0)
  const limit = ref<number>(10)
  const totalPages = ref<number>(0)
  const isLoading = ref(false)
  const filterStore = useTrackFilterStore()

  const fetchTracks = async (): Promise<void> => {
    isLoading.value = true
    const query = filterStore.toQuery()

    const result = await getTracks(query)

    if (result.isOk()) {
      const { data, meta } = result.value
      tracks.value = data
      total.value = meta.total
      totalPages.value = meta.totalPages
      limit.value = meta.limit

      if (meta.page > meta.totalPages && meta.totalPages > 0) {
        filterStore.page = meta.totalPages
        await fetchTracks()
      }
    }
    isLoading.value = false
  }

  const addTrack = async (newTrack: Omit<Track, 'id'>): Promise<Result<Track, Error>> => {
    const result = await createTrack(newTrack)

    if (result.isOk()) {
      if (filterStore.page === 1 && tracks.value.length >= limit.value) {
        tracks.value = [result.value, ...tracks.value.slice(0, -1)]
      } else if (filterStore.page === 1) {
        tracks.value = [result.value, ...tracks.value]
      }
      total.value++
      totalPages.value = Math.ceil(total.value / limit.value)
    }
    return result
  }

  const editTrack = async (updatedTrack: Track): Promise<Result<Track, Error>> => {
    const result = await updateTrack(updatedTrack.id, updatedTrack)
    if (result.isOk()) {
      tracks.value = tracks.value.map((t) => (t.id === updatedTrack.id ? result.value : t))
    }
    return result
  }

  const removeTrack = async (id: string): Promise<Result<boolean, Error>> => {
    const result = await deleteTrack(id)
    if (result.isOk()) {
      tracks.value = tracks.value.filter((t) => t.id !== id)
      total.value--
      totalPages.value = Math.ceil(total.value / limit.value)

      if (filterStore.page > totalPages.value && totalPages.value > 0) {
        filterStore.page = totalPages.value
        await fetchTracks()
        return result
      }

      if (tracks.value.length < limit.value && filterStore.page < totalPages.value) {
        const nextPageQuery = { ...filterStore.toQuery(), page: filterStore.page + 1 }
        const nextPageResult = await getTracks(nextPageQuery)

        if (nextPageResult.isOk()) {
          const neededCount = limit.value - tracks.value.length
          const additionalTracks = nextPageResult.value.data.slice(0, neededCount)
          tracks.value = [...tracks.value, ...additionalTracks]
        }
      }

      const isPageEmpty = tracks.value.length === 0 && filterStore.page > 1
      if (isPageEmpty) {
        filterStore.page--
        await fetchTracks()
      }
    }
    return result
  }

  const removeTracks = async (ids: string[]): Promise<Result<BatchDeleteResponse, Error>> => {
    const previousTracks = [...tracks.value]
    const previousTotal = total.value
    const previousTotalPages = totalPages.value

    tracks.value = tracks.value.filter((t) => !ids.includes(t.id))
    total.value -= ids.length

    totalPages.value = Math.ceil(total.value / limit.value)

    if (filterStore.page > totalPages.value && totalPages.value > 0) {
      filterStore.page = totalPages.value
    }

    if (tracks.value.length < limit.value && filterStore.page < totalPages.value) {
      const nextPageQuery = { ...filterStore.toQuery(), page: filterStore.page + 1 }
      const nextPageResult = await getTracks(nextPageQuery)

      if (nextPageResult.isOk()) {
        const neededCount = limit.value - tracks.value.length
        const additionalTracks = nextPageResult.value.data.slice(0, neededCount)
        tracks.value = [...tracks.value, ...additionalTracks]
      }
    }

    const shouldDecrementPage = tracks.value.length === 0 && filterStore.page > 1
    if (shouldDecrementPage) {
      filterStore.page--
    }

    const result = await bulkDeleteTracks(ids)

    if (result.isErr()) {
      tracks.value = previousTracks
      total.value = previousTotal
      totalPages.value = previousTotalPages
      if (shouldDecrementPage) {
        filterStore.page++
      }
      return result
    }

    if (shouldDecrementPage) {
      await fetchTracks()
    }

    return ok(result.value)
  }

  return {
    tracks,
    totalPages,
    isLoading,
    fetchTracks,
    addTrack,
    removeTrack,
    removeTracks,
    editTrack,
  }
})
