# Architecture

> **Last updated:** 2026-10-10 · by SPEC 03

## Overview

A single Next.js App Router app with no backend yet (SPEC 01).

- **Route groups by shell.** `app/(staff)/` holds the staff screens. Its `layout.tsx` renders the shell: a sticky 248px `Sidebar` and a scrolling `main`. The shell does not own the content column: each page renders `PageColumn` with its prototype's width (760 / 820 / 880) (SPEC 02). `app/(auth)/` holds the display-only access screens — login and account activation — with no shell and no shared layout: each page owns its full-viewport container (SPEC 03). Family screens will get their own group and shell.
- **Server first.** Pages and components are Server Components. Only interactive bits are client components (`SidebarNav`, for `usePathname`; `KidList`, for the search text (SPEC 02)). Client components get plain serializable props computed on the server, such as ages (SPEC 02). Forms with no behavior yet use uncontrolled native fields (`PostQuickCreate`).
- **Data.** `lib/sample-data.ts` stands in for persistence and is read directly by layouts and pages. Pure selectors such as `getTodayPosts` (`lib/feed.ts`) and `getClassroomChildren` (`lib/children.ts`) work on plain typed data (`lib/types.ts`). Selectors used by client components take data as arguments and must not import `sample-data.ts` (SPEC 02).
- **Time.** Pages that depend on "now" call `connection()` and render per request; the access screens do not read the clock, so they render statically (SPEC 03). Every date and time is formatted and bucketed by day in a single app timezone (`lib/dates.ts`).
- **Routing.** Internal links go through `lib/routes.ts` (English URL segments). Unbuilt screens fall through to the default 404, and unknown record ids call `notFound()` (SPEC 02).

## Data flow (staff feed)

`GET /` → `(staff)/layout` renders `Sidebar(currentUser, classroom)` → `(staff)/page` awaits `connection()`, takes `now`, and renders `FeedHeader` (children count from `getClassroomChildren`), `PostQuickCreate` and the `PostCard` list from `getTodayPosts(getSamplePosts(now), now)`.

## Data flow (children, SPEC 02)

- `GET /kids` → `kids/page` awaits `connection()`, builds `KidListItem[]` (child, `ageAt(birthDate, now)`, parent count) → client `KidList` filters them by name on every keystroke with `childMatchesQuery`.
- `GET /kids/<id>` → `kids/[id]/page` → `getChild` → `notFound()` for unknown ids (including `new`), otherwise the profile with `getChildParents`.

## Decisions

- Sample data until a persistence spec lands (SPEC 01).
- A `(staff)` route group with its own shell, rather than a sidebar in the root layout (SPEC 01).
- An `(auth)` route group with no shared layout — each access page owns its full-viewport container — rendered statically (SPEC 03).
- Request-time rendering with `connection()` for "today", rather than client-side dates (SPEC 01).
- Children count derived from the children list (SPEC 02).
- Calendar dates (birth, enrollment) are `YYYY-MM-DD` strings formatted in UTC, so the day never shifts (SPEC 02).
