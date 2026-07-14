/** DMCC Command Centre — executive intelligence mock data */


// ---------- Home signal cards — updated 14 Jul 2026 ----------
export const SIGNALS = [
  {
    id: 'market', icon: 'trending-up', tone: 'good', label: 'Market Movements',
    headline: 'UAE maintains 2nd place in 2026 Commodity Trade Index — South-South trade at 35%',
    body: 'DMCC Future of Trade Report 2026 finds geopolitical rupture reshaping trade architecture. Dubai diamond trade hit USD 41.7B in 2025. Gold and precious metals volumes steady; lab-grown diamonds mainstreaming.',
    metric: '35%', metricLabel: 'South-South trade', spark: [28,30,31,32,33,34,34,35,35,35],
    ar: { label: 'تحركات السوق', headline: 'الإمارات تحافظ على المركز الثاني في مؤشر تجارة السلع 2026',
      body: 'تقرير مستقبل التجارة 2026 يجد أن الصدمات الجيوسياسية تعيد تشكيل التجارة. تجارة الماس في دبي بلغت 41.7 مليار دولار في 2025.', metricLabel: 'تجارة الجنوب-الجنوب' }
  },
  {
    id: 'competitor', icon: 'crosshair', tone: 'warn', label: 'Competitor Activity',
    headline: 'Regional free zones accelerating fintech and crypto licensing — DMCC positioning at stake',
    body: 'ADGM and DIFC expanding digital asset frameworks. DMCC-Tether MoU advancing blockchain collaboration. Competitor zones targeting commodities traders with new incentives.',
    metric: '4,000+', metricLabel: 'DMCC tech companies', spark: [3200,3400,3600,3700,3800,3900,3950,4000,4100,4200],
    ar: { label: 'نشاط المنافسين', headline: 'المناطق الحرة الإقليمية تسرّع تراخيص التكنولوجيا المالية والعملات الرقمية',
      body: 'ADGM وDIFC توسّعان أطر الأصول الرقمية. مذكرة تفاهم DMCC-Tether تتقدم في التعاون البلوك تشين.', metricLabel: 'شركات DMCC التقنية' }
  },
  {
    id: 'investment', icon: 'sparkles', tone: 'good', label: 'Expansion Opportunities',
    headline: 'Uptown Dubai activation — BlockDown Dubai 2027 and DMCC Campus pipeline',
    body: 'Strategic partnership with EAK Digital for BlockDown Dubai at Uptown Dubai. DMCC Campus and DMCC Intelligence unified knowledge platform in planning. Foundations Framework expanding wealth solutions.',
    metric: '26,000+', metricLabel: 'member companies', spark: [22000,23000,24000,24500,25000,25200,25500,25800,26000,26200],
    ar: { label: 'فرص التوسع', headline: 'تفعيل أبتاون دبي — BlockDown Dubai 2027 وخط أنابيب DMCC Campus',
      body: 'شراكة استراتيجية مع EAK Digital. منصة DMCC Intelligence الموحّدة قيد التخطيط. إطار Foundations يوسّع حلول الثروة.', metricLabel: 'شركات الأعضاء' }
  },
  {
    id: 'performance', icon: 'activity', tone: 'warn', label: 'Internal Performance Signals',
    headline: 'Member portal onboarding SLA at 4.2 days — 12 licence renewals pending escalation',
    body: 'Renewal processing crossed threshold in Q2 peak season. Three critical member account manager roles unfilled in diamonds ecosystem. Member satisfaction holding at 8.1/10.',
    metric: '4.2d', metricLabel: 'avg onboarding', spark: [3.1,3.2,3.4,3.6,3.8,4.0,4.1,4.2,4.2,4.2], deptLink: 'members',
    ar: { label: 'مؤشرات الأداء الداخلي', headline: 'اتفاقية مستوى الخدمة للتسجيل 4.2 يوم — 12 تجديد ترخيص بانتظار التصعيد',
      body: 'معالجة التجديد تجاوزت العتبة في موسم الذروة. ثلاث وظائف مدير حسابات حرجة شاغرة في منظومة الماس.', metricLabel: 'متوسط التسجيل' }
  },
  {
    id: 'regulatory', icon: 'gavel', tone: 'warn', label: 'Regulatory Shifts',
    headline: 'UAE Corporate Tax free zone qualifying income rules — member advisory update required',
    body: 'Federal Decree-Law No. 47 of 2022 amendments affecting free zone 0% rate eligibility. DMCC qualified free zone status confirmed. Member communications on qualifying income criteria due this month.',
    metric: '0%', metricLabel: 'qualifying CT rate', spark: [0,0,0,0,0,0,0,0,0,0], link: 'regulatory',
    ar: { label: 'تحولات تنظيمية', headline: 'قواعد ضريبة الشركات للدخل المؤهل في المنطقة الحرة — تحديث استشاري للأعضاء مطلوب',
      body: 'تعديلات المرسوم الاتحادي رقم 47 لعام 2022 تؤثر على أهلية معدل 0٪. حالة DMCC كمنطقة حرة مؤهلة مؤكدة.', metricLabel: 'معدل ضريبة الشركات المؤهل' }
  },
  {
    id: 'followup', icon: 'list-checks', tone: 'info', label: 'Follow-Up Actions',
    headline: '6 actions awaiting your decision',
    body: 'Future of Trade Singapore launch (15 Jul), Dubai Diamond Conference speaking slot, DMCC Cyber launch narrative, Tether partnership announcement, Uptown Dubai investor briefing, Honey Centre Naturalim France Miel MoU.',
    metric: '6', metricLabel: 'open items', spark: [4,5,5,5,6,5,6,6,6,6],
    ar: { label: 'إجراءات المتابعة', headline: '6 إجراءات بانتظار قرارك',
      body: 'إطلاق مستقبل التجارة سنغافورة (15 يوليو)، فتحة التحدث في مؤتمر دبي للماس، سردية إطلاق DMCC Cyber، إعلان شراكة Tether.', metricLabel: 'بنود مفتوحة' }
  },
];

