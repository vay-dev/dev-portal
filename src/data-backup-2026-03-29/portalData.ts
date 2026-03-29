import { FEATURES, LAYERS, PROJECT } from './generatedPortalData'
import { createPortalData } from './createPortalData'

export type {
  BugItem,
  FeatureCard,
  LayerFeature,
  Metric,
  PortalData,
  ProjectMeta,
  RoadmapPhase,
  Severity,
  Status,
} from './createPortalData'

const data = createPortalData(PROJECT, LAYERS, FEATURES)

export const project = data.project
export const metrics = data.metrics
export const roadmap = data.roadmap
export const bugs = data.bugs
export const activeFeatures = data.activeFeatures

export interface PriorityItem {
  title: string
  status: 'done' | 'in-progress' | 'planned' | 'blocked'
  owner: string
  detail: string
}

export interface DependencyItem {
  id: string
  title: string
  note: string
}

export const priorities: PriorityItem[] = [
  {
    title: 'Move dev portal into React and host it on Vercel',
    status: 'in-progress',
    owner: 'frontend',
    detail: 'The static portal is being replaced with a shareable React app so progress can be reviewed from a live link.',
  },
  {
    title: 'Make bug logs operationally readable',
    status: 'in-progress',
    owner: 'frontend',
    detail: 'Severity, source feature, fix state, and explanation need to be visible without expanding deep nested rows.',
  },
  {
    title: 'Start phase 2 with instrumentation, not gates',
    status: 'planned',
    owner: 'backend',
    detail: 'Analytics and metering fields come first. Paywalls and feature enforcement wait for beta usage data.',
  },
]

export const dependencies: DependencyItem[] = [
  {
    id: '01',
    title: 'PostHog instrumentation',
    note: 'Instrument message, media, group, call, registration, and AI recap events before monetisation or enforcement decisions are made.',
  },
  {
    id: '02',
    title: 'Admin API surface',
    note: 'Expose stats, users, groups, storage, and usage cost signals through a dedicated /admin route protected by its own admin token.',
  },
  {
    id: '03',
    title: 'Freemium metering fields',
    note: 'Add storageUsedBytes, tier, tierExpiresAt, isPublic, discoveryTags, and memberCount before enforcing any limits.',
  },
  {
    id: '04',
    title: 'AI recap endpoint',
    note: 'Ship recap only with caching, token caps, and rate limits already enforced so the feature cannot run wild at launch.',
  },
  {
    id: '05',
    title: 'Discovery, billing, then gates',
    note: 'Group discovery comes before Paystack, and Paystack comes before feature-gate middleware after 60-90 days of beta data.',
  },
]
