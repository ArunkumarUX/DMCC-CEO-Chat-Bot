import type { CSSProperties } from 'react';
import { ADGM_PPT_FOOTER } from '../../config/adgmBrandForDeck';
import type { Deck, Slide } from './slideTypes';
import { resolveSlideStyle } from './slideStyle';

type Props = {
  slide: Slide;
  deckTheme: Deck['theme'];
  index: number;
  total: number;
};

function layoutLabel(layout: Slide['layout']): string {
  return layout.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SlideCanvas({ slide, deckTheme, index, total }: Props) {
  const style = resolveSlideStyle(slide, deckTheme);
  const isTitle = slide.layout === 'title';
  const eyebrow = slide.eyebrow || (isTitle ? slide.subtitle || deckTheme.tagline : undefined);
  const canvasStyle = style.cssVars as CSSProperties;

  if (isTitle) {
    return (
      <article
        className="cc-slideai__canvas cc-slideai__canvas--title"
        style={canvasStyle}
        aria-label={`Slide ${index + 1}: ${slide.title}`}
      >
        <div className="cc-slideai__canvas-glow" aria-hidden />
        <div className="cc-slideai__canvas-title-inner">
          {eyebrow && <p className="cc-slideai__canvas-eyebrow">{eyebrow}</p>}
          <h1 className="cc-slideai__canvas-title" style={{ color: style.titleColor }}>
            {slide.title}
          </h1>
          {slide.body && <p className="cc-slideai__canvas-lede">{slide.body}</p>}
          {slide.callout && <p className="cc-slideai__canvas-callout">{slide.callout}</p>}
        </div>
        <div className="cc-slideai__canvas-title-rule" aria-hidden />
        <SlideCanvasFooter index={index} light deckTheme={deckTheme} />
      </article>
    );
  }

  const canvasClass = [
    'cc-slideai__canvas',
    `cc-slideai__canvas--${slide.layout}`,
    style.isDark ? 'cc-slideai__canvas--dark' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={canvasClass}
      style={canvasStyle}
      aria-label={`Slide ${index + 1}: ${slide.title}`}
    >
      <header className="cc-slideai__canvas-chrome">
        <span className="cc-slideai__canvas-chrome-brand">{deckTheme.tagline || 'Portfolio'}</span>
        <span className="cc-slideai__canvas-chrome-type">{layoutLabel(slide.layout)}</span>
        <span className="cc-slideai__canvas-chrome-num">
          {index + 1} / {total}
        </span>
      </header>

      <div className="cc-slideai__canvas-body">
        <div className="cc-slideai__canvas-main">
          {slide.eyebrow && <p className="cc-slideai__canvas-slide-eyebrow">{slide.eyebrow}</p>}
          <h2 className="cc-slideai__canvas-headline" style={{ color: style.titleColor }}>
            {slide.title}
          </h2>

          {slide.callout && (
            <p className="cc-slideai__canvas-callout cc-slideai__canvas-callout--inline">{slide.callout}</p>
          )}

          {slide.body && slide.layout !== 'quote' && (
            <p className="cc-slideai__canvas-body-text">{slide.body}</p>
          )}

          {slide.layout === 'stat' && slide.stats?.length ? (
            <div className="cc-slideai__canvas-kpis">
              {slide.stats.map((s) => (
                <div key={s.label} className="cc-slideai__canvas-kpi">
                  <span className="cc-slideai__canvas-kpi-val">{s.value}</span>
                  <span className="cc-slideai__canvas-kpi-lbl">{s.label}</span>
                  {s.context && <span className="cc-slideai__canvas-kpi-ctx">{s.context}</span>}
                </div>
              ))}
            </div>
          ) : null}

          {slide.layout === 'two-col' ? (
            <div className="cc-slideai__canvas-cols">
              <div className="cc-slideai__canvas-col">
                {slide.leftTitle && <h3 className="cc-slideai__canvas-col-title">{slide.leftTitle}</h3>}
                <p>{slide.leftContent}</p>
              </div>
              <div className="cc-slideai__canvas-col">
                {slide.rightTitle && <h3 className="cc-slideai__canvas-col-title">{slide.rightTitle}</h3>}
                <p>{slide.rightContent}</p>
              </div>
            </div>
          ) : null}

          {slide.layout === 'quote' && slide.quote ? (
            <blockquote className="cc-slideai__canvas-quote">
              <span className="cc-slideai__canvas-quote-mark" aria-hidden="true">&ldquo;</span>
              <p>{slide.quote}</p>
              {slide.quoteAuthor && <cite>— {slide.quoteAuthor}</cite>}
            </blockquote>
          ) : null}

          {slide.layout === 'timeline' && slide.timelineItems?.length ? (
            <ol className="cc-slideai__canvas-timeline">
              {slide.timelineItems.map((item) => (
                <li key={item.marker}>
                  <span className="cc-slideai__canvas-timeline-marker">{item.marker}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          {slide.layout === 'icon-grid' && slide.icons?.length ? (
            <div className="cc-slideai__canvas-icons">
              {slide.icons.map((icon) => (
                <div key={icon.title} className="cc-slideai__canvas-icon">
                  <span className="cc-slideai__canvas-icon-emoji" aria-hidden>{icon.emoji}</span>
                  <strong>{icon.title}</strong>
                  <p>{icon.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          {slide.layout === 'comparison' ? (
            <div className="cc-slideai__canvas-cols cc-slideai__canvas-cols--compare">
              <div className="cc-slideai__canvas-col">
                {slide.leftTitle && <h3 className="cc-slideai__canvas-col-title">{slide.leftTitle}</h3>}
                <p>{slide.leftContent}</p>
              </div>
              <div className="cc-slideai__canvas-col cc-slideai__canvas-col--winner">
                {slide.rightTitle && <h3 className="cc-slideai__canvas-col-title">{slide.rightTitle}</h3>}
                <p>{slide.rightContent}</p>
              </div>
            </div>
          ) : null}

          {slide.bullets?.length &&
          !['two-col', 'comparison', 'quote', 'icon-grid', 'timeline'].includes(slide.layout) ? (
            <ul className="cc-slideai__canvas-bullets">
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {(slide.layout === 'image-left' && (slide.leftContent || slide.rightContent || slide.imagePrompt)) ? (
          <aside className="cc-slideai__canvas-exhibit">
            <span className="cc-slideai__canvas-exhibit-label">Exhibit</span>
            <p>{slide.imagePrompt || slide.leftContent || slide.rightContent}</p>
          </aside>
        ) : null}
      </div>

      <SlideCanvasFooter index={index} light={style.isDark} deckTheme={deckTheme} />
    </article>
  );
}

function SlideCanvasFooter({
  index,
  light,
  deckTheme,
}: {
  index: number;
  light?: boolean;
  deckTheme: Deck['theme'];
}) {
  const footer =
    deckTheme.tagline === 'Path to Forward'
      ? ADGM_PPT_FOOTER
      : `${deckTheme.tagline || 'Forward'} · Confidential`;
  return (
    <footer className={`cc-slideai__canvas-foot${light ? ' cc-slideai__canvas-foot--light' : ''}`}>
      <span>{footer}</span>
      <span className="cc-slideai__canvas-foot-num">{index + 1}</span>
    </footer>
  );
}

/** Minimal thumbnail for filmstrip */
export function SlideThumb({
  slide,
  isActive,
  isUpdating,
  onClick,
}: {
  slide: Slide;
  deckTheme: Deck['theme'];
  isActive: boolean;
  isUpdating?: boolean;
  onClick: () => void;
}) {
  const isTitle = slide.layout === 'title';
  return (
    <button
      type="button"
      className={`cc-slideai__thumb${isActive ? ' cc-slideai__thumb--on' : ''}${isTitle ? ' cc-slideai__thumb--title' : ''}${isUpdating ? ' cc-slideai__thumb--updating' : ''}`}
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      title={slide.title}
    >
      <span className="cc-slideai__thumb-preview">
        {isTitle ? (
          <span className="cc-slideai__thumb-title-text">{slide.title}</span>
        ) : (
          <>
            <span className="cc-slideai__thumb-bar" aria-hidden />
            <span className="cc-slideai__thumb-headline">{slide.title}</span>
          </>
        )}
      </span>
    </button>
  );
}
