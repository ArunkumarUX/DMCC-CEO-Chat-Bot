/** Known external URLs for live documents and feeds */
import type { Source, SourceType } from '../types';
import type { ExecutiveState } from '../data/executiveStore';
import { kbHandle } from './sourceHandles';

const DOC_EXTERNAL_URL: Record<string, string> = {
  d2: 'https://www.armholding.ae/',
  d4: 'https://www.rera.gov.ae',
  d1: 'https://www.armholding.ae/',
  d5: 'https://www.armholding.ae/',
};

const CRM_EXTERNAL_URL: Record<string, string> = {
  'CRM-artdubai': 'https://www.artdubai.ae',
  'CRM-drec': 'https://www.armholding.ae/',
};

const MARKET_FEED_URL = 'https://www.cbre.ae/insights';

/**
 * Real external URLs for every KB source document.
 * Keyed by KB source ID (from armKbChunks.json sources[].id).
 */
export const KB_SOURCE_URLS: Record<string, { url: string; label: string; pdfPath: string }> = {
  'arm-group-strategy': {
    url: 'https://www.armholding.ae/',
    label: 'A.R.M. Holding — Group Strategy',
    pdfPath: '/kb/ARM_Group_Strategy_2026.pdf',
  },
  'arm-values': {
    url: 'https://www.armholding.ae/',
    label: 'A.R.M. Holding — Values & Leadership',
    pdfPath: '/kb/ARM_Values_Leadership_2026.pdf',
  },
  'drec-portfolio': {
    url: 'https://www.armholding.ae/',
    label: 'DREC — Portfolio Review',
    pdfPath: '/kb/DREC_Portfolio_Review_Q1_2026.pdf',
  },
  'huna-developments': {
    url: 'https://www.armholding.ae/',
    label: 'HUNA — Development Strategy',
    pdfPath: '/kb/HUNA_Development_Strategy_2026.pdf',
  },
  'hive-coliving': {
    url: 'https://www.armholding.ae/',
    label: 'HIVE — Coliving Operations',
    pdfPath: '/kb/HIVE_Operations_2026.pdf',
  },
  'we-emerge-stronger': {
    url: 'https://www.armholding.ae/',
    label: 'We Emerge Stronger — Commission Brief',
    pdfPath: '/kb/We_Emerge_Stronger_Commission_Brief.pdf',
  },
  'dubai-d33-alignment': {
    url: 'https://www.armholding.ae/',
    label: 'D33 Portfolio Alignment Tracker',
    pdfPath: '/kb/ARM_D33_Alignment_Tracker_2026.pdf',
  },
  'rera-compliance': {
    url: 'https://www.rera.gov.ae',
    label: 'RERA & DLD Compliance Framework',
    pdfPath: '/kb/ARM_RERA_Compliance_Framework_2026.pdf',
  },
};

/**
 * Map a KB handle (e.g. KB-001-01) to its source ID.
 */
const KB_HANDLE_TO_SOURCE_ID: Record<string, string> = {
  'KB-001': 'arm-group-strategy',
  'KB-002': 'arm-values',
  'KB-003': 'drec-portfolio',
  'KB-004': 'huna-developments',
  'KB-005': 'hive-coliving',
  'KB-006': 'we-emerge-stronger',
  'KB-007': 'dubai-d33-alignment',
  'KB-008': 'rera-compliance',
};

function getKbSourceId(handle?: string): string | undefined {
  if (!handle) return undefined;
  const prefix = handle.match(/^(KB-\d+)/)?.[1];
  return prefix ? KB_HANDLE_TO_SOURCE_ID[prefix] : undefined;
}

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

    const legacyExt = docId ? DOC_EXTERNAL_URL[docId] : undefined;
    if (legacyExt) {
      out.externalUrl = legacyExt;
    }

    const kbSourceId = getKbSourceId(source.handle);
    const kbMeta = kbSourceId ? KB_SOURCE_URLS[kbSourceId] : undefined;
    if (kbMeta) {
      out.externalUrl = kbMeta.url;
      out.href = kbMeta.pdfPath;
      out.openLabel = `View PDF — ${kbMeta.label}`;
    }

    return out;
  }

  if (sourceType === 'external') {
    out.href = source.externalUrl ?? MARKET_FEED_URL;
    out.externalUrl = out.href;
    out.openLabel = 'Open source';
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
