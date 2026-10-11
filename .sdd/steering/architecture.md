# Architecture

> **Last updated:** 2026-10-11 · by SPEC 04

## Overview

A single Next.js App Router app with no backend yet (SPEC 01).

- **Route groups by shell.** `app/(staff)/` holds the staff screens. Its `layout.tsx` renders the shell: a sticky 248px `Sidebar` and a scrolling `main`. The shell does not own the content column: each page renders `PageColumn` with its prototype's width (760 / 820 / 880) (SPEC 02). `app/(auth)/` holds the display-only access screens — login and account activation — with no shell and no shared layout: each page owns its full-viewport container (SPEC 03). Family screens will get their own group and shell.
- **Server first.** Pages and components are Server Components. Only interactive bits are client components (`SidebarNav`, for `usePathname`; `KidList`, for the search text (SPEC 02); the `AddKidModal` + generic `Modal`, for the add-child form (SPEC 04)). Client components get plain serializable props computed on the server, such as ages (SPEC 02). Forms with no behavior yet use uncontrolled native fields (`PostQuickCreate`).
- **Mutations.** The first write path (SPEC 04): a client `<dialog>` `Modal` (`components/ui/`) calls a Server Action (`app/(staff)/kids/actions.ts`), which re-validates with a pure `lib/` module, appends to the in-memory `lib/sample-data.ts` (`addChild`) and calls `refresh()` from `next/cache`, so the server-rendered list re-renders without a reload. Client components may include `<dialog>`-based modals from `components/ui/`.
- **Data.** `lib/sample-data.ts` stands in for persistence and is read directly by layouts and pages. It holds three classrooms (Soles, Lunas, Estrellas); `classroom` is the current user's one (Soles) (SPEC 04). Pure selectors such as `getTodayPosts` (`lib/feed.ts`) and `getClassroomChildren` / `getChildrenByClassroom` (`lib/children.ts`) work on plain typed data (`lib/types.ts`). Selectors used by client components take data as arguments and must not import `sample-data.ts` (SPEC 02).
- **Time.** Pages that depend on "now" call `connection()` and render per request; the access screens do not read the clock, so they render statically (SPEC 03). Every date and time is formatted and bucketed by day in a single app timezone (`lib/dates.ts`).
- **Routing.** Internal links go through `lib/routes.ts` (English URL segments). Unbuilt screens fall through to the default 404, and unknown record ids call `notFound()` (SPEC 02).

## Data flow (staff feed)

`GET /` → `(staff)/layout` renders `Sidebar(currentUser, classroom)` → `(staff)/page` awaits `connection()`, takes `now`, and renders `FeedHeader` (children count from `getClassroomChildren`), `PostQuickCreate` and the `PostCard` list from `getTodayPosts(getSamplePosts(now), now)`.

## Data flow (children, SPEC 02 · SPEC 04)

- `GET /kids` → `kids/page` awaits `connection()`, builds `KidListItem[]` for **all** children (child, `ageAt(birthDate, now)`, parent count) → client `KidList` filters them by name on every keystroke with `childMatchesQuery` and groups them by classroom. The "Agregar niño" `AddKidModal` sits in the header.
- `POST add child` → client `AddKidModal` parses with `lib/child-form.ts`, then calls the `createChild` Server Action (`app/(staff)/kids/actions.ts`), which re-validates, `addChild(buildChild(...))` into the in-memory sample data and `refresh()`es, so the list re-renders with the new child last.
- `GET /kids/<id>` → `kids/[id]/page` → `getChild` → `notFound()` for unknown ids (including `new`: there is no add-child route), otherwise the profile with `getChildParents`.

## Decisions

- Sample data until a persistence spec lands (SPEC 01).
- A `(staff)` route group with its own shell, rather than a sidebar in the root layout (SPEC 01).
- An `(auth)` route group with no shared layout — each access page owns its full-viewport container — rendered statically (SPEC 03).
- Request-time rendering with `connection()` for "today", rather than client-side dates (SPEC 01).
- Children count derived from the children list (SPEC 02).
- Calendar dates (birth, enrollment) are `YYYY-MM-DD` strings formatted in UTC, so the day never shifts (SPEC 02).
- In-memory mutations via Server Actions + `refresh()` until persistence lands (SPEC 04).
- Validation in pure `lib/` modules that return error codes, run on the client and again on the server (SPEC 04).
- Modals without routes: a generic `<dialog>` `Modal` that owns its trigger and state (SPEC 04).
