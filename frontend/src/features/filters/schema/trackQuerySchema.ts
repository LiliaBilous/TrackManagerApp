import { z } from 'zod'
import { TrackSchema } from '@/features/tracks/schema/trackSchema.ts'
// query schema
export const TrackQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
  genre: z.string().optional(),
  artist: z.string().optional(),
})
export type TrackQuery = z.infer<typeof TrackQuerySchema>

// pagination scheme
export const PaginatedTracksSchema = z.object({
  data: z.array(TrackSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
})

export type PaginatedTracks = z.infer<typeof PaginatedTracksSchema>
