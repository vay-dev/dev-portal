import { FEATURES, LAYERS, PROJECT } from './generatedPortalData'

export type Status = 'done' | 'in-progress' | 'planned' | 'blocked'
export type Severity = 'critical' | 'high' | 'medium' | 'low'

type RawStatus = 'done' | 'in-progress' | 'not-started' | 'blocked'

export interface ProjectMeta {
  name: string
  subtitle: string
  startedAt: string
  platform: string
  packageName: string
  stack: string[]
}

export interface Metric {
  label: string
  value: string
  tone?: 'cyan' | 'amber' | 'green' | 'slate'
  helper: string
}

export interface PriorityItem {
  title: string
  status: Status
  owner: string
  detail: string
}

export interface BugItem {
  id: string
  severity: Severity
  title: string
  detail: string
  feature: string
  status: 'fixed' | 'open'
  fixedAt?: string
}

export interface LayerFeature {
  id: string
  name: string
  status: RawStatus
  notes: string
  files: string[]
  completedAt: string | null
  bugCount: number
}

export interface RoadmapPhase {
  id: string
  name: string
  status: Status
  summary: string
  progress: number
  accent: string
  helper: string
  features: LayerFeature[]
}

export interface FeatureCard {
  title: string
  status: Status
  summary: string
  files: string[]
}

export interface DependencyItem {
  id: string
  title: string
  note: string
}

function normalizeText(value: string): string {
  return value
    .replaceAll('â€”', '—')
    .replaceAll('â†’', '→')
    .replaceAll('âœ•', '✕')
    .replaceAll('âœ“', '✓')
    .replaceAll('â±', '⏱')
    .replaceAll('Â·', '·')
    .replaceAll('â‚¦', '₦')
}

function normalizeStatus(status: RawStatus): Status {
  if (status === 'not-started') {
    return 'planned'
  }

  return status
}

const allFeatures = FEATURES.map((feature) => ({
  ...feature,
  status: feature.status as RawStatus,
  name: normalizeText(feature.name),
  notes: normalizeText(feature.notes),
  files: feature.files.map((file) => normalizeText(file)),
  bugs: feature.bugs.map((bug) => ({
    ...bug,
    description: normalizeText(bug.description),
  })),
}))

export const project: ProjectMeta = {
  name: normalizeText(PROJECT.name),
  subtitle: normalizeText(PROJECT.tagline),
  startedAt: PROJECT.startedAt,
  platform: normalizeText(PROJECT.platform),
  packageName: normalizeText(PROJECT.package),
  stack: PROJECT.stack.map((item) => normalizeText(item)),
}

const allBugs = allFeatures.flatMap((feature) =>
  feature.bugs.map((bug) => ({
    id: bug.id,
    severity: bug.severity as Severity,
    title: bug.description.split('—')[0]?.trim() || bug.description.slice(0, 72),
    detail: bug.description,
    feature: feature.name,
    status: bug.status as 'fixed' | 'open',
    fixedAt: bug.fixedAt ?? undefined,
  })),
)

const doneFeatures = allFeatures.filter((feature) => feature.status === 'done')
const inProgressFeatures = allFeatures.filter((feature) => feature.status === 'in-progress')
const plannedFeatures = allFeatures.filter((feature) => feature.status === 'not-started')
const openBugs = allBugs.filter((bug) => bug.status === 'open')
const fixedBugs = allBugs.filter((bug) => bug.status === 'fixed')

export const metrics: Metric[] = [
  {
    label: 'Features Done',
    value: String(doneFeatures.length),
    tone: 'cyan',
    helper: `${allFeatures.length} total tracked features`,
  },
  {
    label: 'In Progress',
    value: String(inProgressFeatures.length),
    tone: 'amber',
    helper: `${plannedFeatures.length} not started`,
  },
  {
    label: 'Phases',
    value: String(LAYERS.length),
    tone: 'slate',
    helper: 'layers 0 through 6',
  },
  {
    label: 'Bugs Fixed',
    value: String(fixedBugs.length),
    tone: 'green',
    helper: `${openBugs.length} currently open`,
  },
]

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

export const roadmap: RoadmapPhase[] = LAYERS.map((layer) => {
  const features = allFeatures.filter((feature) => feature.layerId === layer.id)
  const doneCount = features.filter((feature) => feature.status === 'done').length
  const progress = features.length === 0 ? 0 : Math.round((doneCount / features.length) * 100)
  const layerStatus: Status =
    features.some((feature) => feature.status === 'in-progress')
      ? 'in-progress'
      : progress === 100
        ? 'done'
        : doneCount === 0
          ? 'planned'
          : 'in-progress'

  return {
    id: layer.id,
    name: normalizeText(layer.name),
    status: layerStatus,
    summary: normalizeText(layer.description),
    progress,
    accent: layer.color,
    helper: `${doneCount} / ${features.length} features shipped`,
    features: features.map((feature) => ({
      id: feature.id,
      name: feature.name,
      status: feature.status,
      notes: feature.notes,
      files: feature.files,
      completedAt: feature.completedAt,
      bugCount: feature.bugs.length,
    })),
  }
})

export const bugs: BugItem[] = [...allBugs].sort((left, right) => {
  const leftDate = left.fixedAt ?? ''
  const rightDate = right.fixedAt ?? ''

  return rightDate.localeCompare(leftDate) || right.id.localeCompare(left.id)
})

export const activeFeatures: FeatureCard[] = [...doneFeatures]
  .sort((left, right) => (right.completedAt ?? '').localeCompare(left.completedAt ?? ''))
  .slice(0, 3)
  .map((feature) => ({
    title: feature.name,
    status: normalizeStatus(feature.status),
    summary: feature.notes,
    files: feature.files.slice(0, 4),
  }))

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
