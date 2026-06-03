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
import { TREND_ICON } from '../../command-centre/utils';
import { IntelCard, IntelCardBody, IntelIconBox } from '../../command-centre/CcCard';
import { CcEscalationPanel } from '../../command-centre/CcEscalationFeed';

function DeptCard({ d, lang, onOpen }) {
  const ar = lang === 'ar';
  const toneColor = { good: 'var(--status-good)', warn: 'var(--status-warn)', risk: 'var(--status-risk)' }[d.rag];
  const highRisks = d.risks.filter((r) => r.sev === 'High').length;
  return (
    <IntelCard interactive onClick={() => onOpen(d.id)} style={{ display: 'flex', flexDirection: 'column' }}>
      <IntelCardBody style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <IntelIconBox icon={d.icon} color={toneColor} background={'color-mix(in oklab,' + toneColor + ' 13%, transparent)'} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="muted-3 mono" style={{ fontSize: 10.5 }}>DEPT {d.n}</div>
            <div className="type-title" style={{ fontSize: 15.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ar ? d.nameAr : d.name}</div>
          </div>
          <CcIcon name={TREND_ICON[d.trend]} size={17} style={{ color: d.trend === 'up' ? 'var(--status-good)' : d.trend === 'down' ? 'var(--status-risk)' : 'var(--ink-3)', flex: 'none' }} />
        </div>
        <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.5, flex: 1 }}>{d.summary}</p>
        <div className="perf-dept-card__foot">
          <RagPill rag={d.rag} lang={lang} />
          {highRisks > 0 && (
            <span className="pill risk" style={{ height: 24 }}>
              <CcIcon name="alert-triangle" size={12} />
              {highRisks} {ar ? 'عالي' : 'high'}
            </span>
          )}
          <div className="perf-dept-card__spark">
            <Sparkline data={d.series} color={toneColor} height={28} fill={false} />
          </div>
        </div>
      </IntelCardBody>
    </IntelCard>
  );
}

function EscalationBanner({ lang, onOpen }) {
  const ar = lang === 'ar';
  const items = [
    {
      id: 'esc-hr',
      deptId: 'hr',
      icon: 'users',
      title: ar ? 'دوران >15٪ · وظيفتان حرجتان شاغرتان' : 'Attrition >15% · 2 critical roles unfilled',
      sev: 'High',
    },
    {
      id: 'esc-procurement',
      deptId: 'procurement',
      icon: 'package',
      title: ar ? 'عقد مركز البيانات ينتهي خلال 24 يوماً' : 'Data-centre contract expires in 24 days',
      sev: 'High',
    },
    {
      id: 'esc-legal',
      deptId: 'legal',
      icon: 'scale',
      title: ar ? 'إيداع FSRA AML مستحق خلال 11 يوماً' : 'FSRA AML filing due in 11 days',
      sev: 'High',
    },
    {
      id: 'esc-sales',
      deptId: 'sales',
      icon: 'target',
      title: ar ? 'تفويض صندوق سيادي 90M درهم متوقف' : 'AED 90M sovereign-fund mandate stalled',
      sev: 'Medium',
    },
  ];
  return (
    <IntelCard className="intel-card--escalation">
      <IntelCardBody className="esc-intel-body">
        <CcEscalationPanel items={items} ar={ar} onSelect={onOpen} />
      </IntelCardBody>
    </IntelCard>
  );
}

const SEV_COLOR = { High: 'risk', Medium: 'warn', Low: 'info' };

