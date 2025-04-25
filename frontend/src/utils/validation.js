export function isValidImageUrl(url) {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function isValidAudioFile(file) {
  return file instanceof File && file.type.startsWith('audio/')
}
export function validateAudioFile(file) {
  const validTypes = ['audio/mpeg', 'audio/wav']
  const maxSize = 10 * 1024 * 1024

  if (!file) return { valid: true, error: '' }

  if (!(file instanceof File)) {
    return { valid: false, error: 'Invalid file object' }
  }

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only MP3/WAV allowed.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File is too large (max 10MB).' }
  }

  return { valid: true, error: '' }
}

export function validateTrackForm(form) {
  const errors = {
    title: '',
    artist: '',
    genres: '',
    coverImage: '',
    audioFile: ''
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

  if (form.coverImage.trim()) {
    if (!isValidImageUrl(form.coverImage)) {
      errors.coverImage = 'Cover image URL is not valid'
    }
  }

  const isValid = !Object.values(errors).some(Boolean)

  return { isValid, errors }
}