// ---------- Departments ----------
export const DEPARTMENTS = [
  {
    id: 'members', n: '01', name: 'Member Services', nameAr: 'خدمات الأعضاء', icon: 'users', rag: 'warn', trend: 'flat',
    summary: 'Onboarding SLAs slipping in peak season; member satisfaction holding but renewal velocity needs attention.',
    kpis: [
      { k: 'Active members', v: '26,142', pct: 98, tone: 'good' },
      { k: 'Avg setup time', v: '4.2 days', pct: 72, tone: 'warn', note: '↑ from 3.6 days' },
      { k: 'Renewal rate', v: '94.8%', pct: 95, tone: 'good' },
      { k: 'Member NPS', v: '8.1 / 10', pct: 81, tone: 'good' },
      { k: 'Portal adoption', v: '78%', pct: 78, tone: 'good' },
    ],
    achievements: ['Member portal training series launched Jul 2026', 'E-license delivery within 10 working days maintained', '26,000+ company milestone surpassed'],
    risks: [ {sev:'High', t:'12 licence renewals pending escalation beyond SLA'}, {sev:'Medium', t:'Peak-season onboarding queue at 4.2-day average'} ],
    blockers: ['Three member account manager vacancies in diamonds ecosystem', 'Manual document verification step not yet automated'],
    actions: ['Approve temporary resourcing for renewal peak', 'Escalate 12 pending renewals to executive review', 'Accelerate portal automation for document verification'],
    alert: 'Onboarding SLA >5 days OR renewal backlog >10 cases',
    series: [3.2,3.3,3.5,3.6,3.7,3.9,4.0,4.2],
  },
  {
    id: 'commodities', n: '02', name: 'Commodities & Trade', nameAr: 'السلع والتجارة', icon: 'gem', rag: 'good', trend: 'up',
    summary: 'Diamond trade at record USD 41.7B; gold ecosystem strong. London Diamond Bourse MoU advancing global corridor.',
    kpis: [
      { k: 'Diamond trade (2025)', v: 'USD 41.7B', pct: 96, tone: 'good' },
      { k: 'Rough tenders (QTD)', v: '8 active', pct: 88, tone: 'good' },
      { k: 'Gold ecosystem members', v: '+12% YoY', pct: 84, tone: 'good' },
      { k: 'Lab-grown diamond share', v: '18%', pct: 72, tone: 'warn' },
      { k: 'Agri commodities events', v: '14 QTD', pct: 90, tone: 'good' },
    ],
    achievements: ['Record USD 41.7B diamond trade through Dubai in 2025', 'Dubai Diamond Exchange — London Diamond Bourse MoU signed', 'Future of Trade 2026 report published — Rebuilding Through Rupture'],
    risks: [ {sev:'Medium', t:'Supply chain shocks affecting cacao and coffee origins'}, {sev:'Low', t:'Lab-grown diamond pricing volatility'} ],
    blockers: ['Dubai Diamond Conference 2026 keynote slot awaiting CEO confirmation'],
    actions: ['Confirm CEO speaking slot for Dubai Diamond Conference 26 Oct', 'Review Honey Centre Naturalim France Miel partnership progress'],
    alert: 'Major commodity trade disruption or tender cancellation',
    series: [32,34,36,37,38,39,40,41.7],
  },
  {
    id: 'bizdev', n: '03', name: 'Business Development', nameAr: 'تطوير الأعمال', icon: 'target', rag: 'good', trend: 'up',
    summary: 'FDI pipeline healthy — 15% of Dubai annual FDI flows through DMCC. China precious metals webinar and India growth talks active.',
    kpis: [
      { k: 'New licences (QTD)', v: '1,842', pct: 92, tone: 'good' },
      { k: 'FDI contribution', v: '15%', pct: 90, tone: 'good' },
      { k: 'Country coverage', v: '180+', pct: 95, tone: 'good' },
      { k: 'Partner pipeline', v: 'AED 2.1B', pct: 86, tone: 'good' },
      { k: 'Conversion rate', v: '34%', pct: 68, tone: 'warn' },
    ],
    achievements: ['Tether MoU for blockchain and tokenisation collaboration', 'EAK Digital BlockDown Dubai 2027 partnership', 'Business Growth Talks Mumbai edition delivered'],
    risks: [ {sev:'Medium', t:'Competitor free zone incentive packages in fintech segment'} ],
    blockers: ['ChinaJoy 2026 gaming delegation logistics pending'],
    actions: ['Personally engage Tether partnership announcement timeline', 'Approve China precious metals sector webinar narrative'],
    alert: 'FDI pipeline deviation >15% vs forecast',
    series: [1400,1500,1580,1650,1700,1750,1800,1842],
  },
  {
    id: 'it', n: '04', name: 'Technology & Digital', nameAr: 'التقنية والرقمية', icon: 'cpu', rag: 'good', trend: 'up',
    summary: 'DMCC Cyber launch formalising 4,000+ tech ecosystem. Member portal upgrades on track. AI adoption climbing.',
    kpis: [
      { k: 'Tech ecosystem', v: '4,000+', pct: 88, tone: 'good' },
      { k: 'System uptime', v: '99.97%', pct: 99, tone: 'good' },
      { k: 'Cyber posture', v: 'Strong', pct: 92, tone: 'good' },
      { k: 'AI adoption (internal)', v: '72%', pct: 72, tone: 'warn' },
      { k: 'DMCC Intelligence', v: 'Planning', pct: 60, tone: 'warn' },
    ],
    achievements: ['DMCC Cyber ecosystem uniting 4,000+ companies', 'Member portal v3 upgrade shipped', 'Zero critical security incidents this quarter'],
    risks: [ {sev:'Medium', t:'DMCC Campus knowledge platform dependency on vendor delivery'}, {sev:'Low', t:'Legacy CRM integration amber'} ],
    blockers: ['DMCC Intelligence platform vendor API delivery slipping'],
    actions: ['Review DMCC Campus platform escalation path', 'Approve DMCC Cyber launch communications pack'],
    alert: 'Security incident or critical platform delay >2 weeks',
    series: [3200,3400,3600,3700,3800,3900,3950,4000],
  },
  {
    id: 'finance', n: '05', name: 'Finance', nameAr: 'المالية', icon: 'landmark', rag: 'good', trend: 'up',
    summary: 'Revenue on track; free zone tax advisory programme budget approved. Forecast accuracy strong.',
    kpis: [
      { k: 'Revenue vs target', v: '103%', pct: 103, tone: 'good' },
      { k: 'Budget performance', v: '96%', pct: 96, tone: 'good' },
      { k: 'Cash flow', v: 'Healthy', pct: 94, tone: 'good' },
      { k: 'Forecast accuracy', v: '97%', pct: 97, tone: 'good' },
      { k: 'Corporate tax advisory', v: 'Active', pct: 85, tone: 'good' },
    ],
    achievements: ['Revenue 3% ahead of forecast', 'Corporate tax member advisory programme launched', 'Annual Report 2025 published'],
    risks: [ {sev:'Low', t:'Unplanned Uptown Dubai marketing commitment pending approval'} ],
    blockers: [],
    actions: ['Note Uptown Dubai activation capital commitment'],
    alert: 'Budget variance >10% or unplanned capital commitment',
    series: [94,95,96,97,98,99,101,103],
  },
  {
    id: 'strategy', n: '06', name: 'Strategy & Ecosystems', nameAr: 'الاستراتيجية والمنظومات', icon: 'compass', rag: 'good', trend: 'up',
    summary: 'Future of Trade 2026 launched globally. Ecosystem initiatives on track; Uptown Dubai milestone at risk of 3-week slip.',
    kpis: [
      { k: 'Initiative progress', v: '82%', pct: 82, tone: 'good' },
      { k: 'Ecosystem events (YTD)', v: '47', pct: 88, tone: 'good' },
      { k: 'Trade report reach', v: '28 markets', pct: 90, tone: 'good' },
      { k: 'Sustainability score', v: '86', pct: 86, tone: 'good' },
    ],
    achievements: ['Future of Trade 2026 — Rebuilding Through Rupture published', 'Commodity Trade Index — UAE 2nd globally', 'Foundations Framework wealth solutions announced'],
    risks: [ {sev:'Medium', t:'Uptown Dubai investor briefing milestone at risk of 3-week slip'} ],
    blockers: ['Awaiting design partner input on Uptown Dubai launch narrative'],
    actions: ['Convene Uptown Dubai working session with Marketing and BizDev'],
    alert: 'Strategic milestone delay >4 weeks',
    series: [72,74,76,77,78,79,80,82],
  },
  {
    id: 'events', n: '07', name: 'Events & Programming', nameAr: 'الفعاليات والبرامج', icon: 'calendar', rag: 'good', trend: 'up',
    summary: 'Strong event calendar; Dubai Diamond Conference and Precious Metals Conference flagship events on track.',
    kpis: [
      { k: 'Events (YTD)', v: '47', pct: 90, tone: 'good' },
      { k: 'Attendance vs target', v: '108%', pct: 108, tone: 'good' },
      { k: 'Webinar reach', v: '12,400', pct: 85, tone: 'good' },
      { k: 'Sponsor pipeline', v: 'AED 18M', pct: 82, tone: 'good' },
    ],
    achievements: ['Future of Trade Singapore launch 15 Jul confirmed', 'Koin International Rough Diamond Tender hosted', 'Play The Future gaming event delivered'],
    risks: [ {sev:'Low', t:'CV Summit 2026 crypto track needs CEO keynote confirmation'} ],
    blockers: ['Awaiting CEO availability for Dubai Diamond Conference keynote'],
    actions: ['Confirm CEO speaking slot for Dubai Diamond Conference 26 Oct'],
    alert: 'Flagship event cancellation or attendance <70% target',
    series: [28,32,35,38,40,42,44,47],
  },
  {
    id: 'legal', n: '08', name: 'Legal & Compliance', nameAr: 'القانونية والامتثال', icon: 'scale', rag: 'warn', trend: 'flat',
    summary: 'Filings current; corporate tax advisory rollout and member disclosure updates in progress.',
    kpis: [
      { k: 'Regulatory pipeline', v: '7 matters', pct: 78, tone: 'warn' },
      { k: 'Filing status', v: '98% current', pct: 98, tone: 'good' },
      { k: 'Open legal matters', v: '8', pct: 72, tone: 'warn' },
      { k: 'Policy updates', v: '3 pending', pct: 65, tone: 'warn' },
    ],
    achievements: ['98% of regulatory filings current', 'Qualified free zone status confirmed under UAE CT Law', 'DMCC Disputes Centre training programme live'],
    risks: [ {sev:'High', t:'Corporate tax qualifying income member advisory due within 14 days'}, {sev:'Medium', t:'Cross-border commodities licensing matter escalated'} ],
    blockers: ['Awaiting policy input from Finance on member tax advisory templates'],
    actions: ['Approve resourcing to clear corporate tax member advisory on time', 'Review escalated cross-border licensing matter'],
    alert: 'Compliance deadline missed or regulatory matter escalated',
    series: [5,5,6,6,7,7,7,8],
  },
  {
    id: 'marketing', n: '09', name: 'Marketing & Communications', nameAr: 'التسويق والاتصال', icon: 'megaphone', rag: 'good', trend: 'up',
    summary: 'Strong campaign ROI post-Future of Trade launch. DMCC Cyber and Uptown Dubai narratives need CEO sign-off.',
    kpis: [
      { k: 'Campaign ROI', v: '4.1x', pct: 88, tone: 'good' },
      { k: 'Media coverage', v: '+42%', pct: 90, tone: 'good' },
      { k: 'Brand sentiment', v: '+78', pct: 88, tone: 'good' },
      { k: 'Social engagement', v: '+24%', pct: 82, tone: 'good' },
    ],
    achievements: ['Future of Trade 2026 global media coverage +42%', 'Campaign ROI reached 4.1x', 'Annual Report 2025 digital launch'],
    risks: [ {sev:'Low', t:'Uptown Dubai investor narrative needs CEO approval'} ],
    blockers: ['Awaiting CEO sign-off on DMCC Cyber launch messaging'],
    actions: ['Approve DMCC Cyber and Uptown Dubai launch communications'],
    alert: 'Negative media spike or major reputational event',
    series: [3.2,3.4,3.6,3.7,3.8,3.9,4.0,4.1],
  },
];

