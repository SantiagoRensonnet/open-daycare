# Tech stack

> **Last updated:** 2026-10-03 · initial generation

## Stack

| Layer | Technology | Version | Notes |
| --- | --- | --- | --- |
| Language | TypeScript | ^5 | `strict: true` |
| Framework | Next.js (App Router) | 16.3.8 | Breaking changes vs. older Next. Read `node_modules/next/dist/docs/` before coding |
| UI | React | 19.2.8 | |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` | ^4 | No `tailwind.config.js`. Tokens go in `app/globals.css` under `@theme inline` |
| Lint | ESLint 9 flat config + `eslint-config-next` | 16.3.8 | core-web-vitals + typescript |

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
- Language: code, identifiers, file/route names and comments are in English. Spanish (es-419) UI strings appear only in page/component markup.

## Testing conventions

- There is no test runner or CI. Verification is `npm run lint` + `npx tsc --noEmit` + `npm run build` + a visual comparison against the prototype (Playwright MCP artifacts go in `.playwright-mcp/`).
