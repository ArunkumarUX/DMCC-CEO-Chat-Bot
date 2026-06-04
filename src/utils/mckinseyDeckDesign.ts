/**
 * Unified ADGM deck craft — McKinsey + Open Design + Claude Design + Brand Book 2025.
 * @see tools/adgm-deck-craft/MASTER.md
 * @see docs/brand-2025/PPT-BRAND-RULES.md
 */

import type { PresentationSlide } from '../types/presentation';
import { ADGM_PPT_COLORS, ADGM_PPT_FONTS } from '../config/adgmBrandForDeck';

/** pptxgenjs colours — ADGM Brand Book 2025 */
export const MCK = ADGM_PPT_COLORS;

export const MCK_FONTS = ADGM_PPT_FONTS;

export function formatSlideType(type?: string) {
  return (type || 'slide').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function slideLayoutKind(type?: string): string {
  const t = type || '';
  if (t === 'title') return 'title';
  if (t === 'executive-summary') return 'executive-summary';
  if (t === 'data-metrics') return 'data-metrics';
  if (t === 'framework-model') return 'framework';
  if (t === 'key-insights') return 'insights';
  if (t === 'strategy-recommendation') return 'recommendation';
  if (t === 'action-roadmap') return 'roadmap';
  if (t === 'conclusion-next-steps') return 'closing';
  if (t === 'visual-infographic') return 'visual';
  return 'content';
}

/** McKinsey rule: headline should read as action title / insight, not topic label */
export function isLikelyTopicLabel(title: string) {
  const t = title.trim();
  if (t.length < 8) return true;
  if (/^(slide|section|part)\s*\d/i.test(t)) return true;
  if (/^(context|overview|introduction|background|summary|key insights?|recommendation|next steps?)$/i.test(t))
    return true;
  return false;
}

export function truncateBullets(bullets: string[], max = 5) {
  return bullets.slice(0, max).map((b) => {
    const words = b.trim().split(/\s+/);
    if (words.length <= 14) return b.trim();
    return `${words.slice(0, 14).join(' ')}…`;
  });
}

export function metricColumns(metrics: { label: string; value: string }[]) {
  const n = Math.min(metrics.length, 4);
  if (n <= 0) return [];
  const colW = 8.4 / n;
  const startX = 0.8;
  return metrics.slice(0, n).map((m, i) => ({
    metric: m,
    x: startX + i * colW,
    w: colW - 0.15,
  }));
}

export type SlideRenderContext = {
  slide: PresentationSlide;
  index: number;
  total: number;
  deckTitle: string;
  includeNotes: boolean;
};
