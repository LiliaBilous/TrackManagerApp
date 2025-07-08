// unit test
import { describe, it, expect } from 'vitest'
import { TrackSchema } from '@/features/tracks/schema/trackSchema.ts'

const validTrack = {
  id: '1741096482742',
  title: 'Johnny B. Goode',
  artist: 'Lady Gaga',
  genres: ['Pop', 'R&B', 'Rock'],
  slug: 'johnny-b-goode',
  coverImage: 'https://picsum.photos/seed/Johnny%20B.%20Goode/300/300',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  audioFile: 'test.mp3',
}

describe('TrackSchema', () => {
  it('passes validation with valid data', () => {
    const result = TrackSchema.safeParse(validTrack)
    expect(result.success).toBe(true)
  })

  it('fails if title is empty', () => {
    const result = TrackSchema.safeParse({ ...validTrack, title: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().title?._errors).toContain(
        'String must contain at least 1 character(s)'
      )
    }
  })

  it('fails if coverImage is not a valid URL', () => {
    const result = TrackSchema.safeParse({ ...validTrack, coverImage: 'not-a-url' })
    expect(result.success).toBe(false)
  })

  it('allows audioFile to be missing', () => {
    const withoutAudio = structuredClone(validTrack)
    const result = TrackSchema.safeParse(withoutAudio)
    expect(result.success).toBe(true)
  })
})
