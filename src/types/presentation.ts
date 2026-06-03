export type PresentationSlideType =
  | 'title'
  | 'executive-summary'
  | 'context-problem'
  | 'key-insights'
  | 'strategy-recommendation'
  | 'framework-model'
  | 'data-metrics'
  | 'visual-infographic'
  | 'action-roadmap'
  | 'conclusion-next-steps';

export type OutlineItem = {
  type: PresentationSlideType | string;
  title: string;
  summary: string;
};

export type PresentationOutline = {
  title: string;
  theme: string;
  estimatedSlides: number;
  storyline: string;
  outline: OutlineItem[];
};

export type PresentationSlide = {
  id: string;
  type: string;
  title: string;
  bullets: string[];
  visualHint?: string;
  speakerNotes?: string;
  metrics?: { label: string; value: string }[];
};

export type PresentationDeck = {
  title: string;
  theme: string;
  brandCheck?: string[];
  slides: PresentationSlide[];
};

export type PresentationInput = {
  prompt: string;
  notes?: string;
  link?: string;
  documentText?: string;
  slideCount?: number;
  tone?: string;
};
