# SPEC 04 — Add child modal

> **Status:** Approved
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-10-11
> **Objective:** Let staff add a child from `/kids` through an "Agregar niño" modal faithful to `references/templates/agregar-nino.dc.html`, saving it in server memory so it appears in the children list.

## Context

**Primary user:** Staff (teacher) of a classroom. The sample user is still Caro Giménez, a teacher in the "Soles" classroom.
**Goal:** Let staff enroll a new child (name, birth date, classroom, allergies and medical notes) without leaving the children list.

SPEC 02 made the "Agregar niño" button link to `/kids/new`, which shows a 404. This spec turns that button into a modal on `/kids`. The URL does not change, and `/kids/new` keeps showing the 404.

There is no backend yet. Saved children live in the server's memory: they survive reloads and navigation, and they are lost when the server restarts. A later persistence spec replaces this.

The prototype's "SALA" field needs real choices, so the sample daycare gains two empty classrooms, "Lunas" and "Estrellas". `/kids` therefore groups children by classroom. The prototype's "NOMBRE COMPLETO" is a single value, so every child's name becomes one full-name value. Screens that show a first name (the feed) use its first word, and they look unchanged.

UI copy is neutral Latin American Spanish, and dates use the app timezone `Europe/Madrid` (see `product.md`). Domain terms are English (glossary in `product.md`). Spanish appears only in quoted UI strings.

## Scope

**In:**

- A modal on `/kids`, opened by the "Agregar niño" button, faithful to `agregar-nino.dc.html`: a header with "Cancelar", "Agregar niño" and "Guardar", and the fields "NOMBRE COMPLETO", "FECHA DE NACIMIENTO", "SALA", "ALERGIAS (ETIQUETAS)" and "NOTAS MÉDICAS".
- Closing without saving through "Cancelar", the Escape key or a click outside the card, with an inline discard confirmation when something was typed.
- Validation of the name and birth date, with inline error messages.
- Saving the child in server memory. The child appears at the end of its classroom's section in `/kids`, and its profile works.
- A classroom select with three classrooms: Soles (pre-selected), Lunas and Estrellas.
- `/kids` grouped into one section per classroom with children.
- Children's names stored as a single full name, and allergies as a list (several allergies per child).
- Automatic avatar colors and enrollment date for new children.

**Out of scope (for future specs):**

