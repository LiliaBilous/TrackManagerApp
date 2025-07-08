import { fetchWrapper } from '@/shared/services/fetchWrapper.ts'
import type { Result } from 'neverthrow'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import type { TrackQuery, PaginatedTracks } from '@/features/filters/schema/trackQuerySchema.ts'
import { API_BASE } from '@/shared/constants.ts'

export const getGenres = (): Promise<Result<string[], Error>> =>
  fetchWrapper<string[]>(`${API_BASE}/genres`)

export const getTrackBySlug = (slug: string): Promise<Result<Track, Error>> =>
  fetchWrapper<Track>(`${API_BASE}/tracks/${slug}`)

export const getTrackAudioUrl = (filename: string): string => `${API_BASE}/files/${filename}`

export const createTrack = (trackData: Omit<Track, 'id'>): Promise<Result<Track, Error>> =>
  fetchWrapper<Track>(`${API_BASE}/tracks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
  })

export const updateTrack = (id: string, data: Partial<Track>): Promise<Result<Track, Error>> =>
  fetchWrapper<Track>(`${API_BASE}/tracks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

export const deleteTrack = (id: string): Promise<Result<null, Error>> =>
  fetchWrapper<null>(`${API_BASE}/tracks/${id}`, {
    method: 'DELETE',
  })

export const bulkDeleteTracks = (ids: string[]): Promise<Result<null, Error>> =>
  fetchWrapper<null>(`${API_BASE}/tracks/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })

export const uploadTrackFile = (id: string, formData: FormData): Promise<Result<Track, Error>> =>
  fetchWrapper<Track>(`${API_BASE}/tracks/${id}/upload`, {
    method: 'POST',
    body: formData,
  })

export const deleteTrackFile = (id: string): Promise<Result<Track, Error>> =>
  fetchWrapper<Track>(`${API_BASE}/tracks/${id}/file`, {
    method: 'DELETE',
  })

export const getTracks = (query: TrackQuery): Promise<Result<PaginatedTracks, Error>> => {
  const params = new URLSearchParams()

  params.set('page', String(query.page || 1))
  params.set('limit', String(query.limit || 10))
  if (query.sort) params.set('sort', query.sort)
  if (query.order) params.set('order', query.order)
  if (query.search) params.set('search', query.search)
  if (query.genre) params.set('genre', query.genre)
  if (query.artist) params.set('artist', query.artist)

  return fetchWrapper<PaginatedTracks>(`${API_BASE}/tracks?${params.toString()}`)
}
