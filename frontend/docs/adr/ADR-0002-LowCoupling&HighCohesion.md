# ADR 0002: Improve Low Coupling & High Cohesion

## Context

The current **Track Manager** project faces challenges due to mixed responsibilities, tight coupling, and poorly structured logic.
This becomes problematic as the project grows or involves multiple contributors.

## Decision

We will apply the architectural principle of **Low Coupling & High Cohesion** throughout the frontend codebase. Specifically:

- Each component must have a **single, well-defined responsibility** ("one component — one task").
- **Shared UI elements** (e.g., modals, buttons, inputs) will be placed in a `shared/components/` folder and reused consistently.
- **All business logic** (e.g., data fetching, filtering, validation, side-effects) will be extracted into **Pinia stores**, **utility functions**, or **composables**, which are **UI-agnostic**.
- Logic will be encapsulated using composable functions following the Composition API pattern with the setup() function.

Each composable will:

- Encapsulate a specific concern (e.g., managing a list, playing audio)
- Be free from template/UI logic
- Be stored in `composables/` or `features/*/composables/`
- Be imported inside `setup()` blocks

## Rationale

Since the project is maintained by a single developer and reviewed by others, enforcing a clear, modular architecture is key to maintainability.

This ADR builds on [ADR 0001](./ADR-0001__FeatureBasedStructure.md), which introduced a **feature-based folder structure**. Together, these principles:

- Facilitate reuse of logic without duplication
- Reduce the risk of side effects during changes
- Make testing and mocking easier
- Improve code readability and review experience

### Rejected Alternatives

- **Keeping monolithic components** that mix UI and logic: this breaks separation of concerns and leads to unmaintainable code over time.

## Status

Proposed

## Consequences

### Positive:

- Improved maintainability and architectural clarity
- Reduced technical debt during scaling and refactoring
- Easier unit testing and isolation of logic
- More predictable and clean component behavior
- Easier onboarding and peer reviews

### Negative:

- Requires time investment to refactor legacy components
- Developers must understand Composition API and composables
- Temporary slowdown in feature development during migration

## 🧭 Navigation

---

[⬅️ Previous](./ADR-0001-FeatureBasedStructure.md) | [🏠 Index(README)](../README.md) | [ Next ➡️ ](./ADR-0003-KeyboardNavigation.md)
