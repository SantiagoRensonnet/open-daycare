# SPEC 02 — Children list and child profile · Tasks

> **Spec:** [requirements](./requirements.md) · [design](./design.md) · tasks

All code (identifiers, file and route names, comments) is in English. Spanish (es-419) UI strings go only in `app/` and `components/` markup. The domain type is `Child`; URLs, route keys and components use `kid`.

## Tasks

- [ ] 1. Extend the domain model, date helpers and sample data
  - [ ] 1.1 In `lib/types.ts`, remove `Classroom.childrenCount`, replace `Child.name` with `firstName` / `lastName`, add `classroomId`, `birthDate`, `enrolledOn`, `allergy` and `notes` to `Child`, and add `ParentRelationship`, `ParentStatus`, `Parent` and `Age`, as in the design.
  - [ ] 1.2 In `lib/dates.ts`, add `formatCalendarDate`, `formatCalendarMonth` and `ageAt`.
  - [ ] 1.3 Create `lib/children.ts` with `getClassroomChildren`, `getChild`, `getChildParents`, `fullName`, `normalizeSearch` and `childMatchesQuery`. It must not import `sample-data.ts`.
  - [ ] 1.4 In `lib/sample-data.ts`, replace `children` with the 8 children from the design's table (in that order) and add `parents` (9 parents).
  - [ ] 1.5 Keep the feed compiling: `PostCard` and `PostQuickCreate` use `child.firstName`. `FeedHeader` takes a `childCount` prop. `app/(staff)/page.tsx` passes `getClassroomChildren(children, classroom.id)` (its length to `FeedHeader`, the list to `PostQuickCreate`).
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. Run the `node -e` logic check from the design's **Testing strategy** (`ageAt` birthday, under-1-year, Feb 29 cases; `normalizeSearch`; calendar formats including "sept 2025"). In the browser, `/` shows "8 niños · <today>", the "Para" selector lists "Toda la sala" + the 8 first names, and the post cards still say "Mateo".
  - _Requirements: 5.1, 5.3, 5.4, 6.3, 6.4_

- [ ] 2. Move the content column into pages and point "Niños" at `/kids`
  - [ ] 2.1 Create `components/staff/PageColumn.tsx` (`maxWidth: 760 | 820 | 880`, static class map). Remove the fixed column from `app/(staff)/layout.tsx`, and wrap the feed page in `<PageColumn maxWidth={760}>`.
  - [ ] 2.2 In `lib/routes.ts`, replace `children` with `kids` and add `kidNew`, `kidDetail`, `kidEdit`, `kidSummary` and `kidLinkParent`.
  - [ ] 2.3 In `components/staff/SidebarNav.tsx`, point "Niños" to `routes.kids` and switch to the prefix-match `isActive` rule (Feed stays exact-match).
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. With Playwright MCP at 1280×800, `/` looks the same as before this task (same column width and padding), with "Feed" active. Clicking "Niños" goes to `/kids` (404 for now).
  - _Requirements: 1.1, 1.3, 6.6_

- [ ] 3. Build the children list at `/kids`
  - [ ] 3.1 Add `SearchIcon` and `ChevronRightIcon` to `components/icons.tsx`, copied from `ninos.dc.html`.
  - [ ] 3.2 Create `components/kids/age-label.ts` (`formatAgeLabel`) and `components/kids/KidAvatar.tsx` (sizes 48 and 84).
  - [ ] 3.3 Create `components/kids/KidCard.tsx`: a link to `routes.kidDetail`, the avatar, full name, "<age> · <parents label>", the right slot (allergy chip > "VINCULAR" > chevron) and the hover lift.
  - [ ] 3.4 Create `components/kids/KidList.tsx` (`"use client"`, `KidListItem` type) with the search box (no filtering yet), the "SALA SOLES · N niños" section header, the 2-column grid, and the "Todavía no hay niños en esta sala." empty state.
  - [ ] 3.5 Create `app/(staff)/kids/page.tsx`: `connection()`, build `KidListItem`s with `ageAt` and `getChildParents`, and render `<PageColumn maxWidth={880}>` with "GESTIÓN", "Niños", the "Agregar niño" link (`routes.kidNew`) and `KidList`.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass, and `/kids` is listed as dynamic. In the browser, `/kids` shows the 8 cards in prototype order with "3 años · 2 padres vinculados" (Mateo), "2 años · sin padres vinculados" + "VINCULAR" (Valentina), "MANÍ" (Mateo), "LACTOSA" (Tomás) and chevrons elsewhere. "Niños" is active. Hovering a card lifts it. A card click goes to `/kids/<id>` (404 for now), and "Agregar niño" goes to `/kids/new` (404). Temporarily give Valentina an allergy and confirm that only the allergy chip shows. Temporarily empty the classroom and confirm "0 niños" + "Todavía no hay niños en esta sala.". Revert both.
  - _Requirements: 1.2, 1.4, 1.6, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 5.2, 6.1_

