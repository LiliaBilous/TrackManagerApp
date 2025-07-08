import type { TrackForm } from '@/features/tracks/schema/trackFormSchema.ts'

type ValidationErrors = {
  title: string
  artist: string
  genres: string
  coverImage: string
}

export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function validateTrackForm(form: TrackForm): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {
    title: '',
    artist: '',
    genres: '',
    coverImage: '',
  }

  if (!form.title.trim()) {
    errors.title = 'Title is required'
  }

  if (!form.artist.trim()) {
    errors.artist = 'Artist is required'
  }

  if (!Array.isArray(form.genres) || form.genres.length === 0) {
    errors.genres = 'At least one genre must be selected'
  }

  if (form.coverImage && !isValidImageUrl(form.coverImage)) {
    errors.coverImage = 'Cover image URL is not valid'
  }

  const isValid = Object.values(errors).every((err) => err === '')

  return { isValid, errors }
}

// Validate audio file type and size
export function validateAudioFile(file: File | null | undefined): {
  valid: boolean
  error: string
} {
  const validTypes = ['audio/mpeg', 'audio/wav']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!file) {
    return { valid: false, error: 'No file selected.' }
  }

  if (!(file instanceof File)) {
    return { valid: false, error: 'Invalid file object.' }
  }

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only MP3 or WAV allowed.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File is too large. Max size is 10MB.' }
  }

  return { valid: true, error: '' }
}
