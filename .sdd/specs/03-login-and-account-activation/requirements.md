# SPEC 03 — Login and account activation

> **Status:** Approved
> **Depends on:** SPEC 01
> **Date:** 2026-10-10
> **Objective:** Add the access screens — login at `/login` and account activation at `/activate` — faithful to `references/templates/login.dc.html` and `references/templates/activar-cuenta.dc.html`, display-only and with no authentication.

## Context

**Primary users:** Staff and family of a daycare. Both reach these screens: staff sign in from the sidebar's "Cerrar sesión" link, and family arrive from the invitation e-mail. The sample people are Caro Giménez (staff) and Lucía Fernández (Mateo's mother).
**Goal:** Give the app its two access screens with faithful layout and copy, so the entry flow exists and can be reviewed before real authentication lands.

There is no backend yet, so the screens are display-only: the fields can be typed in but nothing is submitted, validated or stored. SPEC 01 already defined `routes.login` and pointed the sidebar's "Cerrar sesión" at `/login`, which currently 404s; this spec makes it resolve.

UI copy is neutral Latin American Spanish, and the prototypes' voseo is adapted (see **UI copy adaptation**). Domain terms are English (glossary in `product.md`). Spanish appears only in quoted UI strings.

## Scope

**In:**

- The login screen at `/login`, faithful to `login.dc.html` at desktop widths: the brand panel (gradient, sun tile, "OpenDayCare", headline, paragraph, footer) and the form column (title, subtitle, email and password fields, "¿Olvidaste tu contraseña?", the login button and the link to activation).
- The account activation screen at `/activate`, faithful to `activar-cuenta.dc.html`: the sun tile, the welcome heading, the invitation card, the invitation code, email and password fields, the photo-consent checkbox, the activation button and the link back to login.
- Prefilled sample values in the fields, as in the prototypes.
- Editable uncontrolled fields: typing keeps the text and never navigates or reloads.
- Links between the two screens, and the sidebar's "Cerrar sesión" resolving to `/login`.
- Both screens rendered without the staff shell (no sidebar), each with its own full-screen layout.

**Out of scope (for future specs):**

- Authentication, sessions, login, logout behavior and roles. The buttons do nothing.
- Input validation, error and loading states, and credential checking.
- Password reset. "¿Olvidaste tu contraseña?" is inert.
- Sending, verifying or expiring invitation codes, and actually activating an account.
- The staff/family role picker ("INGRESO COMO"): the prototype's role selector is deliberately omitted.
- The family feed and any other destination screen. The access buttons do not navigate.
- Multiple sample users, remembered sessions and "remember me".
- Mobile/narrow-screen layout. There is no design for it yet.
- Dark mode and i18n infrastructure.

## UI copy adaptation

These strings differ from the prototypes. Every other UI string is used verbatim.

| Prototype (es-AR) | This app (es-419) |
| --- | --- |
| "Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar." | "Publica momentos, gestiona las salas y mantén a las familias cerca, desde un solo lugar." |
| "Ingresá para ver el día de hoy." | "Ingresa para ver el día de hoy." |
| "Activá tu cuenta" | "Activa tu cuenta" |
| "Bienvenida a OpenDayCare" | "Te damos la bienvenida a OpenDayCare" |
| "Creá tu contraseña para activar la cuenta." | "Crea tu contraseña para activar la cuenta." |
| "¿Ya tenés cuenta?" | "¿Ya tienes cuenta?" |

**Layout adaptation:** the login prototype's "INGRESO COMO" block is removed: the label and the "Personal" and "Familia" buttons are not rendered. The form column keeps its width, and the fields below close the gap.

## Requirements

### Requirement 1 — Login screen

**As a** staff member or family member
**I want to** see a login screen with my e-mail and password
**So that** I have an entry point to the app

**Acceptance criteria:**

