import type { Source, SourceType } from '../types';
import type { ExecutiveState } from '../data/executiveStore';
import { kbHandle } from './sourceHandles';

/** Known external URLs for demo documents and feeds */
const DOC_EXTERNAL_URL: Record<string, string> = {
  d2: 'https://www.adgm.com/rules-and-regulations',
  d4: 'https://www.mas.gov.sg/regulation/consultations',
  d1: 'https://www.adgm.com/about/adgm-board',
  d5: 'https://www.adgmuae.ae/en/d33',
};

const CRM_EXTERNAL_URL: Record<string, string> = {
  'CRM-mas': 'https://www.mas.gov.sg',
  'CRM-mubadala': 'https://www.mubadala.com',
};

const MARKET_FEED_URL = 'https://www.lseg.com/en/data-analytics';

function handlePrefix(handle?: string): string {
  return handle?.split('-')[0]?.toUpperCase() ?? '';
}

export function sourceTypeFromHandle(handle?: string): SourceType {
  const p = handlePrefix(handle);
  if (p === 'KB') return 'knowledge';
  if (p === 'MKT') return 'external';
  if (p === 'CAL') return 'calendar';
  if (p === 'ACT') return 'action';
  if (p === 'CRM') return 'crm';
  return 'knowledge';
}

export function docIdFromKbHandle(state: ExecutiveState, handle: string): string | undefined {
  const idx = state.documents.findIndex((d, i) => kbHandle(d.id, i) === handle);
  return idx >= 0 ? state.documents[idx].id : undefined;
}

/** Enrich a source with open actions (KB route or external URL) */
export function enrichSource(source: Source, state: ExecutiveState): Source {
  const sourceType = source.sourceType ?? sourceTypeFromHandle(source.handle);
  const out: Source = { ...source, sourceType };

  if (sourceType === 'knowledge') {
    const docId =
      source.documentId ??
      (source.handle ? docIdFromKbHandle(state, source.handle) : undefined) ??
      source.id.replace(/^src-/, '');
    if (docId && state.documents.some((d) => d.id === docId)) {
      out.documentId = docId;
      out.href = `/knowledge?doc=${docId}`;
      out.openLabel = 'Open in Knowledge Base';
    }
    const ext = docId ? DOC_EXTERNAL_URL[docId] : undefined;
    if (ext) out.externalUrl = ext;
    return out;
  }

  if (sourceType === 'external') {
    out.href = source.externalUrl ?? MARKET_FEED_URL;
    out.externalUrl = out.href;
    out.openLabel = 'Open website';
    return out;
  }

  if (sourceType === 'crm' && source.handle && CRM_EXTERNAL_URL[source.handle]) {
    out.externalUrl = CRM_EXTERNAL_URL[source.handle];
    out.openLabel = 'Open website';
    return out;
  }

  if (sourceType === 'calendar') {
    out.href = '/briefings';
    out.openLabel = 'View briefings';
    return out;
  }

  if (sourceType === 'action') {
    out.href = '/performance';
    out.openLabel = 'View actions';
    return out;
  }

  return out;
}

export function enrichSources(sources: Source[], state: ExecutiveState): Source[] {
  return sources.map((s) => enrichSource(s, state));
}

/** Sources shown in the panel: knowledge-base docs + items with an external website */
export function panelSources(sources: Source[]): Source[] {
  return sources.filter(
    (s) =>
      s.sourceType === 'knowledge' ||
      s.sourceType === 'external' ||
      Boolean(s.externalUrl),
  );
}
