# ADR 0009: Dependency Security Audit and Safe Replacement of lodash

## Context

To ensure the long-term security and maintainability of the Track Manager frontend, a full audit of all production and development dependencies was performed. This is especially important for open-source and externally reviewed projects, where dependency vulnerabilities can lead to critical security issues. The audit also included a review of zero-day vulnerability policies and a proactive replacement of a general-purpose utility library (`lodash`) with a more secure, typed alternative (`@mobily/ts-belt`).

## Decision

- All dependencies were audited using `npm audit`, GitHub Dependabot, and manual review (npmjs.com, GitHub activity, vulnerability history).
- No known vulnerabilities were found in production dependencies; all dev-only issues were resolved or deemed non-critical.
- A policy was established to check for zero-day vulnerabilities using automated tools and by favoring actively maintained libraries with strong community support.
- The `lodash` package was replaced with `@mobily/ts-belt` for functional utilities (e.g., debounce), reducing bundle size and improving type safety.

## Rationale

- Regular dependency audits are essential for minimizing the risk of supply chain attacks and unpatched vulnerabilities.
- Zero-day vulnerabilities cannot be fully eliminated, but using well-maintained, popular libraries and automated security tools reduces risk.
- `@mobily/ts-belt` offers a smaller, tree-shakable, and TypeScript-native alternative to `lodash`, with no known vulnerabilities and a functional programming style.
- The migration process included:
  1. Identifying all usages of `lodash` (only `debounce` was used)
  2. Installing `@mobily/ts-belt` and removing `lodash` and its types
  3. Refactoring code to use `F.debounce` from ts-belt
  4. Verifying all functionality and running security checks
- Alternative libraries (e.g., `remeda`, `radash`) were considered, but `ts-belt` was chosen for its minimalism and existing usage in the project.

## Status

Accepted

## Consequences

**Positive:**

- All dependencies are up-to-date and free of known vulnerabilities
- Reduced bundle size and improved type safety by replacing `lodash`
- Documented process for future dependency audits and replacements
- Proactive zero-day policy in place

**Negative:**

- Slight risk due to `ts-belt`'s lower maintenance activity (mitigated by monitoring and considering alternatives)
- Ongoing need to monitor for new vulnerabilities and library updates

---

[⬅️ Previous](./ADR-0008-OptionUrlParams.md) | [🏠 Index(README)](./README.md) | [ Next ➡️ ](./ADR-0010-TestCoverage.md)
