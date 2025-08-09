import { z } from 'zod'

export const TrackFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().optional(),
  coverImage: z.string().url(),
  genres: z.array(z.string()).min(1, 'Select at least one genre'),
})
export type TrackForm = z.infer<typeof TrackFormSchema>

export const ValidationErrorsSchema = z.object({
  title: z.string(),
  artist: z.string(),
  genres: z.string(),
  coverImage: z.string(),
})

export type ValidationErrors = z.infer<typeof ValidationErrorsSchema>
