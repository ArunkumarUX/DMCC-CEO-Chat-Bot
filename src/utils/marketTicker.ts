import { TICKER } from '../data/commandCentreData';

export type TickerRow = { k: string; v: string; c: number };

/** ADGM-era commodity ticker rows — drop cached values on load. */
const LEGACY_TICKER_KEYS = new Set(['Brent', 'Gold', 'BTC', 'ETH', 'Crude', 'WTI']);

const LIVE_QUOTE_KEYS = new Set(['DFM', 'ADX']);

const LEGACY_ARM_TICKER_KEYS = new Set(['Damac', 'Jebel Ali', 'Namshi', 'UAE retail compliance Index', 'Brent', 'Gold']);

export function isLegacyLiveTicker(ticker: TickerRow[] | undefined): boolean {
  if (!ticker?.length) return false;
  return ticker.some((t) => LEGACY_TICKER_KEYS.has(t.k) || LEGACY_ARM_TICKER_KEYS.has(t.k));
}

/** DMCC CEO ticker — live Yahoo quotes overlay DFM/ADX when available. */
export function resolveMarketTicker(live?: TickerRow[]): TickerRow[] {
  if (!live?.length || isLegacyLiveTicker(live)) return TICKER;

  const byKey = new Map(live.map((t) => [t.k, t]));
  return TICKER.map((row) => {
    if (LIVE_QUOTE_KEYS.has(row.k) && byKey.has(row.k)) return byKey.get(row.k)!;
    return row;
  });
}