// ---------- Five agents ----------
export const AGENTS = [
  { id: 'cos', n:'01', name: 'Chief of Staff AI', icon: 'calendar-clock', color:'var(--teal-300)',
    fn: 'Operational cadence of the executive office',
    caps: ['Auto pre-meeting briefs', 'Post-meeting action extraction', 'Action register tracking', 'Board pack assembly', 'Morning briefing orchestration'],
    integ: 'Microsoft Graph · CRM register · SharePoint' },
  { id: 'strategy', n:'02', name: 'Strategy AI', icon: 'compass', color:'var(--gold-500)',
    fn: 'Always-available strategy & trade intelligence team',
    caps: ['Commodities benchmarking', 'Live market intelligence', 'FDI opportunity scoring', 'Ecosystem alignment tracking', 'Scenario planning'],
    integ: 'Bloomberg / Refinitiv · trade feeds · KB' },
  { id: 'policy', n:'03', name: 'Policy AI', icon: 'gavel', color:'var(--status-info)',
    fn: 'Regulatory intelligence & policy drafting',
    caps: ['Live monitoring of UAE & global trade policy', 'Policy drafting', 'International benchmarking', 'Impact assessment'],
    integ: 'Regulatory RSS + APIs · UAE MoF portal' },
  { id: 'relationship', n:'04', name: 'Relationship AI', icon: 'network', color:'var(--sun-2)',
    fn: 'Institutional CRM memory',
    caps: ['Full interaction history', 'Living stakeholder profiles', 'Proactive follow-up alerts', 'Partnership tracking', 'Network mapping'],
    integ: 'CRM bidirectional sync · LinkedIn · Graph' },
  { id: 'comms', n:'05', name: 'Communications AI', icon: 'languages', color:'var(--status-good)',
    fn: 'All executive communications — EN & AR',
    caps: ['Speech drafting', 'Executive writing', 'Correspondence management', 'Bilingual board notes', 'CEO voice learning'],
    integ: 'Microsoft Graph email · KB · style loop' },
];

