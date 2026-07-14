import type { PresentationDeck } from '../../types/presentation';
import type { Deck } from './slideTypes';

/** Map SlideAI deck → legacy HTML/PPTX pipeline shape for optional exports */
export function slideAiDeckToPresentationDeck(deck: Deck): PresentationDeck {
  return {
    title: deck.title,
    theme: 'dmcc-executive',
    brandCheck: deck.brandCheck,
    slides: deck.slides.map((s, i) => ({
      id: s.id || `slide-${i + 1}`,
      type: layoutToPresentationType(s.layout),
      title: s.title,
      bullets: s.bullets ?? (s.body ? [s.body] : []),
      speakerNotes: s.speakerNotes,
      metrics: s.stats?.map((st) => ({ label: st.label, value: st.value })),
      visualHint:
        s.layout === 'two-col'
          ? `${s.leftContent ?? ''} | ${s.rightContent ?? ''}`.trim()
          : s.subtitle,
    })),
  };
}

function layoutToPresentationType(layout: string): string {
  switch (layout) {
    case 'title':
      return 'title';
    case 'stat':
      return 'data-metrics';
    case 'two-col':
      return 'framework-model';
    default:
      return 'key-insights';
  }
}
