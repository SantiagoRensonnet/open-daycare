# Product

> **Last updated:** 2026-10-11 · by SPEC 04

## Purpose

OpenDayCare is a daycare app that lets staff share each child's day with their families: posts, achievements, activities, photos and announcements.

## Users

- **Primary user — staff (teacher):** manages a classroom, publishes moments for families, manages children and linked parents.
- **Secondary user — family (parent):** follows their child's day, reacts and comments on posts, reads the day summary.

## Main features

- **Staff feed:** the home page at `/`. It shows today's posts for the classroom (in the `Europe/Madrid` timezone), a quick-create form whose "Publicar" button does nothing yet, and the staff sidebar. The header's children count is derived from the classroom's children (8 in the sample data). Data is sample data (SPEC 01).
- **Children list and child profile:** `/kids` lists the daycare's children grouped by classroom (Soles, Lunas, Estrellas; the current user stays in Soles) with live search by name, and `/kids/<id>` shows a child's age, allergies and notes, dates and linked parents. Staff add a child from `/kids` through the "Agregar niño" modal, saved in server memory until the server restarts (SPEC 02 · SPEC 04).
- **Access screens:** login (`/login`) and account activation (`/activate`), faithful to their prototypes and display-only: the fields are editable but nothing is submitted, validated or stored, and there is no authentication. The login role picker ("INGRESO COMO") is intentionally omitted (SPEC 03).

The remaining planned screens are defined by the prototypes in `references/templates/` (see `index.dc.html`):

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
| Child | A child enrolled in a classroom. The name is a single full name; the feed shows its first word. | Niño / Niña |
| Allergies | A child's allergy names, as a list. The list chip shows the first one. | Alergias |
| Post | Content published by staff for an audience. | Publicación |
| Post type | `achievement`, `activity` or `announcement`. | Logro, Actividad, Anuncio |
| Audience | Who receives a post: one child's family, or the whole classroom. | "Para: familia de …", "Para: toda la sala" |
| Reaction / Comment | A family's response to a post. | Reacción / Comentario |
| Notifications | Recent activity feed for staff. | Avisos |
| Account | User settings screen. | Mi cuenta |
| Day summary | End-of-day recap for a child. | Resumen del día |
| Parent relationship | `mother` / `father` / `guardian` (SPEC 02). | Mamá / Papá / Tutor/a |
| Parent status | `active` / `pending` (SPEC 02). | cuenta activa / invitación enviada |

## Product constraints

- UI copy is **neutral Latin American Spanish**: `tú` forms, no voseo ("Comparte", "publicado por ti"). The prototypes use Argentine voseo, so their copy is adapted when ported.
- Code, identifiers, URLs and the domain glossary are in English. Translation to Spanish happens only in the rendered templates (pages and components).
- Screens must match the HTML prototypes in `references/templates/*.dc.html`. Do not invent screens.
- Allergy information takes priority over other badges in the children list (SPEC 02). New children are saved in the server's memory (they survive reloads and navigation, and are lost on restart) until a persistence spec lands (SPEC 04).
