# ADR 0011: Adopt Vue.js as the Frontend Framework

## Context

At the start of the Track Manager project, a decision was required regarding the choice of frontend framework. The main requirements were: modern reactivity, component-based architecture, strong TypeScript support, good documentation, and a vibrant ecosystem. The project is a single-developer SPA, but is expected to be reviewed and potentially extended by others.

## Decision

Vue.js (version 3, Composition API) was chosen as the primary frontend framework for the following reasons:

- Modern, reactive, and component-based architecture
- Excellent TypeScript support and developer experience
- Simple learning curve and clear documentation
- Large ecosystem and community support
- First-class support for state management (Pinia), routing (vue-router), and testing

## Rationale

- Vue 3 offers a balance between simplicity and power, making it suitable for both small and large projects
- The Composition API enables better code organization and reusability
- Vue's single-file components (SFCs) streamline development and testing
- The ecosystem (Pinia, vue-router, etc.) covers all project needs without excessive dependencies
- Compared to alternatives (React, Angular, Svelte), Vue was the best fit for rapid development and maintainability

## Status

Accepted

## Consequences

**Positive:**

- Fast development and onboarding
- Maintainable, modular codebase
- Easy integration with TypeScript, Pinia, and modern tooling

**Negative:**

- Some contributors may be more familiar with React/Angular
- Occasional ecosystem fragmentation (Vue 2 vs 3)

---

[⬅️ Previous](./ADR-0010-TestCoverage.md) | [🏠 Index(README)](./README.md) | [Next ➡️](./ADR-0012-FeatureBasedPinia.md)