// ---------- Ecosystem benchmarking ----------
export const CENTRES = ['Gold','Diamonds','Tea','Coffee','Crypto','Tech'];

export const BENCH_DIMS: { d: string; src: string; v: number[] }[] = [
  { d: 'Member acquisition & retention',
    src: 'DMCC Annual Report 2025',
    v: [94, 82, 78, 80, 76, 88] },
  { d: 'Commodities trade volume & liquidity',
    src: 'Future of Trade Report 2026',
    v: [96, 98, 85, 82, 74, 70] },
  { d: 'Free zone tax & ownership advantage',
    src: 'UAE Corporate Tax Framework',
    v: [92, 88, 90, 86, 84, 82] },
  { d: 'Ecosystem programming & events',
    src: 'DMCC Events Calendar 2026',
    v: [90, 94, 88, 86, 82, 78] },
  { d: 'Digital infrastructure & member portal',
    src: 'DMCC Technology Dashboard',
    v: [88, 80, 76, 74, 90, 92] },
  { d: 'FDI attraction & global reach',
    src: 'Dubai FDI Monitor Q2 2026',
    v: [94, 86, 80, 78, 82, 88] },
  { d: 'Sustainability & ESG credentials',
    src: 'DMCC Sustainability Report 2025',
    v: [86, 84, 90, 88, 80, 82] },
  { d: 'Destination appeal (JLT & Uptown)',
    src: 'Uptown Dubai Development Brief',
    v: [88, 82, 78, 76, 74, 86] },
  { d: 'Regulatory compliance & disputes resolution',
    src: 'DMCC Legal Framework 2026',
    v: [92, 90, 88, 86, 88, 84] },
  { d: 'Innovation (AI, crypto, gaming)',
    src: 'DMCC Cyber Ecosystem Brief',
    v: [82, 76, 70, 68, 94, 96] },
  { d: 'Knowledge & thought leadership',
    src: 'Future of Trade Index 2026',
    v: [98, 92, 88, 86, 80, 78] },
  { d: 'Partnership & bourse connectivity',
    src: 'Dubai Diamond Exchange Review',
    v: [96, 98, 82, 80, 76, 72] },
];

