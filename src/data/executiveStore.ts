/**
 * Unified executive data — single source of truth for all flows.
 * Persisted to localStorage; responses cite live store values.
 */
import {
  buildGroundedRecords,
  deriveGroundingMeta,
  kbHandle,
  mktHandle,
  normalizeCitedHandle,
  type GroundingLevel,
} from '../utils/sourceHandles';
import { enrichSources, panelSources, sourceTypeFromHandle } from '../utils/sourceLinks';
import type {
  AgentType,
  Conversation,
  DepartmentPerformance,
  DocumentFile,
  MorningSignal,
  RagStatus,
  Source,
} from '../types';
import { EXECUTIVE_USER } from '../config/user';
import { PERFORMANCE_DEPARTMENTS } from './v5SpecData';
import { ALL_FOCUS_PROMPTS, resolveFocusAreaForQuery } from './focusAreas';
import { buildFocusAreaResponse } from './focusResponses';
import { AGENT_LABELS, routeAgentsForQuery } from './agents';
import { buildDailyCatchUpResponse, buildShortGreetingResponse } from './personalGreeting';
import { detectChatIntent } from '../utils/chatIntent';
import { FALCON_KB_SOURCES, retrieveFalconExcerpts, sourcesFromFalconExcerpts } from './kb/falconKb';
import type { ExecutiveSnapshotPatch, BloombergArticle } from '../api/executiveSnapshot';
import type { LiveMarketIntelSnapshot, MarketSnapshotFields, SignalNewsBundle } from '../types/marketIntel';
import {
  actionNow,
  agentTag,
  metricTable,
  plainTerms,
  scoreBar,
  signalEmoji,
} from '../utils/executiveAnswerVisuals';
import { isLegacyLiveTicker } from '../utils/marketTicker';

const STORAGE_KEY = 'dmcc-executive-state-v4';
const LEGACY_STORAGE_KEYS = [
  'arm-executive-state-v1',
  'arm-executive-state-v2',
  'arm-executive-state-v3',
  'apparel-group-executive-state-v3',
  'dmcc-executive-state-v3',
] as const;

/** Drop stale ADGM-era cache; use in DevTools for a full reset with STORAGE_KEY too. */
export function clearExecutiveStateCache() {
  for (const key of [...LEGACY_STORAGE_KEYS, STORAGE_KEY]) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* private mode / quota */
    }
  }
}

function purgeLegacyExecutiveState() {
  for (const key of LEGACY_STORAGE_KEYS) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}
const MARKET_ROTATION: ExecutiveState['marketSnapshot'][] = [
  {
    gccEquities: '+0.8%',
    digitalAssetsWoW: '+4.2%',
    competitorNote: 'DIFC accelerates digital asset and tokenisation licensing',
    topSector: 'Crypto & blockchain (DMCC Crypto Centre · Tether MoU)',
  },
  {
    gccEquities: '+1.1%',
    digitalAssetsWoW: '+3.8%',
    competitorNote: 'ADGM expands precious metals custody framework',
    topSector: 'Gold & precious metals (Dubai Precious Metals Conference)',
  },
  {
    gccEquities: '+0.4%',
    digitalAssetsWoW: '+2.9%',
    competitorNote: 'UAE Corporate Tax qualifying income guidance update for free zones',
    topSector: 'Member services (26,000+ companies · 180+ countries)',
  },
  {
    gccEquities: '+0.6%',
    digitalAssetsWoW: '+3.1%',
    competitorNote: 'Future of Trade 2026 — UAE #2 Commodity Trade Index',
    topSector: 'Diamonds (USD 41.7B trade through Dubai in 2025)',
  },
];

function gstNow(): Date {
  const now = new Date();
  return new Date(now.getTime() + (now.getTimezoneOffset() + 240) * 60000);
}

function dateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function meetingIso(day: Date, hour: number, minute = 0): string {
  const y = day.getFullYear();
  const m = day.getMonth();
  const dom = day.getDate();
  return new Date(Date.UTC(y, m, dom, hour - 4, minute, 0)).toISOString();
}

function buildDynamicMeetings(today: Date): Meeting[] {
  return [
    {
      id: 'mtg1',
      title: 'DMCC leadership — Q2 member services & licence review',
      time: meetingIso(today, 10, 0),
      attendees: 'Member Services, Legal, Finance leadership',
      location: 'Almas Tower, JLT, Dubai',
      prepStatus: 'ready',
    },
    {
      id: 'mtg2',
      title: 'Future of Trade Singapore launch — executive alignment',
      time: meetingIso(addDays(today, 1), 14, 0),
      attendees: 'Strategy, Marketing, Events teams',
      location: 'Almas Tower, JLT, Dubai',
      prepStatus: 'pending',
    },
    {
      id: 'mtg3',
      title: 'Uptown Dubai investor briefing — milestone review',
      time: meetingIso(addDays(today, 2), 11, 0),
      attendees: 'BizDev, Strategy, Finance',
      location: 'Almas Tower, JLT, Dubai',
      prepStatus: 'ready',
    },
    {
      id: 'mtg4',
      title: 'Dubai Diamond Conference — CEO keynote prep',
      time: meetingIso(addDays(today, 7), 9, 30),
      attendees: 'Marketing, Communications, Events',
      location: 'Almas Tower, JLT, Dubai',
      prepStatus: 'pending',
    },
  ];
}