- Editing or deleting a child (the profile's "Editar" keeps linking to `/kids/<id>/edit`, which 404s).
- A `/kids/new` URL, deep links to the modal, and closing it with the browser's Back button.
- A real backend, database or persistence across server restarts.
- Linking parents while adding a child.
- Photos for children.
- Allergy tag chips inside the field (allergies are typed as a comma-separated list).
- Managing classrooms (create, rename, delete), switching the current user's classroom, and per-classroom feeds or sidebars.
- Mobile/narrow-screen layout and dark mode.

## UI copy adaptation

The prototype has no copy for errors or the discard confirmation. These strings are new. Every prototype string is used verbatim.

| Where | Copy |
| --- | --- |
| Name required | "Ingresa el nombre completo." |
| Birth date required | "Ingresa la fecha de nacimiento." |
| Birth date not a real date in the format | "Usa el formato dd/mm/aaaa con una fecha real." |
| Birth date in the future | "La fecha no puede ser futura." |
| Birth date more than 6 years ago | "La fecha no puede ser de hace más de 6 años." |
| Save failed | "No se pudo guardar. Intenta de nuevo." |
| Saving in progress (replaces "Guardar") | "Guardando…" |
| Discard confirmation | "¿Descartar los cambios?", "Lo que escribiste se perderá.", buttons "Seguir editando" and "Descartar" |

## Requirements

### Requirement 1 — Opening the modal

**As a** staff member
**I want to** open an "Agregar niño" form from the children list
**So that** I can enroll a child without leaving the list

**Acceptance criteria:**

- **1.1.** WHEN the user clicks "Agregar niño" on `/kids` THE SYSTEM SHALL open the "Agregar niño" modal over the list, with the URL still `/kids`.
- **1.2.** WHILE the modal is open THE SYSTEM SHALL dim the page behind it and SHALL NOT let the user interact with the page behind it.
- **1.3.** WHEN the modal opens THE SYSTEM SHALL put the keyboard focus in "NOMBRE COMPLETO", with every text field empty, "Soles" selected in "SALA" and no error shown.
- **1.4.** THE SYSTEM SHALL show the modal header with "Cancelar" on the left, the title "Agregar niño" in the center and "Guardar" on the right.
- **1.5.** THE SYSTEM SHALL show the fields in the prototype's order and layout: "NOMBRE COMPLETO" (placeholder "Ej. Martina López"); then, side by side, "FECHA DE NACIMIENTO" (placeholder "dd/mm/aaaa") and "SALA"; then "ALERGIAS (ETIQUETAS)" (placeholder "Ej. Maní, Lactosa"); then "NOTAS MÉDICAS" (multi-line, placeholder "Indicaciones, medicación, contactos…", vertically resizable).
- **1.6.** THE SYSTEM SHALL offer "Soles", "Lunas" and "Estrellas", in that order, in the "SALA" select.
- **1.7.** IF the user opens `/kids/new` THEN THE SYSTEM SHALL show the framework's standard 404.

### Requirement 2 — Closing without saving

**As a** staff member
**I want to** close the form without saving, without losing typed data by accident
**So that** I can back out safely

**Acceptance criteria:**

- **2.1.** WHEN the user clicks "Cancelar", presses Escape or clicks outside the card while every field still has its initial value THE SYSTEM SHALL close the modal and add nothing.
- **2.2.** IF the user clicks "Cancelar", presses Escape or clicks outside the card after changing any field from its initial value THEN THE SYSTEM SHALL keep the modal open and show, inside the card, "¿Descartar los cambios?", "Lo que escribiste se perderá." and the buttons "Seguir editando" and "Descartar".
- **2.3.** A field counts as changed when its value differs from its initial value: a text field that is not empty, or a "SALA" other than "Soles". Typing and then deleting the text leaves the field unchanged.
- **2.4.** WHEN the user clicks "Seguir editando" or presses Escape in the discard confirmation THE SYSTEM SHALL go back to the form with every typed value intact.
- **2.5.** WHEN the user clicks "Descartar" THE SYSTEM SHALL close the modal and add nothing.
- **2.6.** WHILE the discard confirmation is shown THE SYSTEM SHALL ignore clicks outside the card.
- **2.7.** IF a mouse press starts inside the card and is released outside it (e.g. while selecting text) THEN THE SYSTEM SHALL NOT treat it as a click outside the card.
- **2.8.** WHEN the modal is opened again after closing it in any way THE SYSTEM SHALL show it in the initial state of criterion 1.3.
- **2.9.** WHEN the modal closes THE SYSTEM SHALL return the keyboard focus to the "Agregar niño" button.

### Requirement 3 — Validation

**As a** staff member
**I want to** be told which fields are wrong before the child is saved
**So that** I never store a child with a missing name or an impossible birth date

**Acceptance criteria:**

- **3.1.** IF the user clicks "Guardar" with "NOMBRE COMPLETO" empty or only spaces THEN THE SYSTEM SHALL show "Ingresa el nombre completo." under the field and give the field a red border.
- **3.2.** IF the user clicks "Guardar" with "FECHA DE NACIMIENTO" empty or only spaces THEN THE SYSTEM SHALL show "Ingresa la fecha de nacimiento." under the field and give the field a red border.
- **3.3.** IF the birth date is not `d/m/aaaa` (day and month with 1 or 2 digits, year with 4) or is not a real calendar date (e.g. "31/02/2025", "2025-03-01") THEN THE SYSTEM SHALL show "Usa el formato dd/mm/aaaa con una fecha real.".
- **3.4.** IF the birth date is after today in the app timezone THEN THE SYSTEM SHALL show "La fecha no puede ser futura.".
- **3.5.** IF the birth date is before the same calendar day 6 years ago THEN THE SYSTEM SHALL show "La fecha no puede ser de hace más de 6 años." Today and the same day 6 years ago are both valid (on 2026-10-11: "11/10/2020" is valid, "10/10/2020" is not).
- **3.6.** WHEN any field is invalid THE SYSTEM SHALL show every error at once, keep the modal open with every typed value, and add nothing.
- **3.7.** WHEN the user edits a field that shows an error THE SYSTEM SHALL remove that field's error and red border.
- **3.8.** THE SYSTEM SHALL accept "ALERGIAS (ETIQUETAS)" and "NOTAS MÉDICAS" empty.
- **3.9.** WHEN the user presses Enter in a single-line field THE SYSTEM SHALL behave as if "Guardar" was clicked. In "NOTAS MÉDICAS", Enter adds a new line.
- **3.10.** IF the save request reaches the server with invalid data (bypassing the modal's checks) THEN THE SYSTEM SHALL store nothing and show the same errors in the modal.

### Requirement 4 — Saving the child

**As a** staff member
**I want to** save the child and see them in the list right away
**So that** they are part of the classroom from that moment

**Acceptance criteria:**

- **4.1.** WHEN the user clicks "Guardar" with valid data THE SYSTEM SHALL close the modal and show the new child's card last in its classroom's section on `/kids`, with that section's count increased by one, without a full page reload.
- **4.2.** WHILE the save is in progress THE SYSTEM SHALL show "Guardando…" instead of "Guardar", ignore further "Guardar" clicks, and ignore "Cancelar", Escape and clicks outside the card.
- **4.3.** THE SYSTEM SHALL store the name with leading and trailing spaces removed and repeated inner spaces collapsed to one ("  Martina   López " → "Martina López").
- **4.4.** THE SYSTEM SHALL store the allergies as a list: the text split on commas, each item trimmed with inner spaces collapsed, empty items dropped, and repeats removed regardless of case and accents (the first spelling is kept). "Maní, , lactosa, MANI" → "Maní", "lactosa".
- **4.5.** THE SYSTEM SHALL show the new child's card with the name's first letter in the avatar, the full name, "<age> · sin padres vinculados", and the first allergy in uppercase as the chip, or the "VINCULAR" chip when there are no allergies.
- **4.6.** THE SYSTEM SHALL give the new child the avatar colors at position (number of children before saving) mod 5 in this list: `#A9D9E8`/`#1F7A93`, `#F4B8CC`/`#C44A7A`, `#B9DEC4`/`#3E8B62`, `#F4DC8E`/`#9A7B1E`, `#C9B6E8`/`#7B5FC0`. With the 8 sample children, the 9th gets `#F4DC8E`/`#9A7B1E`.
- **4.7.** THE SYSTEM SHALL set the new child's enrollment date to today in the app timezone.
- **4.8.** WHEN the save succeeds THE SYSTEM SHALL clear the search box and show every child.
- **4.9.** WHEN the user opens the new child's card THE SYSTEM SHALL show their profile with the full name, the age, "Sala <classroom name>", the birth date, "Ingreso" with the current month, and "Vincular padre" in the parents card.
- **4.10.** THE SYSTEM SHALL keep the saved child after page reloads and navigation, until the server restarts.
- **4.11.** IF the save fails for a reason other than validation THEN THE SYSTEM SHALL keep the modal open with every typed value and show "No se pudo guardar. Intenta de nuevo." below the fields.
- **4.12.** WHEN the new child is in "Soles" THE SYSTEM SHALL count them in the feed header ("9 niños") and offer their first name (the first word of the full name) in the feed's "Para" selector.

### Requirement 5 — Allergies and notes on the profile

**As a** staff member
**I want to** see a child's allergies on their profile even when no notes were written
**So that** safety information is never hidden

**Acceptance criteria:**

- **5.1.** WHEN a child has medical notes THE SYSTEM SHALL show the notes in the "Alergias y notas" box, keeping their line breaks.
- **5.2.** WHEN a child has allergies and no notes THE SYSTEM SHALL show the allergies joined by ", " in the "Alergias y notas" box (e.g. "Maní, lactosa").
- **5.3.** IF a child has no allergies and no notes THEN THE SYSTEM SHALL NOT show the "Alergias y notas" box.
- **5.4.** THE SYSTEM SHALL store notes with leading and trailing spaces removed, and treat notes that are empty or only spaces as no notes.

### Requirement 6 — Classrooms on the children list

**As a** staff member
**I want to** see children grouped by classroom
**So that** a child added to another classroom is visible too

**Acceptance criteria:**

- **6.1.** THE SYSTEM SHALL provide three classrooms in this order: Soles (with the 8 sample children), Lunas and Estrellas (both with no children).
- **6.2.** THE SYSTEM SHALL show on `/kids` one section per classroom that has at least one shown child, in classroom order. Each section has the header "SALA <NAME>", the number of children shown ("1 niño" / "N niños"), the horizontal rule and its own 2-column grid.
- **6.3.** WHEN the user types in the search box THE SYSTEM SHALL filter children across every classroom, hide the sections with no match, and show each section's count of matching children.
- **6.4.** IF no child is shown (no children at all, or no match) THEN THE SYSTEM SHALL show a single "SALA SOLES" header with "0 niños" and the SPEC 02 message ("Todavía no hay niños en esta sala." or "Ningún niño coincide con «<search text>».").
- **6.5.** WHILE only Soles has children THE SYSTEM SHALL render `/kids` as SPEC 02 did.
- **6.6.** THE SYSTEM SHALL keep the sidebar, the feed header and the feed's "Para" selector about Soles only.

### Requirement 7 — Fidelity and consistency

**As a** staff member
**I want to** see the modal and the existing screens match the prototypes
**So that** the visual language stays consistent

**Acceptance criteria:**

- **7.1.** WHEN viewed at 1280×800 THE SYSTEM SHALL match `agregar-nino.dc.html` in the modal card's width, header, field labels, field styles, spacing, sizes and colors.
- **7.2.** THE SYSTEM SHALL keep `/`, `/kids` and every existing `/kids/<id>` profile visually unchanged after names become a single full name and allergies become a list, except for criterion 5.1's line breaks.
- **7.3.** THE SYSTEM SHALL write all UI copy in neutral Latin American Spanish, with no voseo forms.

## What is **not** in this spec

- Editing or deleting children.
- A `/kids/new` URL, deep links to the modal and closing it with Back.
- A backend, a database and persistence across server restarts.
- Linking parents, child photos and allergy tag chips.
- Managing or switching classrooms, and per-classroom feeds.
- Mobile layout and dark mode.

Each one of those, if it lands, goes in its own spec.
