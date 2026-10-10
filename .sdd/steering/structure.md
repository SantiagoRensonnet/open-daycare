# Code structure and conventions

> **Last updated:** 2026-10-10 · by SPEC 03

## Folder layout

```
app/                  # Next.js App Router: root layout, globals.css (theme tokens)
  (staff)/            # staff screens + shell layout (SPEC 01)
    kids/             # page.tsx (list), [id]/page.tsx (profile) (SPEC 02)
  (auth)/             # access screens, no shell: login/page.tsx, activate/page.tsx (SPEC 03)
components/
  icons.tsx           # inline SVG icons copied from the prototypes
  auth/               # AuthField, AuthSubmitButton (SPEC 03)
  staff/              # staff shell: Sidebar, SidebarNav, PageColumn (SPEC 02)
  feed/               # feed: FeedHeader, PostQuickCreate, PostCard, PostTypeBadge, post-type-labels.ts
  kids/               # KidList, KidCard, KidAvatar, KidProfileHeader, KidHealthNotes, KidFacts, KidParents, age-label.ts (SPEC 02)
lib/                  # no UI copy: types.ts, routes.ts, dates.ts, feed.ts, children.ts, sample-data.ts
public/               # static assets
references/templates/ # HTML prototypes (*.dc.html) — visual spec, read-only
references/screenshots/
```

## Code conventions

- Imports: `@/*` maps to the repo root (`./*`), not `src/`.
- Naming: components are `PascalCase.tsx`, other modules are `kebab-case.ts`, and every identifier is English. Component names put the entity first (`PostCard`, `PostQuickCreate`, `PostTypeBadge`) (SPEC 01).
- Children naming: the domain type is `Child`, while URLs, route keys and components use `kid` (`/kids`, `kidDetail`, `KidCard`) (SPEC 02).
- UI copy: Spanish strings live inline only in `app/` and `components/` markup. Enum → label maps live in `components/`: a local one in the component that renders it (`ROLE_LABELS` in `Sidebar`), or a shared one in a `kebab-case.ts` file next to its users (`POST_TYPE_LABELS`) (SPEC 01).
- Links: use `routes.*` from `lib/routes.ts` for every internal link. Keys put the entity first, then the action or view (`postNew`, `postDetail`, `postEdit`, `postPhoto`) (SPEC 01), (`kids`, `kidNew`, `kidDetail`, `kidEdit`, `kidSummary`, `kidLinkParent`) (SPEC 02), (`login`, `activate`) (SPEC 03).
- Dates: use `lib/dates.ts` for every date or time shown. Never call `toLocaleString` directly (SPEC 01).
- Styling: use theme tokens from `globals.css` before arbitrary values. One-off values (gradients, shadows, badge colors) stay as arbitrary values at their only point of use. Per-record colors (child avatars) use inline `style` (SPEC 01).
- Text sizes: use pixel sizes (`text-[14px]`), not `text-xs`/`text-sm`/`text-base`. Tailwind v4 ties those to fixed line heights, and the prototypes use `line-height: normal`, which `<body>` sets with `leading-[normal]` (SPEC 01).
- Icons: from `components/icons.tsx`. Add new ones there, copied from the prototype markup (SPEC 01). Icons whose stroke differs between prototypes take an optional `strokeWidth` (`SunIcon`, `PlusIcon`) (SPEC 02).
