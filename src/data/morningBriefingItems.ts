/**
 * Apparel Group CEO — morning briefing rows (Intel → Market Intelligence).
 */
import type { LiveNewsItem } from '../types/marketIntel';
import type { ExecutiveState } from './executiveStore';
import {
  CEO_SIGNAL_FALLBACKS,
  isExcludedForCeo,
  isRelevantForCeo,
  pickCeoLead,
  type CeoSignalId,
} from './apparelGroupCeoSignals';

export type MorningBriefingItem = {
  text: string;
  source: string;
  sourceUrl?: string;
};

const BRIEFING_SLOTS: CeoSignalId[] = ['market', 'competitor', 'investment', 'regulatory'];

function sanitizeNewsItem(item?: LiveNewsItem | null): LiveNewsItem | undefined {
  if (!item?.title) return undefined;
  if (isExcludedForCeo(item) || !isRelevantForCeo(item)) return undefined;
  return item;
}

function newsItemToBriefing(item: LiveNewsItem): MorningBriefingItem {
  const prefix = item.source?.trim();
  return {
    text: prefix ? `${prefix}: ${item.title}` : item.title,
    source: prefix || 'Live',
    sourceUrl: item.url,
  };
}

function fallbackBriefing(id: CeoSignalId, ar: boolean): MorningBriefingItem {
  const fb = ar ? CEO_SIGNAL_FALLBACKS.ar[id] : CEO_SIGNAL_FALLBACKS.en[id];
  return {
    text: `${fb.headline} — ${fb.body}`,
    source: ar ? 'ملخص المدير التنفيذي · Apparel Group' : 'CEO briefing · Apparel Group',
  };
}

export function buildCeoMorningBriefingItems(
  state: ExecutiveState | undefined,
  ar: boolean,
): { items: MorningBriefingItem[]; isLive: boolean } {
  const sn = state?.signalNews;
  const m = state?.marketSnapshot;
  const allNews = [
    ...(sn?.market ?? []),
    ...(sn?.competitor ?? []),
    ...(sn?.investment ?? []),
    ...(sn?.regulatory ?? []),
    ...(sn?.followup ?? []),
    ...(sn?.gccTop ?? []),
  ].map(sanitizeNewsItem).filter(Boolean) as LiveNewsItem[];

  const items: MorningBriefingItem[] = [];
  let isLive = false;

  if (m?.gccEquitiesLive && m.gccEquities && !/unavailable/i.test(m.gccEquities)) {
    items.push({
      text: ar ? `أسواق التجزئة في الخليج — ${m.gccEquities}` : `GCC retail equities — ${m.gccEquities}`,
      source: 'Yahoo Finance',
      sourceUrl: m.gccEquitiesSourceUrl ?? undefined,
    });
    isLive = true;
  }

  for (const id of BRIEFING_SLOTS) {
    if (items.length >= 4) break;
    const lead = sanitizeNewsItem(
      pickCeoLead(
        id,
        ...(sn?.[id] ?? []),
        ...allNews,
      ) as LiveNewsItem | undefined,
    );
    if (lead) {
      items.push(newsItemToBriefing(lead));
      isLive = true;
    } else {
      items.push(fallbackBriefing(id, ar));
    }
  }

  return { items: items.slice(0, 4), isLive };
}

export function ceoMorningBriefingFallback(ar: boolean): MorningBriefingItem[] {
  return BRIEFING_SLOTS.map((id) => fallbackBriefing(id, ar));
}
