# Pendu Dev Portal

A React-based internal development portal for tracking Pendu product progress, roadmap phases, bug history, and Phase 2 execution planning.

This app replaces the older static HTML dev portal with a shareable, deployable interface designed for continuous updates and external review.

## Purpose

The portal exists to make project state readable at a glance.

It is used to show:

- current product progress
- shipped and planned roadmap layers
- bug history in a more readable format
- recent implementation work
- Phase 2 backend execution order
- project metadata and technical stack

The goal is not just visualization. The portal is intended to be a live operational view of the product’s implementation state.

## Why This Exists

The previous version of the portal was built as a static HTML page inside the main mobile repo.

That version worked as a quick reference, but it had several limitations:

- hard to share externally
- difficult to evolve cleanly
- bug logs were not easy to scan
- roadmap and future tasks were too dense
- no proper deploy flow for regular progress updates

This React version solves that by moving the portal into its own app that can be deployed independently, including on Vercel.

## Current State

Implemented:

- React + TypeScript app scaffolded with Vite
- Tailwind integrated through Vite
- Sass styling layer for custom visual treatment
- right-side collapsible sidebar on desktop
- section navigation with active-state tracking
- scroll-aware section highlighting using `IntersectionObserver`
- migration from static portal content into React
- bug log redesigned into readable issue cards
- roadmap and summary panels rebuilt with clearer hierarchy

## Data Model

The portal is driven from the actual old dev portal dataset.

Source of truth:

- `../pendu-mobile/devportal/data.js`

Generated bridge file:

- `src/data/generatedPortalData.ts`

Derived UI adapter:

- `src/data/portalData.ts`

This means the app does not rely on manually duplicating the project data in multiple places.

Instead, the old data source is parsed and converted into a format the React UI can consume.

## Project Structure

```txt
dev-portal/
├─ public/
├─ scripts/
│  └─ generate-portal-data.mjs
├─ src/
│  ├─ data/
│  │  ├─ generatedPortalData.ts
│  │  └─ portalData.ts
│  ├─ App.tsx
│  ├─ app.scss
│  ├─ index.css
│  └─ main.tsx
├─ CLAUDE_HANDOFF.md
├─ package.json
├─ vite.config.ts
└─ README.md
