//Integration
import { describe, it, vi, beforeEach, expect } from 'vitest'
import { useSyncFiltersWithUrl } from '../../src/features/filters/composables/useFiltersWithUrl'
import { useTrackFilterStore } from '../../src/features/filters/store/trackFilterStore'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

vi.mock('@mobily/ts-belt', async () => {
  const mod = await vi.importActual<typeof import('@mobily/ts-belt')>('@mobily/ts-belt')
  return {
    ...mod,
    F: {
      ...mod.F,
      debounce: (fn: (...args: unknown[]) => void) => fn,
    },
  }
})

const mockReplace = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}))

const mockFetchTracks = vi.fn()
vi.mock('@/features/tracks/stores/trackStore', () => ({
  useTrackStore: () => ({
    fetchTracks: mockFetchTracks,
  }),
}))

describe('useSyncFiltersWithUrl', () => {
  beforeEach(() => {
    createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
    })
    mockReplace.mockClear()
    mockFetchTracks.mockClear()
  })

  it('should update URL when search is changed', async () => {
    const store = useTrackFilterStore()
    useSyncFiltersWithUrl()

    store.search = 'test'
    await nextTick()

    expect(mockReplace).toHaveBeenCalledWith({
      query: expect.objectContaining({ search: 'test' }),
    })
  })

  it('should fetch tracks when genre is changed', async () => {
    const store = useTrackFilterStore()
    useSyncFiltersWithUrl()

    store.genre = 'rock'
    await nextTick()

    expect(mockFetchTracks).toHaveBeenCalled()
  })
})