function buildDynamicActions(today: Date): ActionItem[] {
  return [
    {
      id: 'a1',
      title: 'Approve corporate tax member advisory resourcing — due in 14 days',
      owner: EXECUTIVE_USER.shortName,
      due: dateOnly(addDays(today, -1)),
      status: 'overdue',
      departmentId: 'legal',
    },
    {
      id: 'a2',
      title: 'Clear 12 pending licence renewals — member services escalation',
      owner: EXECUTIVE_USER.shortName,
      due: dateOnly(addDays(today, 3)),
      status: 'open',
      departmentId: 'members',
    },
    {
      id: 'a3',
      title: 'DMCC Cyber launch communications — CEO sign-off',
      owner: 'Marketing → ' + EXECUTIVE_USER.shortName,
      due: dateOnly(addDays(today, 9)),
      status: 'open',
      departmentId: 'marketing',
    },
    {
      id: 'a4',
      title: 'Confirm CEO keynote — Dubai Diamond Conference (26 Oct)',
      owner: EXECUTIVE_USER.shortName,
      due: dateOnly(addDays(today, 2)),
      status: 'open',
      departmentId: 'events',
    },
    {
      id: 'a5',
      title: 'Tether partnership announcement — executive approval',
      owner: EXECUTIVE_USER.shortName,
      due: dateOnly(addDays(today, 7)),
      status: 'open',
      departmentId: 'bizdev',
    },
  ];
}

function applyDocumentDates(docs: DocumentFile[], today: Date): DocumentFile[] {
  const offsets = [0, -2, -4, -1, -11];
  return docs.map((doc, i) => ({
    ...doc,
    uploadedAt: dateOnly(addDays(today, offsets[i] ?? -7)),
  }));
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  attendees: string;
  location: string;
  prepStatus: 'ready' | 'pending';
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: 'open' | 'overdue' | 'done';
  departmentId?: string;
}

export interface ActivityPoint {
  day: string;
  queries: number;
  confidence: number;
}

export interface ExecutiveMetrics {
  queriesThisWeek: number | null;
  documentsInKb: number;
  briefingsGenerated: number;
  avgConfidence: number;
  departmentsOnTrack: number;
  openActions: number;
}

export interface ExecutiveState {
  version: 4;
  lastSync: string;
  metrics: ExecutiveMetrics;
  departments: DepartmentPerformance[];
  documents: DocumentFile[];
  conversations: Conversation[];
  meetings: Meeting[];
  actionRegister: ActionItem[];
  activityWeek: ActivityPoint[];
  marketSnapshot: MarketSnapshotFields;
  signalNews?: SignalNewsBundle;
  liveMarketIntel?: LiveMarketIntelSnapshot;
  bloombergArticles?: BloombergArticle[];
  bloombergFetchedAt?: string;
  regulatoryHeadline?: string;
  liveTicker?: { k: string; v: string; c: number }[];
  liveTickerFetchedAt?: string;
}

const SEED_DOCUMENTS: DocumentFile[] = [
  {
    id: 'd1',
    name: 'Q2_Board_Pack_Draft_v3.pdf',
    type: 'PDF',
    size: '4.1 MB',
    uploadedAt: '2026-06-01',
    status: 'ready',
    summary:
      'Q2 board materials: member services performance, Uptown Dubai activation, Dubai Diamond Conference keynote. Three board decisions flagged.',
    keyInsights: [
      'Uptown Dubai investor briefing — board decision required',
      'Member onboarding SLA at 4.2 days',
      'Future of Trade Singapore launch 15 Jul — executive alignment needed',
    ],
    focusAreaIds: ['meetings', 'knowledge'],
    clauses: [
      {
        title: 'Section 2 — Executive summary',
        text: 'DMCC continues to strengthen its commodities free zone portfolio across member services, gold & diamonds, crypto, and Uptown Dubai...',
      },
    ],
  },
  {
    id: 'd2',
    name: 'DMCC_Corporate_Tax_Advisory_Framework_2026.pdf',
    type: 'PDF',
    size: '2.8 MB',
    uploadedAt: '2026-05-29',
    status: 'ready',
    summary: 'Free zone qualifying income guidance for 26,000+ member companies under UAE Corporate Tax Law.',
    keyInsights: ['Qualified free zone status confirmed', 'Member advisory templates due in 14 days', 'Finance–Legal alignment required'],
    focusAreaIds: ['regulatory', 'knowledge'],
    clauses: [],
  },
  {
    id: 'd3',
    name: 'Dubai_Diamond_Conference_Keynote_Talking_Points.docx',
    type: 'DOCX',
    size: '620 KB',
    uploadedAt: '2026-05-28',
    status: 'ready',
    summary: 'Bilingual talking points — Dubai Diamond Conference CEO keynote (26 Oct 2026).',
    keyInsights: ['Formal register verified', 'Commodities trade narrative aligned with Future of Trade 2026'],
    focusAreaIds: ['correspondence'],
    clauses: [],
  },
  {
    id: 'd4',
    name: 'Commodities_Trade_Review_Q1_2026.pdf',
    type: 'PDF',
    size: '1.1 MB',
    uploadedAt: '2026-06-02',
    status: 'ready',
    summary: 'Commodities Q1 review — USD 41.7B diamond trade, gold ecosystem +12% YoY, 8 active rough tenders.',
    keyInsights: ['Diamond trade USD 41.7B', 'London Diamond Bourse MoU advancing', 'Lab-grown share at 18%'],
    focusAreaIds: ['strategic-intelligence', 'knowledge'],
    clauses: [],
  },
  {
    id: 'd5',
    name: 'Future_of_Trade_Alignment_Tracker_2026.xlsx',
    type: 'XLSX',
    size: '890 KB',
    uploadedAt: '2026-05-20',
    status: 'ready',
    summary: 'Portfolio alignment with Future of Trade 2026 — mapped to commodities, member services, Uptown Dubai, DMCC Cyber.',
    keyInsights: ['Alignment score 86/100', 'Uptown Dubai briefing on track Q3', 'Singapore launch 15 Jul confirmed'],
    focusAreaIds: ['knowledge', 'strategic-intelligence'],
    clauses: [],
  },
];

