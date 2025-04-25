import { fetchWrapper } from './fetchWrapper';

const API_BASE = 'http://localhost:8000/api';

export const getGenres = () =>
  fetchWrapper(`${API_BASE}/genres`);

export const getTrack = (slug) =>
  fetchWrapper(`${API_BASE}/tracks/${slug}`);

export const createTrack = (trackData) =>
  fetchWrapper(`${API_BASE}/tracks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
  });

export const updateTrack = (id, data) =>
  fetchWrapper(`${API_BASE}/tracks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const deleteTrack = (id) =>
  fetchWrapper(`${API_BASE}/tracks/${id}`, {
    method: 'DELETE',
  });

export const bulkDeleteTracks = (ids = []) =>
  fetchWrapper(`${API_BASE}/tracks/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });

export const uploadTrackFile = (id, formData) =>
  fetchWrapper(`${API_BASE}/tracks/${id}/upload`, {
    method: 'POST',
    body: formData,
  });

export const deleteTrackFile = (id) =>
  fetchWrapper(`${API_BASE}/tracks/${id}/file`, {
    method: 'DELETE',
  });

export async function getTracks({
  page = 1,
  limit = 10,
  sort = 'createdAt',
  order = 'desc',
  search = '',
  genre = '',
  artist = ''
} = {}) {
  const params = new URLSearchParams({
    page,
    limit,
    sort,
    order
  })

  if (search) params.append('search', search)
  if (genre) params.append('genre', genre)
  if (artist) params.append('artist', artist)

  const response = await fetch(`http://localhost:8000/api/tracks?${params.toString()}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.error || 'Failed to fetch tracks')
  }

  return await response.json()
}
