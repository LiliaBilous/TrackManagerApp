# ADR 0012: Adopt Pinia and Refactor to Feature-Based Store Structure

## Context

From the beginning, the Track Manager app used Pinia as its state manager. Initially, all state logic was contained in a single shared store. As the application grew, this approach became less maintainable and harder to test. To address this, the store logic was gradually refactored and split by feature domain, culminating in a migration to a feature-based Pinia store structure.

## Decision

- Continue using Pinia as the state management solution for Vue 3
- Refactor the state logic from a single monolithic store into modular, feature-based stores:
  - `trackStore.ts`: handles fetching, creating, editing, deleting, and paginating tracks
  - `trackFileStore.ts`: handles file upload and delete logic
  - `trackAudioStore.ts`: fetches track by slug and resolves audio file URLs
  - `trackFilterStore.ts`: manages filter state (search, artist, genre, sort, page)
  - `trackGenreStore.ts`: loads and caches genres from API
- Add `useGenreQuery()` composable to load genres reactively

## Rationale

- Pinia is the official state manager for Vue 3, with excellent TypeScript support and a simple API
- Feature-based store structure improves maintainability, testability, and code organization
- Modular stores allow for easier scaling and onboarding
- The refactor was completed incrementally across assignments 1–6, with the final PR completing the migration

## Status

Accepted

## Consequences

**Positive:**

- State logic is now modular, maintainable, and testable
- Each store is focused on a single domain, reducing coupling
- Easier to add new features and tests

**Negative:**

- Initial refactor required significant code movement and updates to imports
- Some learning curve for contributors unfamiliar with feature-based state management

---

[⬅️ Previous](./ADR-0011-AdoptVue.md) | [🏠 Index(README)](./README.md) | [Next ➡️](./ADR-0013-AdoptGraphQL.md)
