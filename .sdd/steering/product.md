# Product

> **Last updated:** 2026-10-03 · by SPEC 01

## Purpose

OpenDayCare is a daycare app that lets staff share each child's day with their families: posts, achievements, activities, photos and announcements.

## Users

- **Primary user — staff (teacher):** manages a classroom, publishes moments for families, manages children and linked parents.
- **Secondary user — family (parent):** follows their child's day, reacts and comments on posts, reads the day summary.

## Main features

- **Staff feed:** the home page at `/`. It shows today's posts for the classroom (in the `Europe/Madrid` timezone), a quick-create form whose "Publicar" button does nothing yet, and the staff sidebar. Data is sample data (SPEC 01).

The remaining planned screens are defined by the prototypes in `references/templates/` (see `index.dc.html`):

- Access: login (staff or family) and account activation with an invitation code.
- Staff: daycare feed, create post, children list, child profile, add/edit child, link parent, notifications, account.
- Family: parent feed, post detail (reactions and comments), full-screen photo, day summary, account (settings and consent).

## Domain glossary

Code, docs and identifiers use the English term. The Spanish label is used only in rendered UI.

| Term | Meaning in this project | UI label (es-419) |
| --- | --- | --- |
| Daycare | The organization running the app. | Guardería |
| Classroom | A group of children with its staff (e.g. "Soles"). | Sala |
| Staff / Teacher | A daycare employee who publishes posts. | Maestra / Maestro |
| Family / Parent | A child's guardian, linked by invitation code. | Familia / Padre |
| Child | A child enrolled in a classroom. | Niño / Niña |
| Post | Content published by staff for an audience. | Publicación |
| Post type | `achievement`, `activity` or `announcement`. | Logro, Actividad, Anuncio |
| Audience | Who receives a post: one child's family, or the whole classroom. | "Para: familia de …", "Para: toda la sala" |
| Reaction / Comment | A family's response to a post. | Reacción / Comentario |
| Notifications | Recent activity feed for staff. | Avisos |
| Account | User settings screen. | Mi cuenta |
| Day summary | End-of-day recap for a child. | Resumen del día |

## Product constraints

- UI copy is **neutral Latin American Spanish**: `tú` forms, no voseo ("Comparte", "publicado por ti"). The prototypes use Argentine voseo, so their copy is adapted when ported.
- Code, identifiers, URLs and the domain glossary are in English. Translation to Spanish happens only in the rendered templates (pages and components).
- Screens must match the HTML prototypes in `references/templates/*.dc.html`. Do not invent screens.
