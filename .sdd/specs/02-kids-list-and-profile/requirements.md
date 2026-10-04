# SPEC 02 — Children list and child profile

> **Status:** Approved
> **Depends on:** SPEC 01
> **Date:** 2026-10-04
> **Objective:** Add the staff Children screens: a searchable list at `/kids` and a child profile at `/kids/<id>`, built from `references/templates/ninos.dc.html` and `references/templates/perfil-nino.dc.html` with sample data.

## Context

**Primary user:** Staff (teacher) of a classroom. The sample user is still Caro Giménez, a teacher in the "Soles" classroom.
**Goal:** Let staff find any child in their classroom and see their key facts: age, allergies and notes, dates, and the parents linked to them.

These are the first screens after the feed. They reuse the staff shell from SPEC 01. The sidebar's "Niños" item now points to `/kids` instead of `/children`.

The sample classroom becomes the 8 children from the prototype, and the classroom's children count is derived from that list. This changes two SPEC 01 behaviors: the feed header reads "8 niños" instead of "12 niños" (SPEC 01 criterion 2.1), and the feed's "Para" selector offers the 8 children by first name (SPEC 01 criterion 2.5).

UI copy is neutral Latin American Spanish, and dates use the app timezone `Europe/Madrid` (see `product.md`). Domain terms are English (glossary in `product.md`). Spanish appears only in quoted UI strings.

## Scope

**In:**

- The Children list at `/kids`, faithful to `ninos.dc.html` at desktop widths: header, "Agregar niño" link, search box, classroom section header with the count, and a 2-column grid of child cards.
- Live search by name that filters the grid as the user types.
- The child profile at `/kids/<id>`, faithful to `perfil-nino.dc.html`: back link, header with "Editar", the allergies and notes box, the facts card, the "Resumen del día" button and the "PADRES VINCULADOS" card.
- Age computed from the birth date and today's date.
- Linked parents with relationship (Mamá, Papá, Tutor/a) and status (active or invitation pending).
- Sample data for the 8 prototype children and their parents.
- Sidebar: "Niños" links to `/kids` and stays active on every `/kids/…` page.
- A standard 404 for unknown child ids.
- Links to future screens (add child, edit child, day summary, link parent) using their final URLs. They show the standard 404 until their specs land.

**Out of scope (for future specs):**

- Backend, database and persistence.
- Adding, editing or deleting children (`/kids/new`, `/kids/<id>/edit`).
- Linking parents, sending or resending invitations (`/kids/<id>/link-parent`).
- The day summary screen (`/kids/<id>/summary`).
- Multiple classrooms, classroom switching, and the other classrooms' children.
- Sorting or filtering by anything other than name, and pagination.
- Login, sessions and roles.
- Mobile/narrow-screen layout, and dark mode.
- Real photos for children or parents. Avatars are initials.

## UI copy adaptation

These strings differ from the prototypes. Every other UI string is used verbatim.

| Prototype (es-AR) | This app (es-419) | Why |
| --- | --- | --- |
| "Lucía Fernández · Mamá · activa" | "Mamá · cuenta activa" | Gender agreement works for every relationship (Papá, Tutor/a). |
| "12 mar 2022" (birth date), "feb 2025" (enrolled) | "12 mar 2023", "feb 2026" | Sample dates move one year forward, so the computed age is still "3 años" today. |

## Requirements

### Requirement 1 — Navigation to the Children screens

**As a** staff member
**I want to** reach the children list from the sidebar and move between the list and a profile
**So that** I can look up any child from anywhere in the app

**Acceptance criteria:**

- [ ] **1.1.** WHEN the user clicks "Niños" in the sidebar THE SYSTEM SHALL navigate to `/kids`.
- [ ] **1.2.** WHILE the current page is `/kids` or any `/kids/<…>` page THE SYSTEM SHALL show "Niños" as the active nav item, and "Feed" as inactive.
- [ ] **1.3.** WHILE the current page is `/` THE SYSTEM SHALL keep showing "Feed" as the only active nav item.
- [ ] **1.4.** WHEN the user clicks a child card in the list THE SYSTEM SHALL navigate to `/kids/<child id>`.
- [ ] **1.5.** WHEN the user clicks "Volver a Niños" on a profile THE SYSTEM SHALL navigate to `/kids`.
- [ ] **1.6.** WHEN the user clicks a link to an unbuilt screen THE SYSTEM SHALL navigate as follows and show the framework's standard 404: "Agregar niño" → `/kids/new`, "Editar" → `/kids/<id>/edit`, "Resumen del día" → `/kids/<id>/summary`, "Vincular otro padre" / "Vincular padre" → `/kids/<id>/link-parent`.
- [ ] **1.7.** IF the user opens `/kids/<id>` with an id that matches no child THEN THE SYSTEM SHALL show the framework's standard 404.

