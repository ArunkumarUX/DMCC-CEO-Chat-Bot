/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CcIcon } from '../../command-centre/CcIcon';
import { Emblem, AnimatedNumber, Sparkline, RingGauge, RagPill } from '../../command-centre/CcPrimitives';
import { RadarChart, Donut, MomentumChart, CapitalFlow } from '../../command-centre/CcCharts';
import { mdToNodes } from '../../command-centre/CcMarkdown';
import {
  TICKER,
} from '../../data/commandCentreData';
import { deriveCommandCentreSignals } from '../../data/deriveCommandCentreSignals';
import { countLiveSignals } from '../../data/prioritySignalHelpers';
import { useApp } from '../../context/AppContext';
import { PRODUCT_AGENT_NAME, PRODUCT_AGENT_NAME_AR, EXECUTIVE_USER } from '../../config/user';
import { EXECUTIVE_QUICK_PROMPTS, useGstLive } from '../../utils/gstGreeting';
import { computeFalconScore } from '../../utils/falconScore';
import { AdgmInfoPanel } from '../../components/brand/AdgmInfoPanel';
import { IntelCard, IntelCardBody, IntelIconBox } from '../../command-centre/CcCard';
import { IntelCardSources } from '../../command-centre/IntelCardSources';
import { IntelLaymanInfo } from '../../command-centre/IntelLaymanInfo';
import { getSourcesForSignal } from '../../data/signalSources';
import { SIGNAL_CARD_INFO } from '../../data/intelLaymanCopy';
import { resolveMarketTicker } from '../../utils/marketTicker';

function MarketTicker({ items }: { items: typeof TICKER }) {
  const Row = ({ k }) => {
    const up = k.c > 0, flat = k.c === 0;
    const col = flat ? 'var(--ink-3)' : up ? 'var(--status-good)' : 'var(--status-risk)';
    return (
      <span className="ticker-item">
        <span className="muted-3" style={{ fontWeight: 600 }}>{k.k}</span>
        <span className="kpi-num" style={{ color: 'var(--ink)', fontWeight: 600 }}>{k.v}</span>
        <span className="kpi-num" style={{ color: col, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
          <CcIcon name={flat ? 'minus' : up ? 'arrow-up-right' : 'arrow-down-right'} size={12} style={{ color: col }} />
          {flat ? '0.00' : Math.abs(k.c).toFixed(2)}%
        </span>
      </span>
    );
  };
  return (
    <IntelCard className="intel-card--ticker">
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...items, ...items].map((k, i) => <Row key={i} k={k} />)}
        </div>
      </div>
    </IntelCard>
  );
}

function GreetingHero({ lang, setView }) {
  const ar = lang === 'ar';
  const gst = useGstLive(lang);
  const { greeting: part, dateStr, timeStr, briefingLabel } = gst;
  const { executiveState } = useApp();
  const falcon = useMemo(() => computeFalconScore(executiveState), [executiveState]);
  return (
    <div className="card rise greeting-hero">
      <div className="card-pad" style={{ position: 'relative', padding: 30, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div className="greeting-hero__copy">
          <div className="greeting-hero__meta">
            <span className="greeting-hero__meta-chip">
              <CcIcon name="map-pin" size={13} />
              <span>{ar ? 'دبي، الإمارات' : 'Dubai, UAE'}</span>
            </span>
            <span className="greeting-hero__meta-time kpi-num">
              {timeStr}
              <span className="greeting-hero__meta-tz">GST</span>
            </span>
          </div>
          <h1 className={`greeting-hero__title${ar ? ' lang-ar' : ''}`}>
            {part}, {ar ? EXECUTIVE_USER.firstName : EXECUTIVE_USER.firstName}.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, maxWidth: 560, lineHeight: 1.5, margin: 0 }}>
            {ar
              ? 'إليك ما حدث بين عشية وضحاها عبر أولوياتك الاستراتيجية، و5 منظومات تجارية، و9 فرق.'
              : "Here's what happened overnight across your strategic priorities, 5 trade ecosystems (Gold · Crypto · Diamonds · AI · FinX), and 9 teams."}
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'block', marginTop: 4 }}>{dateStr}</span>
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => setView('chat')}><CcIcon name="sparkles" size={17} />{briefingLabel}</button>
            <button type="button" className="btn btn-ghost btn-on-dark" onClick={() => setView('performance')}><CcIcon name="gauge" size={17} />{ar ? 'لوحة الأداء' : 'Performance'}</button>
          </div>
        </div>
        <div className="greeting-hero__stats">
          {[
            { n: 5, l: ar ? 'منظومات تجارية' : 'trade ecosystems', t: undefined },
            { n: 9, l: ar ? 'إدارات مباشرة' : 'live departments', t: undefined },
            { n: falcon.score, l: ar ? 'صحة المنظومة' : 'Ecosystem health', t: ar ? falcon.tooltipAr : falcon.tooltip },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }} title={s.t}>
              <div className="kpi-num" style={{ fontSize: 38, color: '#fff' }}><AnimatedNumber value={s.n} /></div>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SIGNAL_TONES: Record<string, { color: string; stripe: string }> = {
  market: { color: '#0B1F3A', stripe: '#0B1F3A' },
  competitor: { color: '#8B6914', stripe: '#C9A84C' },
  investment: { color: '#1A6B4A', stripe: '#1A6B4A' },
  performance: { color: '#4338CA', stripe: '#4338CA' },
  regulatory: { color: '#B42318', stripe: '#B42318' },
  followup: { color: '#0D7C6E', stripe: '#0D7C6E' },
};

