import { DEFAULT_DECK_THEME } from './prompts';
import { slideStyleToken } from './slideStyle';
import type { Deck, Slide, SlideLayout } from './slideTypes';

const VALID_LAYOUTS = new Set<SlideLayout>([
  'title',
  'content',
  'two-col',
  'stat',
  'image-left',
  'quote',
  'timeline',
  'comparison',
  'icon-grid',
  'blank',
]);

/** Safe title for UI keys and rendering */
export function slideDisplayTitle(slide: Slide, index: number, deckTitle?: string): string {
  const t = typeof slide.title === 'string' ? slide.title.trim() : '';
  if (t) return t;
  if (slide.layout === 'title' && index === 0) return deckTitle?.trim() || 'Untitled presentation';
  return `Slide ${index + 1}`;
}

/** Remove internal template/branding noise from user-visible assistant replies */
export function sanitizeAssistantMessage(message: string): string {
  const cleaned = message
    .replace(/bcc senior service designer portfolio template applied/gi, '')
    .replace(/bcc portfolio template[^\n.]*/gi, '')
    .replace(/brand book 2025 applied/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return cleaned || 'Updated your deck.';
}

export function deckContentKey(deck: Deck): string {
  return deck.slides
    .map(
      (s, i) =>
        `${i}:${s.id}:${slideDisplayTitle(s, i, deck.title)}:${slideStyleToken(s)}:${s.bullets?.join('|') ?? ''}:${s.stats?.map((x) => x.value).join('|') ?? ''}`,
    )
    .join(';;');
}

export function normalizeSlide(slide: Slide, index: number, deckTitle?: string): Slide {
  const id = slide?.id?.trim() || `s${index + 1}`;
  const layout =
    slide?.layout && VALID_LAYOUTS.has(slide.layout)
      ? slide.layout
      : index === 0
        ? 'title'
        : 'content';
  const title = slideDisplayTitle({ ...slide, layout }, index, deckTitle);
  return { ...slide, id, layout, title };
}

export function normalizeAgentDeck(deck: Deck): Deck {
  const deckTitle = deck.title?.trim() || 'Presentation';
  const slides = (deck.slides ?? [])
    .filter(Boolean)
    .map((slide, index) => normalizeSlide(slide, index, deckTitle));

  if (!slides.length) {
    slides.push(
      normalizeSlide(
        {
          id: 's1',
          layout: 'title',
          title: deckTitle,
          useDarkBg: true,
          speakerNotes: '',
        },
        0,
        deckTitle,
      ),
    );
  }

  return {
    ...deck,
    title: deckTitle,
    theme: { ...DEFAULT_DECK_THEME, ...deck.theme },
    slides,
    brandCheck: undefined,
  };
}

export function cloneDeck(deck: Deck): Deck {
  return JSON.parse(JSON.stringify(deck)) as Deck;
}

export function firstUpdatedSlideIndex(slides: Slide[], updates: Slide[]): number {
  for (const u of updates) {
    const byId = slides.findIndex((s) => s.id === u.id);
    if (byId >= 0) return byId;
  }
  for (const u of updates) {
    if (!u.title) continue;
    const byTitle = slides.findIndex(
      (s) => s.title.toLowerCase().trim() === u.title.toLowerCase().trim(),
    );
    if (byTitle >= 0) return byTitle;
  }
  const numMatch = updates[0]?.id?.match(/^s(\d+)$/i);
  if (numMatch) return Math.max(0, parseInt(numMatch[1], 10) - 1);
  return 0;
}

/** True when agent sent a full deck rebuild (not a partial patch) */
export function isFullDeckResponse(
  result: { deck?: Deck | null; updatedSlides?: Slide[] | null },
  existing: Deck | null,
): boolean {
  const slides = result.deck?.slides;
  if (!slides?.length) return false;
  if (!existing) return true;
  if (!result.updatedSlides?.length) return true;
  if (slides.length !== existing.slides.length) return true;
  return slides.length >= existing.slides.length * 0.6;
}
