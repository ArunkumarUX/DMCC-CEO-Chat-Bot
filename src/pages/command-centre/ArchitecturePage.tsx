/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { Fragment } from 'react';
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
import { IntelCard, IntelCardBody, IntelIconBox, IntelSectionHead } from '../../command-centre/CcCard';


function AgentCard({ a, lang }) {
  const ar = lang === 'ar';
  return (
    <IntelCard style={{ display: 'flex', flexDirection: 'column' }}>
      <IntelCardBody style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <IntelIconBox icon={a.icon} color={a.color} background={'color-mix(in oklab,' + a.color + ' 16%, transparent)'} />
          <div>
            <div className="muted-3 mono" style={{ fontSize: 10.5 }}>AGENT {a.n}</div>
            <div className="type-title" style={{ fontSize: 15.5 }}>{a.name}</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{a.fn}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {a.caps.map((c) => <span key={c} className="pill ghost" style={{ height: 24, fontSize: 11 }}>{c}</span>)}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CcIcon name="plug" size={13} style={{ color: a.color }} />
          <span className="muted-3" style={{ fontSize: 11.5 }}>{a.integ}</span>
        </div>
      </IntelCardBody>
    </IntelCard>
  );
}

function OrchestrationDemo({ lang }) {
  const ar = lang === 'ar';
  const map = Object.fromEntries(AGENTS.map((x) => [x.id, x]));
  const fire = ['cos', 'relationship', 'strategy', 'comms'];
  return (
    <IntelCard>
      <IntelCardBody>
        <IntelSectionHead
          title={ar ? 'تنسيق LangGraph' : 'LangGraph orchestration'}
          action={<CcIcon name="workflow" size={18} style={{ color: 'var(--accent-bright)' }} />}
          style={{ marginBottom: 14 }}
        />
        <p className="muted" style={{ marginTop: 0, fontSize: 14, lineHeight: 1.55 }}>
          {ar ? 'تُفعّل معظم الاستعلامات عدة وكلاء في آنٍ واحد — يجمع المنسّق مخرجاتهم في رد تنفيذي موحّد.' : 'Most executive queries activate multiple agents simultaneously — the orchestrator synthesises their outputs into one unified response.'}
        </p>
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 14, padding: 18, marginTop: 4 }}>
          <div className="muted-3" style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>{ar ? 'مثال' : 'Example query'}</div>
          <div className="type-title" style={{ fontSize: 16, marginBottom: 18 }}>{ar ? '«جهّز لي إحاطة عن اجتماع مجلس DREC غداً».' : '"Brief me on tomorrow\'s DREC board meeting."'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {fire.map((id, i) => (
              <Fragment key={id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid ' + map[id].color, borderRadius: 11, padding: '9px 12px' }}>
                  <CcIcon name={map[id].icon} size={15} style={{ color: map[id].color }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600 }}>{map[id].name.replace(' AI', '')}</span>
                </div>
                {i < fire.length - 1 && <CcIcon name="plus" size={14} className="muted-3" />}
              </Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 16, color: 'var(--status-good)' }}>
            <CcIcon name="zap" size={15} /><span style={{ fontSize: 13, fontWeight: 600 }}>{ar ? 'إحاطة موحّدة في أقل من 30 ثانية' : 'One unified 2-minute brief in under 30 seconds'}</span>
          </div>
        </div>
      </IntelCardBody>
    </IntelCard>
  );
}

function IntegrationsGrid({ lang }) {
  const ar = lang === 'ar';
  return (
    <IntelCard>
      <IntelCardBody>
      <IntelSectionHead
        title={ar ? 'تكاملات البيانات المباشرة' : 'Live data integrations'}
        action={<span className="pill ghost" style={{ height: 24, fontSize: 11 }}>{ar ? 'كلها في المرحلة الأولى' : 'All in Phase 1'}</span>}
        style={{ marginBottom: 14 }}
      />
      <div className="grid arch-integ-grid">
        {INTEGRATIONS.map((it) => (
          <div key={it.name} className="arch-integ-tile">
            <div style={{ width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', background: 'var(--chip-bg)', color: 'var(--accent)', flex: 'none' }}><CcIcon name={it.icon} size={17} /></div>
            <div className="arch-integ-tile__main">
              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</div>
              <div className="muted-3 arch-integ-tile__sys">{it.sys}</div>
            </div>
            <span className="pill ghost" style={{ height: 22, fontSize: 10.5, flex: 'none' }}>{it.wk}</span>
          </div>
        ))}
      </div>
      </IntelCardBody>
    </IntelCard>
  );
}

function DeliveryPlan({ lang }) {
  const ar = lang === 'ar';
  return (
    <IntelCard>
      <IntelCardBody>
      <IntelSectionHead
        title={ar ? 'خطة التسليم — 8 أسابيع' : 'Eight-week delivery plan'}
        action={<span className="pill good" style={{ height: 24, fontSize: 11 }}><CcIcon name="flag" size={12} />{ar ? 'الانطلاق: الأسبوع 8' : 'Go-live: Week 8'}</span>}
        style={{ marginBottom: 18 }}
      />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', insetInlineStart: 19, top: 6, bottom: 6, width: 2, background: 'var(--line)' }}></div>
        <div style={{ display: 'grid', gap: 4 }}>
          {PLAN.map((p, i) => (
            <div key={p.w} style={{ display: 'flex', gap: 16, padding: '11px 0', position: 'relative' }}>
              <div style={{ width: 40, flex: 'none', display: 'flex', justifyContent: 'center' }}>
                <div className="kpi-num" style={{ width: 40, height: 40, borderRadius: 11, background: i === 7 ? 'var(--petrol-700)' : 'var(--surface)', color: i === 7 ? '#fff' : 'var(--accent)', border: '1.5px solid ' + (i === 7 ? 'var(--petrol-700)' : 'var(--line-strong)'), display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, position: 'relative', zIndex: 1 }}>{p.w}</div>
              </div>
              <div style={{ flex: 1, paddingTop: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span className="type-title" style={{ fontSize: 14.5 }}>{p.focus}</span>
                  <span className="pill ghost" style={{ height: 22, fontSize: 10.5 }}><CcIcon name="check" size={11} />{p.gate}</span>
                </div>
                <div className="muted" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{p.deliver}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </IntelCardBody>
    </IntelCard>
  );
}

export function ArchitecturePage() {
  const { settings } = useApp();
  const lang = settings.language === 'ar' ? 'ar' : 'en';
  const ar = lang === 'ar';
  return (
    <div className="grid mi-stagger cc-page" style={{ gap: 22 }}>
      <div className="section-head" style={{ marginBottom: -2 }}>
        <div>
          <div className="eyebrow">{ar ? 'بنية النظام' : 'System architecture'}</div>
          <h2 style={{ fontSize: 24, marginTop: 4 }}>{ar ? 'خمسة وكلاء متخصصين، منسّقون كفريق واحد' : 'Five specialised agents, orchestrated as one team'}</h2>
        </div>
        <span className="pill ghost"><CcIcon name="shield-check" size={13} />Azure UAE North</span>
      </div>
      <div className="grid cc-grid-agents">
        {AGENTS.map((a) => <AgentCard key={a.id} a={a} lang={lang} />)}
      </div>
      <OrchestrationDemo lang={lang} />
      <IntegrationsGrid lang={lang} />
      <DeliveryPlan lang={lang} />
    </div>
  );
}