function SignalCard({ s, lang, big, sources }) {
  const ar = lang === 'ar';
  const L = ar ? s.ar : s;
  const tone = SIGNAL_TONES[s.id] ?? SIGNAL_TONES.market;
  const cardInfo = SIGNAL_CARD_INFO[s.id]?.[ar ? 'ar' : 'en'];
  return (
    <IntelCard
      className={['cc-signal-card', `cc-signal-card--${s.id}`, big ? 'intel-card--wide' : ''].filter(Boolean).join(' ')}
      accentColor={tone.stripe}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div
        className="cc-signal-card__header"
        style={{ '--signal-tone': tone.color } as React.CSSProperties}
      >
        <div className="cc-signal-card__header-top">
          <IntelIconBox icon={s.icon} color={tone.color} background="#f4f7f9" size="md" />
          <div className="cc-signal-card__header-main">
            <div className="cc-signal-card__category-row">
              <span className="cc-signal-card__category">{L.label}</span>
              {cardInfo ? <IntelLaymanInfo copy={cardInfo} /> : null}
            </div>
          </div>
          <div className="cc-signal-card__metric">
            <span className="cc-signal-card__metric-value kpi-num">{s.metric}</span>
            <span className="cc-signal-card__metric-label">{L.metricLabel}</span>
          </div>
        </div>
        <div className="cc-signal-card__header-meta">
          <span className={`cc-signal-card__live-pill${L.freshnessLabel?.startsWith('Live') || L.freshnessLabel?.startsWith('مباشر') ? ' cc-signal-card__live-pill--live' : ''}`}>
            <span className="cc-signal-card__live-dot" aria-hidden />
            {L.freshnessLabel}
          </span>
        </div>
      </div>
      <IntelCardBody className="cc-signal-card__body">
        <div className="intel-signal-headline">
          <div className={`cc-signal-card__headline type-title ${big ? 'type-title-md' : ''}`}>
            {L.headline}
          </div>
          <div className="cc-signal-card__headline-sub">{L.headlineSub}</div>
        </div>
        <p className="cc-signal-card__copy">{L.body}</p>
        <div className="cc-signal-card__footer">
          <div className="cc-signal-card__spark">
            <Sparkline data={s.spark} color={tone.color} height={32} />
          </div>
        </div>
        <IntelCardSources sources={sources} ar={ar} />
      </IntelCardBody>
    </IntelCard>
  );
}


