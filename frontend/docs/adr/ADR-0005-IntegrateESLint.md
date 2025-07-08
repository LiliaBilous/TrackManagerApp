# ADR 0005: Integrate ESLint for TypeScript and Vue

## Context

With the migration of the project to TypeScript (see [ADR 0004](./ADR-0004__TypeScriptMigration.md)), ensuring code consistency and enforcing type safety becomes essential. ESLint is already the industry standard for linting JavaScript/TypeScript and Vue, and using it with TypeScript-specific rules will improve code quality.

## Decision

We will configure ESLint to support TypeScript by:

- Installing `typescript-eslint` and related tooling
- Extending ESLint configuration with recommended TS and Vue rules:

  - `plugin:@typescript-eslint`
  - `plugin:vue/vue3`

- Using ESLint with Prettier if needed for formatting consistency
- Adding lint scripts to `package.json`

## Rationale

ESLint enhances code quality by enforcing style and detecting common pitfalls. Combined with TypeScript, it provides an extra layer of safety and clarity. Integrating ESLint into development and CI workflows encourages early error detection and fewer formatting/style issues during code reviews.

Alternatives Considered

- **TSC only**: rejected — type checking alone doesn't enforce stylistic or structural code rules.
- **Use a different linter** — rejected: ESLint is the industry standard; alternatives are deprecated or less supported.

## Status

Accepted

## Consequences

**Positive:**

- Safer and more idiomatic TypeScript and Vue code
- Early error detection via static analysis
- Better code consistency and maintainability

**Negative:**

- Initial configuration effort
- Developers must adapt to stricter rules

## 🧭 Navigation

---

[⬅️ Previous](./ADR-0005-IntegrateESLint.md) | [🏠 Index(README)](../README.md) |
