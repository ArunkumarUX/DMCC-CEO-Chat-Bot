/**
 * Build a widescreen PPTX from captured DIFC Executive Intelligence screenshots.
 * Images are centered and scaled with aspect ratio preserved (no stretch).
 */
import { readFile, access, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import imageSize from 'image-size';
import pptxgen from 'pptxgenjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SHOTS_DIR = path.join(ROOT, 'docs', 'deck-screenshots', 'difc-executive-intelligence');
const DOWNLOADS = path.join(
  process.env.HOME || '',
  'Downloads',
  'difc-executive-intelligence-ppt',
);

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const HEADER_H = 0.34;
const MARGIN = 0.4;

const SLIDES = [
  { file: '01-executive-home.png', title: 'Executive Home' },
  { file: '02-ask-personal-ai-agent.png', title: 'Ask Personal AI Agent' },
  { file: '03-performance.png', title: 'Performance' },
  { file: '04-market-intelligence.png', title: 'Market Intelligence' },
  { file: '05-regulatory.png', title: 'Regulatory' },
  { file: '06-knowledge-base.png', title: 'Knowledge Base' },
  { file: '07-briefings.png', title: 'Briefings' },
];

const BRAND = {
  navy: '081830',
  blue: '1664E0',
  ink: '0E1B2B',
  muted: '67738A',
  white: 'FFFFFF',
  canvas: 'EEF1F6',
};

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function imageDataUri(filePath) {
  const buf = await readFile(filePath);
  return `image/png;base64,${buf.toString('base64')}`;
}

/** Fit image inside box preserving aspect ratio; return inches for pptxgenjs. */
function fitImage(pxW, pxH, box) {
  const ratio = pxW / pxH;
  let w = box.w;
  let h = w / ratio;
  if (h > box.h) {
    h = box.h;
    w = h * ratio;
  }
  return {
    x: box.x + (box.w - w) / 2,
    y: box.y + (box.h - h) / 2,
    w,
    h,
  };
}

async function main() {
  for (const slide of SLIDES) {
    const p = path.join(SHOTS_DIR, slide.file);
    if (!(await fileExists(p))) {
      throw new Error(`Missing screenshot: ${p}\nRun: python3 scripts/capture-difc-ppt-screenshots.py`);
    }
  }

  await mkdir(DOWNLOADS, { recursive: true });

  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'DIFC Executive Intelligence';
  pres.title = 'DIFC Command Centre — All Screens';
  pres.subject = 'Executive Intelligence product screens (excluding Settings)';

  const imageBox = {
    x: MARGIN,
    y: HEADER_H + 0.15,
    w: SLIDE_W - MARGIN * 2,
    h: SLIDE_H - HEADER_H - 0.15 - MARGIN,
  };

  // Title slide
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: BRAND.navy };
  titleSlide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: '100%',
    h: 0.08,
    fill: { color: BRAND.blue },
  });
  titleSlide.addText('DIFC', {
    x: 0.7,
    y: 1.35,
    w: 11,
    h: 0.9,
    fontFace: 'Arial',
    fontSize: 54,
    bold: true,
    color: BRAND.white,
    charSpacing: 6,
  });
  titleSlide.addText('COMMAND CENTRE', {
    x: 0.72,
    y: 2.15,
    w: 11,
    h: 0.45,
    fontFace: 'Arial',
    fontSize: 20,
    bold: true,
    color: 'AEBFDA',
    charSpacing: 10,
  });
  titleSlide.addText('Executive Intelligence — Product Screens', {
    x: 0.72,
    y: 3.05,
    w: 11,
    h: 0.5,
    fontFace: 'Arial',
    fontSize: 22,
    color: BRAND.white,
  });
  titleSlide.addText('All application screens except Settings · June 2026', {
    x: 0.72,
    y: 3.65,
    w: 11,
    h: 0.35,
    fontFace: 'Arial',
    fontSize: 13,
    color: BRAND.muted,
  });

  let index = 0;
  for (const slide of SLIDES) {
    index += 1;
    const imgPath = path.join(SHOTS_DIR, slide.file);
    const imgBuf = await readFile(imgPath);
    const { width: pxW, height: pxH } = imageSize(imgBuf);
    const data = `image/png;base64,${imgBuf.toString('base64')}`;
    const fit = fitImage(pxW, pxH, imageBox);

    const s = pres.addSlide();
    s.background = { color: BRAND.canvas };

    // subtle frame behind screenshot (matches app canvas, no stretch)
    s.addShape(pres.ShapeType.roundRect, {
      x: fit.x - 0.06,
      y: fit.y - 0.06,
      w: fit.w + 0.12,
      h: fit.h + 0.12,
      fill: { color: BRAND.white },
      line: { color: 'D8DEE8', width: 0.75 },
      rectRadius: 0.08,
    });

    s.addImage({
      data,
      x: fit.x,
      y: fit.y,
      w: fit.w,
      h: fit.h,
    });

    s.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: HEADER_H,
      fill: { color: BRAND.navy },
    });
    s.addText(slide.title, {
      x: 0.45,
      y: 0.05,
      w: 10,
      h: 0.22,
      fontFace: 'Arial',
      fontSize: 11,
      bold: true,
      color: BRAND.white,
    });
    s.addText(String(index + 1), {
      x: 12.2,
      y: 0.05,
      w: 0.6,
      h: 0.22,
      fontFace: 'Arial',
      fontSize: 10,
      color: 'AEBFDA',
      align: 'right',
    });
  }

  const outName = 'DIFC-Executive-Intelligence-All-Screens.pptx';
  const outProject = path.join(SHOTS_DIR, outName);
  const outDownloads = path.join(DOWNLOADS, outName);
  await pres.writeFile({ fileName: outProject });
  await cp(outProject, outDownloads);
  console.log(`PPTX saved (aspect ratio preserved):\n  ${outProject}\n  ${outDownloads}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
