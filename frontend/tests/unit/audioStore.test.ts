// whitebox unit test
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'

describe('useTrackAudioStore (whitebox)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should play track when toggled for the first time', () => {
    const store = useTrackAudioStore()
    store.togglePlay('123')

    expect(store.playingTrackId).toBe('123')
    expect(store.isPlaying).toBe(true)
  })

  it('should pause track if same id toggled again', () => {
    const store = useTrackAudioStore()
    store.togglePlay('123')
    store.togglePlay('123')

    expect(store.playingTrackId).toBe('123')
    expect(store.isPlaying).toBe(false)
  })

  it('should switch to another track and play', () => {
    const store = useTrackAudioStore()
    store.togglePlay('123')
    store.togglePlay('456')

    expect(store.playingTrackId).toBe('456')
    expect(store.isPlaying).toBe(true)
  })
})
