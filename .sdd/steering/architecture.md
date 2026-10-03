# Architecture

> **Last updated:** 2026-10-03 · by SPEC 01

## Overview

A single Next.js App Router app with no backend yet (SPEC 01).

- **Route groups by shell.** `app/(staff)/` holds the staff screens. Its `layout.tsx` renders the shell: a sticky 248px `Sidebar` and a scrolling `main` with a 760px centered column. Login and family screens will get their own groups and shells.
- **Server first.** Pages and components are Server Components. Only interactive bits are client components (`SidebarNav`, for `usePathname`). Forms with no behavior yet use uncontrolled native fields (`PostQuickCreate`).
- **Data.** `lib/sample-data.ts` stands in for persistence and is read directly by layouts and pages. Pure selectors such as `getTodayPosts` (`lib/feed.ts`) work on plain typed data (`lib/types.ts`).
- **Time.** Pages that depend on "now" call `connection()` and render per request. Every date and time is formatted and bucketed by day in a single app timezone (`lib/dates.ts`).
- **Routing.** Internal links go through `lib/routes.ts` (English URL segments). Unbuilt screens fall through to the default 404.

## Data flow (staff feed)

`GET /` → `(staff)/layout` renders `Sidebar(currentUser, classroom)` → `(staff)/page` awaits `connection()`, takes `now`, and renders `FeedHeader`, `PostQuickCreate` and the `PostCard` list from `getTodayPosts(getSamplePosts(now), now)`.

## Decisions

- Sample data until a persistence spec lands (SPEC 01).
- A `(staff)` route group with its own shell, rather than a sidebar in the root layout (SPEC 01).
- Request-time rendering with `connection()` for "today", rather than client-side dates (SPEC 01).