function kbSeedSizeMb(src: { pageEstimate?: number; id: string }): string {
  if (src.id === 'ag-group-strategy') return '2.1 MB';
  if (src.id === 'retailme-awards') return '1.4 MB';
  const mb = Math.max(0.2, (src.pageEstimate ?? 12) * 0.08);
  return `${mb.toFixed(1)} MB`;
}

function kbCompanyIdForSource(srcId: string): 'arm' | 'drec' | 'huna' | 'hive' | 'capri' {
  if (srcId === 'drec-portfolio') return 'drec';
  if (srcId === 'huna-developments') return 'huna';
  if (srcId === 'hive-loyalty programme' || srcId === 'retailme-awards') return 'hive';
  if (srcId === 'dubai-d33-alignment') return 'arm';
  if (srcId === 'rera-compliance') return 'arm';
  return 'arm';
}

/** Indexed institutional PDFs — DMCC corporate KB */
const FALCON_SEED_DOCUMENTS: DocumentFile[] = FALCON_KB_SOURCES.map((src) => ({
  id: src.docId,
  name: src.pdfName,
  type: 'PDF',
  size: kbSeedSizeMb(src),
  uploadedAt: src.date,
  status: 'ready',
  inKnowledgeBase: true,
  kbCategory: src.category,
  kbDocumentDate: src.date,
  kbCompanyId: kbCompanyIdForSource(src.id),
  summary: src.summary.replace(/\s+/g, ' ').slice(0, 500),
  keyInsights: [
    src.title,
    `Knowledge base · ${src.handle} · ${src.chunkCount} indexed sections`,
    src.category === 'policy'
      ? 'UAE Corporate Tax / free zone qualifying income — cite KB handles in answers'
      : 'DMCC strategy & commodities — cite KB handles in answers',
  ],
  focusAreaIds: ['knowledge', src.category === 'policy' ? 'regulatory' : 'strategic-intelligence'],
  clauses: [],
}));

/** Always overwrite institutional seed docs so refreshed DMCC titles replace stale Apparel cache. */
function ensureFalconKbDocuments(docs: DocumentFile[]): DocumentFile[] {
  const byId = new Map(docs.map((d) => [d.id, d]));
  for (const seed of FALCON_SEED_DOCUMENTS) {
    byId.set(seed.id, seed);
  }
  return Array.from(byId.values()).filter((d) => {
    const n = `${d.name} ${d.summary ?? ''}`.toLowerCase();
    if (/\b(apparel group|club apparel|6thstreet|r&b fashion|neeraj teckchandani)\b/.test(n)) {
      return false;
    }
    return true;
  });
}

function buildSeedConversations(today: Date): Conversation[] {
  const stamp = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 5, 30, 0),
  ).toISOString();
  return [
    {
      id: 'c1',
      title: 'Member Services leadership brief — Q2',
      category: 'Meetings',
      updatedAt: stamp,
      pinned: true,
      preview: 'Brief me on my Member Services leadership meeting',
      messages: [],
    },
    {
      id: 'c2',
      title: 'DMCC vs ADGM — free zone positioning',
      category: 'Intelligence',
      updatedAt: stamp,
      pinned: false,
      preview: 'How does DMCC free zone positioning compare to ADGM?',
      messages: [],
    },
  ];
}

function countRag(depts: DepartmentPerformance[], rag: RagStatus) {
  return depts.filter((d) => d.rag === rag).length;
}

export function createSeedState(): ExecutiveState {
  const today = gstNow();
  const departments = structuredClone(PERFORMANCE_DEPARTMENTS);
  const actionRegister = buildDynamicActions(today);
  return {
    version: 4,
    lastSync: new Date().toISOString(),
    metrics: {
      queriesThisWeek: 0, // starts at 0; incremented per chat query this session
      documentsInKb: 52,
      briefingsGenerated: 8,
      avgConfidence: 0.91,
      departmentsOnTrack: countRag(departments, 'green'),
      openActions: actionRegister.filter((a) => a.status !== 'done').length,
    },
    departments,
    documents: applyDocumentDates(
      structuredClone([...SEED_DOCUMENTS, ...FALCON_SEED_DOCUMENTS]),
      today,
    ),
    conversations: buildSeedConversations(today),
    meetings: buildDynamicMeetings(today),
    actionRegister,
    activityWeek: [
      { day: 'Mon', queries: 6, confidence: 0.89 },
      { day: 'Tue', queries: 9, confidence: 0.91 },
      { day: 'Wed', queries: 11, confidence: 0.92 },
      { day: 'Thu', queries: 8, confidence: 0.9 },
      { day: 'Fri', queries: 7, confidence: 0.93 },
      { day: 'Sat', queries: 3, confidence: 0.88 },
      { day: 'Sun', queries: 3, confidence: 0.9 },
    ],
    marketSnapshot: MARKET_ROTATION[today.getDay() % MARKET_ROTATION.length],
  };
}

