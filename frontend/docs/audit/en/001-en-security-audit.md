# Dependency Security Audit for Music Track Manager

**Date**: 13.06.2025

## General Overview of Dependencies

The project intentionally uses a **minimal number of dependencies** — this is done to reduce bundle size and minimize reliance on third-party libraries.  
Currently in the project: 8 dependencies (production) and 17 devDependencies (for development only), which I believe is optimal for a small SPA application like Music Track Manager.

## 1. Full Dependency Audit

### Tools Used:

- npm audit
- GitHub Dependabot Advanced Security
- Manual package review via:
  - npmjs.com
    - number of downloads per week
    - last update
    - package author
  - GitHub repositories
    - ratio of open/closed issues
    - number of GitHub Stars

### 1.1. Production Dependencies

### Dependency Analysis

Manual dependency review showed strong maintenance activity and package reliability. No known **production** vulnerabilities were found.

| Package            | npm downloads/week | ⭐ GitHub Stars | Maintenance          | Last Update      | Known Vulnerabilities | Notes                                |
| ------------------ | ------------------ | --------------- | -------------------- | ---------------- | --------------------- | ------------------------------------ |
| vue                | ~6,293,471         | ~50,500         | ✅ Active            | 16 days ago      | None                  | Main frontend framework              |
| vue-router         | ~3,694,840         | ~4,300          | ✅ Active            | 2 months ago     | None                  | Official routing                     |
| pinia              | ~1,979,752         | ~14,000         | ✅ Active            | 9 days ago       | None                  | State manager for Vue                |
| zod                | ~31,111,258        | ~38,500         | ✅ Active            | today (13.06.25) | None                  | For data validation                  |
| neverthrow         | ~665,258           | ~5,200          | Minimal              | 4 months ago     | None                  | Request handler instead of try/catch |
| wavesurfer.js      | ~293,963           | ~9,400          | ⚠ Moderate          | 1 month ago      | None                  | Audio waveform rendering             |
| @mobily/ts-belt    | ~129,621           | ~1,200          | Stable, but inactive | 2 years ago      | None                  | Utility library for FP in TypeScript |
| vue-toastification | ~131,707           | ~3,300          | ⚠ Moderate          | 3 years ago      | None                  | For toast notifications              |

P.S. I’m considering replacing `vue-toastification` due to lack of updates.

### 1.2. Dev Dependencies

### 1.2. Dev Dependencies

| Package                          | Weekly Downloads | ⭐ GitHub Stars | Maintenance | Last Updated        | Known Vulnerabilities       | Notes                                |
| -------------------------------- | ---------------- | --------------- | ----------- | ------------------- | --------------------------- | ------------------------------------ |
| vite                             | ~27,635,998      | ~15,800         | ✅ Active   | 1 month ago         | ⚠ vite@6.3.1–6.3.3 → fixed | Builder / dev server                 |
| @vitejs/plugin-vue               | ~3,080,763       | 582             | ✅ Active   | 8 days ago          | None                        | Vite plugin for Vue                  |
| @vue/tsconfig                    | ~794,275         | 335             | ✅ Active   | 7 months ago        | None                        | TypeScript config for Vue            |
| vue-tsc                          | ~2,195,005       | ~6,200          | ✅ Active   | 6 days ago          | None                        | Type checker for .vue files          |
| typescript                       | ~84,641,116      | ~105,000        | ✅ Active   | 2 days ago          | None                        | TypeScript compiler                  |
| eslint                           | ~59,035,195      | ~26,000         | ✅ Active   | today (2025-06-13)  | None                        | Static code analysis                 |
| eslint-plugin-vue                | ~3,900,548       | ~4,500          | ✅ Active   | 8 days ago          | None                        | Linting for .vue files               |
| @typescript-eslint/parser        | ~49,949,824      | ~15,800         | ✅ Active   | 6 days ago          | None                        | Parser for ESLint + TypeScript       |
| @typescript-eslint/eslint-plugin | ~46,961,970      | ~15,800         | ✅ Active   | 6 days ago          | None                        | ESLint rules for TypeScript          |
| typescript-eslint                | ~11,646,234      | ~13,000         | ✅ Active   | 4 days ago          | None                        | Unified package (peer)               |
| @vue/eslint-config-typescript    | ~1,225,279       | 160             | ✅ Active   | 3 months ago        | None                        | ESLint+TS preset config for Vue      |
| vue-eslint-parser                | ~4,968,368       | 475             | ✅ Active   | 2 months ago        | None                        | Parser for Vue templates             |
| husky                            | ~16,480,702      | ~33,700         | ✅ Active   | 7 months ago        | None                        | Git hooks (e.g., lint before commit) |
| lint-staged                      | ~12,839,488      | ~13,900         | ✅ Active   | 18 days ago         | None                        | Run scripts on staged files          |
| prettier                         | ~53,015,002      | ~50,600         | ✅ Active   | 3 months ago        | None                        | Code formatting                      |
| globals                          | ~137,479,683     | 484             | ✅ Active   | 19 days ago         | None                        | Global variables for ESLint          |
| @types/node                      | ~150,177,768     | ~49,900         | ✅ Active   | ongoing, 2 days ago | None                        | Type definitions for Node.js API     |

