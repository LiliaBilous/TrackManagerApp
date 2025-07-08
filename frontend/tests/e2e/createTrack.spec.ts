import { test, expect } from '@playwright/test'

const TEST_TRACK = {
  id: 'mocked-id',
  title: 'Test Track E2E',
  artist: 'Test Artist',
  album: 'Test Album',
  coverImage: 'https://placehold.co/100',
  genres: ['Rock'],
  slug: 'test-track-e2e',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

test('user can create a new track (GraphQL)', async ({ page }) => {
  const tracks: {
    id: string,
    title: string,
    artist: string,
    album: string,
    coverImage: string,
    genres: string[],
    slug: string,
    createdAt: string,
    updatedAt: string
  }[] = [];

  await page.route('**/graphql', async (route, request) => {
    const body = request.postDataJSON()
    if (body.operationName === 'GetGenres') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { genres: ['Rock', 'Pop', 'Jazz'] } }),
      })
    } else if (body.operationName === 'CreateTrack') {
      tracks.push(TEST_TRACK)
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { createTrack: TEST_TRACK } }),
      })
    } else if (body.operationName === 'GetTracks') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            tracks: {
              data: tracks,
              meta: { total: tracks.length, page: 1, limit: 10, totalPages: 1 },
            },
          },
        }),
      })
    } else {
      await route.continue()
    }
  })

  await page.goto('/')

  await page.getByTestId('create-track-button').click()
  await page.getByTestId('title-input').fill(TEST_TRACK.title)
  await page.getByTestId('input-artist').fill(TEST_TRACK.artist)
  await page.getByTestId('input-album').fill(TEST_TRACK.album)
  await page.getByTestId('input-cover-image').fill(TEST_TRACK.coverImage)

  const genreSelect = page.getByTestId('genre-select')
  await expect(genreSelect).toBeEnabled()
  await genreSelect.selectOption({ label: TEST_TRACK.genres[0] })
  await expect(page.getByTestId('genre-tag')).toContainText(TEST_TRACK.genres[0])

  await page.getByTestId('submit-button').click()
  await expect(page.getByTestId('title-input')).toHaveCount(0)

  await expect(
    page.locator('[data-testid^="track-item-"][data-testid$="-title"]').filter({
      hasText: TEST_TRACK.title,
    })
  ).toHaveCount(1)
})