/** Merge server or local refresh patch; keeps chat history by default */
export function applyExecutiveSnapshotPatch(
  state: ExecutiveState,
  patch: ExecutiveSnapshotPatch,
): ExecutiveState {
  const departments = structuredClone(PERFORMANCE_DEPARTMENTS);
  const openActions =
    patch.metrics.openActions ??
    patch.actionRegister.filter((a) => a.status !== 'done').length;

  let documents = state.documents;
  if (patch.documentUploadedAt) {
    documents = state.documents.map((d) => ({
      ...d,
      uploadedAt: patch.documentUploadedAt![d.id] ?? d.uploadedAt,
    }));
  }

  return {
    ...state,
    version: 4,
    lastSync: patch.lastSync,
    meetings: patch.meetings,
    actionRegister: patch.actionRegister,
    marketSnapshot: patch.marketSnapshot,
    signalNews: patch.signalNews ?? state.signalNews,
    liveMarketIntel: patch.liveMarketIntel ?? state.liveMarketIntel,
    bloombergArticles: patch.bloombergArticles ?? state.bloombergArticles,
    bloombergFetchedAt: patch.bloombergFetchedAt ?? state.bloombergFetchedAt,
    regulatoryHeadline: patch.regulatoryHeadline ?? state.regulatoryHeadline,
    liveTicker: isLegacyLiveTicker(patch.liveTicker)
      ? undefined
      : (patch.liveTicker ?? (isLegacyLiveTicker(state.liveTicker) ? undefined : state.liveTicker)),
    liveTickerFetchedAt: isLegacyLiveTicker(patch.liveTicker ?? state.liveTicker)
      ? undefined
      : (patch.liveTickerFetchedAt ?? state.liveTickerFetchedAt),
    documents,
    departments,
    metrics: {
      ...state.metrics,
      ...patch.metrics,
      departmentsOnTrack: countRag(departments, 'green'),
      openActions,
    },
  };
}

export function refreshExecutiveState(
  previous?: ExecutiveState | null,
  options?: { keepConversations?: boolean },
): ExecutiveState {
  const fresh = createSeedState();
  if (!previous) return fresh;
  return {
    ...fresh,
    conversations:
      options?.keepConversations === false ? fresh.conversations : previous.conversations,
    metrics: {
      ...fresh.metrics,
      briefingsGenerated: previous.metrics.briefingsGenerated,
      queriesThisWeek: (fresh.metrics.queriesThisWeek ?? previous.metrics.queriesThisWeek),
    },
  };
}

export function loadExecutiveState(): ExecutiveState {
  purgeLegacyExecutiveState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSeedState();
    const parsed = JSON.parse(raw) as ExecutiveState;
    if (parsed.version !== 4) {
      return refreshExecutiveState(parsed, { keepConversations: true });
    }
    return {
      ...parsed,
      documents: ensureFalconKbDocuments(parsed.documents ?? []),
      liveTicker: isLegacyLiveTicker(parsed.liveTicker) ? undefined : parsed.liveTicker,
      liveTickerFetchedAt: isLegacyLiveTicker(parsed.liveTicker) ? undefined : parsed.liveTickerFetchedAt,
    };
  } catch {
    return createSeedState();
  }
}