- [ ] 4. Make the search filter the list
  - In `components/kids/KidList.tsx`, add the `query` state, filter `items` with `childMatchesQuery`, show the matching count in the section header, and add the "Ningún niño coincide con «<query>»." state.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. In the browser, "sofia", "SOFÍA" and "mendez" each show only Sofía Méndez and "1 niño". "  mat  " shows Mateo. "a" shows several children with the right count. "xyz" shows "0 niños" and "Ningún niño coincide con «xyz».". Spaces only show all 8. Clearing the box shows all 8. Pressing Enter does not navigate or reload.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 5. Build the child profile at `/kids/<id>`
  - [ ] 5.1 Add `ChevronLeftIcon` and `AlertTriangleIcon` to `components/icons.tsx`, copied from `perfil-nino.dc.html`.
  - [ ] 5.2 Create `components/kids/KidProfileHeader.tsx`, `KidHealthNotes.tsx` and `KidFacts.tsx`.
  - [ ] 5.3 Create `components/kids/KidParents.tsx` with `RELATIONSHIP_LABELS`, `PARENT_STATUS`, the parent rows, and the "Vincular otro padre" / "Vincular padre" link (`routes.kidLinkParent`).
  - [ ] 5.4 Create `app/(staff)/kids/[id]/page.tsx` (`PageProps<"/kids/[id]">`, `await params`, `connection()`, `notFound()` for unknown ids) rendering `<PageColumn maxWidth={820}>` with "Volver a Niños", the two columns, and the "Resumen del día" link (`routes.kidSummary`).
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass, and `/kids/[id]` is listed as dynamic. In the browser, `/kids/child-mateo` shows "Mateo Fernández", "3 años · Sala Soles", the alert box with the notes, "12 mar 2023" / "Soles" / "feb 2026", Lucía ("Mamá · cuenta activa", "ACTIVA"), Diego ("Papá · invitación enviada", "PENDIENTE") and "Vincular otro padre". `/kids/child-valentina` has no alert box and only "Vincular padre". `/kids/child-tomas` shows "Tutor/a · cuenta activa". "Niños" stays active. "Volver a Niños" goes to `/kids`. `/kids/nope` and `/kids/new` show the 404. "Editar", "Resumen del día" and "Vincular otro padre" go to `/kids/child-mateo/edit`, `/summary` and `/link-parent` (404).
  - _Requirements: 1.2, 1.5, 1.6, 1.7, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 5.2, 6.2_

- [ ] 6. Fidelity and copy pass against the prototypes
  - Serve the prototypes with `python3 -m http.server 4173` from `references/templates/`. With Playwright MCP at 1280×800 (resize after navigating), screenshot `/kids` vs `ninos.dc.html`, `/kids/child-mateo` vs `perfil-nino.dc.html`, and `/` vs `feed.dc.html`, saving everything in `.playwright-mcp/`. Fix differences in column width, spacing, sizes, weights, colors, shadows or radii in the components from tasks 3–5.
  - Run the copy checks from the design. `grep -rnE "\b(vos|Compartí|Buenas|Agregá|Buscá)\b" app components` must find nothing. Accented Spanish in `lib/` must appear only in `sample-data.ts`.
  - Validate: the screenshots match, except for the adaptations in **UI copy adaptation** (and "8 niños" on the feed). The greps pass. `npm run lint`, `npx tsc --noEmit` and `npm run build` still pass.
  - _Requirements: 6.1, 6.5, 6.6, 6.7_
