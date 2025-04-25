import { ref } from 'vue'
import { defineStore } from 'pinia'
import { notifyInfo } from '@/services/toastService'
import {
  getTracks,
  createTrack,
  deleteTrack,
  bulkDeleteTracks,
  updateTrack,
  uploadTrackFile,
  deleteTrackFile
} from '@/services/api'

export const useTrackStore = defineStore('trackStore', () => {
  const tracks = ref([])
  const page = ref(1)
  const totalPages = ref(1)
  const search = ref('')
  const artist = ref('')
  const genres = ref([])
  const sort = ref('')

  const isLoading = ref(false)

  const fetchTracks = async () => {
    isLoading.value = true
    try {
      const query = {
        page: page.value,
        limit: 10,
        search: search.value,
        artist: artist.value,
        genre: genres.value.join(',')
      }
      if (sort.value) query.sort = sort.value

      const res = await getTracks(query)
      tracks.value = res.data
      totalPages.value = res.meta.totalPages
    } catch (err) {
      console.error('Failed to fetch tracks:', err)
      notifyInfo('Server is not responding. Please try again later.')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addTrack = async (newTrack) => {
    const created = await createTrack(newTrack)
    tracks.value.unshift(created)
    return created
  }

  const removeTrack = async (id) => {
    await deleteTrack(id)
    tracks.value = tracks.value.filter(t => t.id !== id)
  }

  const removeTracks = async (ids) => {
    await bulkDeleteTracks(ids)
    tracks.value = tracks.value.filter(t => !ids.includes(t.id))
  }

  const editTrack = async (updatedTrack) => {
    const saved = await updateTrack(updatedTrack.id, updatedTrack)
    const index = tracks.value.findIndex(t => t.id === updatedTrack.id)
    if (index !== -1) tracks.value[index] = saved
    return saved
  }

  const uploadFile = async (trackId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const updated = await uploadTrackFile(trackId, formData);
    const index = tracks.value.findIndex(t => t.id === trackId);
    if (index !== -1) tracks.value[index] = updated;
    return updated;
  };
  
  const deleteFile = async (trackId) => {
    const updated = await deleteTrackFile(trackId)
    const index = tracks.value.findIndex(t => t.id === trackId)
    if (index !== -1) tracks.value[index] = updated
    return updated
  }
  
  return {
    // state
    tracks,
    page,
    totalPages,
    search,
    artist,
    genres,
    sort,
    isLoading,

    // actions
    fetchTracks,
    addTrack,
    removeTrack,
    removeTracks,
    editTrack,
    uploadFile,
    deleteFile,

  }
})