### Requirement 2 — Children list

**As a** staff member
**I want to** see every child in my classroom with their age, linked parents and alerts
**So that** I can spot at a glance who has an allergy or no parent linked yet

**Acceptance criteria:**

- [ ] **2.1.** THE SYSTEM SHALL show at `/kids` the eyebrow "GESTIÓN", the title "Niños", and an "Agregar niño" button with a plus icon on the right.
- [ ] **2.2.** THE SYSTEM SHALL show a search box with a magnifier icon and the placeholder "Buscar niño…" below the header.
- [ ] **2.3.** THE SYSTEM SHALL show a section header "SALA SOLES" followed by the number of children shown ("8 niños"; "1 niño" when there is one) and a horizontal rule.
- [ ] **2.4.** THE SYSTEM SHALL show the classroom's children in a 2-column grid of cards, in the sample data's order: Mateo Fernández, Sofía Méndez, Benjamín Ruiz, Valentina Soto, Tomás Díaz, Emma Castro, Lucas Romero, Olivia Vega.
- [ ] **2.5.** THE SYSTEM SHALL show on each card the child's first-name initial in a 48px circle with that child's colors, the full name, and the subtitle "<age> · <parents>".
- [ ] **2.6.** THE SYSTEM SHALL write `<parents>` as "N padres vinculados", "1 padre vinculado", or "sin padres vinculados", counting every linked parent whether their status is active or pending.
- [ ] **2.7.** WHEN a child has an allergy THE SYSTEM SHALL show the allergy name in uppercase as a chip at the right of the card (background `#FBD8CC`, text `#D9684A`; e.g. "MANÍ", "LACTOSA").
- [ ] **2.8.** IF a child has no allergy and no linked parents THEN THE SYSTEM SHALL show a "VINCULAR" chip at the right of the card (background `#F9D2DE`, text `#C56486`).
- [ ] **2.9.** IF a child has an allergy and no linked parents THEN THE SYSTEM SHALL show only the allergy chip.
- [ ] **2.10.** IF a child has no allergy and at least one linked parent THEN THE SYSTEM SHALL show a chevron at the right of the card.
- [ ] **2.11.** WHEN the pointer hovers a card THE SYSTEM SHALL change its border to `#F2A78E` and lift it 2px.
- [ ] **2.12.** IF the classroom has no children THEN THE SYSTEM SHALL show "0 niños" in the section header and the muted text "Todavía no hay niños en esta sala." instead of the grid.

### Requirement 3 — Search

**As a** staff member
**I want to** filter the list by typing part of a child's name
**So that** I can find a child quickly without scrolling

**Acceptance criteria:**

- [ ] **3.1.** WHEN the user types in the search box THE SYSTEM SHALL show only the children whose full name contains the typed text, updating on every keystroke without navigating or reloading.
- [ ] **3.2.** THE SYSTEM SHALL match regardless of case and accents (e.g. "sofia" and "SOFÍA" both match "Sofía Méndez", "mendez" matches it too).
- [ ] **3.3.** THE SYSTEM SHALL ignore leading and trailing spaces in the search text.
- [ ] **3.4.** WHILE the search text is empty or only spaces THE SYSTEM SHALL show every child.
- [ ] **3.5.** WHILE a search is active THE SYSTEM SHALL show in the section header the number of matching children.
- [ ] **3.6.** IF no child matches THEN THE SYSTEM SHALL show "0 niños" and the muted text "Ningún niño coincide con «<search text>»." instead of the grid.
- [ ] **3.7.** WHEN the user clears the search box THE SYSTEM SHALL show every child again.

### Requirement 4 — Child profile

**As a** staff member
**I want to** open a child's profile
**So that** I can check their health notes, key dates and who their linked parents are

**Acceptance criteria:**

