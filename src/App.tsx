import { useEffect, useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Bug,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  FolderCode,
  Layers3,
  LayoutDashboard,
  ListTodo,
  Route,
} from 'lucide-react'

import {
  activeFeatures,
  bugs,
  dependencies,
  metrics,
  priorities,
  project,
  roadmap,
  type BugItem,
  type Metric,
  type RoadmapPhase,
  type Severity,
  type Status,
} from './data/portalData'

type SectionId = 'overview' | 'roadmap' | 'bugs' | 'plan'

const navItems: { id: SectionId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'roadmap', label: 'Roadmap', icon: Route },
  { id: 'bugs', label: 'Bug Log', icon: Bug },
  { id: 'plan', label: 'Phase 2 Plan', icon: ListTodo },
]

const statusStyles: Record<Status, string> = {
  done: 'bg-emerald-950 text-emerald-400 ring-1 ring-emerald-800/70',
  'in-progress': 'bg-amber-950 text-amber-300 ring-1 ring-amber-800/70',
  planned: 'bg-slate-900 text-slate-300 ring-1 ring-slate-700',
  blocked: 'bg-red-950 text-red-300 ring-1 ring-red-800/70',
}

const metricStyles: Record<NonNullable<Metric['tone']>, string> = {
  cyan: 'text-cyan-400',
  amber: 'text-amber-400',
  green: 'text-emerald-400',
  slate: 'text-slate-100',
}

const severityStyles: Record<Severity, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-400',
  medium: 'bg-amber-400',
  low: 'bg-cyan-400',
}

const severityTextStyles: Record<Severity, string> = {
  critical: 'text-red-300',
  high: 'text-orange-300',
  medium: 'text-amber-300',
  low: 'text-cyan-300',
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${statusStyles[status]}`}
    >
      {status.replace('-', ' ')}
    </span>
  )
}

function BugCard({ bug }: { bug: BugItem }) {
  return (
    <article className="card-surface grid gap-4 rounded-2xl p-4 md:grid-cols-[auto_1fr_auto] md:items-start">
      <div className="flex items-center gap-3 md:pt-1">
        <span className={`h-2.5 w-2.5 rounded-full ${severityStyles[bug.severity]}`} />
        <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${severityTextStyles[bug.severity]}`}>
          {bug.severity}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <span className="font-mono text-[11px] text-slate-500">{bug.id}</span>
          <h3 className="text-sm font-semibold text-slate-200 md:text-[15px]">{bug.title}</h3>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">{bug.detail}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>{bug.feature}</span>
          <span>{bug.fixedAt ? `Fixed ${bug.fixedAt}` : 'Not fixed yet'}</span>
        </div>
      </div>

      <div className="justify-self-start md:justify-self-end">
        <span className="inline-flex rounded-md bg-emerald-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 ring-1 ring-emerald-800/70">
          {bug.status}
        </span>
      </div>
    </article>
  )
}

function RoadmapCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <article className="card-surface rounded-2xl p-5">
      <div className="grid gap-4 md:grid-cols-[4px_1fr]">
        <div className="rounded-full" style={{ backgroundColor: phase.accent }} />
        <div>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-100">{phase.name}</h3>
                <StatusBadge status={phase.status} />
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{phase.summary}</p>
            </div>
            <div className="text-sm text-slate-500">{phase.helper}</div>
          </div>

          <div className="progress-track mt-5 h-2">
            <div
              className="progress-fill"
              style={{ width: `${phase.progress}%`, backgroundColor: phase.accent }}
            />
          </div>

          <div className="mt-5 grid gap-3 xl:grid-cols-2">
            {phase.features.slice(0, 4).map((feature) => (
              <div key={feature.id} className="rounded-xl border border-slate-800 bg-slate-950/55 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge
                    status={
                      feature.status === 'not-started' ? 'planned' : (feature.status as Exclude<Status, 'planned'>)
                    }
                  />
                  <h4 className="text-sm font-semibold text-slate-100">{feature.name}</h4>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.notes}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>{feature.files.length} file references</span>
                  <span>{feature.bugCount} bug records</span>
                  {feature.completedAt ? <span>Completed {feature.completedAt}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    const hash = window.location.hash.replace('#', '') as SectionId

    return navItems.some((item) => item.id === hash) ? hash : 'overview'
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const fixedBugCount = bugs.filter((bug) => bug.status === 'fixed').length
  const openBugCount = bugs.length - fixedBugCount

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        const topEntry = visibleEntries[0]

        if (!topEntry) {
          return
        }

        const nextSection = topEntry.target.id as SectionId
        setActiveSection(nextSection)
        window.history.replaceState(null, '', `#${nextSection}`)
      },
      {
        rootMargin: '-18% 0px -52% 0px',
        threshold: [0.2, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const hash = window.location.hash.replace('#', '') as SectionId
    if (sectionIds.includes(hash)) {
      const element = document.getElementById(hash)
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ block: 'start' })
        })
      }
    }

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [])

  const handleNavigate = (sectionId: SectionId) => {
    setActiveSection(sectionId)
    setMobileSidebarOpen(false)
    window.history.replaceState(null, '', `#${sectionId}`)
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="portal-shell text-slate-200">
      <div className="mx-auto flex min-h-screen w-full max-w-[1560px] flex-col lg:flex-row">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div>
              <div className="font-mono text-sm font-bold tracking-[0.28em] text-white">PENDU</div>
              <p className="mt-1 text-sm text-slate-500">Dev portal</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((open) => !open)}
              className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-slate-200"
            >
              {mobileSidebarOpen ? 'Close' : 'Sections'}
            </button>
          </div>

          <section id="overview" className="mb-8 scroll-mt-24">
            <div className="mb-8 flex flex-col gap-3">
              <p className="section-label">Overview</p>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{project.name}</h1>
                <p className="mt-2 font-mono text-xs text-slate-500 sm:text-sm">{project.subtitle}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="card-surface rounded-2xl p-5">
                  <div className={`font-mono text-4xl font-bold ${metric.tone ? metricStyles[metric.tone] : ''}`}>
                    {metric.value}
                  </div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
                    {metric.label}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{metric.helper}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="card-surface rounded-2xl p-5">
                <div className="section-label">Project Info</div>
                <div className="mt-4 space-y-3">
                  {[
                    ['App', project.name],
                    ['Started', project.startedAt],
                    ['Platform', project.platform],
                    ['Package', project.packageName],
                    ['Stack Size', `${project.stack.length} primary technologies`],
                  ].map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col gap-1 border-b border-slate-800/90 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="text-sm text-slate-500">{key}</span>
                      <span className="text-sm font-medium text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-surface rounded-2xl p-5">
                <div className="section-label">Current Phase</div>
                <div className="mt-4 text-xl font-semibold text-cyan-400">Phase 2 Planning</div>
                <p className="mt-1 text-sm text-slate-500">
                  Monetisation, analytics, encryption, and partner-facing admin visibility.
                </p>
                <div className="progress-track mt-5 h-2">
                  <div className="progress-fill bg-cyan-400" style={{ width: '18%' }} />
                </div>
                <p className="mt-3 text-xs text-slate-500">2 / 11 dependencies resolved</p>

                <div className="mt-6 grid gap-3">
                  {priorities.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <StatusBadge status={item.status} />
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          {item.owner}
                        </span>
                      </div>
                      <div className="mt-3 text-sm font-semibold text-slate-200">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="roadmap" className="mb-8 scroll-mt-24">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="section-label">Roadmap</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Actual layer progress</h2>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-xs text-slate-400 md:flex">
                <Route size={14} />
                Derived from the real dev portal feature list
              </div>
            </div>

            <div className="grid gap-4">
              {roadmap.map((phase) => (
                <RoadmapCard key={phase.id} phase={phase} />
              ))}
            </div>
          </section>

          <section id="bugs" className="mb-8 scroll-mt-24">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">Bug Log</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Readable issue review</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  This section now comes from the real portal bug list and keeps severity, source feature, fix state, and explanation visible without nested expansion.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="card-surface rounded-xl px-4 py-3">
                  <div className="font-mono text-2xl font-bold text-cyan-400">{fixedBugCount}</div>
                  <div className="text-xs text-slate-500">Fixed</div>
                </div>
                <div className="card-surface rounded-xl px-4 py-3">
                  <div className="font-mono text-2xl font-bold text-emerald-400">{openBugCount}</div>
                  <div className="text-xs text-slate-500">Open</div>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {bugs.map((bug) => (
                <BugCard key={bug.id} bug={bug} />
              ))}
            </div>
          </section>

          <section id="plan" className="grid gap-6 scroll-mt-24 xl:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="section-label">Recent Real Work</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Latest completed features from the dataset</h2>
              <div className="mt-5 grid gap-4">
                {activeFeatures.map((feature) => (
                  <article key={feature.title} className="card-surface rounded-2xl p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={feature.status} />
                      <h3 className="text-base font-semibold text-slate-100">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{feature.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {feature.files.map((file) => (
                        <span
                          key={file}
                          className="rounded-md bg-slate-900 px-2.5 py-1 font-mono text-[11px] text-slate-400 ring-1 ring-slate-800"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <p className="section-label">Phase 2 Plan</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Dependency order</h2>

              <div className="card-surface mt-5 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Layers3 size={18} />
                  <h3 className="text-base font-semibold">Beta-first strategy</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Launch phase 2 features free, instrument real usage, and only then set pricing and gates. Enforcement without data is guesswork.
                </p>
              </div>

              <div className="card-surface mt-4 rounded-2xl p-5">
                <div className="mb-4 flex items-center gap-3 text-slate-200">
                  <FolderCode size={18} />
                  <h3 className="text-base font-semibold">Ordered delivery</h3>
                </div>

                <div className="grid gap-4">
                  {dependencies.map((item, index) => (
                    <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-sm font-semibold text-cyan-400">{item.id}.</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-100">{item.title}</h4>
                            {index === 0 ? <CheckCircle2 size={14} className="text-emerald-400" /> : null}
                            {index === 1 ? <Clock3 size={14} className="text-amber-400" /> : null}
                            {index >= 2 ? <CircleDot size={14} className="text-slate-500" /> : null}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3 text-slate-200">
                  <AlertCircle size={18} className="text-amber-400" />
                  <h3 className="text-base font-semibold">Why this structure is different</h3>
                </div>
                <ul className="mt-3 grid gap-3 text-sm leading-6 text-slate-400">
                  <li className="flex gap-3">
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-cyan-400" />
                    The roadmap now comes from the real feature inventory in the old dev portal, not a summary-only rewrite.
                  </li>
                  <li className="flex gap-3">
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-cyan-400" />
                    The bug log is flattened into readable records so issues can be reviewed without opening multiple nested rows.
                  </li>
                  <li className="flex gap-3">
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-cyan-400" />
                    The right-side navigation can collapse and now tracks the visible section instead of staying stuck on the first link.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <aside
          className={`${
            mobileSidebarOpen ? 'block' : 'hidden'
          } border-b border-slate-800/80 bg-slate-950/85 px-4 py-5 backdrop-blur lg:sticky lg:top-0 lg:order-last lg:block lg:h-screen lg:border-b-0 lg:border-l ${
            sidebarCollapsed ? 'lg:w-[92px]' : 'lg:w-[292px]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={sidebarCollapsed ? 'lg:hidden' : ''}>
              <div className="font-mono text-sm font-bold tracking-[0.28em] text-white">PENDU</div>
              <p className="mt-2 max-w-[190px] text-sm leading-6 text-slate-400">
                Development portal for progress, bugs, roadmap, and the next execution order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
              className="hidden rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-slate-300 lg:inline-flex"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    isActive
                      ? 'bg-cyan-950/60 text-cyan-300 ring-1 ring-cyan-900/80'
                      : 'text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
                  } ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className={sidebarCollapsed ? 'lg:hidden' : ''}>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className={`mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
            <div className="section-label">Stack</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
