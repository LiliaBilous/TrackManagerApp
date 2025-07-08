import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ok, Result } from 'neverthrow'
// import { getGenres } from '@/shared/services/api.ts'
import { getGenres } from '@/shared/services/graphql/qraphql'

export const useTrackGenreStore = defineStore('trackGenreStore', () => {
  const genres = ref<string[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const isFetched = ref(false)

  const fetchGenres = async (): Promise<Result<string[], Error>> => {
    if (isFetched.value) return ok(genres.value)

    isLoading.value = true
    error.value = null

    const result = await getGenres()

    if (result.isOk()) {
      genres.value = result.value
      isFetched.value = true
    } else {
      error.value = result.error
    }

    isLoading.value = false
    return result
  }

  return {
    genres,
    isLoading,
    error,
    fetchGenres,
  }
})
