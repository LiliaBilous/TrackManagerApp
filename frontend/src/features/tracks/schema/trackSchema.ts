import { z } from 'zod'

// main track schema
export const TrackSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  artist: z.string().min(1),
  album: z.string().optional(),
  genres: z.array(z.string()),
  slug: z.string(),
  coverImage: z.string().url(),
  audioFile: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Track = z.infer<typeof TrackSchema>

export type BatchDeleteResponse = {
  success: string[]
  failed: string[]
}
