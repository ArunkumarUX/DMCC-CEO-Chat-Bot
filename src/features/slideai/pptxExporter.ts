import pptxgen from 'pptxgenjs';
import { ADGM_PPT_FOOTER } from '../../config/adgmBrandForDeck';
import { BCC_PORTFOLIO_COLORS, BCC_PORTFOLIO_TYPOGRAPHY } from './bccPortfolioTemplate';
import type { Deck, Slide } from './slideTypes';

const BCC_PPT = {
  navy: BCC_PORTFOLIO_COLORS.navy,
  ink: BCC_PORTFOLIO_COLORS.ink,
  inkMuted: BCC_PORTFOLIO_COLORS.inkSoft,
  inkLight: BCC_PORTFOLIO_COLORS.inkFaint,
  paper: BCC_PORTFOLIO_COLORS.paper,
  paperSoft: BCC_PORTFOLIO_COLORS.kpiFill,
  accent: BCC_PORTFOLIO_COLORS.bcc,
  accentLight: BCC_PORTFOLIO_COLORS.bccLight,
  line: BCC_PORTFOLIO_COLORS.line,
  white: BCC_PORTFOLIO_COLORS.white,
  lightBlue: BCC_PORTFOLIO_COLORS.lightBlue,
  display: BCC_PORTFOLIO_TYPOGRAPHY.display,
  body: BCC_PORTFOLIO_TYPOGRAPHY.body,
  mono: 'Consolas',
} as const;

function safeFilename(title: string) {
  const base = title
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 64);
  return `${base || 'presentation'}.pptx`;
}

function deckFooter(deck: Deck): string {
  return deck.theme.tagline === 'Path to Forward'
    ? ADGM_PPT_FOOTER
    : `${deck.theme.tagline || 'Forward'} · Confidential`;
}

function slideColors(slide: Slide, deck: Deck) {
  const dark = slide.layout === 'title' || slide.useDarkBg;
  const bg = slide.theme?.bg ?? (dark ? deck.theme.darkBg ?? BCC_PPT.navy : deck.theme.bg);
  const text = slide.theme?.text ?? (dark ? BCC_PPT.white : deck.theme.text);
  const accent = slide.theme?.accent ?? deck.theme.accent;
  return { bg, text, accent, dark };
}

function addFooter(sl: pptxgen.Slide, deck: Deck, index: number, total: number) {
  sl.addText(deckFooter(deck), {
    x: 0.55,
    y: 5.15,
    w: 4.5,
    h: 0.22,
    fontFace: BCC_PPT.body,
    fontSize: 8,
    color: BCC_PPT.inkLight,
  });
  sl.addText(`${index + 1} / ${total}`, {
    x: 8.8,
    y: 5.12,
    w: 0.9,
    h: 0.25,
    fontFace: BCC_PPT.mono,
    fontSize: 9,
    color: BCC_PPT.inkMuted,
    align: 'right',
  });
}

function addAccentBar(sl: pptxgen.Slide, pres: pptxgen, accent: string, y = 0) {
  sl.addShape(pres.ShapeType.rect, {
    x: 0,
    y,
    w: 0.12,
    h: 5.625,
    fill: { color: accent },
    line: { color: accent, width: 0 },
  });
}

function addBccLockup(sl: pptxgen.Slide, pres: pptxgen, deck: Deck, dark: boolean) {
  sl.addShape(pres.ShapeType.rect, {
    x: 0.55,
    y: 0.42,
    w: 0.06,
    h: 0.55,
    fill: { color: BCC_PPT.accentLight },
    line: { color: BCC_PPT.accentLight, width: 0 },
  });
  sl.addText(deck.title.split(' ').slice(0, 3).join(' ') || 'Presentation', {
    x: 0.72,
    y: 0.38,
    w: 3.5,
    h: 0.35,
    fontFace: BCC_PPT.body,
    fontSize: 11,
    bold: true,
    color: dark ? BCC_PPT.white : BCC_PPT.ink,
  });
  sl.addText(deck.theme.tagline || 'Forward', {
    x: 0.72,
    y: 0.62,
    w: 3.5,
    h: 0.35,
    fontFace: BCC_PPT.body,
    fontSize: 11,
    italic: true,
    color: dark ? BCC_PORTFOLIO_COLORS.goldLight : BCC_PPT.accent,
  });
}

