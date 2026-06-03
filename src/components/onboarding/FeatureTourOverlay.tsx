import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CHAT_PATH } from '../../config/auth';
import { markTourComplete } from '../../auth/authStorage';
import '../../styles/feature-tour.css';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TourStep = {
  id: string;
  target: string;
  route: string;
  title: string;
  body: string;
  placement: TourPlacement;
  pad?: number;
};

export const FEATURE_TOUR_STEPS: TourStep[] = [
  {
    id: 'chat-input',
    target: '[data-tour="chat-input"]',
    route: CHAT_PATH,
    title: 'Start here',
    body: 'Ask anything — strategy, briefings, or a quick pulse on the day.',
    placement: 'top',
    pad: 8,
  },
  {
    id: 'dashboard',
    target: '[data-nav="dashboard"]',
    route: CHAT_PATH,
    title: 'Executive Home',
    body: 'Your morning view — priorities and signals in one place.',
    placement: 'right',
    pad: 2,
  },
  {
    id: 'chat-nav',
    target: '[data-nav="chat"]',
    route: CHAT_PATH,
    title: 'Personal AI',
    body: 'Your main workspace. Always one tap away.',
    placement: 'right',
    pad: 2,
  },
  {
    id: 'briefings',
    target: '[data-nav="briefings"]',
    route: CHAT_PATH,
    title: 'Briefings',
    body: 'Board-ready summaries, ready when you are.',
    placement: 'right',
    pad: 2,
  },
];

type SpotlightRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: string;
};

const CARD_W = 280;
const CARD_H = 156;

const RING_STROKE = 2;

function measureTarget(selector: string, pad = 4): SpotlightRect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;

  const cs = getComputedStyle(el);
  const radius = cs.borderRadius && cs.borderRadius !== '0px' ? cs.borderRadius : '10px';

  const border =
    (parseFloat(cs.borderTopWidth) || 0) +
    (parseFloat(cs.borderBottomWidth) || 0);
  const shadowPad = cs.boxShadow && cs.boxShadow !== 'none' ? 4 : 0;
  const inset = pad + border / 2 + shadowPad + RING_STROKE;

  return {
    top: Math.round(r.top - inset),
    left: Math.round(r.left - inset),
    width: Math.round(r.width + inset * 2),
    height: Math.round(r.height + inset * 2),
    radius,
  };
}

function tooltipStyle(
  rect: SpotlightRect,
  placement: TourPlacement,
  cardW: number,
  cardH: number,
  gap: number,
): { top: number; left: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = rect.top - cardH - gap;
      left = rect.left + rect.width / 2 - cardW / 2;
      break;
    case 'bottom':
      top = rect.top + rect.height + gap;
      left = rect.left + rect.width / 2 - cardW / 2;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - cardH / 2;
      left = rect.left - cardW - gap;
      break;
    case 'right':
      top = rect.top + rect.height / 2 - cardH / 2;
      left = rect.left + rect.width + gap;
      break;
  }

  left = Math.max(12, Math.min(left, vw - cardW - 12));
  top = Math.max(12, Math.min(top, vh - cardH - 12));
  return { top, left };
}

function TourShade({ rect }: { rect: SpotlightRect }) {
  const { top, left, width, height } = rect;
  const bottom = top + height;
  const right = left + width;

  return (
    <>
      <div className="feature-tour__shade" style={{ top: 0, left: 0, right: 0, height: top }} aria-hidden />
      <div
        className="feature-tour__shade"
        style={{ top: bottom, left: 0, right: 0, bottom: 0 }}
        aria-hidden
      />
      <div
        className="feature-tour__shade"
        style={{ top, left: 0, width: left, height }}
        aria-hidden
      />
      <div
        className="feature-tour__shade"
        style={{ top, left: right, right: 0, height }}
        aria-hidden
      />
      <div
        className="feature-tour__ring"
        style={{
          top,
          left,
          width,
          height,
          borderRadius: rect.radius,
        }}
        aria-hidden
      />
    </>
  );
}