- [ ] **4.1.** THE SYSTEM SHALL show at `/kids/<id>` a "Volver a Niños" link with a left chevron, above the profile.
- [ ] **4.2.** THE SYSTEM SHALL show the child's initial in an 84px circle with the child's colors, the full name as the title, the subtitle "<age> · Sala <classroom name>", and an "Editar" button on the right.
- [ ] **4.3.** WHEN the child has allergies or notes THE SYSTEM SHALL show a box with a warning icon, the title "Alergias y notas" and the notes text (box background `#FBDAD6`, title `#C5413A`, text `#B25249`).
- [ ] **4.4.** IF the child has no allergies or notes THEN THE SYSTEM SHALL NOT show the "Alergias y notas" box.
- [ ] **4.5.** THE SYSTEM SHALL show a facts card with three rows: "Fecha de nacimiento" with the date as "<day> <month> <year>" (e.g. "12 mar 2023"), "Sala" with the classroom name, and "Ingreso" with the enrollment month as "<month> <year>" (e.g. "feb 2026"). Months are abbreviated lowercase Spanish with no periods ("mar", "feb"; September is "sept").
- [ ] **4.6.** THE SYSTEM SHALL show a dark "Resumen del día" button with a sun icon at the top of the right column.
- [ ] **4.7.** THE SYSTEM SHALL show a "PADRES VINCULADOS" card listing each linked parent with their initial in a colored circle, full name, "<relationship> · <status text>" and a status chip.
- [ ] **4.8.** THE SYSTEM SHALL write the relationship as "Mamá", "Papá" or "Tutor/a".
- [ ] **4.9.** WHEN a parent's account is active THE SYSTEM SHALL write "cuenta activa" and show an "ACTIVA" chip (background `#CFEBD8`, text `#3E9B6C`).
- [ ] **4.10.** WHEN a parent's invitation is pending THE SYSTEM SHALL write "invitación enviada" and show a "PENDIENTE" chip (background `#F7E7A6`, text `#9A7B1E`).
- [ ] **4.11.** WHEN the child has at least one linked parent THE SYSTEM SHALL end the card with a dashed-circle plus icon and "Vincular otro padre".
- [ ] **4.12.** IF the child has no linked parents THEN THE SYSTEM SHALL show only the dashed-circle plus icon and "Vincular padre" in the card.

### Requirement 5 — Age

**As a** staff member
**I want to** see each child's current age
**So that** I don't have to work it out from the birth date

**Acceptance criteria:**

- [ ] **5.1.** THE SYSTEM SHALL compute the age in completed years and months between the birth date and today's date in the app timezone.
- [ ] **5.2.** WHEN the child is 1 year or older THE SYSTEM SHALL write "1 año" or "N años".
- [ ] **5.3.** IF the child is younger than 1 year THEN THE SYSTEM SHALL write "1 mes" or "N meses" (including "0 meses" for a newborn).
- [ ] **5.4.** WHEN today is the child's birthday THE SYSTEM SHALL count the new year (born 2023-10-04 → "3 años" on 2026-10-04, "2 años" on 2026-10-03).

### Requirement 6 — Sample data and fidelity

**As a** staff member
**I want to** see a realistic classroom
**So that** the screens can be reviewed against the prototypes before persistence lands

**Acceptance criteria:**

- [ ] **6.1.** THE SYSTEM SHALL provide the 8 prototype children with their prototype colors, ages ("3 años" or "2 años" as in the prototype, as of 2026-10-04), parent counts and chips.
- [ ] **6.2.** THE SYSTEM SHALL give Mateo Fernández the prototype's profile: notes "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.", birth date 12 mar 2023, enrolled feb 2026, and parents Lucía Fernández (Mamá, active) and Diego Fernández (Papá, pending).
- [ ] **6.3.** THE SYSTEM SHALL show "8 niños" in the feed header, derived from the classroom's children.
- [ ] **6.4.** THE SYSTEM SHALL offer "Toda la sala" followed by the 8 children's first names in the feed's "Para" selector.
- [ ] **6.5.** WHEN viewed at 1280×800 THE SYSTEM SHALL match `ninos.dc.html` (at `/kids`) and `perfil-nino.dc.html` (at `/kids/child-mateo`) in layout, column width, spacing, sizes and colors, and in copy, except for the adaptations in **UI copy adaptation**.
- [ ] **6.6.** THE SYSTEM SHALL keep the feed at `/` visually unchanged apart from criteria 6.3 and 6.4.
- [ ] **6.7.** THE SYSTEM SHALL write all UI copy in neutral Latin American Spanish, with no voseo forms.

## What is **not** in this spec

- Backend, persistence, login, sessions and roles.
- Adding, editing or deleting children.
- Linking parents and managing invitations.
- The day summary screen.
- Multiple classrooms, other sort orders, other filters and pagination.
- Mobile layout, dark mode and real photos.

Each one of those, if it lands, goes in its own spec.
