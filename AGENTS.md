<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OpenDayCare

Greenfield app on the bare `create-next-app` starter (`app/page.tsx` is still boilerplate). The product is a Spanish-language daycare/guardería app whose UI is defined by HTML prototypes in `references/` — build to match them, don't invent screens.

## Commands

- `npm run dev` — dev server (port 3000)
- `npm run build` — production build
- `npm run lint` — ESLint over the whole repo (no file args)
- `npx tsc --noEmit` — typecheck (no script exists)
- No test runner, formatter, or CI is configured. `lint` + `tsc` are the only verification.

## Design references (source of truth)

- `references/templates/*.dc.html` — 16 self-contained HTML prototypes of every screen (login, feed, niños, avisos, mi-cuenta, familia-feed, detalle-publicacion, resumen-dia, …). Port these faithfully.
- `references/screenshots/*.png` — rendered screenshots of some screens.
- Prototypes load `references/templates/support.js`, a generated `dc-runtime` renderer. **Never edit `support.js`** and don't wire prototypes into the app; treat them as visual/layout specs.
- Design tokens to replicate in Tailwind: Fredoka (display/headings) + Nunito (body); warm palette — bg `#F6ECDF`, surface `#FFFDF9`, text `#3F362E`, muted `#94887B`/`#A89A8B`, border `#ECE0D0`, accent `#F2937A`/`#E0654A` (strong text `#D9583C`). Layout: 248px desktop sidebar + centered content column (~760px max).
- UI copy is Spanish (Neutral).

## Stack quirks

- Next 16.3.8 App Router, React 19.2.8, Tailwind v4 via `@tailwindcss/postcss`.
- Tailwind v4: no `tailwind.config.js`; theme tokens live in `app/globals.css` under `@theme inline`.
- ESLint 9 flat config (`eslint.config.mjs`) extending `eslint-config-next` core-web-vitals + typescript.
- `@/*` alias maps to the repo root (`./*`), not `src/`. App code lives in `app/`.
- Next 16 generates typed globals such as `LayoutProps<"/">` (already used in `app/layout.tsx`).

## Spec-driven workflow

- Skills `spec` and `spec-impl` (`.agents/skills/`, tracked in `skills-lock.json`) drive large features: `/spec` writes `.sdd/specs/NN-slug/{requirements,design,tasks}.md` and bootstraps `.sdd/steering/`; `/spec-impl` implements an `Approved` spec on a `spec-NN-slug` git branch.
- Agent `spec-verify` (`.opencode/agent/spec-verify.md`) runs after `/spec-impl` finishes: it converts the EARS acceptance criteria in `.sdd/specs/NN-slug/requirements.md` to checkboxes, drives the running app with the Playwright MCP (artifacts in `.playwright-mcp/`), fixes failing app code, and leaves the spec `Status` change to a human.
- `.sdd/` does not exist yet — design the first feature with `/spec`, which creates the steering context.
- `CLAUDE.md` just imports `@AGENTS.md`; this file is the single source of truth.

## MCPs

- Everything related to Playwright (e.g., screenshots, snapshots, traces) must be saved in the `.playwright-mcp` directory.
- Playwright MCP is configured in both `opencode.json` and `.mcp.json`.