export function saveExecutiveState(state: ExecutiveState) {
  state.lastSync = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDepartment(state: ExecutiveState, id: string) {
  return state.departments.find((d) => d.id === id);
}

export function deriveMorningSignals(state: ExecutiveState): MorningSignal[] {
  const members = getDepartment(state, 'members');
  const bizdev = getDepartment(state, 'bizdev');
  const it = getDepartment(state, 'it');
  const m = state.marketSnapshot;
  const overdue = state.actionRegister.filter((a) => a.status === 'overdue').length;

  return [
    {
      id: 'overnight',
      pillar: '01',
      title: 'Overnight intelligence',
      summary: `DMCC priorities · GCC ${m.gccEquities} · ${m.topSector}.`,
      detail:
        'Daily summary across member services, commodities trade, crypto, diamonds, Uptown Dubai, and regional free zone competition.',
      icon: 'overnight',
      priority: 'normal',
      href: '/chat',
    },
    {
      id: 'market',
      pillar: '02',
      title: 'Market signals',
      summary: `Commodity trade pulse · ${m.topSector} momentum.`,
      detail:
        'GCC equities, digital assets, gold & diamond flows, and competitor free zone positioning (ADGM, DIFC).',
      icon: 'market',
      priority: 'medium',
      href: '/chat',
    },
    {
      id: 'competitor',
      pillar: '03',
      title: 'Competitor moves',
      summary: m.competitorNote,
      detail:
        'ADGM, DIFC, and regional free zones — fintech licensing, crypto frameworks, and commodities incentives.',
      icon: 'competitor',
      priority: 'high',
      href: '/chat',
    },
    {
      id: 'regulatory',
      pillar: '04',
      title: 'Regulatory shifts',
      summary: 'UAE Corporate Tax qualifying income · free zone status · member advisory update.',
      detail:
        'Federal Decree-Law No. 47 of 2022, DMCC qualified free zone status, and member communications on corporate tax.',
      icon: 'regulatory',
      priority: 'high',
      href: '/chat?focus=regulatory',
    },
    {
      id: 'performance-risk',
      pillar: '05',
      title: 'Performance & risk alerts',
      summary: `Members setup ${members?.kpis.find((k) => k.label.includes('setup'))?.value ?? '—'} · BizDev pipeline ${bizdev?.kpis.find((k) => k.label.includes('pipeline'))?.value ?? '—'} · IT uptime ${it?.kpis.find((k) => k.label.includes('uptime'))?.value ?? '—'} · ${overdue} overdue actions`,
      detail: members?.leadershipActions[0] ?? 'Departmental risks, blockers and leadership attention areas.',
      icon: 'performance-risk',
      priority: 'high',
      href: '/performance',
    },
  ];
}

export function getSourcesForQuery(state: ExecutiveState, docIds: string[]): Source[] {
  return docIds
    .map((id, i) => {
      const doc = state.documents.find((d) => d.id === id);
      if (!doc) return null;
      const docIndex = state.documents.findIndex((d) => d.id === id);
      return {
        id: `src-${id}`,
        handle: kbHandle(id, docIndex >= 0 ? docIndex : i),
        kind: 'internal' as const,
        sourceType: 'knowledge' as const,
        documentId: id,
        title: doc.name.replace(/_/g, ' ').replace(/\.\w+$/, ''),
        documentName: doc.name,
        date: doc.uploadedAt,
        confidence: 0.9 + i * 0.02,
        excerpt: doc.summary ?? '',
      };
    })
    .filter(Boolean) as Source[];
}

/** Resolve UI sources from handles cited in the model answer */
export function getSourcesFromHandles(state: ExecutiveState, handles: string[]): Source[] {
  const records = buildGroundedRecords(state);
  const unique = [...new Set(handles.map(normalizeCitedHandle))];
  return unique
    .map((handle, i) => {
      const rec = records.find((r) => r.handle === handle);
      if (!rec) return null;
      return {
        id: `src-${handle}`,
        handle,
        kind: rec.kind,
        sourceType: rec.kind === 'external' ? 'external' : sourceTypeFromHandle(handle),
        title: rec.label,
        documentName: rec.system,
        date: rec.asOf,
        confidence: rec.kind === 'internal' ? 0.92 + i * 0.01 : 0.86,
        excerpt: rec.snippet,
      };
    })
    .filter(Boolean) as Source[];
}

function dedupeSources(sources: Source[]): Source[] {
  const seen = new Set<string>();
  return sources.filter((s) => {
    const key = (s.handle ?? s.id).toUpperCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Resolve chat sources from citations, retrieved KB excerpts, and institutional fallbacks */
export function resolveChatSources(
  query: string,
  answerText: string,
  state: ExecutiveState,
  fallbackDocIds: string[],
): { grounding?: GroundingLevel; sources: Source[] } {
  const records = buildGroundedRecords(state);
  const meta = deriveGroundingMeta(answerText, records);
  const handleSet = new Set<string>();
  const addHandle = (handle?: string) => {
    if (!handle) return;
    handleSet.add(normalizeCitedHandle(handle));
  };

  meta.citedHandles.forEach(addHandle);

  const excerpts = query.trim() ? retrieveFalconExcerpts(query) : [];
  for (const ex of excerpts) addHandle(ex.docHandle);

  if (/\b(market|stock|gcc|bloomberg|retail|competitor|news|headline|equit)/i.test(query)) {
    addHandle(mktHandle(state.marketSnapshot.asOf?.slice(0, 10) ?? state.lastSync.slice(0, 10)));
  }

  const fromHandles = handleSet.size
    ? enrichSources(getSourcesFromHandles(state, [...handleSet]), state)
    : [];
  const fromExcerpts = sourcesFromFalconExcerpts(excerpts, (sources) => enrichSources(sources, state));
  const fromFallback = fallbackDocIds.length
    ? enrichSources(getSourcesForQuery(state, fallbackDocIds), state)
    : [];

  const merged = dedupeSources([...fromHandles, ...fromExcerpts, ...fromFallback]);
  const visible = panelSources(merged);
  if (!visible.length) {
    return { grounding: undefined, sources: [] };
  }

  const grounding = meta.citedHandles.length ? meta.level : 'partial';
  return { grounding, sources: visible };
}

export function resolveAnswerGrounding(
  answerText: string,
  state: ExecutiveState,
  fallbackDocIds: string[],
): { grounding?: GroundingLevel; sources: Source[] } {
  return resolveChatSources('', answerText, state, fallbackDocIds);
}

export interface IntelligentResponse {
  content: string;
  agents: AgentType[];
  confidence: number;
  sourceDocIds: string[];
  followUps: string[];
}

export function buildIntelligentResponse(query: string, state: ExecutiveState): IntelligentResponse {
  const q = query.toLowerCase();

  if (detectChatIntent(query) === 'greeting') {
    return buildShortGreetingResponse(query, state);
  }

  if (detectChatIntent(query) === 'catchup') {
    return buildDailyCatchUpResponse(query, state);
  }

  if (detectChatIntent(query) === 'thanks') {
    return {
      agents: ['cos'],
      confidence: 0.95,
      sourceDocIds: [],
      followUps: ['Brief me on my next meeting', 'Show performance snapshot'],
      content: `You're welcome, **${EXECUTIVE_USER.firstName}**. Ask anytime — I'll stay in context for follow-ups.`,
    };
  }

  const members = getDepartment(state, 'members')!;
  const bizdev = getDepartment(state, 'bizdev')!;
  const it = getDepartment(state, 'it')!;
  const setupTime = members.kpis.find((k) => k.label.includes('setup'))?.value ?? '4.2 days';
  const pipeline = bizdev.kpis.find((k) => k.label.includes('pipeline'))?.value ?? 'AED 2.1B';
  const uptime = it.kpis.find((k) => k.label.includes('uptime'))?.value ?? '99.97%';

  if (q.includes('huna') && (q.includes('emaar') || q.includes('compare') || q.includes('design'))) {
    return {
      agents: ['strategy'],
      confidence: 0.92,
      sourceDocIds: ['d9', 'd4'],
      followUps: [
        'Show Uptown Dubai investor briefing timeline',
        'Open commodities trade review for context',
        'Draft board narrative on free zone differentiation',
      ],
      content: `## DMCC vs ADGM — free zone positioning

${plainTerms('DMCC leads on commodities depth and member scale; ADGM leads on financial services and digital asset licensing.')}
${metricTable(
  ['What it means', 'Score', 'Signal'],
  [
    ['DMCC member companies', '26,000+', `${signalEmoji('good')} Strong`],
    ['Commodity trade index (UAE)', '#2 globally', `${signalEmoji('good')} Strong`],
    ['Diamond trade through Dubai', 'USD 41.7B', signalEmoji('good')],
    ['GCC markets today', state.marketSnapshot.gccEquities, signalEmoji('good')],
  ],
)}
**Future of Trade alignment**
${scoreBar(86)}

${actionNow('Accelerate Uptown Dubai investor narrative before competitor free zone announcement.')}
${agentTag(['Strategy AI'])}`,
    };
  }

  if (q.includes('d33') || q.includes('we emerge') || (q.includes('2025') && q.includes('strategic'))) {
    const excerpts = retrieveFalconExcerpts(q, 6);
    if (excerpts.length) {
      const excerptBlock = excerpts
        .map(
          (ex) =>
            `**[${ex.handle}] ${ex.docTitle}**\n${ex.text.slice(0, 520).replace(/\n+/g, ' ').trim()}…`,
        )
        .join('\n\n');
      return {
        agents: ['strategy', 'cos'],
        confidence: 0.94,
        sourceDocIds: ['d6', 'd12'],
        followUps: [
          'Summarise Future of Trade alignment for commodities, members, and Uptown Dubai',
          'Compare group strategy vs current ecosystem priorities',
          'Which initiatives need corporate tax advisory alignment first?',
        ],
        content: `## DMCC portfolio & Future of Trade — knowledge base

${plainTerms('Answer grounded in approved DMCC corporate documents in the knowledge base.')}

${excerptBlock}

**Sources (mandatory):** ${excerpts.map((e) => e.handle).join(', ')} · ${FALCON_KB_SOURCES.map((s) => s.pdfName).join(' · ')}
${agentTag(['Strategy AI', 'Chief of Staff AI'])}`,
      };
    }
    return {
      agents: ['strategy', 'cos'],
      confidence: 0.89,
      sourceDocIds: ['d6', 'd12', 'd5'],
      followUps: [
        'Open Future of Trade Alignment Tracker in Knowledge Base',
        'Which portfolio companies lead on Future of Trade priorities?',
        'Prepare board narrative on Dubai Diamond Conference Awards',
      ],
      content: `## Portfolio strategy & Future of Trade

${plainTerms('DMCC documents are in the knowledge base — ask about commodities trade, member services, Uptown Dubai, or Dubai Diamond Conference for cited excerpts.')}
${agentTag(['Strategy AI', 'Chief of Staff AI'])}`,
    };
  }

  if (q.includes('stakeholder') || (q.includes('profile') && (q.includes('art dubai') || q.includes('crm')))) {
    const mtg = state.meetings.find((m) => /art dubai|we emerge/i.test(m.title)) ?? state.meetings[0];
    const open = state.actionRegister.filter((a) => a.status !== 'done');
    return {
      agents: ['relationship', 'cos'],
      confidence: 0.91,
      sourceDocIds: ['d11', 'd3'],
      followUps: [
        'Draft talking points for Dubai Diamond Conference Awards',
        'Log follow-up in action register',
        'Open full CRM record',
      ],
      content: `## Stakeholder — ${mtg.title}

${plainTerms('Strong Dubai Diamond Conference partnership; awards acceptance open call is live until 25 July.')}
${metricTable(
  ['CRM fact', 'Detail', 'Signal'],
  [
    ['Partnership', 'Dubai Diamond Conference × DMCC', signalEmoji('good')],
    ['Commission', 'Dubai Diamond Conference Awards — open call', signalEmoji('good')],
    ['Location', 'Uptown Dubai loyalty programme, Dubai Hills Mall', signalEmoji('good')],
  ],
)}
${metricTable(
  ['Open follow-up', 'Due', 'Signal'],
  open.slice(0, 3).map((a) => [
    a.title,
    a.due,
    a.status === 'overdue' ? signalEmoji('risk') : signalEmoji('watch'),
  ]),
)}
${actionNow('Confirm CEO speaking slot for Dubai Diamond Conference commission announcement.')}
${agentTag(['Relationship AI', 'Chief of Staff AI'])}`,
    };
  }

  if (q.includes('brief') && q.includes('meeting') && !q.includes('drec')) {
    const mtg = state.meetings.find((m) => m.id === 'mtg1') ?? state.meetings[0];
    return {
      agents: ['cos', 'relationship', 'strategy', 'comms'],
      confidence: 0.94,
      sourceDocIds: ['d8', 'd13'],
      followUps: [
        'Draft talking points for member services review',
        'Show open corporate tax advisory commitments',
        'Add to action register',
      ],
      content: `## Pre-meeting — ${mtg.title}

${plainTerms('You are ready for the member services review; corporate tax member advisory due in 14 days.')}
${metricTable(
  ['Meeting fact', 'Detail', 'Signal'],
  [
    ['When', 'Tomorrow 10:00 UAE', signalEmoji('good')],
    ['Where', mtg.location, '—'],
    ['Prep', mtg.prepStatus === 'ready' ? 'Ready' : 'In progress', mtg.prepStatus === 'ready' ? signalEmoji('good') : signalEmoji('watch')],
    ['Who', mtg.attendees, '—'],
  ],
)}
${metricTable(
  ['Agenda item', 'Detail', 'Signal'],
  [
    ['Member onboarding SLA', setupTime, signalEmoji('watch')],
    ['BizDev pipeline', pipeline, signalEmoji('good')],
    ['Corporate tax advisory', 'Due in 14 days', signalEmoji('watch')],
  ],
)}
| Metric | Value | Signal |
|--------|-------|--------|
| Competitor headline | ${state.marketSnapshot.competitorNote} | ${signalEmoji('watch')} |
| Member setup time | ${setupTime} | ${signalEmoji('watch')} |
| IT uptime | ${uptime} | ${signalEmoji('good')} |
${agentTag(['Chief of Staff', 'Relationship', 'Strategy', 'Comms'])}`,
    };
  }

  if (q.includes('drec') && q.includes('brief')) {
    const mtg = state.meetings.find((m) => m.id === 'mtg1')!;
    const overdue = state.actionRegister.find((a) => a.id === 'a1');
    return {
      agents: ['cos', 'relationship', 'strategy', 'comms'],
      confidence: 0.93,
      sourceDocIds: ['d1', 'd8'],
      followUps: [
        'What did we commit to at the last member services review?',
        'Draft talking points on licence renewals and onboarding',
        'Flag action register items',
      ],
      content: `## Pre-meeting — ${mtg.title}

${plainTerms('Member services review today — clear the overdue corporate tax advisory approval before new asks.')}
${metricTable(
  ['Meeting', 'Detail', 'Signal'],
  [
    ['Time', '10:00 UAE today', signalEmoji('good')],
    ['With', mtg.attendees, '—'],
    ['Active members', '26,142', signalEmoji('good')],
  ],
)}
${overdue ? actionNow(`Send overdue item: ${overdue.title} (was due ${overdue.due}).`) : `${signalEmoji('good')} No overdue actions.`}
${metricTable(
  ['Talking point', 'Why', ''],
  [
    ['12 licence renewals pending', 'SLA escalation', '—'],
    ['Onboarding at 4.2 days', 'Peak season pressure', '—'],
    ['Corporate tax advisory', 'Member communications deadline', '—'],
  ],
)}
| Metric | Value | Signal |
|--------|-------|--------|
| BizDev pipeline | ${pipeline} | ${signalEmoji('good')} |
| Open actions | ${state.metrics.openActions} | ${signalEmoji('watch')} |
${agentTag(['Chief of Staff', 'Relationship', 'Strategy'])}`,
    };
  }

  if (q.includes('investment') || (q.includes('dubai') && q.includes('priorit'))) {
    return {
      agents: ['strategy', 'policy'],
      confidence: 0.9,
      sourceDocIds: ['d5', 'd8'],
      followUps: [
        'Deep dive Uptown Dubai investor briefing',
        'Dubai Diamond Conference keynote talking points',
        'Compare DMCC vs ADGM free zone positioning',
      ],
      content: `## DMCC — top opportunities

${plainTerms('Commodities trade, member services scale, and Uptown Dubai activation score highest for DMCC.')}
${metricTable(
  ['Sector', 'Future of Trade score', 'Signal'],
  [
    ['Diamonds (USD 41.7B trade)', '96/100', signalEmoji('good')],
    ['Gold & precious metals', '92/100', signalEmoji('good')],
    ['Crypto & digital assets', '88/100', signalEmoji('good')],
    ['Member services (26,000+)', '90/100', signalEmoji('good')],
  ],
)}
**Top pick**
${scoreBar(90)}
${state.marketSnapshot.topSector}

| Market signal | Value |
|---------------|-------|
| Future of Trade | UAE #2 Commodity Trade Index |
| GCC equities | ${state.marketSnapshot.gccEquities} |

${actionNow('Prioritise Uptown Dubai investor briefing and Tether partnership announcement.')}
${agentTag(['Strategy AI', 'Policy AI'])}`,
    };
  }

  if ((q.includes('arabic') || q.includes('emerge')) && (q.includes('talking') || q.includes('speech') || q.includes('announce'))) {
    return {
      agents: ['comms', 'strategy'],
      confidence: 0.91,
      sourceDocIds: ['d3', 'd11'],
      followUps: [
        'Open full bilingual draft in Documents',
        'Adjust cultural initiative messaging',
        'Schedule Dubai Diamond Conference announcement',
      ],
      content: `## Dubai Diamond Conference Awards — communications draft

${plainTerms('Culture woven into everyday life; permanent sculpture at Uptown Dubai loyalty programme with Dubai Diamond Conference.')}
${metricTable(
  ['Theme', 'Message', 'Signal'],
  [
    ['Commission', 'Open call 17 Jun – 25 Jul 2026', signalEmoji('good')],
    ['Inspiration', 'نظهر أقوى — resilience & renewal', signalEmoji('good')],
    ['Location', 'Uptown Dubai loyalty programme', signalEmoji('good')],
  ],
)}
### English (short)
Culture is essential to how we build cities and communities. Art should be woven into everyday life.

### العربية (مختصر)
الثقافة أساسية في بناء مدننا ومجتمعاتنا. يجب أن يكون الفن جزءاً من الحياة اليومية.

*Full draft: Dubai_Diamond_Conference_Keynote_Talking_Points.docx*
${agentTag(['Communications AI', 'Strategy AI'])}`,
    };
  }

  if (q.includes('performance') || q.includes('members') || q.includes('renewal')) {
    return {
      agents: ['cos', 'strategy'],
      confidence: 0.9,
      sourceDocIds: ['d1'],
      followUps: ['Open Member Services detail', 'Show leadership actions', 'Compare BizDev pipeline'],
      content: `## Performance snapshot

${plainTerms('Most departments are on track; member onboarding SLA and licence renewals need leadership attention.')}
${metricTable(
  ['Department', 'Key metric', 'Signal'],
  [
    ['Member Services', `Setup ${setupTime}`, members.rag === 'green' ? signalEmoji('good') : members.rag === 'red' ? signalEmoji('risk') : signalEmoji('watch')],
    ['BizDev', pipeline, bizdev.rag === 'green' ? signalEmoji('good') : bizdev.rag === 'red' ? signalEmoji('risk') : signalEmoji('watch')],
    ['IT', `Uptime ${uptime}`, it.rag === 'green' ? signalEmoji('good') : it.rag === 'red' ? signalEmoji('risk') : signalEmoji('watch')],
  ],
)}
| Org view | Value | Signal |
|----------|-------|--------|
| Departments green | ${state.metrics.departmentsOnTrack}/9 | ${signalEmoji('good')} |
| Open actions | ${state.metrics.openActions} | ${signalEmoji('watch')} |

**Next:** Open **/performance** for all 9 departments.
${agentTag(['Chief of Staff AI', 'Strategy AI'])}`,
    };
  }

  const focusId = resolveFocusAreaForQuery(query);
  if (focusId) {
    return buildFocusAreaResponse(focusId, query, state);
  }

  const agents = routeAgentsForQuery(query, [], true);
  const excerpt = query.trim().length > 140 ? `${query.trim().slice(0, 137)}…` : query.trim();
  const nextMeeting = state.meetings[0];

  if (agents.includes('explorer')) {
    return {
      agents: ['explorer'],
      confidence: 0.5,
      sourceDocIds: [],
      followUps: [
        'Search online for latest UAE climate policy',
        'Compare DMCC free zone positioning vs ADGM',
        nextMeeting ? `Brief me on ${nextMeeting.title}` : 'Brief me on my next meeting',
      ],
      content: `**Explorer AI**

The live AI service did not respond for: “${excerpt}”.

When connected, I answer general knowledge questions (climate, markets, geography, current events) in plain language — not the institutional KPI table below.

Please try again. If you see this repeatedly, hard-refresh the page (**Cmd+Shift+R**) to load the latest deployment.`,
    };
  }

  return {
    agents,
    confidence: 0.82,
    sourceDocIds: ['d1'],
    followUps: [
      'Compare DMCC free zone positioning vs ADGM',
      nextMeeting ? `Brief me on ${nextMeeting.title}` : 'Brief me on my next meeting',
      'Show department performance snapshot',
    ],
    content: `## Answer to your question

${plainTerms(`You asked: “${excerpt}”. Here is what institutional data supports — scoped to your question, not a generic overview.`)}

${metricTable(
  ['From your data', 'Value', 'Signal'],
  [
    ['Documents in KB', `${state.metrics.documentsInKb}`, signalEmoji('good')],
    ['Open actions', `${state.metrics.openActions}`, signalEmoji('watch')],
    ['Departments green', `${state.metrics.departmentsOnTrack}/9`, signalEmoji('good')],
    ['GCC markets', state.marketSnapshot.gccEquities, signalEmoji('good')],
  ],
)}

**Analysis (${AGENT_LABELS[agents[0]]})**
I don't have a matching briefing template for this exact wording. Name a **meeting**, **regulator**, **stakeholder**, or **document** and I'll answer from calendar, CRM, and knowledge-base sources.

${nextMeeting ? actionNow(`Or ask: “Brief me on ${nextMeeting.title}” for a calendar-grounded answer.`) : ''}
${agentTag(agents.map((a) => AGENT_LABELS[a]))}`,
  };
}

export function bumpQueryMetrics(state: ExecutiveState): ExecutiveState {
  const next = { ...state, metrics: { ...state.metrics, queriesThisWeek: (state.metrics.queriesThisWeek ?? 0) + 1 } };
  const today = new Date().getDay();
  const idx = today === 0 ? 6 : today - 1;
  const activityWeek = [...state.activityWeek];
  activityWeek[idx] = {
    ...activityWeek[idx],
    queries: activityWeek[idx].queries + 1,
    confidence: Math.min(0.98, activityWeek[idx].confidence + 0.002),
  };
  next.activityWeek = activityWeek;
  next.metrics.avgConfidence =
    activityWeek.reduce((s, d) => s + d.confidence, 0) / activityWeek.length;
  return next;
}

export const DEMO_PROMPTS = ALL_FOCUS_PROMPTS;

export function completeAction(state: ExecutiveState, actionId: string): ExecutiveState {
  const actionRegister = state.actionRegister.map((a) =>
    a.id === actionId ? { ...a, status: 'done' as const } : a,
  );
  return {
    ...state,
    actionRegister,
    metrics: {
      ...state.metrics,
      openActions: actionRegister.filter((a) => a.status !== 'done').length,
    },
  };
}
