# Dev Portal Handoff

Last updated: 2026-03-26

## What Was Implemented

The old static portal at `../pendu-mobile/devportal/index.html` was migrated into the React app in this folder.

Key work completed:

- Replaced the Vite starter UI with the new dev portal in [`src/App.tsx`](C:\mobile-projects\flutter\pendu\dev-portal\src\App.tsx).
- Added Tailwind through Vite in [`vite.config.ts`](C:\mobile-projects\flutter\pendu\dev-portal\vite.config.ts).
- Added shared styling in:
  - [`src/index.css`](C:\mobile-projects\flutter\pendu\dev-portal\src\index.css)
  - [`src/app.scss`](C:\mobile-projects\flutter\pendu\dev-portal\src\app.scss)
- Reworked the layout so the sidebar is on the right on desktop.
- Made the sidebar collapsible on desktop.
- Added section navigation that updates active state from:
  - clicking nav links
  - scrolling between sections via `IntersectionObserver`

## Data Source

The React app is now driven from the actual old portal dataset, not a hand-written summary.

Source of truth:

- [`../pendu-mobile/devportal/data.js`](C:\mobile-projects\flutter\pendu\pendu-mobile\devportal\data.js)

Generated bridge file:

- [`src/data/generatedPortalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\generatedPortalData.ts)

Adapter / derived view-models:

- [`src/data/portalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\portalData.ts)

Generator script:

- [`scripts/generate-portal-data.mjs`](C:\mobile-projects\flutter\pendu\dev-portal\scripts\generate-portal-data.mjs)

## Important Behavior

`portalData.ts` derives the UI from the real dataset:

- overview metrics
- roadmap/layer progress
- recent completed features
- bug log cards

It also combines in the newer Phase 2 plan/dependency ordering that came from the planning conversation.

There is a text-normalization step because the old `data.js` content contains mojibake-like character issues from encoding, for example dashes/arrows/currency symbols.

## Why The UI Looks Different From The Old Portal

This was intentional:

- bug logs were redesigned to be much more readable
- roadmap is cleaner and less noisy
- current work and Phase 2 dependency order are separated from the raw feature inventory

The goal was not a 1:1 visual port. It was a cleaner operational portal using the real source data.

## Commands

Run locally:

```bash
npm run dev
```

Regenerate data after changing the old portal dataset:

```bash
node scripts/generate-portal-data.mjs
```

Verify:

```bash
npm run lint
npm run build
```

## Verified State

These were passing before handoff:

- `npm run lint`
- `npm run build`

## Likely Next Tasks

If more work is needed next session, the most likely useful next steps are:

1. Improve the mobile sidebar into a proper overlay/drawer.
2. Make roadmap cards expandable per layer/feature if deeper inspection is needed.
3. Add Vercel metadata / SEO polish if required after deploy.
4. Refine spacing and card density after seeing the live deployed version.
5. Optionally reduce the amount of raw feature text shown in roadmap cards if the page feels too dense with full real data.

## Files Most Important To Read First

1. [`src/App.tsx`](C:\mobile-projects\flutter\pendu\dev-portal\src\App.tsx)
2. [`src/data/portalData.ts`](C:\mobile-projects\flutter\pendu\dev-portal\src\data\portalData.ts)
3. [`scripts/generate-portal-data.mjs`](C:\mobile-projects\flutter\pendu\dev-portal\scripts\generate-portal-data.mjs)
4. [`../pendu-mobile/devportal/data.js`](C:\mobile-projects\flutter\pendu\pendu-mobile\devportal\data.js)