function DeptDetail({ d, lang, onBack }) {
  const ar = lang === 'ar';
  const toneColor = { good: 'var(--status-good)', warn: 'var(--status-warn)', risk: 'var(--status-risk)' }[d.rag];
  const Block = ({ icon, title, children, accent }) => (
    <IntelCard>
      <IntelCardBody>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
          <CcIcon name={icon} size={17} style={{ color: accent || 'var(--accent)' }} />
          <div className="type-title" style={{ fontSize: 15 }}>{title}</div>
        </div>
        {children}
      </IntelCardBody>
    </IntelCard>
  );
  return (
    <div className="grid mi-stagger cc-page perf-page rise" style={{ gap: 20 }}>
      <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={onBack}><CcIcon name={ar ? 'arrow-right' : 'arrow-left'} size={15} />{ar ? 'كل الإدارات' : 'All departments'}</button>

      <IntelCard accentColor={toneColor}>
        <div style={{ height: 4, background: toneColor }} aria-hidden />
        <IntelCardBody className="perf-dept-hero" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'color-mix(in oklab,' + toneColor + ' 13%, transparent)', color: toneColor, flex: 'none' }}><CcIcon name={d.icon} size={26} /></div>
          <div className="perf-dept-hero__copy" style={{ flex: 1, minWidth: 0 }}>
            <div className="muted-3 mono" style={{ fontSize: 11 }}>DEPT {d.n} · {ar ? 'يرفع إلى كبير مسؤولي الاستراتيجية' : 'Reports to CSO'}</div>
            <h2 style={{ fontSize: 24 }}>{ar ? d.nameAr : d.name}</h2>
          </div>
          <RagPill rag={d.rag} lang={lang} />
          <div className="perf-dept-hero__chart">
            <div style={{ width: '100%', maxWidth: 130 }}><Sparkline data={d.series} color={toneColor} height={42} /></div>
            <div className="muted-3" style={{ fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>{ar ? 'آخر 8 فترات' : 'last 8 periods'}</div>
          </div>
        </IntelCardBody>
      </IntelCard>

      {/* KPIs */}
      <Block icon="activity" title={ar ? 'مؤشرات الأداء المتتبعة' : 'KPIs tracked'}>
        <div className="grid perf-detail-kpis">
          {d.kpis.map((k) => {
            const c = { good: 'var(--status-good)', warn: 'var(--status-warn)', risk: 'var(--status-risk)' }[k.tone];
            return (
              <div key={k.k}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                  <span className="muted" style={{ fontSize: 12.5 }}>{k.k}</span>
                  <span className="kpi-num" style={{ fontSize: 15, fontWeight: 600, color: c }}>{k.v}</span>
                </div>
                <div className="track"><span style={{ width: Math.min(k.pct, 100) + '%', background: c }}></span></div>
                {k.note && <div className="muted-3" style={{ fontSize: 11, marginTop: 5 }}>{k.note}</div>}
              </div>
            );
          })}
        </div>
      </Block>

      <div className="grid perf-detail-split">
        <Block icon="award" title={ar ? 'أبرز الإنجازات' : 'Key achievements'} accent="var(--status-good)">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 11 }}>
            {d.achievements.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.45 }}>
                <CcIcon name="check-circle-2" size={16} style={{ color: 'var(--status-good)', flex: 'none', marginTop: 1 }} /><span>{a}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block icon="alert-triangle" title={ar ? 'المخاطر والمخاوف' : 'Concerns & risks'} accent="var(--status-warn)">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
            {d.risks.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, lineHeight: 1.45 }}>
                <span className={'pill ' + SEV_COLOR[r.sev]} style={{ height: 21, fontSize: 10, flex: 'none', marginTop: 1 }}>{r.sev}</span><span>{r.t}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <div className="grid perf-detail-split">
        {d.blockers.length > 0 && (
          <Block icon="construction" title={ar ? 'المعوقات' : 'Blockers'} accent="var(--status-risk)">
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
              {d.blockers.map((b, i) => <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.45 }}><CcIcon name="x-circle" size={16} style={{ color: 'var(--status-risk)', flex: 'none', marginTop: 1 }} /><span>{b}</span></li>)}
            </ul>
          </Block>
        )}
        <Block icon="zap" title={ar ? 'إجراءات قيادية موصى بها' : 'Recommended leadership actions'} accent="var(--accent-bright)">
          <div style={{ display: 'grid', gap: 9 }}>
            {d.actions.map((a, i) => (
              <div key={i} className="perf-action-row">
                <div className="perf-action-row__n kpi-num"><span>{i + 1}</span></div>
                <span className="perf-action-row__text">{a}</span>
                <CcIcon name="arrow-right" size={15} className="muted-3 perf-action-row__arrow" />
              </div>
            ))}
          </div>
        </Block>
      </div>

      <IntelCard className="intel-card--muted">
        <IntelCardBody style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
          <CcIcon name="bell-ring" size={17} style={{ color: 'var(--status-warn)', flex: 'none' }} />
          <span className="muted" style={{ fontSize: 13 }}><strong style={{ color: 'var(--ink)' }}>{ar ? 'عتبة التنبيه:' : 'Alert threshold:'}</strong> {d.alert}</span>
        </IntelCardBody>
      </IntelCard>
    </div>
  );
}

