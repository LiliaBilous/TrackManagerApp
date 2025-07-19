# ADR 0008: Use Option (Maybe) from ts-belt for URL Parameter Extraction

## Context

When synchronizing filter state with URL query parameters (for filtering, sorting, and pagination of tracks), the application must safely handle the presence or absence of each parameter. JavaScript/TypeScript's native `undefined`/`null` handling is error-prone and can lead to bugs if not managed explicitly. A functional approach using Option/Maybe types makes the code more robust and expressive.

## Decision

We use the `O` (Option/Maybe) monad from the [ts-belt](https://mobily.github.io/ts-belt/) library to extract and normalize values from URL query parameters in the filter store. This approach is used in the `initFromQuery` method of the `trackFilterStore`:

```ts
import { O, pipe } from '@mobily/ts-belt'

function initFromQuery(query: Partial<TrackQuery>) {
  search.value = pipe(O.fromNullable(query.search), O.getWithDefault<string>(''))
  artist.value = pipe(O.fromNullable(query.artist), O.getWithDefault<string>(''))
  genre.value = pipe(O.fromNullable(query.genre), O.getWithDefault<string>(''))
  sort.value = pipe(O.fromNullable(query.sort), O.getWithDefault<string>(''))
  page.value = pipe(
    O.fromNullable(query.page),
    O.map((val) => (typeof val === 'string' ? parseInt(val, 10) : val)),
    O.getWithDefault<number>(1)
  )
}
```

## Rationale

- Option/Maybe types make the presence or absence of a value explicit, reducing the risk of bugs from unchecked `undefined` or `null` values.
- The functional style (using `pipe`, `O.map`, `O.getWithDefault`) leads to more readable and maintainable code.
- ts-belt is already a dependency and provides a lightweight, type-safe implementation of Option/Maybe.
- This approach is especially useful for user-driven state (filters) that is reflected in the URL and can be manipulated externally.

Alternatives considered:

- Manual null/undefined checks (rejected: more verbose, error-prone, less composable)
- Other functional libraries (e.g., fp-ts) (rejected: ts-belt is simpler and already in use)

## Status

Accepted

## Consequences

**Positive:**

- Safer and more predictable extraction of filter state from URL
- Less boilerplate and more declarative code
- Fewer bugs related to missing or malformed query parameters

**Negative:**

- Slight learning curve for contributors unfamiliar with Option/Maybe monads
- Additional dependency (already present in the project)

---

[⬅️ Previous](./ADR-0007-NeverthrowErrorHandling.md) | [🏠 Index(README)](./README.md) | [ Next ➡️ ](./ADR-0009-DependencySecurityAudit.md)
