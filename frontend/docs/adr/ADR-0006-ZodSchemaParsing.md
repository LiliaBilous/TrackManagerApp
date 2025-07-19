# ADR 0006: Use Zod for Schema Parsing and Validation

## Context

The Track Manager project requires robust validation and parsing of user input, API responses, and internal data structures. As the application grows, manual validation becomes error-prone and hard to maintain. TypeScript types alone do not provide runtime validation, especially for data coming from untrusted sources (e.g., user forms, server responses).

## Decision

We will use the [Zod](https://zod.dev/) library to define schemas for all critical data structures and to perform runtime validation and parsing. Zod schemas will be used for:

- Validating form input (e.g., track creation/editing)
- Validating file uploads (e.g., audio file type and size)
- Validating query parameters and API responses
- Deriving TypeScript types from schemas for type safety

Example usage:

```ts
// Track form schema
export const TrackFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().optional(),
  coverImage: z.string().url(),
  genres: z.array(z.string()).min(1, 'Select at least one genre'),
})

// Audio file schema
export const AudioFileSchema = z
  .instanceof(File, { message: 'Invalid file object.' })
  .refine((file) => ['audio/mpeg', 'audio/wav'].includes(file.type), {
    message: 'Invalid file type. Only MP3 or WAV allowed.',
  })
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: 'File is too large. Max size is 10MB.',
  })
```

## Rationale

- Zod provides a declarative, composable, and type-safe way to define validation logic.
- Schemas are colocated with business logic, improving maintainability.
- Zod integrates well with TypeScript, allowing type inference from schemas.
- Reduces boilerplate and risk of inconsistent validation.
- Enables safe parsing of unknown data (e.g., from APIs or user input).

Alternatives considered:

- Manual validation (rejected: error-prone, hard to scale)
- Other schema libraries (e.g., Yup, Joi) (rejected: Zod offers better TypeScript integration and ergonomics)

## Status

Accepted

## Consequences

**Positive:**

- Consistent, reusable validation logic across the codebase
- Improved type safety and runtime guarantees
- Easier to maintain and extend validation rules
- Fewer runtime errors due to invalid data

**Negative:**

- Slight learning curve for contributors unfamiliar with Zod
- Additional dependency in the project

---

[⬅️ Previous](./ADR-0005-IntegrateESLint.md) | [🏠 Index(README)](./README.md) | [ Next ➡️ ](./ADR-0007-NeverthrowErrorHandling.md)
