import chunksPayload from './armKbChunks.json';

export type FalconKbChunk = {
  sourceId: string;
  docId: string;
  docHandle: string;
  docTitle: string;
  docDate: string;
  chunkIndex: number;
  handle: string;
  text: string;
};

export type FalconKbSource = {
  id: string;
  docId: string;
  handle: string;
  title: string;
  pdfName: string;
  date: string;
  category: string;
  pageEstimate: number;
  summary: string;
  chunkCount: number;
  externalUrl?: string;
};

const CHUNKS = chunksPayload.chunks as FalconKbChunk[];
const SOURCES = chunksPayload.sources as FalconKbSource[];

const STOP = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'what', 'when', 'your', 'about', 'have',
  'does', 'how', 'are', 'was', 'were', 'will', 'should', 'could', 'into', 'against', 'their',
]);

const INSTITUTIONAL_KB_QUERY =
  /\b(dmcc|dubai\s*multi\s*commodit|future\s*of\s*trade|free\s*zone|commodity|commodities|diamond|gold|precious\s*metals|crypto|tether|uptown\s*dubai|almas|jlt|member\s*compan|corporate\s*tax|qualifying\s*income|ahmed\s*bin\s*sulayem)\b/i;

export const FALCON_KB_SOURCES = SOURCES;

export function normalizeKbQuery(query: string): string {
  return query
    .trim()
    .replace(/\bstratgey\b/gi, 'strategy')
    .replace(/\bstratagy\b/gi, 'strategy')
    .replace(/\beconmy\b/gi, 'economy')
    .replace(/\bclmate\b/gi, 'climate');
}

export function isFalconKbQuery(query: string): boolean {
  return INSTITUTIONAL_KB_QUERY.test(normalizeKbQuery(query));
}

export function isBroadFalconOverviewQuery(query: string): boolean {
  const q = normalizeKbQuery(query).toLowerCase();
  return (
    /\b(tell me|explain|what is|what are|describe|overview of|summar(y|ise|ize))\b.*\b(dmcc|future\s*of\s*trade|commodit|free\s*zone|diamond|crypto)\b/.test(q) ||
    (/\b(dmcc|commodit|diamond|gold|crypto|member)\b/.test(q) && /\b(tell me|explain|what is|describe|overview)\b/.test(q))
  );
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3 && !STOP.has(w));
}

function scoreChunk(query: string, chunk: FalconKbChunk): number {
  const tokens = tokenize(query);
  if (!tokens.length) return 0;
  const hay = chunk.text.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (hay.includes(t)) score += 1;
  }
  if (/\b(dmcc|strategy|future\s*of\s*trade)\b/i.test(query) && chunk.sourceId === 'ag-group-strategy') score += 2;
  if (/\b(gold|precious\s*metals)\b/i.test(query) && chunk.sourceId === 'drec-portfolio') score += 3;
  if (/\b(crypto|digital\s*asset|tether|cyber)\b/i.test(query) && chunk.sourceId === 'huna-developments') score += 3;
  if (/\b(diamond|dde|bourse)\b/i.test(query) && chunk.sourceId === 'hive-loyalty programme') score += 3;
  if (/\b(diamond\s*conference|keynote|london\s*diamond)\b/i.test(query) && chunk.sourceId === 'retailme-awards') score += 3;
  if (/\b(future\s*of\s*trade|singapore|alignment)\b/i.test(query) && chunk.sourceId === 'dubai-d33-alignment') score += 3;
  if (/\b(corporate\s*tax|qualifying\s*income|free\s*zone\s*status|compliance)\b/i.test(query) && chunk.sourceId === 'rera-compliance') score += 3;
  if (/\b(values|integrity|leadership|ahmed\s*bin\s*sulayem)\b/i.test(query) && chunk.sourceId === 'arm-values') score += 2;
  return score;
}

/** Ranked excerpts from official Falcon PDFs for grounding chat responses */
export function retrieveFalconExcerpts(query: string, maxChunks = 8): FalconKbChunk[] {
  const normalized = normalizeKbQuery(query);
  if (!normalized || !CHUNKS.length) return [];

  const scored = CHUNKS.map((chunk) => ({ chunk, score: scoreChunk(normalized, chunk) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked: FalconKbChunk[] = [];
  const seen = new Set<string>();

  const push = (chunk: FalconKbChunk) => {
    if (seen.has(chunk.handle)) return;
    seen.add(chunk.handle);
    picked.push(chunk);
  };

  const bySource = new Map<string, number>();
  for (const { chunk, score } of scored) {
    const prev = bySource.get(chunk.sourceId) ?? 0;
    if (score > prev) bySource.set(chunk.sourceId, score);
  }
  const topSources = [...bySource.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);
  for (const srcId of topSources) {
    const lead = CHUNKS.find((c) => c.sourceId === srcId && c.chunkIndex === 0);
    if (lead) push(lead);
  }

  if (isBroadFalconOverviewQuery(normalized)) {
    for (const srcId of ['ag-group-strategy', 'arm-values']) {
      const lead = CHUNKS.find((c) => c.sourceId === srcId && c.chunkIndex === 0);
      if (lead) push(lead);
    }
  }

  for (const { chunk } of scored) {
    if (picked.length >= maxChunks) break;
    push(chunk);
  }

  return picked.slice(0, maxChunks);
}

export function falconExcerptsToGroundedRecords(excerpts: FalconKbChunk[]) {
  return excerpts.map((ex) => ({
    handle: ex.handle,
    kind: 'internal' as const,
    system: 'Knowledge base',
    label: `${ex.docTitle} · §${ex.chunkIndex + 1}`,
    snippet: ex.text.slice(0, 1400),
    asOf: ex.docDate,
  }));
}

export function formatFalconExcerptBlock(excerpts: FalconKbChunk[]): string {
  if (!excerpts.length) return '';
  const blocks = excerpts.map(
    (ex) => `[${ex.handle}] ${ex.docTitle} (${ex.docDate})\n${ex.text.slice(0, 2000)}`,
  );
  return `\n═══════════════════════════════\nAUTHORITATIVE KB EXCERPTS (cite handles — do not invent)\n═══════════════════════════════\n\n${blocks.join('\n\n---\n\n')}\n`;
}

/** Map retrieved KB excerpts to panel-ready knowledge sources */
export function sourcesFromFalconExcerpts(
  excerpts: FalconKbChunk[],
  enrich: (sources: import('../../types').Source[]) => import('../../types').Source[],
): import('../../types').Source[] {
  const seen = new Set<string>();
  const raw: import('../../types').Source[] = [];
  for (const ex of excerpts) {
    if (seen.has(ex.sourceId)) continue;
    seen.add(ex.sourceId);
    const meta = FALCON_KB_SOURCES.find((s) => s.id === ex.sourceId);
    if (!meta) continue;
    raw.push({
      id: `src-${meta.handle}`,
      handle: meta.handle,
      kind: 'internal',
      sourceType: 'knowledge',
      documentId: meta.docId,
      title: meta.title,
      documentName: 'Knowledge base',
      date: meta.date,
      confidence: 0.9,
      excerpt: meta.summary,
      externalUrl: meta.externalUrl,
    });
  }
  return enrich(raw);
}