// ---------- Briefing formats ----------
export const BRIEF_FORMATS = [
  { id:'premeeting', icon:'calendar-check', name:'Pre-meeting brief', desc:'Paste an agenda, email trail, or upload documents', time:'< 30s' },
  { id:'email', icon:'mail', name:'Email draft', desc:'Paste an email and get a ready-to-send reply', time:'< 20s' },
  { id:'boardpack', icon:'clipboard-list', name:'Board pack summary', desc:'Upload board materials — key decisions & risks', time:'< 60s' },
  { id:'stakeholder', icon:'id-card', name:'Stakeholder profile', desc:'Profile from notes, CRM, and uploaded context', time:'< 30s' },
];

// ---------- 8-week plan ----------
export const PLAN = [
  { w:'01', focus:'Pilot', deliver:'Personalised prototype · 5 deliverables · Member Services + Commodities + BizDev loaded · Arabic demonstrated', gate:'CEO approves full build' },
  { w:'02', focus:'Infrastructure', deliver:'Azure UAE North · Kubernetes · Weaviate + Neo4j · Azure AD SSO · RBAC · audit logging', gate:'DMCC IT security sign-off' },
  { w:'03', focus:'Knowledge System', deliver:'Ingestion pipeline · 50+ docs seeded · Knowledge Graph · SharePoint auto-sync', gate:'50 test queries pass' },
  { w:'04', focus:'Five Agents', deliver:'All 5 LangGraph agents · orchestration graph · all modules on seeded data', gate:'Agents pass CEO scenarios' },
  { w:'05', focus:'Market & Docs', deliver:'Bloomberg/Refinitiv · UAE MoF sync · trade feeds · 08:00 & 22:00 GST refresh', gate:'Briefing quality approved' },
  { w:'06', focus:'Relationship & Comms', deliver:'Graph calendar + email · CRM history · Arabic RTL complete', gate:'Arabic QA sign-off' },
  { w:'07', focus:'9 Depts + Regulatory', deliver:'ERP/CRM ETL for all 9 departments · regulatory feeds active', gate:'Dashboards reviewed by DMCC' },
  { w:'08', focus:'Go-Live', deliver:'Integration testing · security scan · CEO onboarding · go-live', gate:'CEO sign-off on system' },
];

