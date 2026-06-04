import type { PresentationDeck } from '../types/presentation';
import {
  MCK,
  MCK_FONTS,
  formatSlideType,
  metricColumns,
  slideLayoutKind,
  truncateBullets,
  type SlideRenderContext,
} from './mckinseyDeckDesign';
import { ADGM_PPT_FOOTER } from '../config/adgmBrandForDeck';

type PptxSlide = ReturnType<InstanceType<typeof import('pptxgenjs').default>['addSlide']>;
type PptxPres = InstanceType<typeof import('pptxgenjs').default>;

function safeFilename(title: string) {
  const base = title
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 64);
  return `${base || 'adgm-presentation'}.pptx`;
}

function addFooter(slide: PptxSlide, ctx: SlideRenderContext) {
  slide.addText(ADGM_PPT_FOOTER, {
    x: 0.55,
    y: 5.15,
    w: 4,
    h: 0.22,
    fontFace: MCK_FONTS.body,
    fontSize: 8,
    color: MCK.inkLight,
  });
  slide.addText(`${ctx.index + 1}`, {
    x: 9.1,
    y: 5.12,
    w: 0.5,
    h: 0.25,
    fontFace: MCK_FONTS.mono,
    fontSize: 9,
    color: MCK.inkMuted,
    align: 'right',
  });
}

function addAccentBeam(slide: PptxSlide, pres: PptxPres) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.12,
    h: '100%',
    fill: { color: MCK.accent },
  });
  slide.addShape(pres.ShapeType.ellipse, {
    x: 8.2,
    y: -0.35,
    w: 2.2,
    h: 2.2,
    fill: { color: MCK.accentGlow, transparency: 72 },
  });
}

function addTopRail(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.38,
    fill: { color: MCK.navy },
  });
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0.38,
    w: '100%',
    h: 0.04,
    fill: { color: MCK.accent },
  });
  slide.addText('ADGM', {
    x: 0.5,
    y: 0.1,
    w: 1,
    h: 0.22,
    fontFace: MCK_FONTS.display,
    fontSize: 10,
    bold: true,
    color: MCK.white,
    charSpacing: 2,
  });
  slide.addText(formatSlideType(ctx.slide.type), {
    x: 3.2,
    y: 0.1,
    w: 4,
    h: 0.22,
    fontFace: MCK_FONTS.body,
    fontSize: 8,
    color: MCK.inkLight,
    align: 'center',
  });
  slide.addText(`${ctx.index + 1} / ${ctx.total}`, {
    x: 8.5,
    y: 0.1,
    w: 1.2,
    h: 0.22,
    fontFace: MCK_FONTS.mono,
    fontSize: 9,
    color: MCK.white,
    align: 'right',
  });
}

function addActionTitle(slide: PptxSlide, pres: PptxPres, title: string, y = 0.55) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0.5,
    y: y + 0.05,
    w: 0.06,
    h: 0.72,
    fill: { color: MCK.insightBar },
  });
  slide.addText(title, {
    x: 0.72,
    y,
    w: 8.75,
    h: 0.95,
    fontFace: MCK_FONTS.display,
    fontSize: 22,
    bold: true,
    color: MCK.navy,
    valign: 'top',
    lineSpacingMultiple: 0.95,
  });
}

function addBullets(slide: PptxSlide, bullets: string[], y: number, h = 2.4) {
  const items = truncateBullets(bullets);
  if (!items.length) return;
  const runs = items.map((text, i) => ({
    text,
    options: {
      bullet: { code: '2022' },
      breakLine: i < items.length - 1,
      fontSize: 13,
      color: MCK.ink,
      paraSpaceAfter: 8,
      fontFace: MCK_FONTS.body,
    },
  }));
  slide.addText(runs, {
    x: 0.72,
    y,
    w: 8.75,
    h,
    fontFace: MCK_FONTS.body,
    valign: 'top',
  });
}

function addTitleSlide(pptSlide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  const { slide: data, deckTitle } = ctx;
  pptSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
    fill: { color: MCK.navy },
  });
  addAccentBeam(pptSlide, pres);
  pptSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 5.02,
    w: '100%',
    h: 0.12,
    fill: { color: MCK.accent },
  });
  pptSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 5.14,
    w: '100%',
    h: 0.03,
    fill: { color: MCK.cyan, transparency: 35 },
  });
  pptSlide.addText('ADGM', {
    x: 0.65,
    y: 0.65,
    w: 2,
    h: 0.35,
    fontFace: MCK_FONTS.display,
    fontSize: 11,
    bold: true,
    color: MCK.accent,
    charSpacing: 4,
  });
  pptSlide.addText(data.title || deckTitle, {
    x: 0.65,
    y: 1.75,
    w: 8.7,
    h: 1.5,
    fontFace: MCK_FONTS.display,
    fontSize: 34,
    bold: true,
    color: MCK.white,
    valign: 'top',
  });
  const sub = data.bullets?.[0];
  if (sub) {
    pptSlide.addText(sub, {
      x: 0.65,
      y: 3.45,
      w: 7.5,
      h: 0.8,
      fontFace: MCK_FONTS.body,
      fontSize: 15,
      color: 'A3ADC2',
    });
  }
  pptSlide.addText(new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), {
    x: 0.65,
    y: 4.55,
    w: 3,
    h: 0.3,
    fontFace: MCK_FONTS.body,
    fontSize: 11,
    color: MCK.inkLight,
  });
  if (data.speakerNotes) pptSlide.addNotes(data.speakerNotes);
}

