import type { LiveNewsItem } from '../types/marketIntel';
import type { ExecutiveState } from './executiveStore';
import {
  formatMarketSignalHeadline,
  marketFreshnessLabel,
  primaryMarketMetric,
} from './formatSignalHeadlines';
import {
  joinNewsBodies,
  macroPerformanceHeadline,
  newsBody,
  newsHeadline,
  newsSourceLine,
} from './prioritySignalHelpers';

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
  sourceLine?: string;
  spark: number[];
  deptLink?: string;
  link?: string;
  ar: {
    label: string;
    headline: string;
    headlineSub?: string;
    body: string;
    metricLabel: string;
    freshnessLabel?: string;
    sourceLine?: string;
  };
};

const SPARK = {
  market: [38, 42, 40, 46, 44, 52, 49, 58, 55, 62],
  competitor: [50, 48, 52, 49, 55, 53, 60, 58, 64, 67],
  investment: [30, 34, 40, 38, 46, 52, 60, 66, 74, 82],
  performance: [10, 11, 12, 12, 13, 14, 14, 15, 15, 16],
  regulatory: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7],
  followup: [6, 5, 5, 4, 5, 4, 3, 4, 4, 4],
};

function pickLead(...candidates: (LiveNewsItem | null | undefined)[]): LiveNewsItem | undefined {
  return candidates.find(Boolean) as LiveNewsItem | undefined;
}

function buildMarketBody(m: ExecutiveState['marketSnapshot']): string {
  const parts: string[] = [];
  if (m.topSectorLive && m.topSector) parts.push(m.topSector);
  else if (m.topSector && !/unavailable/i.test(m.topSector)) parts.push(m.topSector);
  if (m.asOf) parts.push(`As of ${m.asOf}`);
  if (m.bloombergLead && !m.topSector?.includes(m.bloombergLead.slice(0, 40))) {
    parts.push(m.bloombergLead);
  }
  if (!m.gccEquitiesLive && m.digitalAssetsLive) {
    parts.push('GCC index feeds unavailable — crypto from CoinGecko is live.');
  }
  return parts.join('. ').replace(/\.\./g, '.').trim();
}

