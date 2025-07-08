import { test, expect } from '@playwright/experimental-ct-vue'
import TrackCard from '../../src/features/tracks/components/TrackCard.vue'

const mockTrack = {
  id: '1',
  title: 'Test Title',
  artist: 'Test Artist',
  album: 'Test Album',
  genres: ['Rock', 'Pop'],
  coverImage: 'https://placehold.co/100',
  slug: 'test-title',
}

test('renders track item and emits select event', async ({ mount }) => {
  let selectedEventPayload: string | null = null
  const onSelect = (trackId: string) => {
    selectedEventPayload = trackId
  }

  const component = await mount(TrackCard, {
    props: {
      track: mockTrack,
      selected: false,
      playing: false,
      onSelect,
    },
    global: {
      stubs: {
        TrackWaveForm: true,
      },
    },
  })

  await expect(component.getByTestId(`track-item-${mockTrack.id}-title`)).toHaveText(
    mockTrack.title
  )
  await expect(component.getByTestId(`track-item-${mockTrack.id}-artist`)).toHaveText(
    `${mockTrack.artist} — ${mockTrack.album}`
  )

  const checkbox = component.locator(`input[data-testid="track-checkbox-${mockTrack.id}"]`)
  await expect(checkbox).not.toBeChecked()

  await checkbox.click()
  expect(selectedEventPayload).toBe(mockTrack.id)
})