function addExecutiveSummary(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  addTopRail(slide, pres, ctx);
  addActionTitle(slide, pres, ctx.slide.title, 0.52);
  const bullets = truncateBullets(ctx.slide.bullets || [], 3);
  bullets.forEach((text, i) => {
    const y = 1.75 + i * 1.05;
    slide.addShape(pres.ShapeType.rect, {
      x: 0.72,
      y: y,
      w: 8.75,
      h: 0.88,
      fill: { color: i === 0 ? MCK.kpiFillDeep : MCK.paperSoft },
      line: { color: MCK.hairline, width: 0.5 },
    });
    slide.addText(String(i + 1), {
      x: 0.85,
      y: y + 0.22,
      w: 0.4,
      h: 0.4,
      fontFace: MCK_FONTS.display,
      fontSize: 20,
      bold: true,
      color: MCK.accent,
    });
    slide.addText(text, {
      x: 1.35,
      y: y + 0.18,
      w: 7.9,
      h: 0.55,
      fontFace: MCK_FONTS.body,
      fontSize: 14,
      bold: true,
      color: MCK.navy,
      valign: 'middle',
    });
  });
  addFooter(slide, ctx);
  if (ctx.slide.speakerNotes) slide.addNotes(ctx.slide.speakerNotes);
}

function addKpiSlide(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  addTopRail(slide, pres, ctx);
  addActionTitle(slide, pres, ctx.slide.title, 0.52);
  const cols = metricColumns(ctx.slide.metrics || []);
  if (cols.length) {
    cols.forEach(({ metric, x, w }, i) => {
      const barH = 0.9 + (i % 3) * 0.35;
      slide.addShape(pres.ShapeType.rect, {
        x,
        y: 4.35 - barH,
        w,
        h: barH,
        fill: { color: i === 0 ? MCK.accent : MCK.navyMid },
      });
      slide.addText(metric.value, {
        x,
        y: 1.85,
        w,
        h: 0.55,
        fontFace: MCK_FONTS.display,
        fontSize: 26,
        bold: true,
        color: MCK.navy,
        align: 'center',
      });
      slide.addText(metric.label, {
        x,
        y: 4.45,
        w,
        h: 0.35,
        fontFace: MCK_FONTS.body,
        fontSize: 10,
        color: MCK.inkMuted,
        align: 'center',
      });
    });
  } else {
    addBullets(slide, ctx.slide.bullets || [], 1.75, 2.8);
  }
  addFooter(slide, ctx);
  if (ctx.slide.speakerNotes) slide.addNotes(ctx.slide.speakerNotes);
}

function addFrameworkSlide(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  addTopRail(slide, pres, ctx);
  addActionTitle(slide, pres, ctx.slide.title, 0.52);
  const items = truncateBullets(ctx.slide.bullets || [], 4);
  const positions = [
    { x: 0.72, y: 1.75 },
    { x: 5.05, y: 1.75 },
    { x: 0.72, y: 3.35 },
    { x: 5.05, y: 3.35 },
  ];
  items.forEach((text, i) => {
    const pos = positions[i];
    if (!pos) return;
    slide.addShape(pres.ShapeType.rect, {
      x: pos.x,
      y: pos.y,
      w: 4.05,
      h: 1.35,
      fill: { color: MCK.paperSoft },
      line: { color: MCK.line, width: 0.75 },
    });
    slide.addText(text, {
      x: pos.x + 0.15,
      y: pos.y + 0.2,
      w: 3.75,
      h: 1,
      fontFace: MCK_FONTS.body,
      fontSize: 12,
      color: MCK.ink,
      valign: 'top',
    });
  });
  addFooter(slide, ctx);
  if (ctx.slide.speakerNotes) slide.addNotes(ctx.slide.speakerNotes);
}

function addInsightsSlide(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  addTopRail(slide, pres, ctx);
  addActionTitle(slide, pres, ctx.slide.title, 0.52);
  addBullets(slide, ctx.slide.bullets || [], 1.72, 3);
  if (ctx.slide.visualHint) {
    slide.addShape(pres.ShapeType.rect, {
      x: 6.2,
      y: 1.72,
      w: 3.25,
      h: 2.85,
      fill: { color: MCK.paperSoft },
      line: { color: MCK.accent, width: 1 },
    });
    slide.addText('Exhibit', {
      x: 6.35,
      y: 1.85,
      w: 2.5,
      h: 0.2,
      fontSize: 8,
      bold: true,
      color: MCK.accent,
      charSpacing: 1,
    });
    slide.addText(ctx.slide.visualHint, {
      x: 6.35,
      y: 2.15,
      w: 2.95,
      h: 2.2,
      fontFace: MCK_FONTS.body,
      fontSize: 11,
      color: MCK.inkMuted,
      italic: true,
      valign: 'top',
    });
  }
  addFooter(slide, ctx);
  if (ctx.slide.speakerNotes) slide.addNotes(ctx.slide.speakerNotes);
}

