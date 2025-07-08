import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrackGenreStore } from '@/shared/stores/trackGenresStore.ts'

export function useGenreQuery() {
  const genreStore = useTrackGenreStore()
  const { genres, isLoading, error } = storeToRefs(genreStore)

  onMounted(() => {
    genreStore.fetchGenres()
  })

  return {
    genres,
    isLoading,
    error,
  }
}
