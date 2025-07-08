import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTrackStore } from '@/features/tracks/stores/trackStore'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore'
import type { TrackQuery } from '@/features/filters/schema/trackQuerySchema.ts'
import { F } from '@mobily/ts-belt'

export function useSyncFiltersWithUrl() {
  const router = useRouter()
  const store = useTrackFilterStore()
  const trackStore = useTrackStore()

  watch(
    () => ({
      search: store.search,
      artist: store.artist,
      genre: store.genre,
      sort: store.sort,
      page: store.page,
    }),
    (newQuery) => {
      router.replace({ query: cleanQuery(newQuery) })
    },
    { deep: true }
  )

  const debouncedFetchTracks = F.debounce(() => {
    trackStore.fetchTracks()
  }, 1000)

  watch(
    () => [store.search, store.artist],
    () => {
      store.page = 1
      debouncedFetchTracks()
    }
  )
  watch(
    () => [store.genre, store.sort, store.page],
    () => {
      trackStore.fetchTracks()
    }
  )
}

function cleanQuery(query: TrackQuery): Partial<Record<keyof TrackQuery, string | number>> {
  const cleaned: Partial<Record<keyof TrackQuery, string | number>> = {}

  for (const key in query) {
    const typedKey = key as keyof TrackQuery
    const value = query[typedKey]

    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(key === 'page' && (value === 1 || value === '1'))
    ) {
      cleaned[typedKey] = value
    }
  }

  return cleaned
}
