# ADR 0010: Test Coverage Strategy: Unit, Integration, and E2E with Vitest & Playwright

## Context

To ensure the reliability, maintainability, and quality of the Track Manager frontend, the project is covered by a comprehensive suite of automated tests. The testing strategy includes unit tests (blackbox and whitebox), integration tests (logic and component), and end-to-end (E2E) tests. The main tools used are [Vitest](https://vitest.dev/) for unit/integration testing and [Playwright](https://playwright.dev/) for E2E and component testing.

## Decision

The following test types and tools are used:

### Unit Tests (Vitest)

- **Blackbox test:** Validates the output of a function given specific inputs, without knowledge of internal implementation.
  - Example: Testing Zod schema validation for a track object.
- **Whitebox test (with mocks):** Tests internal logic, possibly mocking dependencies.
  - Example: Testing a store action with mocked API responses.

### Integration Tests

- **Logic integration (Vitest):** Tests how multiple modules work together (e.g., store + API + schema).
- **Component integration (Playwright Component Testing):** Renders a Vue component in isolation and tests its behavior and interactions.

### E2E Tests (Playwright)

- **End-to-end:** Simulates real user flows in the browser (e.g., creating, editing, deleting a track).

## Rationale

- Unit tests catch regressions in business logic and validation.
- Integration tests ensure that modules interact correctly.
- E2E tests verify that the application works as expected from the user's perspective.
- Using both Vitest and Playwright leverages the strengths of each tool: fast feedback for logic, real browser for UI/UX.

## Examples

**Unit (blackbox):**

```ts
import { describe, it, expect } from 'vitest'
import { TrackSchema } from '@/features/tracks/schema/trackSchema.ts'

describe('TrackSchema', () => {
  it('passes validation with valid data', () => {
    const result = TrackSchema.safeParse({
      id: '1',
      title: 'Song',
      artist: 'Artist',
      genres: ['Pop'],
      slug: 'song',
      coverImage: 'http://img',
      createdAt: '',
      updatedAt: '',
    })
    expect(result.success).toBe(true)
  })
})
```

**Unit (whitebox, with mock):**

```ts
import { describe, it, expect, vi } from 'vitest'
import { useTrackStore } from '@/features/tracks/stores/trackStore'

describe('useTrackStore', () => {
  it('adds a track (mocked API)', async () => {
    const store = useTrackStore()
    const mockCreateTrack = vi.fn().mockResolvedValue({ isOk: () => true, value: { id: '1' } })
    store.createTrack = mockCreateTrack
    const result = await store.addTrack({
      title: 'Song',
      artist: 'Artist',
      genres: ['Pop'],
      coverImage: 'http://img',
    })
    expect(result.isOk()).toBe(true)
  })
})
```

**Integration (logic):**

```ts
import { describe, it, expect } from 'vitest'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore'

describe('trackFilterStore', () => {
  it('initializes from query', () => {
    const store = useTrackFilterStore()
    store.initFromQuery({ search: 'rock', page: 2 })
    expect(store.search).toBe('rock')
    expect(store.page).toBe(2)
  })
})
```

**Integration (Playwright Component):**

```ts
// tests/component/TrackCard.spec.ts
import { test, expect } from '@playwright/experimental-ct-vue'
import TrackCard from '@/features/tracks/components/TrackCard.vue'

test('renders track card', async ({ mount }) => {
  const component = await mount(<TrackCard track={{ title: 'Song', artist: 'Artist', ... }} />)
  await expect(component).toContainText('Song')
})
```

**E2E (Playwright):**

```ts
// tests/e2e/createTrack.spec.ts
import { test, expect } from '@playwright/test'

test('user can create a new track', async ({ page }) => {
  await page.goto('/tracks')
  await page.click('button[data-testid="add-track"]')
  await page.fill('input[name="title"]', 'New Song')
  await page.click('button[type="submit"]')
  await expect(page.locator('.track-list')).toContainText('New Song')
})
```

## Status

Accepted

## Consequences

**Positive:**

- High confidence in code correctness and stability
- Fast feedback during development
- Reduced risk of regressions
- Documentation of expected behavior

**Negative:**

- Initial time investment to write and maintain tests
- Slightly longer CI/CD pipelines due to test runs

---

[⬅️ Previous](./ADR-0009-DependencySecurityAudit.md) | [🏠 Index(README)](./README.md) | [ Next ➡️ ](./ADR-0011-AdoptVue.md)
