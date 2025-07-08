import type { TrackForm, ValidationErrors } from '@/features/tracks/schema/trackFormSchema'
import { DEFAULT_COVER_IMAGE } from '@/shared/constants.ts'

export const defaultTrackForm: TrackForm = {
  title: '',
  artist: '',
  album: '',
  coverImage: DEFAULT_COVER_IMAGE,
  genres: [],
}

export const defaultValidationErrors: ValidationErrors = {
  title: '',
  artist: '',
  genres: '',
  coverImage: '',
}