function OrgOverview({ lang }) {
  const ar = lang === 'ar';
  const segs = [
    { value: 4, color: 'var(--status-good)', label: ar ? 'على المسار' : 'On track' },
    { value: 4, color: 'var(--status-warn)', label: ar ? 'مراقبة' : 'Watch' },
    { value: 1, color: 'var(--status-risk)', label: ar ? 'إجراء' : 'Action' },
  ];
  return (
    <IntelCard rise>
      <IntelCardBody>
      <div className="perf-org">
        <div className="perf-org__donut">
          <Donut segments={segs} centerTop={9} centerBot={ar ? 'إدارات' : 'depts'} />
          <div className="perf-org__legend">
            {segs.map((s) => (
              <div key={s.label} className="perf-org__legend-row">
                <span className="perf-org__legend-swatch" style={{ background: s.color }} />
                <span className="perf-org__legend-label">{s.label}</span>
                <span className="kpi-num perf-org__legend-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="perf-org__momentum">
          <div className="perf-org__momentum-head">
            <div className="eyebrow">{ar ? 'مؤشر الزخم المؤسسي' : 'Organisational momentum index'}</div>
            <div className="perf-org__kpis">
              {[
                { v: 88, l: 'D33', s: '' },
                { v: 12, l: ar ? 'ساعات/أسبوع موفّرة' : 'hrs/wk saved', s: '' },
                { v: 95, l: ar ? 'تغطية الإحاطات' : 'brief coverage', s: '%' },
              ].map((m) => (
                <div key={m.l} className="perf-org__kpi">
                  <div className="kpi-num perf-org__kpi-value">
                    <AnimatedNumber value={m.v} suffix={m.s} />
                  </div>
                  <div className="muted-3 perf-org__kpi-label">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="perf-org__chart">
            <MomentumChart data={MOMENTUM.data} labels={MOMENTUM.labels} height={150} />
          </div>
        </div>
      </div>
      </IntelCardBody>
    </IntelCard>
  );
}

export function PerformanceCommandPage() {
  const { settings } = useApp();
  const lang = settings.language === 'ar' ? 'ar' : 'en';
  const [selected, setSelected] = useState<string | null>(null);
  const ar = lang === 'ar';
  const d = DEPARTMENTS.find((x) => x.id === selected);
  if (d) return <DeptDetail d={d} lang={lang} onBack={() => setSelected(null)} />;
  const counts = DEPARTMENTS.reduce((a, x) => { a[x.rag]++; return a; }, { good: 0, warn: 0, risk: 0 });
  return (
    <div className="grid mi-stagger cc-page perf-page" style={{ gap: 22 }}>
      <div className="section-head" style={{ marginBottom: 0 }}>
        <div>
          <div className="eyebrow">{ar ? 'إدارة الأداء · كل الإدارات' : 'Performance management · all departments'}</div>
          <h2 style={{ fontSize: 24, marginTop: 4 }}>{ar ? 'فريقك بالكامل، مباشر، في عرض واحد' : 'Your whole team, live, in one view'}</h2>
        </div>
        <div className="section-head__actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="pill good">{counts.good} {ar ? 'على المسار' : 'on track'}</span>
          <span className="pill warn">{counts.warn} {ar ? 'مراقبة' : 'watch'}</span>
          <span className="pill risk">{counts.risk} {ar ? 'إجراء' : 'action'}</span>
        </div>
      </div>
      <EscalationBanner lang={lang} onOpen={setSelected} />
      <OrgOverview lang={lang} />
      <div className="grid mi-stagger perf-dept-grid">
        {DEPARTMENTS.map((dd) => <DeptCard key={dd.id} d={dd} lang={lang} onOpen={setSelected} />)}
      </div>
    </div>
  );
}

