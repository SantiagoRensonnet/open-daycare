# SPEC 01 — Staff feed as home page

> **Status:** Approved
> **Depends on:** —
> **Date:** 2026-10-03
> **Objective:** Replace the starter page with the staff Feed screen from `references/templates/feed.dc.html`, rendered at `/` from sample data.

## Context

**Primary user:** Staff (teacher) of a classroom. The sample user is Caro Giménez, a teacher in the "Soles" classroom.
**Goal:** Give staff a home screen showing today's posts for their classroom, with entry points to the rest of the app.

This is the first screen of the app. It also sets up the staff shell (sidebar), which the other staff screens (Children, Notifications, Account…) will reuse.

UI copy is neutral Latin American Spanish (see `product.md`).

**App timezone:** `Europe/Madrid` (Barcelona), chosen for testing because that is where the developer is located. Every "today" and every displayed time in this spec uses it, regardless of the server's or browser's timezone. Domain terms in this document are English (glossary in `product.md`). Spanish appears only in quoted UI strings.

## Scope

**In:**

- The Feed screen at `/`, faithful to `references/templates/feed.dc.html` at desktop widths. Copy is adapted from Argentine voseo to neutral Latin American Spanish (see **UI copy adaptation**).
- The staff shell: left sidebar with brand, "Nueva publicación" button, navigation, and the user card with logout.
- A header with the classroom, a greeting, the children count and today's real date.
- A quick-create form below the header: a text box, an audience selector, a type selector (our 3 types) and a "Publicar" button that does nothing yet.
- A "PUBLICADO HOY" list of post cards: achievement, activity and announcement types, an optional photo placeholder, reaction and comment counts, and an edit link for own posts.
- Sample data: the "Soles" classroom, Caro Giménez, 12 children, the three posts from the prototype, one post by another staff member, and one post from yesterday that must not appear.
- An empty state when there are no posts today.
- Links to future screens using their final (English) URLs. They show the standard 404 until their specs land.

**Out of scope (for future specs):**

- Backend, database and persistence of any kind.
- Login, sessions, roles and logout behavior. The logout button only links to `/login`.
- Actually creating, editing or deleting posts. "Publicar" in the quick-create form has no effect until persistence lands.
- Photos and the extra post types from `crear-publicacion.dc.html` (Comida, Siesta, Ánimo, Foto) in the quick-create form.
- The full create-post screen (`/posts/new`).
- Toggling reactions, and viewing or writing comments.
- The full-screen photo viewer and real images. Photos are a placeholder box.
- Every other screen (children, notifications, account, post detail, family feed, …), including "coming soon" stubs.
- Mobile/narrow-screen layout. There is no design for it yet.
- Posts from previous days, history and pagination.
- Dark mode.
- Internationalization infrastructure (i18n library, multiple locales).

## UI copy adaptation

These strings differ from the prototype. Every other UI string is used verbatim.

| Prototype (es-AR) | This app (es-419) |
| --- | --- |
| "Buenas, Caro" | "Hola, Caro" |
| "Compartí un momento…" | "Comparte un momento…" |
| "publicado por vos" | "publicado por ti" |
| "…se concentró un montón mezclando colores." | "…se concentró muchísimo mezclando colores." |

**Layout adaptation:** the prototype's composer card (a fake input with a camera button) is replaced by the quick-create form (Requirement 2). It keeps the card's avatar, placeholder and card styling, and drops the camera button.

## Requirements

### Requirement 1 — Staff shell

**As a** staff member
**I want to** see a persistent sidebar with the app's main sections
**So that** I can move to any part of the app from the home screen

**Acceptance criteria:**

1.1. WHEN a user opens `/` THE SYSTEM SHALL render the staff Feed screen instead of the starter page.
1.2. THE SYSTEM SHALL show a 248px-wide left sidebar containing, top to bottom: the sun logo with "OpenDayCare" and "Sala Soles", a "Nueva publicación" button, the nav items "Feed", "Niños", "Avisos" and "Mi cuenta", and a user card with avatar "C", "Caro Giménez", "Maestra · Soles" and a logout button titled "Cerrar sesión".
1.3. WHILE the current page is `/` THE SYSTEM SHALL show "Feed" as the active nav item (background `#FBE3D8`, text `#D9583C`, weight 800), with the other items inactive.
1.4. WHILE the user scrolls the feed content THE SYSTEM SHALL keep the sidebar fully visible and unscrolled.
1.5. WHEN the user clicks a sidebar element THE SYSTEM SHALL navigate as follows: logo → `/`, "Nueva publicación" → `/posts/new`, "Feed" → `/`, "Niños" → `/children`, "Avisos" → `/notifications`, "Mi cuenta" → `/account`, "Cerrar sesión" → `/login`.
1.6. IF a link's destination screen is not implemented yet THEN THE SYSTEM SHALL show the framework's standard 404 page.
1.7. THE SYSTEM SHALL use Fredoka for headings and names, Nunito for body text, and the prototype palette (background `#F6ECDF`, surface `#FFFDF9`, text `#3F362E`, border `#ECE0D0`).
1.8. WHEN viewed at 1280×800 THE SYSTEM SHALL match `references/templates/feed.dc.html` in layout, spacing, sizes and colors, and in copy, except for the copy and layout adaptations listed in **UI copy adaptation**.
1.9. THE SYSTEM SHALL write all UI copy in neutral Latin American Spanish, with no voseo forms.

