# Tech stack

> **Last updated:** 2026-10-03 · by SPEC 01

## Stack

| Layer | Technology | Version | Notes |
| --- | --- | --- | --- |
| Language | TypeScript | ^5 | `strict: true` |
| Framework | Next.js (App Router) | 16.3.8 | Breaking changes vs. older Next. Read `node_modules/next/dist/docs/` before coding |
| UI | React | 19.2.8 | |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` | ^4 | No `tailwind.config.js`. Tokens go in `app/globals.css` under `@theme inline` |
| Lint | ESLint 9 flat config + `eslint-config-next` | 16.3.8 | core-web-vitals + typescript. Ignores `references/**` (SPEC 01) |
| Fonts | Fredoka (display) + Nunito (body) via `next/font/google` | — | Self-hosted. CSS variables `--font-fredoka` / `--font-nunito`, mapped to `font-display` / `font-sans` (SPEC 01) |
| Dates | `Intl.DateTimeFormat` (`es-419`) | — | No date library. App timezone `Europe/Madrid` (a testing choice), the single constant `TIME_ZONE` in `lib/dates.ts` (SPEC 01) |

## Commands

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |

## Technical constraints

- Next 16 generates typed globals such as `LayoutProps<"/">` and `PageProps<…>`. Use them.
- Never edit `references/templates/support.js`, and don't wire prototypes into the app.
- Language: code, identifiers, file/route names and comments are in English. Spanish (es-419) UI strings appear only in page/component markup. `<html lang="es-419">`. There is no i18n library: a single locale, with strings inline (SPEC 01).
- Theme: light only. Tokens live in `app/globals.css` under `@theme inline`, and there is no dark mode (SPEC 01).
- Rendering: pages that depend on the current time call `await connection()` (`next/server`) so they render per request. The build must list them as dynamic (`ƒ`) (SPEC 01).
- `.next/dev/types` can go stale after a route file is deleted (`tsc` reports a missing `app/page.js`). Delete `.next/dev` and rebuild.

## Testing conventions

- There is no test runner or CI. Verification is `npm run lint` + `npx tsc --noEmit` + `npm run build` + a visual comparison against the prototype (Playwright MCP artifacts go in `.playwright-mcp/`).
- Playwright MCP blocks `file:` URLs. Serve the prototypes with `python3 -m http.server 4173` from `references/templates/` and compare at 1280×800 (resize after navigating: navigation resets the viewport) (SPEC 01).
