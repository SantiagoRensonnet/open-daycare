# SPEC 01 — Staff feed as home page · Tasks

> **Spec:** [requirements](./requirements.md) · [design](./design.md) · tasks

All code (identifiers, file and route names, comments) is in English. Spanish (es-419) UI strings go only in `app/` and `components/` markup.

## Tasks

- [x] 1. Set up the theme tokens and fonts
  - In `app/layout.tsx`, replace Geist with `Fredoka` and `Nunito` from `next/font/google` (variables `--font-fredoka`, `--font-nunito`). Set `lang="es-419"` and the `metadata` from the design. Apply the base background and text to `<body>`.
  - In `app/globals.css`, replace the starter tokens and the dark-mode block with the palette and font tokens from the design's table under `@theme inline`. Port the thin scrollbar rule.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. `npm run dev` still serves `/` (the starter page) in Nunito on `#F6ECDF`.
  - _Requirements: 1.7_

- [x] 2. Add the domain types, routes, date helpers and sample data
  - [x] 2.1 Create `lib/types.ts` (`StaffRole`, `StaffMember`, `Classroom`, `Child`, `PostType`, `PostAudience`, `Post`) and `lib/routes.ts` (`routes`, English segments, entity-first keys: `postNew`, `postDetail`, `postEdit`, `postPhoto`) exactly as in the design.
  - [x] 2.2 Create `lib/dates.ts` with `LOCALE`, `TIME_ZONE = "Europe/Madrid"`, `formatHeaderDate`, `formatTime`, `dayKey`, `zoneOffset` and `atLocalTime`.
  - [x] 2.3 Create `lib/feed.ts` with `getTodayPosts`.
  - [x] 2.4 Create `lib/sample-data.ts` with `currentUser` (Caro Giménez, `teacher`), `staff` (Caro, Lucía), `classroom` (Soles, 12), `children` (Mateo with its colors) and `getSamplePosts(now)` returning `p0`–`p4` with the bodies from the design.
  - Validate: `npx tsc --noEmit` and `npm run lint` pass. Run a one-off `node -e` with the same `Intl` options and `formatToParts` logic: `2026-06-17T12:20:00Z` must yield "miércoles 17 jun" / "14:20" and `2026-01-13T13:20:00Z` must yield "martes 13 ene" / "14:20" (check the ICU output has no stray punctuation). `zoneOffset` must return `+02:00` and `+01:00` for those days.
  - _Requirements: 2.2, 3.2, 3.3, 4.4_

- [x] 3. Build the staff shell and the feed header at `/`
  - [x] 3.1 Create `components/icons.tsx` with the inline SVG icons copied from `references/templates/feed.dc.html`.
  - [x] 3.2 Create `components/staff/SidebarNav.tsx` (client, `usePathname`, `NAV_ITEMS`) and `components/staff/Sidebar.tsx` (brand link, "Nueva publicación", nav, user card with `ROLE_LABELS` and "Cerrar sesión" → `routes.login`). Use `routes.*` for every href.
  - [x] 3.3 Create `app/(staff)/layout.tsx` (sticky 248px sidebar plus scrolling `main` with the 760px column).
  - [x] 3.4 Delete `app/page.tsx`. Create `app/(staff)/page.tsx` (`await connection()`, `now`) rendering `components/feed/FeedHeader.tsx` (with the "niño"/"niños" pluralization).
  - [x] 3.5 Create `components/feed/post-type-labels.ts` (`POST_TYPE_LABELS`) and `components/feed/PostQuickCreate.tsx` (textarea "Comparte un momento…", "Para" select with "Toda la sala" + children, "Tipo" select defaulting to "Anuncio", `type="button"` "Publicar"). Render it below the header.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass, and the build lists `/` as dynamic. In the browser, `/` shows the sidebar with "Feed" active, "GUARDERÍA · SALA SOLES", "Hola, Caro", "12 niños · <today>" and the quick-create form with defaults "Toda la sala" and "Anuncio" (audience options: "Toda la sala", "Mateo"; type options: "Logro", "Actividad", "Anuncio"). Type some text and click "Publicar": nothing happens, and the text stays. Clicking the logo/Feed stays on `/`. "Nueva publicación", Niños, Avisos, Mi cuenta and "Cerrar sesión" go to `/posts/new`, `/children`, `/notifications`, `/account` and `/login` (404). Temporarily set `childrenCount: 1` and confirm "1 niño", then revert.
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 1.9, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [x] 4. Render today's post cards and the empty state
  - [x] 4.1 Create `components/feed/PostTypeBadge.tsx` with `POST_TYPE_BADGES` (colors) and the label from `POST_TYPE_LABELS`, uppercased ("LOGRO", "ACTIVIDAD", "ANUNCIO").
  - [x] 4.2 Create `components/feed/PostCard.tsx`: header by `audience.kind` (child avatar or megaphone + "Anuncio general"), badge, "HH:MM · publicado por ti/<first name>", "Para: …", body, an optional photo placeholder link, a footer with a static heart, a comment link, and "Editar" only when `isOwn`.
  - [x] 4.3 In `app/(staff)/page.tsx`, add the "PUBLICADO HOY" divider, map `getTodayPosts(getSamplePosts(now), now)` to `PostCard`s (resolving author and child, `isOwn = authorId === currentUser.id`), and render "Todavía no hay publicaciones hoy." when the list is empty.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. In the browser, the cards appear in the order p1, p2, p3, p4, and `p0` is absent. `p4` says "publicado por Lucía" with no "Editar". Only `p2` has the photo box. Clicking the heart changes nothing. The comment counts, the photo and "Editar" go to `/posts/<id>`, `/posts/<id>/photo` and `/posts/<id>/edit` (404). Temporarily make `getSamplePosts` return `[]`, see the empty message, then revert.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11_

- [x] 5. Fidelity and copy pass against the prototype
  - With Playwright MCP at 1280×800, screenshot `http://localhost:3000/` and `references/templates/feed.dc.html` (file URL), saving both in `.playwright-mcp/`. Fix any differences in spacing, sizes, weights, colors, shadows or radii in the components from tasks 3–4. Scroll the feed and confirm the sidebar stays fixed.
  - Run the copy checks from the design. `grep -rnE "\b(vos|Compartí|Buenas)\b" app components` must find nothing. Accented Spanish in `lib/` must appear only in `sample-data.ts`.
  - Validate: the side-by-side screenshots match, except for the copy and layout adaptations in **UI copy adaptation** (the quick-create card differs by design). The greps pass. `npm run lint`, `npx tsc --noEmit` and `npm run build` still pass.
  - _Requirements: 1.4, 1.8, 1.9_
