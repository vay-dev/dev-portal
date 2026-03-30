# Dev Portal Handoff

Last updated: 2026-03-30

## What This App Is Now

This is no longer just a Pendu-only React rewrite.

The dev portal now supports multiple project datasets inside one app:

- `Pendu`
- `Bistropulse`

The project switcher is implemented directly in [`src/App.tsx`](C:\mobile-projects\flutter\pendu\dev-portal\src\App.tsx).

## Current UI State

Implemented in the current app:

- right-side sidebar on desktop
- collapsible desktop sidebar
- mobile sidebar toggle
- project switcher for `Pendu` and `Bistropulse`
- section nav for each project
- active nav state
- roadmap cards
- readable bug log cards
- overview metrics
- current/recent work panels
- Pendu Phase 2 planning section
- Bistropulse logic section with expandable technical notes

### Important nuance

Navigation behavior is different per project:

- `Pendu`
  - renders all sections on one page
  - active section is driven by `IntersectionObserver`
  - hash updates are used
  - clicking sidebar items scrolls to sections

- `Bistropulse`
  - uses section switching in-app rather than scrolling through one long page
  - active section is controlled by click state, not scroll observation

## Main Files To Read First

1. [`src/App.tsx`](C:\mobile-projects\flutter\pendu\dev-portal\src\App.tsx)
2. [`src/data/createPortalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\createPortalData.ts)
3. [`src/data/portalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\portalData.ts)
4. [`src/data/bistropulseData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\bistropulseData.ts)
5. [`scripts/generate-portal-data.mjs`](C:\mobile-projects\flutter\pendu\dev-portal\scripts\generate-portal-data.mjs)

## Data Architecture

There are now two different data flows.

### 1. Pendu data flow

Source of truth:

- [`../pendu-mobile/devportal/data.js`](C:\mobile-projects\flutter\pendu\pendu-mobile\devportal\data.js)

Generator:

- [`scripts/generate-portal-data.mjs`](C:\mobile-projects\flutter\pendu\dev-portal\scripts\generate-portal-data.mjs)

Generated file:

- [`src/data/generatedPortalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\generatedPortalData.ts)

Adapter:

- [`src/data/portalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\portalData.ts)

Shared transformation factory:

- [`src/data/createPortalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\createPortalData.ts)

### 2. Bistropulse data flow

Source of truth is hand-authored directly in:

- [`src/data/bistropulseData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\bistropulseData.ts)

There is no generator for Bistropulse right now.

It also uses the shared transformation factory:

- [`src/data/createPortalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\createPortalData.ts)

## What `createPortalData.ts` Does

`createPortalData.ts` is now the core shared data factory.

It derives:

- normalized project meta
- overview metrics
- roadmap phase summaries
- flattened bug cards
- recent completed features

This means:

- Pendu and Bistropulse can share the same UI structure
- only the source datasets differ

## Text Normalization

There are still encoding/mojibake issues in some imported dataset strings.

That is why `createPortalData.ts` contains `normalizeText()`.

This exists because some data imported from older sources contains broken characters for:

- em dashes
- arrows
- checkmarks
- time symbols
- middle dots
- naira symbol

If text looks weird in the UI, check:

- [`src/data/createPortalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\createPortalData.ts)
- the source data file being imported

## Pendu-Specific Notes

The Pendu portal still includes a Phase 2 planning area that is not derived from `data.js`.

That planning content lives in:

- [`src/data/portalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\portalData.ts)

Specifically:

- `priorities`
- `dependencies`

These are hand-maintained and represent the newer planning direction:

- analytics first
- admin API
- freemium metering fields
- AI recap
- discovery
- billing later
- feature gates last

## Bistropulse-Specific Notes

Bistropulse has an extra section not present for Pendu:

- `Logic`

This is driven from `LOGIC` entries in:

- [`src/data/bistropulseData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\bistropulseData.ts)

Each logic card contains:

- summary
- endpoints
- flow
- design decisions
- gotchas

This is important because the app is now not only a progress portal, but also a lightweight operational knowledge base.

## Important App Behavior In `App.tsx`

Things to know before editing:

### Project switching

`activeProject` controls whether the app shows Pendu or Bistropulse.

Relevant values:

- `'pendu'`
- `'bistropulse'`

### Sidebar collapse

`sidebarCollapsed` controls the desktop collapsed/expanded states.

There are two separate render paths in the sidebar:

- collapsed icon-only mode
- expanded full mode

### Mobile sidebar

`mobileSidebarOpen` controls the mobile sidebar visibility.

### Section logic

`activeSection` drives selected section state.

For Pendu:

- sections stay in the DOM
- scrolling updates active state

For Bistropulse:

- sections are conditionally rendered by active selection
- no scrolling observer is used

### Logic cards

`LogicCard` manages its own local open/closed state.

That means each Bistropulse logic entry expands independently.

## Current Design Direction

The portal is intentionally not a 1:1 clone of the original static dev portal.

The current direction favors:

- operational readability
- stronger hierarchy
- better bug visibility
- better separation between progress, roadmap, and planning
- support for multiple project datasets

This is especially visible in:

- the bug log cards
- the roadmap cards
- the right-side control panel

## Commands

Install:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Regenerate Pendu data after changing the old source file:

```bash
node scripts/generate-portal-data.mjs
```

Verify:

```bash
npm run lint
npm run build
```

## What Was True In The Earlier Handoff But Is Outdated Now

The older handoff only described:

- a Pendu-only app
- a single dataset
- a simpler sidebar/nav state

That is now outdated.

The important changes since then are:

- multi-project support added
- Bistropulse dataset added
- shared `createPortalData.ts` factory added
- Bistropulse logic/knowledge section added
- app shell expanded beyond the original first-pass Pendu-only dashboard

## Likely Next Tasks

If work continues later, the most likely useful next steps are:

1. Clean up the remaining encoding artifacts in shared text normalization.
2. Make the project switcher drag/scroll behavior more polished if needed.
3. Add screenshot/image sections to the repo docs.
4. Add Vercel-specific repo docs or deployment notes if the hosted link becomes permanent.
5. Consider extracting repeated UI blocks from `App.tsx` into smaller components if the file grows much further.
6. Decide whether Pendu should also gain a `Logic` section similar to Bistropulse.

## Short Mental Model For The Next Person

If you come back later and need to understand the app fast:

- `App.tsx` = shell + routing-by-state + rendering logic
- `createPortalData.ts` = shared dataset transformation layer
- `portalData.ts` = Pendu adapter + Pendu-specific planning content
- `bistropulseData.ts` = Bistropulse source data + logic knowledge entries
- `generate-portal-data.mjs` = bridge from old Pendu static portal data into the React app
