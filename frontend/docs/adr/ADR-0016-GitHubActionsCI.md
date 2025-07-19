# ADR 0016: Continuous Integration with GitHub Actions

## Context

To ensure code quality, reliability, and fast feedback, the Track Manager project uses GitHub Actions for continuous integration (CI). The CI pipeline automates code checks, builds, and tests on every push and pull request, reducing the risk of regressions and improving team productivity.

## Decision

- Set up a GitHub Actions workflow to run on every push and pull request
- The workflow includes the following steps:
  - Install dependencies (with node_modules caching)
  - Run ESLint for code style and static analysis
  - Run TypeScript type-checking
  - Build the frontend
  - Run unit tests (Vitest)
  - Run Playwright E2E tests (with a separate job)
  - Save build artifacts and test logs
  - For Playwright E2E: on failure, save screenshots and video artifacts for debugging

## Rationale

- Automated CI ensures that code meets quality standards before merging
- Early detection of errors (lint, type, build, test) reduces bugs in production
- Caching dependencies speeds up CI runs
- Saving build and test artifacts helps with debugging and traceability
- Playwright E2E artifacts (screenshots, video) make it easier to diagnose UI test failures

## Status

Accepted

## Consequences

**Positive:**

- Higher code quality and reliability
- Faster feedback for contributors
- Easier debugging of test failures
- Consistent build and test process for all contributors

**Negative:**

- Slightly longer CI times due to comprehensive checks
- Need to maintain workflow files as dependencies and tools evolve

---

[⬅️ Previous](./ADR-0015-BuildOptimization.md) | [🏠 Index(README)](./README.md) | [Next ➡️](./ADR-0017-Material3Storybook.md)
