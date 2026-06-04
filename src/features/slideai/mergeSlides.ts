import type { Slide } from './slideTypes';
import { normalizeSlide } from './deckNormalize';
import { mergeSlidePatch } from './slideStyle';

function slideNumberFromId(id: string): number | null {
  const m = id.match(/^s(\d+)$/i);
  return m ? parseInt(m[1], 10) : null;
}

function isFullSlideList(existing: Slide[], updates: Slide[]): boolean {
  return updates.length >= existing.length && updates.length > 1;
}

function patchSlide(existing: Slide, patch: Slide, index: number, deckTitle?: string): Slide {
  return normalizeSlide(mergeSlidePatch(existing, patch), index, deckTitle);
}

export function mergeSlides(
  existing: Slide[],
  updates: Slide[],
  activeIndex: number,
  deckTitle?: string,
): Slide[] {
  if (!updates.length) return existing.map((s, i) => ({ ...s, id: normalizeSlide(s, i).id }));

  if (isFullSlideList(existing, updates)) {
    return updates.map((slide, index) => patchSlide(existing[index] ?? slide, slide, index, deckTitle));
  }

  const used = new Set<number>();
  const merged = existing.map((slide, i) => {
    const byIdIdx = updates.findIndex((u) => u.id && u.id === slide.id);
    if (byIdIdx >= 0) {
      used.add(byIdIdx);
      return patchSlide(slide, updates[byIdIdx], i, deckTitle);
    }

    const slideNum = slideNumberFromId(slide.id);
    const byNumIdx =
      slideNum != null
        ? updates.findIndex((u, ui) => !used.has(ui) && slideNumberFromId(u.id || '') === slideNum)
        : -1;
    if (byNumIdx >= 0) {
      used.add(byNumIdx);
      return patchSlide(slide, updates[byNumIdx], i, deckTitle);
    }

    const byTitle = updates.findIndex(
      (u, ui) =>
        !used.has(ui) &&
        u.title &&
        slide.title &&
        u.title.toLowerCase().trim() === slide.title.toLowerCase().trim(),
    );
    if (byTitle >= 0) {
      used.add(byTitle);
      return patchSlide(slide, updates[byTitle], i, deckTitle);
    }

    if (updates.length === 1 && i === activeIndex) {
      used.add(0);
      return patchSlide(slide, updates[0], i, deckTitle);
    }

    return { ...slide };
  });

  updates.forEach((u, ui) => {
    if (used.has(ui)) return;
    const num = slideNumberFromId(u.id || '');
    const targetIndex = num != null ? num - 1 : activeIndex;
    if (targetIndex >= 0 && targetIndex < merged.length) {
      merged[targetIndex] = patchSlide(merged[targetIndex], u, targetIndex, deckTitle);
      used.add(ui);
      return;
    }
    if (!merged.some((s) => s.id === u.id)) {
      merged.push(normalizeSlide(u, merged.length, deckTitle));
    }
  });

  return merged;
}
