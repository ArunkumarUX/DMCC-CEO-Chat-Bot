import type { Source, SourceType } from '../types';

export type SourceStackItem = {
  key: string;
  faviconUrl?: string;
  letter: string;
  bg: string;
  fg: string;
};

const TYPE_STYLE: Record<SourceType, { bg: string; fg: string; letter: string }> = {
  knowledge: { bg: '#000000', fg: '#ffffff', letter: 'K' },
  calendar: { bg: '#159c8c', fg: '#ffffff', letter: 'C' },
  action: { bg: '#d38a00', fg: '#ffffff', letter: 'A' },
  crm: { bg: '#5c4bb5', fg: '#ffffff', letter: 'R' },
  external: { bg: '#242321', fg: '#ffffff', letter: 'M' },
};

function hostnameFromUrl(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return host || null;
  } catch {
    return null;
  }
}

function faviconForHost(host: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
}

function externalUrlForSource(source: Source): string | undefined {
  const candidate = source.externalUrl ?? source.url;
  if (candidate?.startsWith('http')) return candidate;
  if (source.href?.startsWith('http')) return source.href;
  return undefined;
}

function letterForSource(source: Source): string {
  const handle = source.handle?.replace(/[^A-Z]/gi, '').slice(0, 2).toUpperCase();
  if (handle) return handle.slice(0, 1);
  const type = source.sourceType ?? 'knowledge';
  return TYPE_STYLE[type]?.letter ?? 'S';
}

export function sourceToStackItem(source: Source): SourceStackItem {
  const type = source.sourceType ?? 'knowledge';
  const style = TYPE_STYLE[type] ?? TYPE_STYLE.knowledge;
  const ext = externalUrlForSource(source);
  const host = ext ? hostnameFromUrl(ext) : null;

  if (host) {
    return {
      key: `host:${host}`,
      faviconUrl: faviconForHost(host),
      letter: host.charAt(0).toUpperCase(),
      bg: '#ffffff',
      fg: style.bg,
    };
  }

  return {
    key: `type:${source.handle ?? source.id}`,
    letter: letterForSource(source),
    bg: style.bg,
    fg: style.fg,
  };
}

/** Unique favicon/avatar items for the overlapping stack (max 3–4) */
export function sourcesForStack(sources: Source[], max = 3): SourceStackItem[] {
  const seen = new Set<string>();
  const out: SourceStackItem[] = [];
  for (const src of sources) {
    const item = sourceToStackItem(src);
    if (seen.has(item.key)) continue;
    seen.add(item.key);
    out.push(item);
    if (out.length >= max) break;
  }
  return out;
}

/** Short domain label for overflow chips, e.g. "adgm.com" */
export function sourceDomainLabel(source: Source): string | null {
  const ext = externalUrlForSource(source);
  const host = ext ? hostnameFromUrl(ext) : null;
  if (host) return host.length > 18 ? `${host.slice(0, 14)}…` : host;
  if (source.sourceType === 'knowledge') return 'Knowledge base';
  if (source.sourceType === 'calendar') return 'Calendar';
  if (source.sourceType === 'action') return 'Actions';
  if (source.sourceType === 'crm') return 'CRM';
  return null;
}
