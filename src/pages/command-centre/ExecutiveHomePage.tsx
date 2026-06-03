/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CcIcon } from '../../command-centre/CcIcon';
import { Emblem, AnimatedNumber, Sparkline, RingGauge, RagPill } from '../../command-centre/CcPrimitives';
import { RadarChart, Donut, MomentumChart, CapitalFlow } from '../../command-centre/CcCharts';
import { mdToNodes } from '../../command-centre/CcMarkdown';
import {
  SIGNALS, DEPARTMENTS, AGENTS, CENTRES, BENCH_DIMS, BRIEF_FORMATS, PLAN, INTEGRATIONS,
  SUGGESTIONS, CANNED, TICKER, MOMENTUM, FLOWS, REGULATORY, KB_CATS, KB_DOCS, DIFFERENTIATION,
} from '../../data/commandCentreData';
import { useApp } from '../../context/AppContext';
import { PRODUCT_AGENT_NAME, PRODUCT_AGENT_NAME_AR } from '../../config/user';
import { AdgmInfoPanel } from '../../components/brand/AdgmInfoPanel';
import { IntelCard, IntelCardBody, IntelIconBox } from '../../command-centre/CcCard';

function MarketTicker() {
  const items = TICKER;
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

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  return now;
}

function GreetingHero({ lang, setView }) {
  const ar = lang === 'ar';
  const now = useClock();
  // Abu Dhabi time = UTC+4
  const ad = new Date(now.getTime() + (now.getTimezoneOffset() + 240) * 60000);
  const h = ad.getHours();
  const part = h < 12 ? (ar ? 'صباح الخير' : 'Good morning') : h < 18 ? (ar ? 'مساء الخير' : 'Good afternoon') : (ar ? 'مساء الخير' : 'Good evening');
  const dateStr = ad.toLocaleDateString(ar ? 'ar-AE' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = ad.toLocaleTimeString(ar ? 'ar-AE' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
  return (
    <div
      className="card rise greeting-hero"
      style={{ background: 'linear-gradient(135deg, var(--adgm-navy) 0%, var(--adgm-navy-mid) 55%, var(--adgm-navy-deep) 100%)', border: 'none', color: '#fff', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 120% at 100% -10%, rgba(52,214,223,0.22), transparent 55%), radial-gradient(50% 80% at 90% 120%, rgba(201,163,91,0.18), transparent)', pointerEvents: 'none' }}></div>
      <div className="card-pad" style={{ position: 'relative', padding: 30, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div className="greeting-hero__copy">
          <div className="greeting-hero__meta">
            <span className="greeting-hero__meta-chip">
              <CcIcon name="map-pin" size={13} />
              <span>{ar ? 'جزيرة المارية · أبوظبي' : 'Al Maryah Island · Abu Dhabi'}</span>
            </span>
            <span className="greeting-hero__meta-time kpi-num">
              {timeStr}
              <span className="greeting-hero__meta-tz">GST</span>
            </span>
          </div>
          <h1 className={`greeting-hero__title${ar ? ' lang-ar' : ''}`}>
            {part}, {ar ? 'راجيف' : 'Rajiv'}.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, maxWidth: 560, lineHeight: 1.5, margin: 0 }}>
            {ar ? 'إليك ما حدث بين عشية وضحاها عبر أولوياتك الاستراتيجية وفرقك التسعة.' : "Here's what happened overnight across your strategic priorities and your nine teams."}
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'block', marginTop: 4 }}>{dateStr}</span>
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => setView('chat')}><CcIcon name="sparkles" size={17} />{ar ? 'إحاطة الصباح' : 'Open morning briefing'}</button>
            <button type="button" className="btn btn-ghost btn-on-dark" onClick={() => setView('performance')}><CcIcon name="gauge" size={17} />{ar ? 'لوحة الأداء' : 'Performance'}</button>
          </div>
        </div>
        <div className="greeting-hero__stats">
          {[{ n: 9, l: ar ? 'إدارات مباشرة' : 'live departments' }, { n: 5, l: ar ? 'وكلاء ذكاء' : 'AI agents' }, { n: 88, l: 'D33' }].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div className="kpi-num" style={{ fontSize: 38, color: '#fff' }}><AnimatedNumber value={s.n} /></div>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalCard({ s, lang, setView, big }) {
  const ar = lang === 'ar';
  const L = ar ? s.ar : s;
  const toneColor = { good: 'var(--status-good)', warn: 'var(--status-warn)', risk: 'var(--status-risk)', info: 'var(--status-info)' }[s.tone];
  const clickable = !!(s.deptLink || s.link);
  return (
    <IntelCard
      interactive={clickable}
      onClick={clickable ? () => { if (s.link) setView(s.link); else if (s.deptLink) setView('performance'); } : undefined}
      className={big ? 'intel-card--wide' : undefined}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <IntelCardBody style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IntelIconBox icon={s.icon} color={toneColor} background={'color-mix(in oklab,' + toneColor + ' 14%, transparent)'} size="sm" />
          <div className="eyebrow" style={{ color: toneColor }}>{L.label}</div>
          <div className="kpi-num" style={{ marginInlineStart: 'auto', fontSize: 22, color: toneColor, fontWeight: 600 }}>{s.metric}</div>
        </div>
        <div className={`type-title ${big ? 'type-title-md' : ''}`} style={{ fontSize: big ? 21 : 17 }}>{L.headline}</div>
        <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, flex: 1 }}>{L.body}</p>
        <div className="cc-card-foot">
          <div className="cc-card-foot__spark">
            <Sparkline data={s.spark} color={toneColor} height={34} />
            <div className="eyebrow muted-3" style={{ fontSize: 10.5, marginTop: 2 }}>{L.metricLabel}</div>
          </div>
          {(s.deptLink || s.link) && <span className="pill ghost" style={{ height: 28 }}>{ar ? 'تفاصيل' : 'Drill in'} <CcIcon name="arrow-right" size={13} /></span>}
        </div>
      </IntelCardBody>
    </IntelCard>
  );
}

export function ExecutiveHomePage() {
  const { settings } = useApp();
  const lang = settings.language === 'ar' ? 'ar' : 'en';
  const navigate = useNavigate();
  const setView = (v: string) => { if (v === 'performance') navigate('/performance'); else if (v === 'regulatory') navigate('/regulatory'); else if (v === 'home') navigate('/dashboard'); else navigate(`/${v}`); };
  const onAsk = (q: string) => navigate(`/chat?seed=${encodeURIComponent(q)}`);
  const ar = lang === 'ar';
  const quick = ar
    ? ['قارن إطار الأصول الرقمية مع سنغافورة', 'أهم فرص الاستثمار وفق D33', 'لخّص أداء الموارد البشرية']
    : ["Compare ADGM's digital assets framework against Singapore MAS.", "Top investment opportunities Abu Dhabi should prioritise from current capital flows?", "Brief me on my 3pm meeting tomorrow."];
  return (
    <div className="grid mi-stagger cc-page" style={{ gap: 22 }}>
      <MarketTicker />
      <GreetingHero lang={lang} setView={setView} />

      <div className="section-head" style={{ marginBottom: -4, marginTop: 6 }}>
        <div>
          <div className="eyebrow">{ar ? 'إشارات اليوم ذات الأولوية' : "Today's priority signals"}</div>
          <h2 style={{ fontSize: 22, marginTop: 4 }}>{ar ? 'أهم ما يجب أن تعرفه' : 'The most important things to know'}</h2>
        </div>
        <span className="pill ghost"><span className="dot good pulse" style={{ color: 'var(--status-good)' }}></span>{ar ? 'محدث 06:00 بتوقيت الإمارات' : 'Updated 06:00 GST'}</span>
      </div>

      <div className="grid mi-stagger cc-grid-auto">
        {SIGNALS.map((s) => <SignalCard key={s.id} s={s} lang={lang} setView={setView} />)}
      </div>

      <IntelCard rise className="intel-card--insight">
        <IntelCardBody style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <IntelIconBox icon="brain-circuit" size="lg" color="#042024" background="linear-gradient(135deg, var(--teal-300), var(--aqua))" />
          <div className="cc-flex-grow">
            <div className="eyebrow" style={{ color: 'var(--accent-bright)' }}>{ar ? 'إضاءة الذكاء · اكتشاف نمطي' : 'AI insight · pattern detected'}</div>
            <div className="type-title type-title-sm" style={{ marginTop: 5 }}>
              {ar ? 'مخاطر مترابطة عبر إدارتين: تأخر تكامل CRM (التقنية) يهدد بتعطيل صفقة الصندوق السيادي البالغة 90 مليون درهم (المبيعات).' : 'Two departments show correlated risk: the CRM-integration slip (IT) threatens to stall the AED 90M sovereign-fund deal (Sales).'}
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => onAsk(ar ? 'اشرح المخاطر المترابطة بين التقنية والمبيعات' : 'Explain the correlated risk between IT and Sales and recommend an action.')}>
            <CcIcon name="sparkles" size={17} />{ar ? 'استكشف' : 'Investigate'}
          </button>
        </IntelCardBody>
      </IntelCard>

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
                {ar ? 'استعلامات بلغة طبيعية عبر كامل قاعدة المعرفة' : 'Natural-language queries across the full knowledge base'}
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
            <p>عند التعارض مع اللوائح أو السياسات الرسمية لـ ADGM، تسود الوثائق الرسمية.</p>
          </>
        ) : (
          <>
            <p>
              Responses are drawn from approved knowledge sources and illustrative executive
              scenarios. They aim to offer clarity and do not constitute legal or regulatory advice.
            </p>
            <p>
              If there is any conflict with official ADGM regulations, rules, or guidance, the
              official documents prevail.
            </p>
          </>
        )}
      </AdgmInfoPanel>
    </div>
  );
}