- 1.1. WHEN a user opens `/login` THE SYSTEM SHALL render the login screen with two panels side by side: the brand panel on the left and the form column on the right.
- 1.2. THE SYSTEM SHALL show in the brand panel, top to bottom: the sun logo tile with "OpenDayCare", the heading "El día de cada niño, compartido con su familia.", the paragraph "Publica momentos, gestiona las salas y mantén a las familias cerca, desde un solo lugar." and the footer "🌿 Guardería Sala Soles".
- 1.3. THE SYSTEM SHALL show in the form column: the title "Iniciar sesión", the subtitle "Ingresa para ver el día de hoy.", the label "EMAIL" over an e-mail field, the label "CONTRASEÑA" over a password field, a right-aligned "¿Olvidaste tu contraseña?", the button "Iniciar sesión" and the footer "¿Te invitó la guardería? Activa tu cuenta".
- 1.4. THE SYSTEM SHALL pre-fill the e-mail field with "caro@opendaycare.com" and leave the password field empty with the placeholder "••••••••".
- 1.5. THE SYSTEM SHALL NOT render the "INGRESO COMO" label nor any "Personal" or "Familia" button.
- 1.6. WHEN the user types in the e-mail or password field THE SYSTEM SHALL keep the typed value and SHALL NOT navigate or reload.
- 1.7. WHEN the user presses Enter in the e-mail or password field THE SYSTEM SHALL NOT navigate or reload.
- 1.8. WHEN the user clicks "Iniciar sesión" THE SYSTEM SHALL NOT navigate, reload or clear the fields.
- 1.9. WHEN the user clicks "¿Olvidaste tu contraseña?" THE SYSTEM SHALL NOT navigate and SHALL NOT show any dialog or message.
- 1.10. WHEN the user clicks "Activa tu cuenta" THE SYSTEM SHALL navigate to `/activate`.
- 1.11. WHEN the user clicks "Cerrar sesión" in the staff sidebar THE SYSTEM SHALL navigate to `/login` and show the login screen.

### Requirement 2 — Account activation screen

**As a** family member invited by the daycare
**I want to** see an activation screen with my invitation code
**So that** I can set a password and activate my account

**Acceptance criteria:**

- 2.1. WHEN a user opens `/activate` THE SYSTEM SHALL render the activation screen as a single centered column.
- 2.2. THE SYSTEM SHALL show, top to bottom: the sun logo tile, the heading "Te damos la bienvenida a OpenDayCare", the paragraph "Te invitaron a seguir el día de tu hijo. Crea tu contraseña para activar la cuenta.", the invitation card, the "CÓDIGO DE INVITACIÓN" field, the "EMAIL" field, the "CREAR CONTRASEÑA" field, the photo-consent checkbox, the button "Activar mi cuenta" and the footer "¿Ya tienes cuenta? Iniciar sesión".
- 2.3. THE SYSTEM SHALL show in the invitation card the initial "M" in a circle with the child's colors (background `#A9D9E8`, text `#1F7A93`), the line "Te invitaron a seguir a" and the line "Mateo · Sala Soles".
- 2.4. THE SYSTEM SHALL pre-fill the invitation code with "7K4P9", the e-mail with "lucia.fernandez@gmail.com", and the password with "contraseña".
- 2.5. THE SYSTEM SHALL show the photo-consent checkbox checked, with the text "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.".
- 2.6. WHEN the user types in the invitation code, e-mail or password field THE SYSTEM SHALL keep the typed value and SHALL NOT navigate or reload.
- 2.7. WHEN the user presses Enter in any field THE SYSTEM SHALL NOT navigate or reload.
- 2.8. WHEN the user clicks the photo-consent checkbox THE SYSTEM SHALL toggle its checked state and SHALL NOT navigate or reload.
- 2.9. WHEN the user clicks "Activar mi cuenta" THE SYSTEM SHALL NOT navigate, reload or clear the fields.
- 2.10. WHEN the user clicks "Iniciar sesión" THE SYSTEM SHALL navigate to `/login`.

### Requirement 3 — Fidelity and consistency

**As a** staff member or family member
**I want to** see the access screens match the rest of the app
**So that** the visual language is consistent across every screen

**Acceptance criteria:**

- 3.1. THE SYSTEM SHALL render `/login` and `/activate` without the staff sidebar or shell, each filling the viewport.
- 3.2. THE SYSTEM SHALL use Fredoka for headings and names and Nunito for body text, and the prototypes' palette (page background `#FBF4EC`, text `#3F362E`, muted `#94887B`, field border `#EADFD0`, accent text `#C5503A`).
- 3.3. WHEN viewed at 1280×800 THE SYSTEM SHALL match `login.dc.html` (at `/login`) and `activar-cuenta.dc.html` (at `/activate`) in layout, spacing, sizes and colors, and in copy, except for the copy and layout adaptations listed in **UI copy adaptation**.
- 3.4. THE SYSTEM SHALL write all UI copy in neutral Latin American Spanish, with no voseo forms.

## What is **not** in this spec

- Authentication, sessions, roles, credential checking and real login or logout.
- Input validation, error and loading states, and password reset.
- Sending, verifying or expiring invitation codes, and real account activation.
- The staff/family role picker from the login prototype.
- The family feed and every other destination screen.
- Mobile layout, dark mode and i18n infrastructure.

Each one of those, if it lands, goes in its own spec.
