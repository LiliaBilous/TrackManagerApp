# ADR 0004: Migrate Project to TypeScript

## Context

The Track Manager project was initially implemented in JavaScript using Vue 3, Pinia, and Vite. As the project grows in complexity, the lack of static typing introduces risks such as runtime errors, unclear data structures, and reduced maintainability.

## Decision

We will migrate the codebase to TypeScript. This includes:

- Renaming relevant files from `.js` to `.ts` and `.vue` scripts to `<script lang="ts">`
- Introducing a strict `tsconfig.json` configuration
- Using type guards and predicates to infer types safely
- Using Zod for parsing and validating unknown data
- Using Neverthrow for safe error handling without exceptions

## Rationale

TypeScript provides static typing, better IDE support, and compile-time safety. It improves reliability and readability and reduces the likelihood of runtime bugs. Migrating to TypeScript aligns with best practices for long-term project scalability and makes the codebase more approachable for new contributors.

#### Alternatives Considered

- Remain on JavaScript — Rejected: increases risk of runtime errors, slows onboarding, and makes refactoring more error-prone. Also, continuing in JavaScript would block further architectural improvements (such as those required in follow-up tasks like HW#2).

## Status

Accepted

## Consequences

**Positive:**

- Catch type errors at compile time
- Better developer tooling and autocomplete
- Improved documentation through types
- Safer refactoring and API usage
- Ability to validate external data more robustly

**Negative:**

- Initial migration effort (renaming files, updating syntax)
- Learning curve for contributors unfamiliar with TypeScript
- Some third-party libraries may require custom type definitions or wrappers

## 🧭 Navigation

---

[⬅️ Previous](./ADR-0003-KeyboardNavigation.md) | [🏠 Index(README)](../README.md) | [ Next ➡️ ](./ADR-0005-IntegrateESLint.md)
