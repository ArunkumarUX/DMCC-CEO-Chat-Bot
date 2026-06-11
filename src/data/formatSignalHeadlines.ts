/** Split long market / investment strings into scannable card titles */

import type { MarketSnapshotFields } from '../types/marketIntel';

export function parseFalconScoreFromSector(topSector: string): string {
  const m = topSector.match(/Falcon Economy score\s*(\d+)/i);
  if (m) return m[1];
  const align = topSector.match(/alignment\s*(\d+)/i);
  if (align) return align[1];
  return '88';
}

function extractBtcEthLine(digital: string): string {
  const digitalSub = digital.trim();
  const btc = digitalSub.match(/BTC\s+[^(]+(?:\([^)]+\))?/i)?.[0]?.trim();
  const eth = digitalSub.match(/ETH\s+[^(]+(?:\([^)]+\))?/i)?.[0]?.trim();
  if (btc && eth) return `${btc} · ${eth}`;
  return digitalSub.replace(/^digital assets\s*/i, 'Digital · ');
}

export function formatMarketSignalHeadline(
  gcc: string,
  digital: string,
  opts?: { gccLive?: boolean; digitalLive?: boolean },
): { headline: string; headlineSub: string } {
  const gccLive = opts?.gccLive ?? false;
  const digitalLive = opts?.digitalLive ?? false;
  const digitalSub = extractBtcEthLine(digital);

  const gccUnavailable =
    /unavailable/i.test(gcc) || gcc.trim() === '' || gcc === '—';

  if (gccLive && !gccUnavailable) {
    const gccIsIndexList = /^(ADX|DFM|Tadawul|MSCI)/i.test(gcc.trim());
    const gccHeadline = gccIsIndexList
      ? 'GCC indices (live)'
      : /^[+-]/.test(gcc.trim())
        ? `GCC equities ${gcc.trim()}`
        : gcc.trim();

    if (gccIsIndexList && gcc.includes(' · ')) {
      return {
        headline: gccHeadline,
        headlineSub: digitalLive ? `${gcc} · ${digitalSub}` : gcc,
      };
    }

    return {
      headline: gccHeadline,
      headlineSub: digitalLive ? digitalSub : '',
    };
  }

  if (digitalLive) {
    return {
      headline: 'Digital assets (live)',
      headlineSub: digitalSub,
    };
  }

  const gccHeadline = /^[+-]/.test(gcc.trim())
    ? `GCC equities ${gcc.trim()}`
    : gcc.trim();

  return {
    headline: gccHeadline,
    headlineSub: digitalSub,
  };
}

/** Primary badge metric for the market signal card — live data only when flagged */
export function primaryMarketMetric(m: MarketSnapshotFields): string {
  if (m.digitalAssetsLive && m.digitalAssetsWoW) {
    const btc = m.digitalAssetsWoW.match(/BTC\s*([+-][\d.]+%)/i);
    if (btc?.[1]) return btc[1];
  }
  if (m.gccEquitiesLive && m.gccEquities) {
    const firstPct = m.gccEquities.match(/([+-][\d.]+%)/);
    if (firstPct?.[1]) return firstPct[1];
  }
  if (!m.gccEquitiesLive && !m.digitalAssetsLive) {
    const scenario = m.gccEquities.match(/^([+-][\d.]+%)/);
    if (scenario?.[1]) return scenario[1];
    return scenario?.[1] ?? '—';
  }
  return '—';
}

/** Shown on card only when live feeds succeeded */
export function marketFreshnessLabel(m: MarketSnapshotFields, ar = false): string | undefined {
  const live = Boolean(m.gccEquitiesLive || m.digitalAssetsLive);
  if (!live) return undefined;
  if (m.asOf) {
    return ar ? `مباشر · ${m.asOf}` : `Live · ${m.asOf}`;
  }
  return ar ? 'مباشر' : 'Live';
}

export function formatInvestmentSignalHeadline(
  topSector: string,
  falconScore: string,
  opts?: { topSectorLive?: boolean },
): { headline: string; headlineSub: string } {
  if (opts?.topSectorLive) {
    const cleaned = topSector.replace(/^Bloomberg:\s*/i, '').trim();
    return {
      headline: cleaned.length > 72 ? `${cleaned.slice(0, 69).trim()}…` : cleaned,
      headlineSub: 'Live headline',
    };
  }

  const falconInParens = topSector.match(/^(.+?)\s*\(Falcon Economy score\s*(\d+)\)/i);
  if (falconInParens) {
    return {
      headline: falconInParens[1].trim(),
      headlineSub: `Falcon Economy ${falconInParens[2]}/100`,
    };
  }

  const beforeDash = topSector.split(/\s*—\s*/)[0]?.trim() ?? topSector;
  if (beforeDash.length < topSector.length && /Falcon Economy/i.test(topSector)) {
    return {
      headline: beforeDash.replace(/\s*\(Falcon Economy[^)]*\)/i, '').trim(),
      headlineSub: `Falcon Economy ${falconScore}/100`,
    };
  }

  if (topSector.length > 56) {
    return {
      headline: `${topSector.slice(0, 53).trim()}…`,
      headlineSub: `Falcon Economy ${falconScore}/100`,
    };
  }

  return {
    headline: topSector.replace(/\s*\(Falcon Economy[^)]*\)/i, '').trim(),
    headlineSub: `Falcon Economy ${falconScore}/100`,
  };
}
