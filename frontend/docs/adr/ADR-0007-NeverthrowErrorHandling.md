# ADR 0007: Error Handling with neverthrow

## Context

As the Track Manager project grew, error handling became increasingly important for both user experience and code maintainability. Traditional try/catch error handling in JavaScript/TypeScript can lead to deeply nested code, unhandled exceptions, and unclear error propagation, especially in asynchronous code and API calls.

## Decision

We will use the [neverthrow](https://github.com/supermacro/neverthrow) library to handle errors in a functional, type-safe way. All asynchronous operations that can fail (e.g., API requests, file uploads) will return a `Result<T, E>` type instead of throwing exceptions. This approach will be used in:

- API wrappers (e.g., fetchWrapper)
- Pinia stores for async actions (e.g., track CRUD, genre fetching)
- File upload/delete logic

Example usage:

```ts
import { Result, err, ok } from 'neverthrow'

export async function fetchWrapper<T>(
  url: string,
  options?: RequestInit
): Promise<Result<T, Error>> {
  try {
    const res = await fetch(url, options)
    const data = await res.json()
    if (!res.ok) {
      return err(new Error('Request failed'))
    }
    return ok(data as T)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}
```

## Rationale

- neverthrow enforces explicit error handling, making it impossible to ignore errors accidentally
- Improves code readability and maintainability by avoiding try/catch blocks scattered throughout the codebase
- Integrates well with async/await and TypeScript
- Encourages functional programming patterns and safe error propagation

Alternatives considered:

- Traditional try/catch (rejected: error-prone, less explicit, harder to test)
- Other result libraries (rejected: neverthrow is lightweight, well-maintained, and idiomatic for TypeScript)

## Status

Accepted

## Consequences

**Positive:**

- More robust and predictable error handling
- Fewer unhandled exceptions and runtime crashes
- Easier to test error scenarios
- Clearer contracts for async functions

**Negative:**

- Slight learning curve for contributors unfamiliar with functional error handling
- Additional dependency in the project

---

[⬅️ Previous](./ADR-0006-ZodSchemaParsing.md) | [🏠 Index(README)](./README.md) | [ Next ➡️ ](./ADR-0008-OptionUrlParams.md)
