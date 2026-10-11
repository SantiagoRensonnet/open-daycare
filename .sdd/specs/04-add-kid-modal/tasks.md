# SPEC 04 — Add child modal · Tasks

> **Spec:** [requirements](./requirements.md) · [design](./design.md) · tasks

All code (identifiers, file and route names, comments) is in English. Spanish (es-419) UI strings go only in `app/` and `components/` markup. `lib/` returns error codes, never copy.

## Tasks

- [x] 1. Switch `Child` to `fullName` and `allergies`, and add the three classrooms
  - In `lib/types.ts`, replace `Child.firstName`/`lastName` with `fullName`, and `allergy` with `allergies: string[]`.
  - In `lib/sample-data.ts`, add `classrooms` (Soles, Lunas, Estrellas) with `classroom = classrooms[0]`, and migrate the 8 children (`fullName`, `allergies: ["Maní"]` / `["Lactosa"]` / `[]`).
  - In `lib/children.ts`, add `shortName` and `getChildrenByClassroom`, and make `childMatchesQuery` use `child.fullName`. `fullName()` stays for parents.
  - Update `KidAvatar`, `KidCard` (`allergies[0]`), `KidProfileHeader`, `PostCard` and `PostQuickCreate` (`shortName`).
  - On the profile page, look up the classroom in `classrooms` and compute the box text (notes, else the joined allergies, else no box). Add `whitespace-pre-line` to `KidHealthNotes`.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. In the browser, `/`, `/kids`, `/kids/child-mateo` and `/kids/child-valentina` look exactly as before. A temporary edit (reverted) that gives Valentina `allergies: ["Maní", "Lactosa"]` and no notes shows "Maní, Lactosa" in her profile box and a "MANÍ" chip on her card.
  - _Requirements: 4.12, 5.1, 5.2, 5.3, 6.1, 6.6, 7.2_

- [x] 2. Group `/kids` by classroom
  - `kids/page.tsx` builds `items` from all children and passes `classrooms` to `KidList`, keyed by `children.length`.
  - `KidList` renders one section per classroom with shown children (header, count, rule, grid; `mt-[26px]` between sections), and the single `classrooms[0]` header with "0 niños" and the SPEC 02 messages when nothing is shown.
  - Validate: lint, tsc and build pass. `/kids` is unchanged with the sample data. With a temporary edit (reverted) that moves Olivia to `classroom-lunas`, a "SALA LUNAS · 1 niño" section appears after Soles ("7 niños"), "olivia" shows only the Lunas section, and "zzz" shows the single "SALA SOLES · 0 niños" header and the no-match message.
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 3. Add the form parser `lib/child-form.ts`
  - Create `ChildFormInput`, `ChildFormError`, `ChildFormErrors`, `NewChild`, `readChildForm`, `parseChildForm`, `buildChild` and `AVATAR_COLORS`, as in the design (name normalization, `d/m/aaaa` parsing with real-date check, future and 6-year bounds, allergy split and dedupe, notes → `null`, avatar rotation, `enrolledOn` = today).
  - Validate: lint and tsc pass. A one-off `npx tsx -e` script runs every case listed under **Testing strategy → Logic check** in the design with `today = "2026-10-11"`, and all of them match.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.8, 4.3, 4.4, 4.6, 4.7, 5.4_

- [ ] 4. Build the generic `Modal` and `ModalRow`
  - [ ] 4.1 Create `components/ui/ModalRow.tsx`.
  - [ ] 4.2 Create `components/ui/Modal.tsx` (`"use client"`): trigger button, `<dialog>` + `showModal()`, the header (Cancelar, title, Guardar/"Guardando…"), the form body, `requestClose` with `isFormDirty`, the inline discard confirmation ("¿Descartar los cambios?", "Lo que escribiste se perderá.", "Seguir editando", "Descartar"), the `cancel`/`close` listeners, the mouse-down + click outside-click guard, and the `saving` guard on submit and close.
  - Validate: lint and tsc pass. Behavior is checked in task 5, its first consumer.
  - _Requirements: 1.2, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.9, 4.2_

- [ ] 5. Build `AddKidModal` and wire it into `/kids` (client-side only)
  - Add `ChevronDownIcon` to `components/icons.tsx`, copied from `agregar-nino.dc.html`.
  - Create `components/kids/AddKidModal.tsx` with the four `ModalRow`s, the prototype field styles, the classroom `<select>`, `ERROR_MESSAGES`, per-field error clearing, and `save()` running `parseChildForm` on the client. For now, a valid form returns `false` (stays open), until task 6 adds the server call.
  - In `kids/page.tsx`, replace the "Agregar niño" `<Link>` with `<AddKidModal classrooms={classrooms} defaultClassroomId={classroom.id} />`. Remove `kidNew` from `lib/routes.ts`, and update the `new` comment in `kids/[id]/page.tsx`.
  - Validate: lint, tsc and build pass. In the browser, the button opens the modal with the URL still `/kids`, the page dimmed, the focus in the name field and Soles selected. The select lists Soles, Lunas, Estrellas. Every close path works, with and without changes (confirmation, "Seguir editando" keeps values, Escape on the confirmation, type-then-delete is clean, a drag-select ending outside doesn't close). Reopening shows a clean form. The focus returns to the button. The validation messages appear together, clear on edit, and Enter submits. `/kids/new` is a 404.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

- [ ] 6. Save through the `createChild` Server Action
  - Add `addChild` to `lib/sample-data.ts`.
  - Create `app/(staff)/kids/actions.ts` with `createChild`: re-validate, `buildChild` with `child-<uuid>`, the position and today, `addChild`, then `refresh()`.
  - In `AddKidModal.save`, call `createChild` after client validation. Map `{ ok: false }` to the errors, a throw to "No se pudo guardar. Intenta de nuevo.", and `{ ok: true }` to `true`.
  - Validate: lint, tsc and build pass. In the browser, saving "Martina López", "1/3/2024", Soles, "Maní, lactosa" shows "Guardando…", closes the modal, and appends the card last with "2 años · sin padres vinculados", a "MANÍ" chip and a yellow avatar. "9 niños" appears, the search is cleared, and the change survives a reload. Her profile shows "Sala Soles", "1 mar 2024", "Ingreso oct 2026", "Maní, lactosa" in the box and "Vincular padre". The feed shows "9 niños" and "Martina" in "Para". A child saved to Lunas creates the "SALA LUNAS" section. A temporary throw in `createChild` (reverted) shows the save-failed message with the values kept. A temporary skip of the client check (reverted) with an empty name shows the server's "Ingresa el nombre completo." and stores nothing.
  - _Requirements: 3.10, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 6.2_

- [ ] 7. Fidelity and copy pass against the prototype
  - Serve the prototypes with `python3 -m http.server 4173` from `references/templates/`. With Playwright MCP at 1280×800 (resize after navigating), screenshot the open modal vs `agregar-nino.dc.html`, and `/`, `/kids` and `/kids/child-mateo` vs their prototypes, saving everything in `.playwright-mcp/`. Fix differences in the card width, header, label and field styles, spacing, radii, colors and the select's chevron.
  - Run the copy check from the design: `grep -rnE "\b(vos|Ingresá|Usá|Elegí|Intentá|escribís)\b" app components` must find nothing.
  - Validate: the screenshots match, except for the backdrop and the new error/confirmation copy. The grep passes. Lint, tsc and build still pass.
  - _Requirements: 7.1, 7.2, 7.3_
