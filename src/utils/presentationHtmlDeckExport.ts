import type { PresentationDeck } from '../types/presentation';
import { formatSlideType, truncateBullets } from './mckinseyDeckDesign';
import { ADGM_BRAND } from '../config/brand';
import { adgmDeckCssVars, ADGM_PPT_FOOTER } from '../config/adgmBrandForDeck';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slideHtml(deck: PresentationDeck, index: number) {
  const s = deck.slides[index];
  const isTitle = s.type === 'title';
  const isExec = s.type === 'executive-summary';
  const bullets = truncateBullets(s.bullets || []);
  const metrics = s.metrics || [];
  const notes = s.speakerNotes ? `<aside class="notes">${escapeHtml(s.speakerNotes)}</aside>` : '';

  const bulletList =
    bullets.length > 0
      ? `<ul class="bullets">${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
      : '';

  const metricsHtml =
    metrics.length > 0
      ? `<div class="kpi-row">${metrics
          .map(
            (m) =>
              `<div class="kpi"><span class="kpi__val">${escapeHtml(m.value)}</span><span class="kpi__lbl">${escapeHtml(m.label)}</span></div>`,
          )
          .join('')}</div>`
      : '';

  const exhibit = s.visualHint
    ? `<div class="exhibit"><span class="exhibit__label">Exhibit</span><p>${escapeHtml(s.visualHint)}</p></div>`
    : '';

  if (isTitle) {
    return `<section class="slide slide--title" data-index="${index}">
      <div class="slide__glow" aria-hidden="true"></div>
      <div class="slide__inner">
        <p class="eyebrow">ADGM · ${escapeHtml(ADGM_BRAND.tagline)}</p>
        <h1>${escapeHtml(s.title || deck.title)}</h1>
        ${bullets[0] ? `<p class="lede">${escapeHtml(bullets[0])}</p>` : ''}
      </div>
      ${notes}
    </section>`;
  }

  const pillars =
    isExec && bullets.length
      ? `<div class="pillars">${bullets
          .map(
            (b, i) =>
              `<div class="pillar${i === 0 ? ' pillar--lead' : ''}"><span class="pillar__n">${i + 1}</span><p>${escapeHtml(b)}</p></div>`,
          )
          .join('')}</div>`
      : '';

  const bodyContent = pillars || bulletList;

  return `<section class="slide${isExec ? ' slide--exec' : ''}" data-index="${index}">
    <header class="slide__chrome">
      <span class="brand">ADGM</span>
      <span class="type">${escapeHtml(formatSlideType(s.type))}</span>
      <span class="num">${index + 1} / ${deck.slides.length}</span>
    </header>
    <div class="slide__grid">
      <div class="slide__main">
        <h2 class="action-title">${escapeHtml(s.title)}</h2>
        ${bodyContent}
        ${metricsHtml}
      </div>
      ${exhibit}
    </div>
    <footer class="slide__foot">${escapeHtml(ADGM_PPT_FOOTER)}</footer>
    ${notes}
  </section>`;
}

export function buildPresentationHtmlDeck(deck: PresentationDeck): string {
  const cssVars = Object.entries(adgmDeckCssVars())
    .map(([k, v]) => `      ${k}: ${v};`)
    .join('\n');
  const slides = deck.slides.map((_, i) => slideHtml(deck, i)).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(deck.title)} — ADGM Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
${cssVars}
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; font-family: var(--font-body), system-ui, sans-serif; background: #060612; color: var(--ink); }
    .deck { height: 100vh; overflow: hidden; position: relative; }
    .progress { position: fixed; bottom: 0; left: 0; height: 3px; background: var(--accent); z-index: 20; transition: width .35s ease; box-shadow: 0 0 12px var(--accent); }
    .slide {
      position: absolute; inset: 0; display: none; flex-direction: column;
      background: var(--paper);
      background-image: linear-gradient(90deg, rgba(0,9,42,.04) 1px, transparent 1px);
      background-size: calc(100% / 16) 100%;
      opacity: 0; transform: translateY(8px);
      transition: opacity .4s ease, transform .45s cubic-bezier(.22,1,.36,1);
    }
    .slide.is-active { display: flex; opacity: 1; transform: none; }
    .slide--title { background: var(--navy); color: #fff; background-image: none; }
    .slide--title .slide__glow {
      position: absolute; top: -20%; right: -10%; width: 55%; height: 70%;
      background: radial-gradient(ellipse, rgba(0,135,255,.35) 0%, transparent 70%);
      pointer-events: none;
    }
    .slide--title .slide__inner {
      position: relative; z-index: 1; padding: 10vh 10vw 12vh; flex: 1;
      display: flex; flex-direction: column; justify-content: center;
      border-bottom: 8px solid var(--accent);
      box-shadow: inset 4px 0 0 var(--accent);
    }
    .slide--title .eyebrow { font-size: 11px; letter-spacing: .22em; font-weight: 700; color: var(--accent-glow); margin-bottom: 1.75rem; }
    .slide--title h1 { font-size: clamp(2.1rem, 4.5vw, 3.5rem); font-weight: 800; line-height: 1.1; max-width: 16ch; letter-spacing: -.02em; font-family: var(--font-display), system-ui, sans-serif; }
    .slide--title .lede { margin-top: 1.75rem; font-size: 1.2rem; color: #a3adc2; max-width: 40ch; line-height: 1.5; }
    .slide__chrome {
      display: flex; align-items: center; gap: 1rem; padding: 12px 36px;
      background: linear-gradient(90deg, var(--navy) 0%, var(--navy-mid) 100%);
      color: #fff; font-size: 11px; font-weight: 600;
      border-bottom: 3px solid var(--accent);
    }
    .slide__chrome .brand { letter-spacing: .16em; font-weight: 800; }
    .slide__chrome .type { flex: 1; text-align: center; opacity: .8; text-transform: uppercase; letter-spacing: .1em; font-size: 10px; }
    .slide__chrome .num { font-variant-numeric: tabular-nums; background: rgba(255,255,255,.12); padding: 4px 10px; border-radius: 99px; }
    .slide__grid { flex: 1; display: grid; grid-template-columns: 1fr minmax(220px, 30%); gap: 32px; padding: 40px 44px 28px; }
    .action-title {
      font-size: clamp(1.4rem, 2.4vw, 2rem); font-weight: 800; color: var(--navy);
      line-height: 1.2; margin-bottom: 1.5rem; padding-left: 18px;
      border-left: 5px solid var(--accent); letter-spacing: -.02em;
      font-family: var(--font-display), system-ui, sans-serif;
    }
    .bullets { list-style: none; }
    .bullets li { position: relative; padding-left: 1.25rem; margin-bottom: .75rem; font-size: 15px; line-height: 1.55; }
    .bullets li::before { content: ''; position: absolute; left: 0; top: .6em; width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 0 3px rgba(0,135,255,.15); }
    .pillars { display: flex; flex-direction: column; gap: 14px; margin-top: 8px; }
    .pillar {
      display: grid; grid-template-columns: 40px 1fr; gap: 16px; align-items: center;
      padding: 18px 20px; border: 1px solid var(--line); border-radius: 12px;
      background: var(--paper-soft); transition: transform .2s ease;
    }
    .pillar--lead { background: linear-gradient(135deg, var(--accent-soft) 0%, #fff 100%); border-color: color-mix(in oklab, var(--accent) 40%, var(--line)); box-shadow: 0 8px 24px rgba(0,135,255,.12); }
    .pillar__n { font-size: 1.5rem; font-weight: 800; color: var(--accent); }
    .pillar p { font-size: 15px; font-weight: 600; line-height: 1.45; color: var(--navy); }
    .kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; margin-top: 1.5rem; }
    .kpi {
      padding: 20px 16px; text-align: center; border-radius: 14px;
      background: linear-gradient(160deg, var(--accent-soft) 0%, #fff 100%);
      border: 1px solid color-mix(in oklab, var(--accent) 25%, var(--line));
      box-shadow: 0 6px 20px rgba(0,9,42,.06);
    }
    .kpi__val { display: block; font-size: 2rem; font-weight: 800; color: var(--navy); letter-spacing: -.03em; }
    .kpi__lbl { display: block; font-size: 11px; font-weight: 600; color: var(--ink-muted); margin-top: 8px; text-transform: uppercase; letter-spacing: .04em; }
    .exhibit {
      padding: 20px; border-radius: 14px; align-self: start;
      background: linear-gradient(145deg, var(--paper-soft), #fff);
      border: 1px solid var(--accent); box-shadow: 0 8px 28px rgba(0,135,255,.1);
    }
    .exhibit__label { font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); }
    .exhibit p { margin-top: 10px; font-size: 13px; color: var(--ink-muted); line-height: 1.5; }
    .slide__foot { padding: 12px 44px 18px; font-size: 10px; font-weight: 600; color: var(--ink-muted); letter-spacing: .04em; border-top: 1px solid var(--line); }
    .notes { display: none; }
    .hint { position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); font-size: 11px; color: rgba(255,255,255,.45); z-index: 15; }
    @media (max-width: 900px) { .slide__grid { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) { .slide { transition: none; } }
  </style>
</head>
<body>
  <div class="deck" id="deck">
    ${slides}
  </div>
  <div class="progress" id="progress" style="width:0%"></div>
  <p class="hint">← → navigate · ADGM unified deck craft · McKinsey + Open Design + Claude Design</p>
  <script>
    const slides = [...document.querySelectorAll('.slide')];
    const progress = document.getElementById('progress');
    let idx = 0;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === idx));
      if (progress) progress.style.width = ((idx + 1) / slides.length * 100) + '%';
      location.hash = 'slide-' + (idx + 1);
    }
    show(0);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); show(idx + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
    });
    const m = location.hash.match(/slide-(\\d+)/);
    if (m) show(parseInt(m[1], 10) - 1);
  </script>
</body>
</html>`;
}

export function downloadDeckHtml(deck: PresentationDeck) {
  const html = buildPresentationHtmlDeck(deck);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const base = deck.title.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || 'adgm-deck';
  a.href = url;
  a.download = `${base}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
