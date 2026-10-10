# SPEC 03 — Login and account activation · Tasks

> **Spec:** [requirements](./requirements.md) · [design](./design.md) · tasks

All code (identifiers, file and route names, comments) is in English. Spanish (es-419) UI strings go only in `app/` and `components/` markup. The access screens are display-only: no backend, no `connection()`.

## Tasks

- [x] 1. Add the `activate` route, the check icon and the shared auth components
  - Add `activate: "/activate"` to `lib/routes.ts`.
  - Add `CheckIcon` to `components/icons.tsx`, copied from the consent checkbox in `activar-cuenta.dc.html`.
  - Create `components/auth/AuthField.tsx` (`variant: "default" | "code"`) and `components/auth/AuthSubmitButton.tsx` (`type="button"`, no handler), as in the design.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
  - _Requirements: 1.3, 1.4, 2.2, 2.4_

- [x] 2. Build the login screen at `/login`
  - Create `app/(auth)/login/page.tsx` (static Server Component) with the brand panel and the form column, using `AuthField` and `AuthSubmitButton`.
  - Pre-fill the e-mail (`caro@opendaycare.com`), add the inert "¿Olvidaste tu contraseña?" span, and link "Activa tu cuenta" to `routes.activate`.
  - Do not render the "INGRESO COMO" block or its role buttons.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass, and `/login` is listed as static (`○`). In the browser, `http://localhost:3000/login` shows the two panels with no staff sidebar; the e-mail is prefilled; typing and pressing Enter do nothing; "Iniciar sesión" does nothing (no navigation, reload or field reset); "¿Olvidaste tu contraseña?" does nothing; "Activa tu cuenta" goes to `/activate`; the staff sidebar's "Cerrar sesión" (from `/`) lands here instead of a 404.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 3.1_

- [ ] 3. Build the account activation screen at `/activate`
  - Create `app/(auth)/activate/page.tsx` (static Server Component) with the sun tile, the heading, the invitation card, the three `AuthField`s and the consent checkbox.
  - Pre-fill the code (`7K4P9`), the e-mail (`lucia.fernandez@gmail.com`) and the password (`contraseña`), and link "Iniciar sesión" to `routes.login`.
  - Validate: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass, and `/activate` is listed as static (`○`). In the browser, `/activate` shows the centered column with no staff sidebar: the card reads "Mateo · Sala Soles", the code/e-mail/password are prefilled, the consent checkbox starts checked and toggles on click without navigating, "Activar mi cuenta" does nothing (no navigation, reload or field reset), Enter in a field does nothing, and "Iniciar sesión" goes to `/login`.
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 3.1_

- [ ] 4. Fidelity and copy pass against the prototypes
  - Serve the prototypes with `python3 -m http.server 4173` from `references/templates/`. With Playwright MCP at 1280×800 (resize after navigating), screenshot `/login` vs `login.dc.html` and `/activate` vs `activar-cuenta.dc.html`, saving everything in `.playwright-mcp/`. Fix differences in panel widths, spacing, sizes, weights, colors, radii or shadows in the pages and components from tasks 2–3.
  - Run the copy check from the design: `grep -rnE "\b(vos|Ingresá|Activá|Creá|tenés|Publicá|gestioná|mantené|invitó)\b" app components` must find nothing.
  - Validate: the screenshots match, except for the adaptations in **UI copy adaptation** and the omitted role picker. The grep passes. `npm run lint`, `npx tsc --noEmit` and `npm run build` still pass.
  - _Requirements: 3.1, 3.2, 3.3, 3.4_