export function deriveCommandCentreSignals(state: ExecutiveState): CommandCentreSignal[] {
  const m = state.marketSnapshot;
  const sn = state.signalNews;
  const marketHead = formatMarketSignalHeadline(m.gccEquities, m.digitalAssetsWoW, {
    gccLive: m.gccEquitiesLive,
    digitalLive: m.digitalAssetsLive,
  });
  const marketLead = pickLead(sn?.market?.[0], sn?.gccTop?.[0]);
  const competitorLead = pickLead(
    sn?.competitor?.[0],
    sn?.gccTop?.find((i) => /difc|dubai|saudi|qatar|sandbox|compet/i.test(i.title)),
  );
  const investmentLead = pickLead(sn?.investment?.[0], sn?.gccTop?.[0]);
  const regulatoryLead = pickLead(sn?.regulatory?.[0]);
  const followupLead = pickLead(sn?.followup?.[0], sn?.gccTop?.[1], sn?.market?.[1]);
  const macro = macroPerformanceHeadline(state);

  const competitorHeadline = competitorLead
    ? newsHeadline(competitorLead)
    : m.competitorNoteLive
      ? m.competitorNote
      : m.competitorNote;

  const regHeadline = regulatoryLead
    ? newsHeadline(regulatoryLead)
    : (state.regulatoryHeadline ?? m.bloombergLead ?? 'Regulatory intelligence');

  const followupItems = [...(sn?.followup ?? []), ...(sn?.gccTop ?? [])].filter(
    (item, idx, arr) => arr.findIndex((x) => x.title === item.title) === idx,
  );

  const metricLabelMarket =
    m.gccEquitiesLive && m.digitalAssetsLive
      ? 'GCC / digital 24h'
      : m.digitalAssetsLive
        ? 'Digital 24h'
        : m.gccEquitiesLive
          ? 'GCC indices'
          : 'GCC / digital 24h';

  return [
    {
      id: 'market',
      icon: 'trending-up',
      tone: m.gccEquitiesLive || m.digitalAssetsLive ? 'info' : 'warn',
      label: 'Market Movements',
      headline: marketHead.headline,
      headlineSub: marketHead.headlineSub || undefined,
      body: buildMarketBody(m) || newsBody(marketLead, 'Refresh for live market data.'),
      metric: primaryMarketMetric(m),
      metricLabel: metricLabelMarket,
      freshnessLabel: marketFreshnessLabel(m),
      sourceLine: marketLead
        ? newsSourceLine(marketLead)
        : m.digitalAssetsLive
          ? `CoinGecko · ${m.asOf ?? 'live'}`
          : m.gccEquitiesLive
            ? `Yahoo Finance · ${m.asOf ?? 'live'}`
            : undefined,
      spark: SPARK.market,
      ar: {
        label: 'تحركات السوق',
        headline: marketHead.headline
          .replace('GCC equities', 'أسواق الخليج')
          .replace('Digital assets', 'الأصول الرقمية'),
        headlineSub: marketHead.headlineSub?.replace('BTC', 'بتكوين').replace('ETH', 'إيثريوم'),
        body: buildMarketBody(m),
        metricLabel: metricLabelMarket.replace('GCC', 'الخليج').replace('digital', 'رقمي'),
        freshnessLabel: marketFreshnessLabel(m, true),
        sourceLine: marketLead ? newsSourceLine(marketLead) : undefined,
      },
    },
    {
      id: 'competitor',
      icon: 'crosshair',
      tone: 'warn',
      label: 'Competitor Activity',
      headline: competitorHeadline.slice(0, 120),
      headlineSub: competitorLead ? competitorLead.source : m.competitorNoteLive ? 'Live wire' : undefined,
      body: competitorLead ? newsBody(competitorLead) : m.competitorNote,
      metric: String(Math.max(1, sn?.competitor?.length ?? (m.competitorNoteLive ? 1 : 0))),
      metricLabel: competitorLead || m.competitorNoteLive ? 'live headlines' : 'awaiting feed',
      sourceLine: competitorLead ? newsSourceLine(competitorLead) : undefined,
      spark: SPARK.competitor,
      ar: {
        label: 'نشاط المنافسين',
        headline: competitorHeadline.slice(0, 120),
        body: competitorLead ? newsBody(competitorLead) : m.competitorNote,
        metricLabel: 'عناوين مباشرة',
        sourceLine: competitorLead ? newsSourceLine(competitorLead) : undefined,
      },
    },
    {
      id: 'investment',
      icon: 'sparkles',
      tone: 'good',
      label: 'Investment Opportunities',
      headline: investmentLead ? newsHeadline(investmentLead, 100) : 'Investment wire unavailable',
      headlineSub: investmentLead?.source ?? (m.digitalAssetsLive ? 'CoinGecko' : undefined),
      body: investmentLead
        ? `${newsBody(investmentLead)}${m.digitalAssetsLive ? ` · ${m.digitalAssetsWoW}` : ''}`.trim()
        : m.digitalAssetsLive
          ? `Digital assets: ${m.digitalAssetsWoW}`
          : 'Refresh for live investment headlines.',
      metric: String(Math.max(1, sn?.investment?.length ?? 0)),
      metricLabel: investmentLead ? 'live headlines' : 'awaiting feed',
      sourceLine: investmentLead ? newsSourceLine(investmentLead) : undefined,
      spark: SPARK.investment,
      ar: {
        label: 'فرص الاستثمار',
        headline: investmentLead ? newsHeadline(investmentLead, 100) : 'لا تتوفر عناوين استثمار حالياً',
        headlineSub: investmentLead?.source,
        body: investmentLead ? newsBody(investmentLead) : m.digitalAssetsWoW,
        metricLabel: 'عناوين مباشرة',
        sourceLine: investmentLead ? newsSourceLine(investmentLead) : undefined,
      },
    },
    {
      id: 'performance',
      icon: 'activity',
      tone: macro.live ? 'info' : 'warn',
      label: 'Macro & Commodities',
      headline: macro.headline,
      headlineSub: macro.headlineSub,
      body: macro.body,
      metric: macro.metric,
      metricLabel: macro.metricLabel,
      freshnessLabel: macro.live ? marketFreshnessLabel(m) : undefined,
      sourceLine: macro.live ? `Yahoo Finance · ${m.asOf ?? 'live'}` : undefined,
      spark: SPARK.performance,
      ar: {
        label: 'الماكرو والسلع',
        headline: macro.headline,
        headlineSub: macro.headlineSub,
        body: macro.body,
        metricLabel: 'ماكرو 24س',
        freshnessLabel: macro.live ? marketFreshnessLabel(m, true) : undefined,
      },
    },
    {
      id: 'regulatory',
      icon: 'gavel',
      tone: 'warn',
      label: 'Regulatory Shifts',
      headline: regHeadline.slice(0, 120),
      headlineSub: regulatoryLead?.source ?? (state.bloombergArticles?.length ? 'Bloomberg' : 'A.R.M. Holding RERA portal'),
      body: regulatoryLead
        ? newsBody(regulatoryLead)
        : 'RERA, MAS and FATF updates — see official portals below when wire is unavailable.',
      metric: String(Math.max(1, sn?.regulatory?.length ?? 0)),
      metricLabel: regulatoryLead ? 'live headlines' : 'official portals',
      sourceLine: regulatoryLead ? newsSourceLine(regulatoryLead) : 'armholding.ae/fsra',
      link: 'regulatory',
      spark: SPARK.regulatory,
      ar: {
        label: 'تحولات تنظيمية',
        headline: regHeadline.slice(0, 120),
        body: regulatoryLead ? newsBody(regulatoryLead) : 'تحديثات RERA وMAS وFATF.',
        metricLabel: 'عناوين مباشرة',
        sourceLine: regulatoryLead ? newsSourceLine(regulatoryLead) : undefined,
      },
    },
    {
      id: 'followup',
      icon: 'list-checks',
      tone: 'info',
      label: 'Deals & Policy Watch',
      headline: followupLead ? newsHeadline(followupLead, 100) : 'Policy & deals wire',
      headlineSub: followupLead?.source,
      body:
        followupItems.length > 0
          ? joinNewsBodies(followupItems, 3)
          : 'Refresh for GCC deals, policy and sovereign fund headlines.',
      metric: String(Math.max(0, followupItems.length)),
      metricLabel: followupItems.length ? 'live headlines' : 'awaiting feed',
      sourceLine: followupLead ? newsSourceLine(followupLead) : undefined,
      spark: SPARK.followup,
      ar: {
        label: 'صفقات وسياسات للمتابعة',
        headline: followupLead ? newsHeadline(followupLead, 100) : 'متابعة السياسات والصفقات',
        body: joinNewsBodies(followupItems, 3),
        metricLabel: 'عناوين مباشرة',
        sourceLine: followupLead ? newsSourceLine(followupLead) : undefined,
      },
    },
  ];
}
