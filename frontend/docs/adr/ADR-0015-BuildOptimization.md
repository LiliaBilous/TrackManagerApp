# ADR 0015: Build Setup, Bundle Optimization, and Code Splitting

## Context

As the Track Manager project matured, it became necessary to optimize the build process and bundle size for better performance, maintainability, and developer experience. This included setting up bundle analysis, code splitting, tree shaking, lazy loading, source maps, environment variable management, and documentation updates.

## Decision

- Integrated `rollup-plugin-visualizer` for bundle analysis and reporting
- Configured code splitting in Vite/Rollup (e.g., dynamic imports for modals, audio player, and other heavy components)
- Verified and enabled tree shaking to ensure unused code is excluded from the final bundle
- Implemented lazy loading for heavy or rarely used components (e.g., modals, audio player)
- Enabled source maps for easier debugging in production
- Moved all sensitive and environment-specific data to `.env` files
- Updated the project README to reflect new build, optimization, and environment setup steps

## Rationale

- Bundle analysis helps identify and reduce bundle size, improving load times
- Code splitting and lazy loading ensure that only necessary code is loaded, speeding up initial page loads
- Tree shaking reduces bundle size by removing unused code
- Source maps improve debugging and error tracking in production
- Managing environment variables via `.env` files increases security and flexibility
- Keeping documentation up to date helps onboarding and maintenance

## Status

Accepted

## Consequences

**Positive:**

- Faster initial load and better runtime performance
- Easier debugging and error tracking
- Improved security and maintainability
- Clearer documentation for future contributors

**Negative:**

- Slightly more complex build configuration
- Need to monitor bundle size and optimization as new dependencies are added

---

[⬅️ Previous](./ADR-0014-ApolloRealtimeActiveTrack.md) | [🏠 Index(README)](./README.md) | [Next ➡️](./ADR-0016-GitHubActionsCI.md)