// ---------- Integrations ----------
export const INTEGRATIONS = [
  { name:'Market Data', sys:'Bloomberg / Refinitiv Eikon', wk:'Week 5', icon:'trending-up' },
  { name:'Document Repository', sys:'SharePoint / DMS (Graph)', wk:'Week 5', icon:'folder-sync' },
  { name:'Calendar & Email', sys:'Microsoft Exchange (Graph)', wk:'Week 6', icon:'mail' },
  { name:'CRM & Relationships', sys:'Salesforce or equivalent', wk:'Week 6', icon:'contact' },
  { name:'Regulatory Intel', sys:'UAE MoF · DED · DMCC Authority', wk:'Week 7', icon:'gavel' },
  { name:'Member & Licensing', sys:'DMCC Member Portal API', wk:'Week 7', icon:'database' },
  { name:'DMCC Trade Portal', sys:'SharePoint + internal API', wk:'Week 5', icon:'building-2' },
  { name:'News & Intelligence', sys:'Reuters · Gulf News · commodity feeds', wk:'Week 5', icon:'newspaper' },
];

export const TICKER = [
  { k: 'DFM', v: '5,318.2', c: +0.41 },
  { k: 'Gold', v: '$2,428', c: +0.32 },
  { k: 'Diamonds', v: 'USD 41.7B', c: +2.4 },
  { k: 'Members', v: '26,142', c: +1.2 },
  { k: 'FDI Share', v: '15%', c: +0.3 },
  { k: 'South-South', v: '35%', c: +1.1 },
  { k: 'Tech Cos', v: '4,000+', c: +2.8 },
  { k: 'Towers', v: '87', c: 0 },
  { k: 'CTI Rank', v: '#2 UAE', c: 0 },
  { k: 'USD/AED', v: '3.6725', c: 0.0 },
];

