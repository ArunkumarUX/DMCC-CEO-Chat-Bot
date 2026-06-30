/**
 * Apparel Group CEO — priority signal derivation
 */
import type { LiveNewsItem } from '../types/marketIntel';
import type { ExecutiveState } from './executiveStore';
import {
  CEO_SIGNAL_FALLBACKS,
  pickCeoLead,
  type CeoSignalId,
} from './apparelGroupCeoSignals';
import { primaryMarketMetric } from './formatSignalHeadlines';
import { newsBody, newsHeadline } from './prioritySignalHelpers';
import { sanitizeNewsText } from '../utils/sanitizeNewsText';

export type CommandCentreSignal = {
  id: string;
  icon: string;
  tone: 'good' | 'warn' | 'risk' | 'info';
  label: string;
  headline: string;
  headlineSub?: string;
  body: string;
  metric: string;
  metricLabel: string;
  freshnessLabel?: string;
  spark: number[];
  link?: string;
  ar: {
    label: string;
    headline: string;
    headlineSub?: string;
    body: string;
    metricLabel: string;
    freshnessLabel?: string;
  };
};

const SPARK = {
  market: [38, 42, 40, 46, 44, 52, 49, 58, 55, 62],
  competitor: [50, 48, 52, 49, 55, 53, 60, 58, 64, 67],
  investment: [30, 34, 40, 38, 46, 52, 60, 66, 74, 82],
  performance: [62, 64, 63, 66, 68, 70, 69, 72, 74, 76],
  regulatory: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7],
  followup: [6, 5, 5, 4, 5, 4, 3, 4, 4, 4],
};

const HEADLINE_MAX = 100;
const BODY_MAX = 155;

function cardHeadline(item: LiveNewsItem | undefined, fallback: string): string {
  if (item?.title) return newsHeadline(item, HEADLINE_MAX);
  return fallback.length > HEADLINE_MAX ? `${fallback.slice(0, HEADLINE_MAX - 1).trim()}…` : fallback;
}

function cardBody(item: LiveNewsItem | undefined, fallback: string): string {
  const raw = item ? newsBody(item, fallback) : fallback;
  const clean = sanitizeNewsText(raw).replace(/\s+/g, ' ').trim();
  if (clean.length <= BODY_MAX) return clean;
  return `${clean.slice(0, BODY_MAX - 1).trim()}…`;
}

function cardSub(item: LiveNewsItem | undefined, fallback: string): string {
  if (item?.source) return item.source;
  return fallback;
}

function countMetric(count: number): string {
  return String(Math.max(count, 0));
}

function cardFreshness(live: boolean, asOf: string | undefined, ar = false): string {
  if (live && asOf) return ar ? `مباشر · ${asOf}` : `Live · ${asOf}`;
  if (live) return ar ? 'مباشر' : 'Live';
  return ar ? 'ملخص المدير التنفيذي' : 'CEO briefing';
}

function portfolioMetric(m: ExecutiveState['marketSnapshot']): string {
  const gcc = m.gccEquities?.match(/([+-][\d.]+%)/)?.[1];
  if (gcc) return gcc;
  const sector = m.topSector?.match(/(\d{1,3})%/)?.[1];
  if (sector) return `${sector}%`;
  return '—';
}

function buildSignal(
  id: CeoSignalId,
  icon: string,
  tone: 'good' | 'warn' | 'risk' | 'info',
  lead: LiveNewsItem | undefined,
  opts: {
    metric: string;
    live: boolean;
    asOf?: string;
    link?: string;
  },
): CommandCentreSignal {
  const fb = CEO_SIGNAL_FALLBACKS.en[id];
  const fbAr = CEO_SIGNAL_FALLBACKS.ar[id];
  const hasLead = Boolean(lead?.title);

  return {
    id,
    icon,
    tone,
    label: fb.label,
    headline: cardHeadline(lead, fb.headline),
    headlineSub: cardSub(lead, fb.headlineSub),
    body: cardBody(lead, fb.body),
    metric: opts.metric,
    metricLabel: fb.metricLabel,
    freshnessLabel: cardFreshness(hasLead || opts.live, opts.asOf),
    spark: SPARK[id],
    link: opts.link,
    ar: {
      label: fbAr.label,
      headline: cardHeadline(lead, fbAr.headline),
      headlineSub: cardSub(lead, fbAr.headlineSub),
      body: cardBody(lead, fbAr.body),
      metricLabel: fbAr.metricLabel,
      freshnessLabel: cardFreshness(hasLead || opts.live, opts.asOf, true),
    },
  };
}

export function deriveCommandCentreSignals(state: ExecutiveState): CommandCentreSignal[] {
  const m = state.marketSnapshot;
  const sn = state.signalNews;
  const asOf = m.asOf;
  const allNews = [
    ...(sn?.market ?? []),
    ...(sn?.competitor ?? []),
    ...(sn?.investment ?? []),
    ...(sn?.regulatory ?? []),
    ...(sn?.followup ?? []),
    ...(sn?.gccTop ?? []),
  ];

  const marketLead = pickCeoLead('market', ...(sn?.market ?? []), ...(sn?.gccTop ?? []), ...allNews) as
    | LiveNewsItem
    | undefined;
  const competitorLead = pickCeoLead('competitor', ...(sn?.competitor ?? []), ...allNews) as
    | LiveNewsItem
    | undefined;
  const investmentLead = pickCeoLead('investment', ...(sn?.investment ?? []), ...allNews) as
    | LiveNewsItem
    | undefined;
  const regulatoryLead = pickCeoLead('regulatory', ...(sn?.regulatory ?? []), ...allNews) as
    | LiveNewsItem
    | undefined;
  const followupLead = pickCeoLead('followup', ...(sn?.followup ?? []), ...allNews) as
    | LiveNewsItem
    | undefined;

  return [
    buildSignal('market', 'shopping-bag', m.gccEquitiesLive ? 'info' : 'warn', marketLead, {
      metric: primaryMarketMetric(m),
      live: Boolean(marketLead || m.gccEquitiesLive),
      asOf,
    }),
    buildSignal('competitor', 'crosshair', 'warn', competitorLead, {
      metric: countMetric(sn?.competitor?.length ?? (competitorLead ? 1 : 0)),
      live: Boolean(competitorLead || m.competitorNoteLive),
      asOf,
    }),
    buildSignal('investment', 'map-pin', 'good', investmentLead, {
      metric: countMetric(sn?.investment?.length ?? 0),
      live: Boolean(investmentLead),
      asOf,
    }),
    buildSignal('performance', 'gauge', 'info', undefined, {
      metric: portfolioMetric(m),
      live: Boolean(m.topSectorLive || m.gccEquitiesLive),
      asOf,
    }),
    buildSignal('regulatory', 'gavel', 'warn', regulatoryLead, {
      metric: countMetric(sn?.regulatory?.length ?? 0),
      live: Boolean(regulatoryLead),
      asOf,
      link: 'regulatory',
    }),
    buildSignal('followup', 'award', 'info', followupLead, {
      metric: countMetric(sn?.followup?.length ?? (followupLead ? 1 : 0)),
      live: Boolean(followupLead),
      asOf,
    }),
  ];
}
