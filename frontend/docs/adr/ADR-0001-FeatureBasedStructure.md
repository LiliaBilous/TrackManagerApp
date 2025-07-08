# ADR 0001: Adopt Feature-Based Folder Structure to Improve Maintainability

## Context

The current project uses a type-based structure (e.g., all components, services, etc., live in separate global folders). While manageable at a small scale, this approach becomes inefficient as the application grows: it becomes harder to locate related files, increases the risk of conflicts and unintended coupling across unrelated modules, and hinders maintainability.

Since the **Track Manager** is expected to grow and be reviewed by other developers, a maintainable and scalable folder structure is critical.

## Decision

We will adopt a **feature-based folder structure**, grouping all related files by functionality rather than by type. For example:

```src/
├── App.vue
├── assets/                     # Static assets like icons, fonts, images
│   └── ...
├── router/
│   └── index.ts                # Application routes
├── services/                   # Generic API wrappers or config
│   ├── fetchWrapper.js         # Low-level HTTP client wrapper
│   └── toastService.js         # Global toast notifications service
├── shared/                     # Reusable non-feature-specific logic
│   ├── components/
│   │   ├── layout/             # Shared layout components
│   │   │   └── AppFooter.vue
│   │   ├── ui/                 # UI primitives like buttons, inputs, loaders
│   │   │   └── PaginationControls.vue
│   │   └── forms/              # Reusable form-related components
│   │       └── GenreSelector.vue
│   └── utils/                  # Common helpers, formatters, validators
│       └── ...
├── features/
│   └── tracks/                 # Everything related to the 'tracks' feature
│       ├── components/         # Feature-specific UI components
│       │   ├── TrackCard.vue
│       │   ├── TrackList.vue
│       │   ├── TrackToolbar.vue
│       │   ├── TrackWaveForm.vue
│       │   ├── TrackActionsButton.vue
│       │   ├── TrackBulkActions.vue
│       │   └── modals/         # Modals specific to track management
│       │       ├── CreateTrackModal.vue
│       │       ├── EditTrackModal.vue
│       │       ├── ConfirmDeleteModal.vue
│       │       └── UploadFileModal.vue
│       ├── stores/             # Pinia stores for track and genre state
│       │   ├── useTrackStore.ts
│       │   └── useGenresStore.ts
│       ├── schema/             # Zod schemas and validation logic
│       │   ├── trackSchema.ts
│       │   └── genreSchema.ts
│       ├── services/           # Track-specific API services
│       │   └── trackApi.ts
│       └── views/              # Entry views for this feature
│           └── TracksView.vue
└── views/                      # Global views outside of features(e.g. 404 page)
    └── NotFound.vue            # 404 - Page not found(like example)

```

Common utilities and base UI components will be placed in `src/shared/` or `src/common/`.

## Rationale

A feature-based structure improves **cohesion** and **encapsulation**: all related logic for a feature is grouped together, making it easier to maintain, test, and onboard new developers.

Compared to alternatives:

| Structure Type             | Pros                                                           | Cons                                                                |
| -------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Type-based**             | Familiar to many; good for small apps                          | Hard to scale; scattered files; harder refactoring; weaker cohesion |
| **Flat**                   | Simple, fast to prototype                                      | Quickly becomes chaotic; zero modularity                            |
| **Feature-based (chosen)** | Locality of logic; easier scaling, onboarding, and refactoring | Requires discipline; unfamiliar to some developers                  |
| **Domain/DDD-based**       | Powerful for large-scale domains                               | Overkill for small projects; harder to adopt without experience     |

The feature-based structure is a good middle-ground between simplicity and scalability and matches the complexity and growth expectations of this project.

## Status

✅ **Accepted** — to be rolled out incrementally during upcoming refactors.

## Consequences

After applying the new feature-based structure:

- The `src/features/` directory now contains all feature-specific logic, including UI, state, services, and composables for tracks
- The shared utilities and base components were moved to `src/shared/`, clarifying what is generic vs. feature-specific
- Refactoring became easier — changes to a feature usually require touching fewer files scattered across the codebase
- Developers now spend less time navigating between folders, since most logic for a feature lives in one place

Negative:

- The reorganization required updating many import paths and rethinking file locations
- Some developers needed time to adjust to the new conventions and folder layout
- A few shared modules were initially duplicated across features until we centralized them properly

## 🧭 Navigation

[⬅️ Previous](./ADR-0000-ADRGuide.md) | [🏠 Index(README)](./adr/README.md) | [➡️ Next](./ADR-0002-LowCoupling&HighCohesion.md)