export function ExecutiveHomePage() {
  const { settings, executiveState, startNewChat } = useApp();
  const lang = settings.language === 'ar' ? 'ar' : 'en';
  const signals = useMemo(() => deriveCommandCentreSignals(executiveState), [executiveState]);
  const liveSignalCount = useMemo(() => countLiveSignals(executiveState), [executiveState]);
  const tickerItems = useMemo(
    () => resolveMarketTicker(executiveState.liveTicker),
    [executiveState.liveTicker],
  );
  const signalSourcesById = useMemo(() => {
    const map: Record<string, ReturnType<typeof getSourcesForSignal>> = {};
    for (const sig of signals) {
      map[sig.id] = getSourcesForSignal(sig.id, executiveState);
    }
    return map;
  }, [executiveState, signals]);
  const navigate = useNavigate();
  const setView = (v: string) => { if (v === 'performance') navigate('/performance'); else if (v === 'regulatory') navigate('/regulatory'); else if (v === 'home') navigate('/dashboard'); else navigate(`/${v}`); };
  const onAsk = (q: string) => {
    startNewChat();
    navigate(`/chat?seed=${encodeURIComponent(q)}`);
  };
  const ar = lang === 'ar';
  const quick = ar ? EXECUTIVE_QUICK_PROMPTS.ar : EXECUTIVE_QUICK_PROMPTS.en;
  return (
    <div className="grid mi-stagger cc-page" style={{ gap: 22 }}>
      <MarketTicker items={tickerItems} />
      <GreetingHero lang={lang} setView={setView} />

      <section className="cc-signals-block" aria-labelledby="executive-signals-heading">
        <div
          className="section-head cc-signals-section"
          style={{ marginBottom: -4, marginTop: 6 }}
        >
          <div>
            <p className="eyebrow cc-signals-section__eyebrow">
              {ar ? 'إشارات اليوم ذات الأولوية' : "Today's priority signals"}
            </p>
            <h2 id="executive-signals-heading" className="cc-signals-section__title">
              {ar ? 'أهم ما يجب أن تعرفه' : 'The most important things to know'}
            </h2>
            <p className="cc-signals-section__desc">
              {ar
                ? 'إشارات مخصصة لرئيس تنفيذي DMCC — السلع، المنافسون، التجارة، المنظومة، والامتثال — تحديث 08:00 و22:00.'
                : 'CEO-tailored signals for DMCC — commodities, competitors, trade corridors, ecosystem health, and compliance — refreshed 08:00 & 22:00 GST.'}
            </p>
          </div>
          <span className="pill cc-signals-section__pill" role="status">
            <span className="dot good pulse" aria-hidden="true" style={{ color: 'var(--status-good)' }} />
            {ar
              ? `${liveSignalCount}/6 إشارات بمصادر مباشرة`
              : `${liveSignalCount}/6 signals with live sources`}
          </span>
        </div>

        <div className="grid mi-stagger cc-grid-auto">
          {signals.map((s) => (
            <SignalCard
              key={s.id}
              s={s}
              lang={lang}
              sources={signalSourcesById[s.id] ?? []}
            />
          ))}
        </div>
      </section>

      <div className="card card-adgm-dark rise" style={{ marginTop: 4 }}>
        <div className="card-pad card-adgm-dark__layout">
          <div className="card-adgm-dark__intro">
            <div className="card-adgm-dark__icon">
              <CcIcon name="sparkles" size={20} />
            </div>
            <div>
              <div className="card-adgm-dark__title">
                {ar ? `اسأل ${PRODUCT_AGENT_NAME_AR}` : `Ask ${PRODUCT_AGENT_NAME}`}
              </div>
              <div className="card-adgm-dark__subtitle">
                {ar
                  ? 'مساعدك للاتصالات التنفيذية والإحاطات والمستندات — بالعربية أو الإنجليزية'
                  : 'Your personal AI assistant for executive comms, briefings and documents — in English or Arabic.'}
              </div>
            </div>
          </div>
          <div className="card-adgm-dark__prompts">
            {quick.map((q) => (
              <button key={q} type="button" className="card-adgm-dark__chip" onClick={() => onAsk(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AdgmInfoPanel title={ar ? 'إخلاء مسؤولية' : 'Disclaimer'}>
        {ar ? (
          <>
            <p>
              الردود المعروضة مستمدة من قواعد المعرفة المعتمدة ومحادثات تنفيذية نموذجية. الهدف
              توضيحي ولا يُعدّ استشارة قانونية أو تنظيمية.
            </p>
            <p>عند التعارض مع اللوائح أو السياسات الرسمية لـ DMCC، تسود الوثائق الرسمية.</p>
          </>
        ) : (
          <>
            <p>
              Responses are drawn from approved knowledge sources, calendar, and action register
              records. They aim to offer clarity and do not constitute legal or regulatory advice.
            </p>
            <p>
              If there is any conflict with official DMCC regulations, rules, or guidance, the
              official documents prevail.
            </p>
          </>
        )}
      </AdgmInfoPanel>
    </div>
  );
}

