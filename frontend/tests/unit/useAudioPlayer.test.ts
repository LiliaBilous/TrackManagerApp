// unit test
import { describe, it, expect } from 'vitest'
import { AudioFileSchema } from '@/features/audio/schema/audioFileSchema.ts'

describe('AudioFileSchema', () => {
  it('accepts valid MP3 file', () => {
    const file = new File(['audio'], 'test.mp3', { type: 'audio/mpeg' })
    expect(() => AudioFileSchema.parse(file)).not.toThrow()
  })

  it('rejects unsupported file type', () => {
    const file = new File(['text'], 'test.txt', { type: 'text/plain' })
    expect(() => AudioFileSchema.parse(file)).toThrow(/Invalid file type/)
  })

  it('rejects file over 10MB', () => {
    const oversizedContent = new Array(10 * 1024 * 1024 + 1).fill('a').join('')
    const file = new File([oversizedContent], 'big.mp3', { type: 'audio/mpeg' })
    expect(() => AudioFileSchema.parse(file)).toThrow(/File is too large/)
  })
})