### Requirement 2 — Feed header and quick post creation

**As a** staff member
**I want to** see which classroom I'm in, today's date, and write a post right from the feed
**So that** I can orient myself and share a moment without leaving the home screen

**Acceptance criteria:**

2.1. THE SYSTEM SHALL show the eyebrow "GUARDERÍA · SALA SOLES", the title "Hola, Caro", and the subtitle "<N> niños · <date>", where N is the classroom's children count (12 in the sample data).
2.2. THE SYSTEM SHALL format `<date>` as today's date in the app timezone using Latin American Spanish names: lowercase weekday, day number and lowercase 3-letter month, with no commas or periods (e.g. "viernes 3 oct").
2.3. IF the children count is 1 THEN THE SYSTEM SHALL write "1 niño" instead of "1 niños".
2.4. THE SYSTEM SHALL show a quick-create card below the header. It contains avatar "C" next to a multi-line text box with the placeholder "Comparte un momento…", and below them an audience selector (accessible name "Para"), a type selector (accessible name "Tipo") and a "Publicar" button. The selectors have no visible labels, since their selected value says what they are.
2.5. THE SYSTEM SHALL offer the audience options "Toda la sala" followed by one option per child in the classroom, by name (sample data: "Mateo"), with "Toda la sala" selected by default.
2.6. THE SYSTEM SHALL offer the type options "Logro", "Actividad" and "Anuncio", with "Anuncio" selected by default.
2.7. WHEN the user types in the text box or changes a selector THE SYSTEM SHALL keep the entered values and SHALL NOT navigate.
2.8. WHEN the user clicks "Publicar" THE SYSTEM SHALL NOT create a post, navigate, reload or clear the form, and the post list SHALL stay unchanged.

### Requirement 3 — Today's posts

**As a** staff member
**I want to** see the posts published today in my classroom
**So that** I know what has already been shared with families

**Acceptance criteria:**

3.1. THE SYSTEM SHALL show a "PUBLICADO HOY" divider below the quick-create card.
3.2. THE SYSTEM SHALL list only the posts published today in the app timezone, newest first.
3.3. IF a post was published on a previous day THEN THE SYSTEM SHALL NOT show it in the list. The sample yesterday post must not appear.
3.4. IF there are no posts published today THEN THE SYSTEM SHALL show the "PUBLICADO HOY" divider followed by the muted text "Todavía no hay publicaciones hoy." and no post cards.

### Requirement 4 — Post card

**As a** staff member
**I want to** read each post with its type, audience and engagement
**So that** I can tell at a glance what each family received and how they reacted

**Acceptance criteria:**

4.1. WHEN a post's audience is one child's family THE SYSTEM SHALL show the child's initial in a circle with that child's colors (Mateo: background `#A9D9E8`, text `#1F7A93`), the child's name, and "Para: familia de <child name>".
4.2. WHEN a post's audience is the whole classroom THE SYSTEM SHALL show a megaphone icon in a circle (background `#CCD8F4`, icon `#4E72C8`), the title "Anuncio general", and "Para: toda la sala".
4.3. THE SYSTEM SHALL show a type badge with a dot and an uppercase label: achievement → "LOGRO" (`#CFEBD8` / `#3E9B6C`), activity → "ACTIVIDAD" (`#C7E7F1` / `#2E89A6`), announcement → "ANUNCIO" (`#CCD8F4` / `#4E72C8`).
4.4. THE SYSTEM SHALL show the publication time as "HH:MM" in 24-hour app-timezone time, followed by " · publicado por <author>".
4.5. WHEN the post's author is the current user THE SYSTEM SHALL write "publicado por ti" and show an "Editar" link to `/posts/<id>/edit`.
4.6. IF the post's author is another staff member THEN THE SYSTEM SHALL write "publicado por <author first name>" and SHALL NOT show "Editar".
4.7. THE SYSTEM SHALL show the post's full text body.
4.8. WHEN a post includes a photo THE SYSTEM SHALL show a 200px dashed placeholder box with an image icon and "Foto · <caption>" between the body and the footer, linking to `/posts/<id>/photo`.
4.9. IF a post has no photo THEN THE SYSTEM SHALL render no placeholder box.
4.10. THE SYSTEM SHALL show a footer with a filled heart and the reaction count, and a comment icon with the comment count linking to `/posts/<id>`.
4.11. WHEN the user clicks the heart THE SYSTEM SHALL NOT change the reaction count or navigate.

## What is **not** in this spec

- Backend, persistence, login, sessions and roles.
- Actually creating ("Publicar" does nothing), editing, reacting to or commenting on posts.
- Photos and extra post types in the quick-create form, and the full create-post screen.
- The photo viewer and real images.
- Any other screen, including placeholder pages.
- Mobile layout, dark mode and i18n infrastructure.
- History of previous days.

Each one of those, if it lands, goes in its own spec.
