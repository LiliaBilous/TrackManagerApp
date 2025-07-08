// whitebox unit test
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'
import * as api from '@/shared/services/api'
import { ok } from 'neverthrow'

describe('useTrackAudioStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets trackBySlug when API returns OK', async () => {
    const mockTrack = {
      id: '1',
      title: 'Test Track',
      artist: 'Test Artist',
      album: 'Test Album',
      genres: ['Rock'],
      slug: 'test-track',
      coverImage: 'https://example.com/image.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      audioFile: 'test.mp3',
    }

    vi.spyOn(api, 'getTrackBySlug').mockResolvedValue(ok(mockTrack))
    vi.spyOn(api, 'getTrackAudioUrl').mockReturnValue('http://mocked.url/test.mp3')

    const store = useTrackAudioStore()
    const result = await store.fetchTrackBySlug('test-track')

    expect(result.isOk()).toBe(true)
    expect(store.trackBySlug?.id).toBe('1')
    expect(store.trackBySlug?.audioFile).toBe('http://mocked.url/test.mp3')
  })
})