function addRoadmapSlide(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  addTopRail(slide, pres, ctx);
  addActionTitle(slide, pres, ctx.slide.title, 0.52);
  const steps = truncateBullets(ctx.slide.bullets || [], 5);
  const stepW = 8.75 / Math.max(steps.length, 1);
  steps.forEach((text, i) => {
    const x = 0.72 + i * stepW;
    slide.addShape(pres.ShapeType.ellipse, {
      x: x + stepW / 2 - 0.12,
      y: 1.85,
      w: 0.24,
      h: 0.24,
      fill: { color: i === 0 ? MCK.accent : MCK.paperSoft },
      line: { color: MCK.accent, width: 1 },
    });
    if (i < steps.length - 1) {
      slide.addShape(pres.ShapeType.rect, {
        x: x + stepW / 2 + 0.14,
        y: 1.96,
        w: stepW - 0.28,
        h: 0.02,
        fill: { color: MCK.line },
      });
    }
    slide.addText(text, {
      x: x + 0.05,
      y: 2.25,
      w: stepW - 0.1,
      h: 1.2,
      fontFace: MCK_FONTS.body,
      fontSize: 11,
      color: MCK.ink,
      valign: 'top',
    });
  });
  addFooter(slide, ctx);
  if (ctx.slide.speakerNotes) slide.addNotes(ctx.slide.speakerNotes);
}

function addContentSlide(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  addPaperBackground(slide, pres);
  addTopRail(slide, pres, ctx);
  addActionTitle(slide, pres, ctx.slide.title, 0.58);
  addBullets(slide, ctx.slide.bullets || [], 1.72, 2.9);
  if (ctx.slide.metrics?.length) {
    const header = [
      { text: 'Metric', options: { bold: true, color: MCK.white, fill: { color: MCK.tableHead } } },
      { text: 'Value', options: { bold: true, color: MCK.white, fill: { color: MCK.tableHead } } },
    ];
    const rows = ctx.slide.metrics.map((m) => [
      { text: m.label, options: { color: MCK.ink, fontFace: MCK_FONTS.body } },
      { text: m.value, options: { bold: true, color: MCK.navy, fontFace: MCK_FONTS.display } },
    ]);
    slide.addTable([header, ...rows], {
      x: 0.72,
      y: 4.0,
      w: 4.5,
      colW: [2.6, 1.9],
      fontSize: 11,
      border: { type: 'solid', color: MCK.line, pt: 1 },
      margin: 4,
    });
  }
  addFooter(slide, ctx);
  if (ctx.slide.speakerNotes) slide.addNotes(ctx.slide.speakerNotes);
}

function addPaperBackground(slide: PptxSlide, pres: PptxPres) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
    fill: { color: MCK.paper },
  });
}

function renderSlide(slide: PptxSlide, pres: PptxPres, ctx: SlideRenderContext) {
  const kind = slideLayoutKind(ctx.slide.type);
  switch (kind) {
    case 'title':
      addTitleSlide(slide, pres, ctx);
      break;
    case 'executive-summary':
      addPaperBackground(slide, pres);
      addExecutiveSummary(slide, pres, ctx);
      break;
    case 'data-metrics':
      addPaperBackground(slide, pres);
      addKpiSlide(slide, pres, ctx);
      break;
    case 'framework':
      addPaperBackground(slide, pres);
      addFrameworkSlide(slide, pres, ctx);
      break;
    case 'insights':
    case 'visual':
      addPaperBackground(slide, pres);
      addInsightsSlide(slide, pres, ctx);
      break;
    case 'roadmap':
      addPaperBackground(slide, pres);
      addRoadmapSlide(slide, pres, ctx);
      break;
    case 'closing':
    case 'recommendation':
      addContentSlide(slide, pres, ctx);
      break;
    default:
      addContentSlide(slide, pres, ctx);
  }
}

export type PptxExportOptions = {
  includeSpeakerNotes?: boolean;
};

/** McKinsey-style ADGM deck — Open Design deck craft applied to native .pptx */
export async function downloadDeckPptx(
  deck: PresentationDeck,
  options?: PptxExportOptions,
): Promise<void> {
  const includeNotes = options?.includeSpeakerNotes !== false;
  const { default: pptxgen } = await import('pptxgenjs');

  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'ADGM Command Centre';
  pres.company = 'ADGM';
  pres.subject = `${deck.theme || 'adgm-executive'} · McKinsey-style`;
  pres.title = deck.title;

  const total = deck.slides.length;

  deck.slides.forEach((slideData, index) => {
    const slide = pres.addSlide();
    const ctx: SlideRenderContext = {
      slide: {
        ...slideData,
        speakerNotes: includeNotes ? slideData.speakerNotes : undefined,
      },
      index,
      total,
      deckTitle: deck.title,
      includeNotes,
    };
    renderSlide(slide, pres, ctx);
  });

  await pres.writeFile({ fileName: safeFilename(deck.title) });
}