function addSlide(pres: pptxgen, slide: Slide, deck: Deck, index: number, total: number) {
  const sl = pres.addSlide();
  const { bg, text, accent, dark } = slideColors(slide, deck);
  const displayFont = deck.theme.font || BCC_PPT.display;
  const bodyFont = deck.theme.fontBody || BCC_PPT.body;

  sl.background = { color: bg };

  if (slide.layout === 'title') {
    addBccLockup(sl, pres, deck, true);
    if (slide.eyebrow) {
      sl.addText(slide.eyebrow.toUpperCase(), {
        x: 0.55,
        y: 1.15,
        w: 9,
        h: 0.35,
        fontFace: bodyFont,
        fontSize: 12,
        bold: true,
        color: BCC_PPT.accentLight,
        charSpacing: 1,
      });
    }
    sl.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 5.45,
      w: 10,
      h: 0.08,
      fill: { color: accent },
      line: { color: accent, width: 0 },
    });
    sl.addText(slide.title, {
      x: 0.55,
      y: 1.65,
      w: 8.6,
      h: 1.4,
      fontFace: displayFont,
      fontSize: 36,
      bold: true,
      color: text,
      margin: 0,
    });
    if (slide.body || slide.subtitle) {
      sl.addText(slide.body || slide.subtitle || '', {
        x: 0.55,
        y: 3.1,
        w: 8.6,
        h: 0.9,
        fontFace: bodyFont,
        fontSize: 16,
        color: BCC_PPT.lightBlue,
        margin: 0,
      });
    }
    addFooter(sl, deck, index, total);
  } else if (slide.layout === 'stat') {
    addAccentBar(sl, pres, accent);
    sl.addText(slide.title, {
      x: 0.55,
      y: 0.35,
      w: 9,
      h: 0.75,
      fontFace: displayFont,
      fontSize: 24,
      bold: true,
      color: BCC_PPT.navy,
      margin: 0,
    });
    const stats = slide.stats ?? [];
    const sw = stats.length ? (9 - 0.25 * (stats.length - 1)) / stats.length : 2.8;
    stats.forEach((s, i) => {
      const sx = 0.55 + i * (sw + 0.25);
      sl.addShape(pres.ShapeType.rect, {
        x: sx,
        y: 1.35,
        w: sw,
        h: 2.9,
        fill: { color: BCC_PPT.paperSoft },
        line: { color: accent, width: 0.75 },
      });
      sl.addText(s.value, {
        x: sx,
        y: 1.65,
        w: sw,
        h: 1.1,
        fontFace: displayFont,
        fontSize: 40,
        bold: true,
        color: accent,
        align: 'center',
        margin: 0,
      });
      sl.addText(s.label, {
        x: sx + 0.1,
        y: 2.85,
        w: sw - 0.2,
        h: 0.7,
        fontFace: bodyFont,
        fontSize: 11,
        color: BCC_PPT.inkMuted,
        align: 'center',
        margin: 0,
      });
    });
    addFooter(sl, deck, index, total);
  } else if (slide.layout === 'two-col') {
    addAccentBar(sl, pres, accent);
    sl.addText(slide.title, {
      x: 0.55,
      y: 0.3,
      w: 9,
      h: 0.75,
      fontFace: displayFont,
      fontSize: 24,
      bold: true,
      color: BCC_PPT.navy,
      margin: 0,
    });
    [
      { x: 0.55, title: slide.leftTitle, content: slide.leftContent },
      { x: 5.05, title: slide.rightTitle, content: slide.rightContent },
    ].forEach((col) => {
      sl.addShape(pres.ShapeType.rect, {
        x: col.x,
        y: 1.15,
        w: 4.35,
        h: 3.85,
        fill: { color: BCC_PPT.paperSoft },
        line: { color: BCC_PPT.line, width: 0.5 },
      });
      let y = 1.35;
      if (col.title) {
        sl.addText(col.title, {
          x: col.x + 0.2,
          y,
          w: 3.95,
          h: 0.35,
          fontFace: displayFont,
          fontSize: 14,
          bold: true,
          color: BCC_PPT.ink,
        });
        y += 0.45;
      }
      sl.addText(col.content ?? '', {
        x: col.x + 0.2,
        y,
        w: 3.95,
        h: 3.45,
        fontFace: bodyFont,
        fontSize: 13,
        color: BCC_PPT.inkMuted,
        margin: 0,
        valign: 'top',
      });
    });
    addFooter(sl, deck, index, total);
  } else if (slide.layout === 'quote' && slide.quote) {
    sl.background = { color: BCC_PPT.navy };
    addAccentBar(sl, pres, accent);
    sl.addText('"', {
      x: 0.55,
      y: 0.8,
      w: 1,
      h: 0.8,
      fontFace: displayFont,
      fontSize: 48,
      color: accent,
    });
    sl.addText(slide.quote, {
      x: 0.55,
      y: 1.5,
      w: 8.5,
      h: 2.2,
      fontFace: displayFont,
      fontSize: 22,
      italic: true,
      color: BCC_PPT.white,
    });
    if (slide.quoteAuthor) {
      sl.addText(`— ${slide.quoteAuthor}`, {
        x: 0.55,
        y: 3.9,
        w: 8,
        h: 0.5,
        fontFace: bodyFont,
        fontSize: 14,
        color: BCC_PPT.lightBlue,
      });
    }
    addFooter(sl, deck, index, total);
  } else {
    addAccentBar(sl, pres, accent);
    if (slide.eyebrow) {
      sl.addText(slide.eyebrow.toUpperCase(), {
        x: 0.55,
        y: 0.22,
        w: 9,
        h: 0.3,
        fontFace: bodyFont,
        fontSize: 10,
        bold: true,
        color: accent,
      });
    }
    sl.addText(slide.title, {
      x: 0.55,
      y: slide.eyebrow ? 0.52 : 0.3,
      w: 9,
      h: 0.85,
      fontFace: displayFont,
      fontSize: 26,
      bold: true,
      color: dark ? BCC_PPT.white : BCC_PPT.navy,
      margin: 0,
    });
    let bodyY = slide.eyebrow ? 1.45 : 1.25;
    if (slide.body) {
      sl.addText(slide.body, {
        x: 0.55,
        y: bodyY,
        w: 9,
        h: 1,
        fontFace: bodyFont,
        fontSize: 14,
        color: dark ? BCC_PPT.lightBlue : BCC_PPT.ink,
        margin: 0,
      });
      bodyY += 1.15;
    }
    if (slide.bullets?.length) {
      const items = slide.bullets.map((b, idx) => ({
        text: b,
        options: {
          bullet: true,
          breakLine: idx < slide.bullets!.length - 1,
          fontSize: 14,
          color: dark ? BCC_PPT.lightBlue : BCC_PPT.ink,
          fontFace: bodyFont,
        },
      }));
      sl.addText(items, { x: 0.55, y: bodyY, w: 9, h: 3.2, margin: 0 });
    }
    addFooter(sl, deck, index, total);
  }

  if (slide.speakerNotes) {
    sl.addNotes(slide.speakerNotes);
  }
}

export async function exportToPptx(deck: Deck, filename?: string) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.title = deck.title;
  pres.author = 'SlideAI';
  pres.company = deck.theme.tagline === 'Path to Forward' ? 'ADGM' : 'Portfolio';

  deck.slides.forEach((slide, i) => addSlide(pres, slide, deck, i, deck.slides.length));

  await pres.writeFile({ fileName: filename || safeFilename(deck.title) });
}