export function FeatureTourOverlay() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<SpotlightRect | null>(null);
  const [ready, setReady] = useState(false);

  const step = FEATURE_TOUR_STEPS[stepIndex];
  const total = FEATURE_TOUR_STEPS.length;
  const isLast = stepIndex >= total - 1;
  const tooltipGap = step.id === 'chat-input' ? 14 : step.placement === 'right' ? 18 : 12;

  const finish = useCallback(() => {
    document.querySelectorAll('.feature-tour-target').forEach((el) => {
      el.classList.remove('feature-tour-target');
    });
    markTourComplete();
    window.dispatchEvent(new CustomEvent('adgm-tour-complete'));
  }, []);

  const next = useCallback(() => {
    if (isLast) {
      finish();
      return;
    }
    setRect(null);
    setReady(false);
    setStepIndex((i) => i + 1);
  }, [isLast, finish]);

  useEffect(() => {
    navigate(step.route, { replace: true });
  }, [step.route, stepIndex, navigate]);

  useLayoutEffect(() => {
    setRect(null);
    setReady(false);

    document.querySelectorAll('.feature-tour-target').forEach((el) => {
      el.classList.remove('feature-tour-target');
    });

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 40;
    let targetEl: Element | null = null;

    const update = () => {
      if (cancelled) return;
      const nextRect = measureTarget(step.target, step.pad ?? 4);
      if (nextRect) {
        setRect(nextRect);
        setReady(true);
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) window.setTimeout(update, 80);
    };

    const startTimer = window.setTimeout(() => {
      targetEl = document.querySelector(step.target);
      if (targetEl) {
        targetEl.classList.add('feature-tour-target');
        const block = step.id.startsWith('chat') ? 'end' : 'nearest';
        targetEl.scrollIntoView({ block, behavior: 'auto', inline: 'nearest' });
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(update);
      });
    }, 120);

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      targetEl?.classList.remove('feature-tour-target');
      document.querySelectorAll('.feature-tour-target').forEach((el) => {
        el.classList.remove('feature-tour-target');
      });
    };
  }, [step.target, step.pad, step.id, stepIndex]);

  const cardPos = rect
    ? tooltipStyle(rect, step.placement, CARD_W, CARD_H, tooltipGap)
    : { top: Math.max(20, window.innerHeight / 2 - CARD_H / 2), left: Math.max(12, window.innerWidth / 2 - CARD_W / 2) };

  const overlay = (
    <div className="feature-tour" role="dialog" aria-modal="true" aria-labelledby="feature-tour-title">
      {rect ? <TourShade rect={rect} /> : <div className="feature-tour__shade feature-tour__shade--full" aria-hidden />}

      <div
        className={`feature-tour__card feature-tour__card--${step.placement}${ready ? ' feature-tour__card--ready' : ''}`}
        style={{ top: cardPos.top, left: cardPos.left }}
      >
        <div className="feature-tour__accent" aria-hidden />

        <div className="feature-tour__card-head">
          <span className="feature-tour__step">
            {stepIndex + 1} of {total}
          </span>
          <button type="button" className="feature-tour__skip-tour" onClick={finish}>
            Skip
          </button>
        </div>

        <h2 id="feature-tour-title" className="feature-tour__title">
          {step.title}
        </h2>
        <p className="feature-tour__body">{step.body}</p>

        <div className="feature-tour__footer">
          <div className="feature-tour__dots" aria-hidden>
            {FEATURE_TOUR_STEPS.map((s, i) => (
              <span
                key={s.id}
                className={`feature-tour__dot${i === stepIndex ? ' feature-tour__dot--on' : ''}`}
              />
            ))}
          </div>
          <button type="button" className="feature-tour__next" onClick={next}>
            {isLast ? 'Begin' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