export const MOMENTUM = { data: [74, 76, 75, 78, 80, 79, 82, 84, 83, 86, 88, 90], labels: ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'] };

export const FLOWS = [
  { k: 'GCC', kAr: 'الخليج', flow: 94, v: '+5.1%' },
  { k: 'South Asia', kAr: 'جنوب آسيا', flow: 82, v: '+4.2%' },
  { k: 'East Asia', kAr: 'شرق آسيا', flow: 76, v: '+3.6%' },
  { k: 'Europe', kAr: 'أوروبا', flow: 68, v: '+2.4%' },
  { k: 'Africa', kAr: 'أفريقيا', flow: 62, v: '+3.8%' },
];

export const REGULATORY = [
  { body: 'UAE MoF', region: 'UAE', topic: 'Corporate Tax', date: 'Today', title: 'Free zone qualifying income criteria updated for DMCC members', rel: 'High', impact: 'Member advisory communications required within 14 days.', titleAr: 'تحديث معايير الدخل المؤهل في المنطقة الحرة لأعضاء DMCC', impactAr: 'مطلوب اتصالات استشارية للأعضاء خلال 14 يوماً.' },
  { body: 'DMCC Authority', region: 'Dubai', topic: 'Licensing', date: '2 days ago', title: 'Streamlined e-licence renewal for commodities traders', rel: 'High', impact: 'Positive for member retention — expedite diamond ecosystem renewals.', titleAr: 'تبسيط تجديد التراخيص الإلكترونية لتجار السلع', impactAr: 'إيجابي للاحتفاظ بالأعضاء.' },
  { body: 'DED', region: 'Dubai', topic: 'Business setup', date: '4 days ago', title: 'Dubai Business Set Up Guide 2025 published — DMCC featured', rel: 'High', impact: 'Supports new member acquisition narrative.', titleAr: 'نشر دليل إعداد الأعمال في دبي 2025', impactAr: 'يدعم سردية اكتساب أعضاء جدد.' },
  { body: 'CBUAE', region: 'UAE', topic: 'Digital finance', date: '5 days ago', title: 'Digital asset framework consultation — tokenisation eligible', rel: 'Medium', impact: 'Relevant to DMCC-Tether partnership and crypto ecosystem.', titleAr: 'استشارة إطار الأصول الرقمية', impactAr: 'ذات صلة بشراكة DMCC-Tether.' },
  { body: 'Dubai Municipality', region: 'Dubai', topic: 'Uptown Dubai', date: '1 week ago', title: 'Uptown Dubai infrastructure completion milestone reached', rel: 'Medium', impact: 'Supports investor briefing and activation timeline.', titleAr: 'بلوغ مرحلة إكمال بنية أبتاون دبي', impactAr: 'يدعم جدول الإحاطة والتفعيل.' },
  { body: 'Global Trade', region: 'International', topic: 'Commodity index', date: '1 week ago', title: 'UAE 2nd in Commodity Trade Index — South-South at 35%', rel: 'High', impact: 'Core Future of Trade 2026 narrative — use in Singapore launch.', titleAr: 'الإمارات ثانية في مؤشر تجارة السلع', impactAr: 'السردية الأساسية لتقرير مستقبل التجارة 2026.' },
  { body: 'DMCC Authority', region: 'Dubai', topic: 'Disputes', date: '2 weeks ago', title: 'DMCC Disputes Centre expanded mediation capacity', rel: 'Medium', impact: 'Member value-add service — promote in portal.', titleAr: 'توسيع قدرة الوساطة في مركز نزاعات DMCC', impactAr: 'خدمة قيمة مضافة للأعضاء.' },
  { body: 'DET', region: 'Dubai', topic: 'Events', date: '2 weeks ago', title: 'Dubai Diamond Conference 2026 partnership framework published', rel: 'Low', impact: 'Supports flagship event narrative.', titleAr: 'نشر إطار شراكة مؤتمر دبي للماس 2026', impactAr: 'يدعم سردية الفعالية الرئيسية.' },
];

export const KB_CATS = [
  { id: 'strategy', label: 'Strategy', labelAr: 'الاستراتيجية', color: 'var(--teal-300)' },
  { id: 'performance', label: 'Performance', labelAr: 'الأداء', color: 'var(--status-good)' },
  { id: 'market', label: 'Market Intelligence', labelAr: 'استخبارات السوق', color: 'var(--status-info)' },
  { id: 'board', label: 'Board Pack', labelAr: 'حزمة المجلس', color: 'var(--gold-500)' },
  { id: 'policy', label: 'Policy / Regulatory', labelAr: 'السياسات والتنظيم', color: 'var(--sun-2)' },
  { id: 'general', label: 'General', labelAr: 'عام', color: 'var(--ink-3)' },
];

export const KB_DOCS = [
  { t: 'DMCC Strategy 2025\u20132030', cat: 'strategy', date: 'May 2026', pages: 72, by: 'SharePoint sync' },
  { t: 'Future of Trade Report 2026 — Rebuilding Through Rupture', cat: 'market', date: 'Jul 2026', pages: 156, by: 'DMCC Research' },
  { t: 'DMCC Annual Report 2025', cat: 'board', date: 'Apr 2026', pages: 98, by: 'Uploaded' },
  { t: 'UAE Corporate Tax & Free Zone Qualifying Income Framework', cat: 'policy', date: 'Jun 2026', pages: 28, by: 'Legal & Compliance' },
  { t: 'Dubai Commodity Trade Index 2026', cat: 'market', date: 'Jul 2026', pages: 48, by: 'DMCC Research' },
  { t: 'Member Services Performance Review Q2 2026', cat: 'performance', date: 'Jul 2026', pages: 24, by: 'Member Portal ETL' },
  { t: 'Dubai Diamond Exchange Annual Review 2025', cat: 'performance', date: 'May 2026', pages: 36, by: 'Commodities · Approved KB' },
  { t: 'DMCC Cyber Ecosystem Brief 2026', cat: 'strategy', date: 'Jun 2026', pages: 22, by: 'Technology · Approved KB' },
  { t: 'Uptown Dubai Development Strategy', cat: 'strategy', date: 'Mar 2026', pages: 44, by: 'Strategy · Approved KB' },
  { t: 'Foundations Framework — Wealth & Structuring', cat: 'strategy', date: 'Jun 2026', pages: 18, by: 'FinX · Approved KB' },
  { t: '2025 Dubai Business Set Up Guide', cat: 'general', date: 'May 2026', pages: 64, by: 'dmcc.ae · Approved KB' },
  { t: 'Agri Commodities Series — Special Tea Edition', cat: 'market', date: 'Apr 2026', pages: 32, by: 'Future of Trade' },
  { t: 'Agri Commodities Series — Special Coffee Edition', cat: 'market', date: 'Apr 2026', pages: 30, by: 'Future of Trade' },
  { t: 'Lab-Grown Diamond Edition — Future of Trade', cat: 'market', date: 'Mar 2026', pages: 28, by: 'Future of Trade' },
  { t: 'Tether Partnership MoU — Blockchain Collaboration', cat: 'policy', date: 'May 2026', pages: 12, by: 'Legal · Approved KB' },
];

export const DIFFERENTIATION = [
  { icon: 'gem', t: 'Lead on commodities trade', d: 'DMCC is the world\'s leading trade hub for gold, diamonds, tea, coffee and agri-products — a durable edge over generic free zones.', tAr: 'الريادة في تجارة السلع', dAr: 'DMCC هو مركز التجارة الرائد عالمياً للذهب والماس والشاي والقهوة.' },
  { icon: 'building-2', t: 'Own the member ecosystem', d: '26,000+ companies from 180+ countries — network effects no competitor can replicate at this scale in Dubai.', tAr: 'امتلاك منظومة الأعضاء', dAr: 'أكثر من 26,000 شركة من 180+ دولة — تأثيرات شبكية لا يمكن تكرارها.' },
  { icon: 'cpu', t: 'Formalise tech & crypto', d: 'DMCC Cyber uniting 4,000+ companies with Tether MoU advancing tokenisation — ahead of regional free zones.', tAr: 'تشكيل التقنية والعملات الرقمية', dAr: 'DMCC Cyber يوحّد 4000+ شركة مع شراكة Tether للترميز.' },
  { icon: 'sparkles', t: 'Thought leadership in trade', d: 'Future of Trade biennial reports and Commodity Trade Index — DMCC shapes global trade discourse, not just hosts it.', tAr: 'الريادة الفكرية في التجارة', dAr: 'تقارير مستقبل التجارة ومؤشر تجارة السلع — DMCC يشكّل الخطاب التجاري العالمي.' },
];

export const SUGGESTIONS = [
  { q: "Good morning — what's happened today?", agents: ['cos'] },
  { q: "How does DMCC's diamond trade volume compare to Antwerp and Mumbai this quarter?", agents:['strategy'] },
  { q: "What strategic decisions did DMCC make in 2025 and how do they track against Future of Trade priorities?", agents:['strategy','cos'] },
  { q: "Brief me on the Dubai Diamond Conference next month.", agents:['cos','relationship'] },
  { q: "Top FDI opportunities in Dubai commodities from current capital flows?", agents:['strategy'] },
  { q: "Draft talking points for the Future of Trade Singapore launch.", agents:['comms'] },
];

export const CANNED = {
  "How does DMCC's diamond trade volume compare to Antwerp and Mumbai this quarter?":
`## DMCC vs Antwerp vs Mumbai — diamond trade

> **In plain terms:** Dubai leads on volume growth; Antwerp leads on heritage infrastructure; Mumbai on manufacturing.

| What it means | Score | Signal |
|---------------|-------|--------|
| DMCC diamond trade (2025) | USD 41.7B | 🟢 |
| YoY growth through Dubai | +14% | 🟢 |
| London Diamond Bourse MoU | Advancing | 🟢 |

████████░░ **94/100**

| Topic | DMCC Dubai | Antwerp | Mumbai |
|-------|------------|---------|--------|
| Strength | Volume + growth | Infrastructure | Manufacturing |
| Weakness | Heritage perception | Volume shift | Retail corridor |
| Next move | Singapore FoT launch | N/A | N/A |

🔴 **Do this:** Accelerate Dubai Diamond Exchange global corridor narrative before competitor tender season.

*Agents: Strategy · Market intelligence*`,

  "What strategic decisions did DMCC make in 2025 and how do they track against Future of Trade priorities?":
`## 2025 decisions vs Future of Trade

> **In plain terms:** Ecosystem initiatives on track; member onboarding SLAs need attention.

████████░░ **88/100**

| Initiative | Status | Signal |
|------------|--------|--------|
| Future of Trade 2026 report | Published · Jul 2026 | 🟢 |
| DMCC Cyber launch | Formalising 4,000+ cos | 🟢 |
| Uptown Dubai activation | Planning · Q4 2026 | 🟡 |
| Member onboarding SLA | 4.2 days avg | 🔴 |

*Agents: Strategy · Chief of Staff · DMCC_Annual_Report_2025.pdf*`,

  "Brief me on the Dubai Diamond Conference next month.":
`## Pre-meeting — Dubai Diamond Conference 2026

> **In plain terms:** 26 Oct — flagship diamonds event; CEO keynote slot pending confirmation.

| Fact | Detail | Signal |
|------|--------|--------|
| When | 26 Oct 2026 | 🟢 |
| Format | Flagship in-person | 🟢 |
| Focus | Global diamond trade corridors | 🟢 |

**Agenda highlights**
- Record USD 41.7B diamond trade through Dubai in 2025
- London Diamond Bourse MoU strengthening global exchange
- Rough & polished tender calendar Q4

🔴 **Do this:** Confirm CEO keynote and panel participation.

*Agents: Chief of Staff · Relationship · Strategy*`,

  "Top FDI opportunities in Dubai commodities from current capital flows?":
`## Top opportunities — Dubai commodities

> **In plain terms:** Gold, diamonds and tech/crypto ecosystems score highest for DMCC pipeline.

| Sector | FDI alignment | Signal |
|--------|---------------|--------|
| Gold & precious metals | 94/100 | 🟢 |
| Diamonds & gemstones | 96/100 | 🟢 |
| Crypto & tokenisation | 88/100 | 🟢 |
| AI & gaming | 86/100 | 🟢 |

█████████░ **94/100**

🔴 **Do this:** Prioritise Tether partnership announcement and China precious metals webinar.

*Agents: Strategy · Market intelligence*`,

  "Draft talking points for the Future of Trade Singapore launch.":
`## Future of Trade Singapore — talking points

> **In plain terms:** Rebuilding trade architecture through rupture; UAE 2nd in Commodity Trade Index.

| Theme | Message | Signal |
|-------|---------|--------|
| Report | Rebuilding Through Rupture | 🟢 |
| Data | South-South trade at 35% | 🟢 |
| UAE rank | #2 Commodity Trade Index | 🟢 |

### Key lines
- "The architecture of global trade is being rebuilt through rupture."
- "South-South trade has grown to 35% — a structural shift, not a cycle."
- "Dubai and DMCC sit at the intersection of this new trade geography."

*Agents: Communications · Future_of_Trade_2026.pdf*`,
};


export type CommandCentreSignal = (typeof SIGNALS)[number];
export type CommandCentreDepartment = (typeof DEPARTMENTS)[number];
export type CommandCentreAgent = (typeof AGENTS)[number];
