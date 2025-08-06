import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Result } from 'neverthrow'
import { apolloClient } from '@/shared/services/graphql/apollo'

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
  const total = ref(0)
  const totalPages = ref(0)
  const limit = ref(10)
  const isLoading = ref(false)

  const filterStore = useTrackFilterStore()

  const fetchTracks = async (): Promise<void> => {
    isLoading.value = true

    // Очищаємо тільки кеш для треків, залишаючи жанри
    await apolloClient.cache.evict({ fieldName: 'tracks' })
    await apolloClient.cache.gc()

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
      total.value++
      if (filterStore.page === 1) {
        tracks.value = [result.value, ...tracks.value]
        if (tracks.value.length > limit.value) {
          tracks.value = tracks.value.slice(0, limit.value)
        }
      }
      totalPages.value = Math.ceil(total.value / limit.value)
    }
    return result
  }


  const editTrack = async (updatedTrack: Track): Promise<Result<Track, Error>> => {
    const result = await updateTrack(updatedTrack.id, updatedTrack)

    if (result.isOk()) {
      tracks.value = tracks.value.map((t) =>
        t.id === updatedTrack.id ? result.value : t
      )
    }
    return result
  }

  const removeTrack = async (id: string): Promise<Result<boolean, Error>> => {
    const result = await deleteTrack(id)
    if (result.isOk()) {
      if (result.value) {
        tracks.value = tracks.value.filter((t) => t.id !== id)
        total.value--

        const itemsLeftOnPage = tracks.value.length

        if (itemsLeftOnPage < limit.value && total.value > itemsLeftOnPage) {
          const nextPage = filterStore.page + 1
          const query = { ...filterStore.toQuery(), page: nextPage }
          const fetchResult = await getTracks(query)

          if (fetchResult.isOk()) {
            const moreTracks = fetchResult.value.data.slice(0, limit.value - itemsLeftOnPage)
            tracks.value.push(...moreTracks)
          }
        }

        totalPages.value = Math.ceil(total.value / limit.value)
      }
    }
    return result
  }


  const removeTracks = async (ids: string[]): Promise<Result<BatchDeleteResponse, Error>> => {
    const result = await bulkDeleteTracks(ids)
    if (result.isOk()) {
      const { success } = result.value

      if (success.length > 0) {
        tracks.value = tracks.value.filter((t) => !success.includes(t.id))
        total.value -= success.length

        const itemsLeftOnPage = tracks.value.length

        if (itemsLeftOnPage < limit.value && total.value > itemsLeftOnPage) {
          const nextPage = filterStore.page + 1
          const query = { ...filterStore.toQuery(), page: nextPage }
          const fetchResult = await getTracks(query)

          if (fetchResult.isOk()) {
            const moreTracks = fetchResult.value.data.slice(0, limit.value - itemsLeftOnPage)
            tracks.value.push(...moreTracks)
          }
        }

        totalPages.value = Math.ceil(total.value / limit.value)
      }
    }
    return result
  }


  return {
    tracks,
    total,
    totalPages,
    limit,
    isLoading,
    fetchTracks,
    addTrack,
    editTrack,
    removeTrack,
    removeTracks,
  }
})