No active vulnerabilities were found. The only issue discovered was in `brace-expansion` (low priority, resolved).

## 2. Resolved Vulnerabilities

### `vite` Update

Dependabot reported a vulnerability in `vite@6.3.3`:

- **Issue**: `server.fs.deny` can be bypassed via `/.`
- **Solution**: updated to `vite@^6.3.4`

### Dev-only Vulnerability

After running:

```bash
npm audit
```

- Found: Low severity (brace-expansion, ReDoS)
- Used only in ESLint
- Fixed locally via:

```bash
npm audit fix
```

## 3. Zero-day Vulnerabilities

It is not possible to guarantee full absence of zero-day vulnerabilities, however:

- All dependencies were checked via:

  - npm audit

  - GitHub Dependabot Advanced Security

- All detected vulnerabilities were resolved

- All libraries are active, with large communities and solid support history

No confirmed zero-day vulnerabilities were found in the used production dependencies.

## 4. XSS Prevention Measures

The project follows the principle of minimizing XSS risks at both implementation and environment levels:

- **No SVG files used** — reduces XSS risk through SVG payloads
- **No `v-html`** - no XSS risk from dynamic HTML or DOM-based injections
- **No inline scripts/styles** — none present
  XSS Protections Implemented in the Project

## 5. Content Security Policy (CSP)

Although the project is not yet deployed, it’s already possible to lay the groundwork for a secure production environment:

- **Introduce Content-Security-Policy-Report-Only** via `<meta>` <meta> tag or HTTP header in test mode — this will help detect policy violations without actually blocking content

```
 <meta
  http-equiv="Content-Security-Policy-Report-Only"
  content="default-src 'self'; script-src 'self'; style-src 'self' ; font-src 'none'; object-src 'none'; base-uri 'none'; form-action 'self'"
  report-to="https://example.com/csp-report"
```

\*\*report-to is currently just an example; actual endpoint will be configured after selecting a hosting provider with CSP reporting support (e.g., Netlify, Vercel, or custom logging via endpoint).

- **Add CSP report collection mechanism** (via `report-to`) — this allows monitoring and reacting to policy violations
- **After testing** — switch to full `Content-Security-Policy` header in production.
- **All scripts and styles will load only from`self`** - no third-party CDNs.
- **No inline scripts or styles** — unsafe-inline is not used

➡️ This approach aligns with OWASP recommendations for CSP implementation and significantly reduces the risk of XSS, data injection, and unwanted third-party content loading.

## 6. Replacement Suggestion: `lodash` ➡️ `@mobily/ts-belt`

While completing Homework #3 using `@mobily/ts-belt`, I decided to exclude the `lodash` library from the project.  
Since `@mobily/ts-belt` includes a built-in `F.debounce` function, and `lodash` wasn't used for anything else, its inclusion became unnecessary.

### Comparison:

| Criterion             | lodash                | ts-belt                    |
| --------------------- | --------------------- | -------------------------- |
| Bundle size           | large (~24KB)         | small (~2KB)               |
| Tree-shaking          | partial               | full                       |
| Typing                | weak                  | strong (TypeScript-native) |
| Vulnerability history | known vulnerabilities | low risk                   |
| Maintenance           | Active                | Active                     |

### Migration Steps:

1. Suspended the use of `lodash` (used only for `debounce`)
2. Installed `ts-belt` and removed the `lodash` package
3. Cleaned up types in `package.json` (`@types/lodash.debounce`)
4. Verified functionality — everything works as expected

### `lodash` Alternatives in TypeScript

**@mobily/ts-belt** is a safe, stable, and minimal-size library with no known vulnerabilities.

However, considering its somewhat inactive maintenance, I also explored alternatives.

Below is a comparison table of modern libraries that can replace `lodash` in TypeScript projects:

| Library           | Security | Typing     | Maintenance             | Size    | Features                                            |
| ----------------- | -------- | ---------- | ----------------------- | ------- | --------------------------------------------------- |
| `@mobily/ts-belt` | ✅       | ✅         | ⚠️ Stable, but inactive | ~2 KB   | Powerful functional approach, TS-first              |
| `remeda`          | ✅       | ✅         | ✅ Active               | ~3 KB   | Tree-shakable, FP style, pipe-oriented              |
| `radash`          | ✅       | ✅         | ✅ Very active          | ~5 KB   | Simple API, good docs, developer-friendly           |
| `just`            | ✅       | ⚠️ Minimal | ⚠️ Rare updates         | ~0.3 KB | Each function is a separate package, pinpoint usage |

---

At this time, I see no need for further migration. However, if the need for more active maintenance or broader functionality arises in the future, a gradual migration to `remeda` or `radash` may be considered as **modern and secure alternatives**.

## Conclusions

- All dependencies were verified manually and with automated tools
- Discovered vulnerabilities were resolved or only apply to devDependencies
- `@mobily/ts-belt` was introduced instead of `lodash` as a safer, typed alternative
- Replacing `vue-toastification` is recommended due to long inactivity
- Content-Security-Policy in Report-Only mode is prepared — recommended to activate during deployment
