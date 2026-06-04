import type { ExecutiveState } from '../data/executiveStore';

/** Stable source handle prefixes — internal vs external */
export type SourceKind = 'internal' | 'external';

export type GroundedRecord = {
  handle: string;
  kind: SourceKind;
  system: string;
  label: string;
  snippet: string;
  asOf: string;
};

export type GroundingLevel = 'full' | 'partial';

export type GroundingMeta = {
  level: GroundingLevel;
  citedHandles: string[];
  internalCount: number;
  externalCount: number;
};

const KB_NUM: Record<string, string> = {
  d1: 'KB-001',
  d2: 'KB-002',
  d3: 'KB-003',
  d4: 'KB-004',
  d5: 'KB-005',
};

export function kbHandle(docId: string, index = 0): string {
  return KB_NUM[docId] ?? `KB-${String(index + 1).padStart(3, '0')}`;
}

export function calHandle(meetingId: string, time: string): string {
  const hhmm = time.match(/T(\d{2})(\d{2})/);
  if (hhmm) return `CAL-${hhmm[1]}${hhmm[2]}`;
  return `CAL-${meetingId.replace(/\D/g, '').slice(0, 4) || '0000'}`;
}

export function actHandle(actionId: string, index: number): string {
  const n = actionId.replace(/\D/g, '');
  return n ? `ACT-${n.padStart(2, '0')}` : `ACT-${String(index + 1).padStart(2, '0')}`;
}

export function mktHandle(asOf: string): string {
  const d = asOf.slice(0, 10);
  return `MKT-${d}`;
}

export function crmHandle(slug: string): string {
  return `CRM-${slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function meetingCrmSlug(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('mubadala')) return 'mubadala';
  if (t.includes('mas') || t.includes('singapore')) return 'mas';
  if (t.includes('board')) return 'board-risk';
  return title.split(/\s+/).slice(0, 2).join('-').toLowerCase();
}

/** Build injectable records with handles for Claude context */
export function buildGroundedRecords(state: ExecutiveState): GroundedRecord[] {
  const records: GroundedRecord[] = [];

  state.documents.forEach((doc, i) => {
    records.push({
      handle: kbHandle(doc.id, i),
      kind: 'internal',
      system: 'Knowledge base',
      label: doc.name,
      snippet: doc.summary ?? doc.keyInsights?.join('; ') ?? '',
      asOf: doc.uploadedAt,
    });
  });

  state.meetings.forEach((m) => {
    records.push({
      handle: calHandle(m.id, m.time),
      kind: 'internal',
      system: 'Calendar (Microsoft Graph demo)',
      label: m.title,
      snippet: `${m.time} · ${m.attendees} · ${m.location} · prep ${m.prepStatus}`,
      asOf: m.time.slice(0, 10),
    });
    records.push({
      handle: crmHandle(meetingCrmSlug(m.title)),
      kind: 'internal',
      system: 'CRM register',
      label: `Stakeholder — ${m.title}`,
      snippet: `Attendees: ${m.attendees}. Last engagement tied to calendar event ${calHandle(m.id, m.time)}.`,
      asOf: m.time.slice(0, 10),
    });
  });

  state.actionRegister.forEach((a, i) => {
    records.push({
      handle: actHandle(a.id, i),
      kind: 'internal',
      system: 'Action register',
      label: a.title,
      snippet: `[${a.status}] due ${a.due} · owner ${a.owner}`,
      asOf: a.due,
    });
  });

  const mkt = state.marketSnapshot;
  const mktDate = state.lastSync.slice(0, 10);
  const mktH = mktHandle(mktDate);
  records.push({
    handle: mktH,
    kind: 'external',
    system: 'Market snapshot (Bloomberg / Refinitiv demo feed)',
    label: 'GCC & digital-assets market',
    snippet: `GCC ${mkt.gccEquities} · digital assets ${mkt.digitalAssetsWoW} · ${mkt.competitorNote} · top sector ${mkt.topSector}`,
    asOf: mktDate,
  });

  return records;
}

export function validHandleSet(records: GroundedRecord[]): Set<string> {
  return new Set(records.map((r) => r.handle));
}

export function formatGroundedContextBlock(records: GroundedRecord[]): string {
  const internal = records.filter((r) => r.kind === 'internal');
  const external = records.filter((r) => r.kind === 'external');

  const line = (r: GroundedRecord) =>
    `[${r.handle}] (${r.system}, as of ${r.asOf}) ${r.label}\n  Snippet: ${r.snippet}`;

  return `INTERNAL SOURCES OF TRUTH (institutional — cite by handle):
${internal.map(line).join('\n') || '(none)'}

EXTERNAL SOURCES OF TRUTH (market & regulatory feeds — cite by handle):
${external.map(line).join('\n') || '(none)'}

Valid handles for this turn: ${records.map((r) => r.handle).join(', ')}`;
}

const HANDLE_RE = /\b(KB-\d{3}|ACT-\d{2,}|CAL-\d{4}|CRM-[a-z0-9-]+|MKT-\d{4}-\d{2}-\d{2})\b/gi;

export function extractCitedHandles(text: string): string[] {
  const found = new Set<string>();
  for (const m of text.matchAll(HANDLE_RE)) {
    const raw = m[1];
    if (/^kb-/i.test(raw)) found.add(raw.toUpperCase());
    else if (/^act-/i.test(raw)) found.add(raw.toUpperCase());
    else if (/^cal-/i.test(raw)) found.add(raw.toUpperCase());
    else if (/^mkt-/i.test(raw)) found.add(raw.toUpperCase());
    else if (/^crm-/i.test(raw)) found.add(`CRM-${raw.slice(4).toLowerCase()}`);
    else found.add(raw);
  }
  return [...found];
}

export function parseGroundingLevel(text: string): GroundingLevel | null {
  const m = text.match(/Grounding:\s*(full|partial|inferred)/i);
  if (!m) return null;
  return m[1].toLowerCase() === 'inferred' ? 'partial' : (m[1].toLowerCase() as GroundingLevel);
}

/** Derive grounding when model omits the explicit line */
export function deriveGroundingMeta(
  text: string,
  records: GroundedRecord[],
): GroundingMeta {
  const valid = validHandleSet(records);
  const cited = extractCitedHandles(text).filter((h) => valid.has(h));
  const explicit = parseGroundingLevel(text);

  const hasAnalysis = /\*\*Analysis|Analysis \(/i.test(text);
  const hasAbstention = /no source available|not in the knowledge base|cannot verify/i.test(text);

  let level: GroundingLevel;
  if (explicit) {
    level = explicit;
  } else if (cited.length >= 2 && !hasAbstention) {
    level = hasAnalysis ? 'partial' : 'full';
  } else if (cited.length >= 1 || hasAnalysis) {
    level = 'partial';
  } else {
    level = 'partial';
  }

  const internalCount = cited.filter((h) => records.find((r) => r.handle === h)?.kind === 'internal').length;
  const externalCount = cited.filter((h) => records.find((r) => r.handle === h)?.kind === 'external').length;

  return { level, citedHandles: cited, internalCount, externalCount };
}
