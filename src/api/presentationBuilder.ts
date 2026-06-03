import { demoClarifications, demoOutline, demoSlides } from '../data/presentationDemo';
import type {
  PresentationDeck,
  PresentationInput,
  PresentationOutline,
  PresentationSlide,
} from '../types/presentation';

export type {
  PresentationDeck,
  PresentationInput,
  PresentationOutline,
  PresentationSlide,
  PresentationSlideType,
} from '../types/presentation';

async function postPresentation(body: Record<string, unknown>) {
  const res = await fetch('/api/presentation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let data: { error?: string; ok?: boolean } = {};
  try {
    data = await res.json();
  } catch {
    data = { error: res.statusText || 'Invalid response' };
  }
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function checkPresentationApiAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/presentation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'ping' }),
    });
    if (res.status === 404) return false;
    const data = await res.json();
    return Boolean(data.ok);
  } catch {
    return false;
  }
}

export function fetchClarifications(input: PresentationInput) {
  return postPresentation({ action: 'clarify', ...input })
    .then((d) => d as { questions: string[] })
    .catch(() => demoClarifications());
}

export function fetchOutline(input: PresentationInput, clarificationAnswers: string[]) {
  return postPresentation({
    action: 'outline',
    ...input,
    clarificationAnswers,
  })
    .then((d) => d as PresentationOutline)
    .catch(() => demoOutline(input.prompt));
}

export function fetchSlides(input: PresentationInput, outline: PresentationOutline) {
  return postPresentation({
    action: 'slides',
    ...input,
    outline,
  })
    .then((d) => d as PresentationDeck)
    .catch(() => demoSlides(outline));
}

export function regenerateSlide(
  input: PresentationInput,
  slide: PresentationSlide,
  instruction?: string,
) {
  return postPresentation({
    action: 'regenerate-slide',
    ...input,
    slide,
    instruction,
  })
    .then((d) => d as { slide: PresentationSlide })
    .catch(() => ({
      slide: {
        ...slide,
        bullets: slide.bullets?.map((b) => `${b} (refined)`) || ['Refined executive point'],
      },
    }));
}
