// unit test
import { describe, it, expect } from 'vitest'
import { TrackQuerySchema } from '@/features/filters/schema/trackQuerySchema.ts'

describe('TrackQuerySchema', () => {
  it('passes with valid query params', () => {
    const result = TrackQuerySchema.safeParse({
      page: 1,
      limit: 10,
      sort: 'title',
      order: 'asc',
      search: 'rock',
      genre: 'rock',
      artist: 'AC/DC',
    })
    expect(result.success).toBe(true)
  })

  it('fails with negative page number', () => {
    const result = TrackQuerySchema.safeParse({ page: -1 })
    expect(result.success).toBe(false)
  })
})
