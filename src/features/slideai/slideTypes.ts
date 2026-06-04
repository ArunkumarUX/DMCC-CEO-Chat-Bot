export type SlideLayout =
  | 'title'
  | 'content'
  | 'two-col'
  | 'stat'
  | 'image-left'
  | 'quote'
  | 'timeline'
  | 'comparison'
  | 'icon-grid'
  | 'blank';

export interface SlideTheme {
  bg: string;
  text: string;
  accent: string;
}

export interface SlideStat {
  value: string;
  label: string;
  context?: string;
}

export interface TimelineItem {
  marker: string;
  title: string;
  body: string;
}

export interface IconGridItem {
  emoji: string;
  title: string;
  body: string;
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  title: string;
  useDarkBg?: boolean;
  subtitle?: string;
  eyebrow?: string;
  body?: string;
  bullets?: string[];
  stats?: SlideStat[];
  leftContent?: string;
  rightContent?: string;
  leftTitle?: string;
  rightTitle?: string;
  quote?: string;
  quoteAuthor?: string;
  timelineItems?: TimelineItem[];
  icons?: IconGridItem[];
  imagePrompt?: string;
  accentBar?: 'top' | 'left' | 'bottom';
  callout?: string;
  /** Optional override for title/headline colour (hex without #) */
  titleColor?: string;
  speakerNotes?: string;
  theme?: SlideTheme;
}

export interface DeckTheme {
  bg: string;
  darkBg?: string;
  text: string;
  accent: string;
  secondaryAccent?: string;
  font: string;
  fontBody: string;
  tagline: string;
}

export interface Deck {
  title: string;
  slides: Slide[];
  theme: DeckTheme;
  brandCheck?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AgentResponse {
  action: 'create' | 'update' | 'message';
  deck: Deck | null;
  updatedSlides: Slide[] | null;
  message: string;
}
