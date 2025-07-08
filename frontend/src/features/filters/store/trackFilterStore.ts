import { O, pipe } from '@mobily/ts-belt'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TrackQuery } from '@/features/filters/schema/trackQuerySchema.ts'
export const useTrackFilterStore = defineStore('trackFilter', () => {
  const search = ref<string>('')
  const artist = ref<string>('')
  const genre = ref<string>('')
  const sort = ref<string>('')
  const page = ref<number>(1)

  function toQuery(): TrackQuery {
    return {
      page: page.value,
      limit: 10,
      search: search.value || undefined,
      artist: artist.value || undefined,
      genre: genre.value || undefined,
      sort: sort.value || undefined,
    }
  }

  function initFromQuery(query: Partial<TrackQuery>) {
    search.value = pipe(O.fromNullable(query.search), O.getWithDefault<string>(''))
    artist.value = pipe(O.fromNullable(query.artist), O.getWithDefault<string>(''))
    genre.value = pipe(O.fromNullable(query.genre), O.getWithDefault<string>(''))
    sort.value = pipe(O.fromNullable(query.sort), O.getWithDefault<string>(''))
    page.value = pipe(O.fromNullable(query.page), O.getWithDefault<number>(1))
  }

  function resetFilters() {
    search.value = ''
    artist.value = ''
    genre.value = ''
    sort.value = ''
    page.value = 1
  }

  return {
    search,
    artist,
    genre,
    sort,
    page,

    toQuery,
    initFromQuery,
    resetFilters,
  }
})
