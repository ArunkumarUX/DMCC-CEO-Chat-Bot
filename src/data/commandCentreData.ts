/** Apparel Group Command Centre — portfolio mock data */


// ---------- Home signal cards — updated 30 Jun 2026 ----------
export const SIGNALS = [
  {
    id: 'market', icon: 'trending-up', tone: 'good', label: 'Market Movements',
    headline: 'GCC retail sales up 8.2% YoY — tourism and e-commerce driving growth',
    body: 'UAE retail sector benefiting from strong tourism arrivals and Ramadan/Eid spending. Omnichannel penetration reaching 22% across fashion and lifestyle. Consumer confidence stable across GCC.',
    metric: '+8.2%', metricLabel: 'GCC retail YoY', spark: [72,74,76,78,80,82,84,86,88,90],
    ar: { label: 'تحركات السوق', headline: 'مبيعات التجزئة في الخليج +8.2٪ سنوياً',
      body: 'قطاع التجزئة في الإمارات يستفيد من السياحة القوية والإنفاق الموسمي. اختراق القنوات المتعددة يصل إلى 22٪.', metricLabel: 'تجزئة الخليج سنوياً' }
  },
  {
    id: 'competitor', icon: 'crosshair', tone: 'warn', label: 'Competitor Activity',
    headline: 'Regional omnichannel players accelerating — 6thStreet positioning at stake',
    body: 'Noon, Namshi and regional e-commerce players investing heavily in fashion and beauty. 90-minute delivery from 6thStreet launched — competitor response expected. Saudi expansion race intensifying.',
    metric: '90 min', metricLabel: '6thStreet delivery', spark: [40,44,48,52,55,58,62,65,68,72],
    ar: { label: 'نشاط المنافسين', headline: 'لاعبو القنوات المتعددة يتسارعون — تموضع 6thStreet على المحك',
      body: 'نون ونامشي يستثمران بكثافة في الأزياء والجمال. توصيل 90 دقيقة من 6thStreet — رد فعل المنافسين متوقع.', metricLabel: 'توصيل 6thStreet' }
  },
  {
    id: 'investment', icon: 'sparkles', tone: 'good', label: 'Expansion Opportunities',
    headline: 'Saudi Arabia expansion — Arabian Alesaar partnership unlocking new stores',
    body: 'Strategic partnership with Arabian Alesaar Group accelerating KSA footprint. HEYDUDE, Barbour, Forever New and MLB first stores launched in UAE. KSA country head review pending CEO sign-off.',
    metric: '2,500+', metricLabel: 'stores globally', spark: [20,28,36,44,52,60,68,76,84,92],
    ar: { label: 'فرص التوسع', headline: 'توسع السعودية — شراكة Arabian Alesaar تفتح متاجر جديدة',
      body: 'شراكة استراتيجية مع Arabian Alesaar تسرّع البصمة في السعودية. إطلاق أول متاجر HEYDUDE وBarbour وForever New وMLB في الإمارات.', metricLabel: 'متاجر عالمياً' }
  },
  {
    id: 'performance', icon: 'activity', tone: 'warn', label: 'Internal Performance Signals',
    headline: 'Store labour attrition at 18% — 3 critical retail roles unfilled 6+ weeks',
    body: 'Attrition crossed threshold concentrated in store operations and visual merchandising. Regional store manager roles unfilled in KSA and Qatar. Retention package and hiring escalation pending CEO decision.',
    metric: '18%', metricLabel: 'attrition rate', spark: [12,13,14,14,15,16,16,17,17,18], deptLink: 'hr',
    ar: { label: 'مؤشرات الأداء الداخلي', headline: 'دوران العمالة في المتاجر 18٪ — 3 وظائف حرجة شاغرة أكثر من 6 أسابيع',
      body: 'تجاوز معدل الدوران العتبة في عمليات المتاجر. وظائف مدير متجر إقليمي شاغرة في السعودية وقطر.', metricLabel: 'معدل الدوران' }
  },
  {
    id: 'regulatory', icon: 'gavel', tone: 'warn', label: 'Regulatory Shifts',
    headline: 'UAE VAT compliance review — F&B and retail licensing updates in effect',
    body: 'Updated UAE VAT guidance for F&B operations. Saudi retail licensing requirements changing for foreign brand operators. Consumer protection framework updates affecting e-commerce returns policy.',
    metric: '85+', metricLabel: 'brands affected', spark: [2,3,3,4,4,5,5,6,6,7], link: 'regulatory',
    ar: { label: 'تحولات تنظيمية', headline: 'مراجعة ضريبة القيمة المضافة — تحديثات تراخيص التجزئة والمأكولات سارية',
      body: 'إرشادات ضريبة القيمة المضافة المحدثة لعمليات المأكولات. متطلبات تراخيص التجزئة في السعودية تتغير.', metricLabel: 'علامات متأثرة' }
  },
  {
    id: 'followup', icon: 'list-checks', tone: 'info', label: 'Follow-Up Actions',
    headline: '5 actions awaiting your decision',
    body: 'KSA expansion milestone review, Images RetailME Awards speaking slot (14 days left), R&B 100-store milestone celebration, HR retention packages, Club Apparel 10M member campaign sign-off.',
    metric: '5', metricLabel: 'open items', spark: [6,5,5,4,5,4,3,4,5,5],
    ar: { label: 'إجراءات المتابعة', headline: '5 إجراءات بانتظار قرارك',
      body: 'مراجعة مراحل توسع السعودية، فرصة التحدث في Images RetailME Awards (14 يوماً متبقية)، احتفال R&B بـ100 متجر، حزم الاحتفاظ، اعتماد حملة Club Apparel 10M عضو.', metricLabel: 'بنود مفتوحة' }
  },
];

// ---------- Departments ----------
export const DEPARTMENTS = [
  {
    id: 'hr', n: '01', name: 'Human Resources', nameAr: 'الموارد البشرية', icon: 'users', rag: 'risk', trend: 'down',
    summary: 'Attrition above threshold; two critical roles unfilled. Engagement holding but hiring velocity slipping.',
    kpis: [
      { k: 'Headcount vs plan', v: '412 / 430', pct: 96, tone: 'warn' },
      { k: 'Attrition rate', v: '15.8%', pct: 79, tone: 'risk', note: '↑ from 12.1%' },
      { k: 'Time-to-fill', v: '74 days', pct: 62, tone: 'warn' },
      { k: 'Training completion', v: '88%', pct: 88, tone: 'good' },
      { k: 'Engagement score', v: '7.4 / 10', pct: 74, tone: 'good' },
    ],
    achievements: ['Graduate Emiratisation cohort up 18% YoY', 'Engagement steady at 7.4 despite restructuring', 'Leadership academy launched on schedule'],
    risks: [ {sev:'High', t:'Attrition crossed 15% — concentrated in property management teams'}, {sev:'High', t:'Head of Leasing Operations unfilled 9 weeks'}, {sev:'Medium', t:'Time-to-fill drifting above 70-day target'} ],
    blockers: ['Compensation bands for specialist leasing roles below market', 'Visa processing delays on 2 senior international hires'],
    actions: ['Approve off-cycle comp adjustment for property management band', 'Escalate 2 critical vacancies to executive search', 'Review retention plan for R&B operations team'],
    alert: 'Attrition >15% AND critical role unfilled >8 weeks',
    series: [12.1,12.4,12.9,13.3,13.8,14.2,14.9,15.8],
  },
  {
    id: 'sales', n: '02', name: 'Sales', nameAr: 'المبيعات', icon: 'target', rag: 'warn', trend: 'up',
    summary: 'Revenue tracking to target overall; pipeline healthy but one 6thStreet pre-sales deal slipping and needs CEO unblock.',
    kpis: [
      { k: 'Revenue vs target', v: '102%', pct: 102, tone: 'good' },
      { k: 'Pipeline value', v: 'AED 1.24B', pct: 84, tone: 'good' },
      { k: 'Win rate', v: '31%', pct: 62, tone: 'warn' },
      { k: 'Avg deal size', v: 'AED 6.8M', pct: 70, tone: 'good' },
      { k: 'New leases signed', v: '47 QTD', pct: 78, tone: 'good' },
    ],
    achievements: ['Closed 3 R&B commercial leases worth AED 21M', '6thStreet pre-sales inquiries +12% vs prior quarter', 'Club Apparel store performance win-rate up to 91%'],
    risks: [ {sev:'High', t:'AED 90M 6thStreet waterfront pre-sales at risk — stalled 3 weeks'}, {sev:'Medium', t:'Win rate softening in R&B retail segment'} ],
    blockers: ['6thStreet deal awaiting UAE retail compliance escrow confirmation', 'Legal review backlog on 2 enterprise leasing contracts'],
    actions: ['Personally engage 6thStreet buyer sponsor this week', 'Clear legal review bottleneck with Legal & Compliance', 'Approve incentive for Club Apparel store performance push'],
    alert: 'Revenue deviation >10% vs forecast',
    series: [88,92,95,97,99,100,101,102],
  },
  {
    id: 'ops', n: '03', name: 'Operations', nameAr: 'العمليات', icon: 'settings-2', rag: 'warn', trend: 'flat',
    summary: 'SLAs broadly met; one DED registration bottleneck driving longer turnaround on new leases.',
    kpis: [
      { k: 'Service SLAs met', v: '94.2%', pct: 94, tone: 'good' },
      { k: 'Process efficiency', v: '81%', pct: 81, tone: 'warn' },
      { k: 'Cost vs budget', v: '98%', pct: 98, tone: 'good' },
      { k: 'Incident count (MTD)', v: '3', pct: 70, tone: 'warn' },
      { k: 'Avg turnaround', v: '5.6 days', pct: 66, tone: 'warn' },
    ],
    achievements: ['Lease registrations +22% handled within SLA', 'Zero critical operational incidents this quarter', 'Digital onboarding cut document errors 40%'],
    risks: [ {sev:'Medium', t:'DED registration queue creating 5.6-day turnaround'}, {sev:'Low', t:'Resource constraint in property verification team'} ],
    blockers: ['Manual verification step in DED registration not yet automated', 'Peak-season volume exceeding registry team capacity'],
    actions: ['Approve automation of DED verification step', 'Authorise temporary registry resourcing for peak'],
    alert: 'SLA breach or operational incident flagged',
    series: [93,94,94,95,94,94,94,94],
  },
  {
    id: 'it', n: '04', name: 'Technology & IT', nameAr: 'التقنية', icon: 'cpu', rag: 'good', trend: 'up',
    summary: 'Strong delivery posture; uptime excellent and AI adoption climbing. One project amber on integration dependency.',
    kpis: [
      { k: 'Project delivery (RAG)', v: '8G / 2A / 0R', pct: 80, tone: 'good' },
      { k: 'Cyber posture', v: 'Strong', pct: 90, tone: 'good' },
      { k: 'System uptime', v: '99.96%', pct: 99, tone: 'good' },
      { k: 'AI adoption', v: '68%', pct: 68, tone: 'warn' },
      { k: 'Digital initiatives', v: '11 active', pct: 85, tone: 'good' },
    ],
    achievements: ['Property management portal upgrade shipped ahead of plan', 'Zero security incidents; posture rated Strong', 'AI adoption across teams reached 68%'],
    risks: [ {sev:'Medium', t:'CRM integration project amber on vendor dependency'}, {sev:'Low', t:'Legacy reporting tool end-of-life in Q3'} ],
    blockers: ['Vendor API delivery slipping on CRM integration'],
    actions: ['Review CRM vendor escalation path', 'Approve legacy reporting migration budget'],
    alert: 'Security incident or critical project delay >2 weeks',
    series: [72,74,76,78,80,82,84,86],
  },
  {
    id: 'finance', n: '05', name: 'Finance', nameAr: 'المالية', icon: 'landmark', rag: 'good', trend: 'up',
    summary: 'Budget on track with healthy variance; forecast accuracy strong. One unplanned commitment to note.',
    kpis: [
      { k: 'Budget performance', v: '97%', pct: 97, tone: 'good' },
      { k: 'Revenue vs forecast', v: '+3.1%', pct: 88, tone: 'good' },
      { k: 'Cash flow', v: 'Healthy', pct: 92, tone: 'good' },
      { k: 'Forecast accuracy', v: '96%', pct: 96, tone: 'good' },
      { k: 'Variance', v: '2.9%', pct: 90, tone: 'good' },
    ],
    achievements: ['Revenue 3.1% ahead of forecast', 'Forecast accuracy held at 96%', 'Capital allocation review delivered on time'],
    risks: [ {sev:'Low', t:'Unplanned AED 4M technology commitment pending approval'} ],
    blockers: [],
    actions: ['Note unplanned technology capital commitment'],
    alert: 'Budget variance >10% or unplanned capital commitment',
    series: [94,95,95,96,96,96,97,97],
  },
  {
    id: 'strategy', n: '06', name: 'Strategy', nameAr: 'الاستراتيجية', icon: 'compass', rag: 'good', trend: 'up',
    summary: 'Strategic initiatives largely on track; GCC expansion alignment strong. One 6thStreet launch milestone at risk of slipping.',
    kpis: [
      { k: 'Initiative progress', v: '78%', pct: 78, tone: 'good' },
      { k: 'Milestones complete', v: '14 / 18', pct: 78, tone: 'good' },
      { k: 'GCC expansion alignment', v: '86', pct: 86, tone: 'good' },
      { k: 'Competitive position', v: 'Top 3', pct: 85, tone: 'good' },
    ],
    achievements: ['GCC retail growth roadmap milestones 78% complete', 'Portfolio alignment score reached 86', 'Images RetailME awards acceptance launched'],
    risks: [ {sev:'Medium', t:'6thStreet omnichannel launch milestone at risk of 4-week slip'} ],
    blockers: ['Awaiting design partner input on 6thStreet launch narrative'],
    actions: ['Convene 6thStreet launch working session with Marketing and R&B'],
    alert: 'KPI deviation >15% or strategic milestone delay >4 weeks',
    series: [70,72,73,74,75,76,77,78],
  },
  {
    id: 'procurement', n: '07', name: 'Procurement', nameAr: 'المشتريات', icon: 'package', rag: 'warn', trend: 'flat',
    summary: 'Cost savings delivered; however a critical contract renewal is inside 30 days with no action logged.',
    kpis: [
      { k: 'Cycle time', v: '21 days', pct: 74, tone: 'warn' },
      { k: 'Vendor performance', v: '4.1 / 5', pct: 82, tone: 'good' },
      { k: 'Renewal pipeline', v: '6 active', pct: 70, tone: 'warn' },
      { k: 'Cost savings', v: 'AED 7.2M', pct: 88, tone: 'good' },
    ],
    achievements: ['Delivered AED 7.2M in cost savings YTD', 'Vendor performance scores up to 4.1/5'],
    risks: [ {sev:'High', t:'Critical data-centre contract expires in 24 days — no renewal logged'}, {sev:'Medium', t:'Two vendor SLAs trending below threshold'} ],
    blockers: ['Data-centre renewal awaiting Finance sign-off'],
    actions: ['Urgently approve data-centre contract renewal (<30 days)', 'Review underperforming vendor SLAs'],
    alert: 'Critical contract expiry <30 days or major supplier risk',
    series: [22,22,21,21,21,21,21,21],
  },
  {
    id: 'legal', n: '08', name: 'Legal & Compliance', nameAr: 'القانونية والامتثال', icon: 'scale', rag: 'warn', trend: 'down',
    summary: 'Filings current; however an UAE retail compliance compliance deadline is approaching and a regulatory matter has escalated.',
    kpis: [
      { k: 'Regulatory pipeline', v: '9 matters', pct: 72, tone: 'warn' },
      { k: 'Filing status', v: '96% current', pct: 96, tone: 'good' },
      { k: 'Open legal matters', v: '12', pct: 64, tone: 'warn' },
      { k: 'Policy backlog', v: '4 updates', pct: 60, tone: 'warn' },
    ],
    achievements: ['96% of regulatory filings current', 'Closed 5 legacy legal matters this quarter'],
    risks: [ {sev:'High', t:'UAE retail compliance rental disclosure filing due in 11 days'}, {sev:'Medium', t:'Cross-border leasing matter escalated to senior counsel'} ],
    blockers: ['Awaiting policy input from Strategy on 6thStreet escrow clauses'],
    actions: ['Approve resourcing to clear UAE retail compliance filing on time', 'Review escalated cross-border leasing matter'],
    alert: 'Compliance deadline missed or regulatory matter escalated',
    series: [9,9,10,10,11,11,12,12],
  },
  {
    id: 'marketing', n: '09', name: 'Marketing & Comms', nameAr: 'التسويق والاتصال', icon: 'megaphone', rag: 'good', trend: 'up',
    summary: 'Strong campaign ROI and positive sentiment post-Images RetailME. Images RetailME Awards commission needs CEO speaking slot decision.',
    kpis: [
      { k: 'Campaign ROI', v: '3.4x', pct: 85, tone: 'good' },
      { k: 'Media coverage', v: '+38%', pct: 88, tone: 'good' },
      { k: 'Brand sentiment', v: '+72', pct: 86, tone: 'good' },
      { k: 'Digital engagement', v: '+19%', pct: 78, tone: 'good' },
    ],
    achievements: ['Images RetailME coverage up 38% YoY with +72 sentiment', 'Campaign ROI reached 3.4x', 'Images RetailME Awards open call launched'],
    risks: [ {sev:'Low', t:'Flagship roundtable needs CEO speaking confirmation'} ],
    blockers: ['Awaiting CEO availability for keynote roundtable'],
    actions: ['Confirm CEO speaking slot for flagship roundtable'],
    alert: 'Negative media spike or major event requiring CSO involvement',
    series: [2.8,2.9,3.0,3.1,3.2,3.3,3.3,3.4],
  },
];

// ---------- Five agents ----------
export const AGENTS = [
  { id: 'cos', n:'01', name: 'Chief of Staff AI', icon: 'calendar-clock', color:'var(--teal-300)',
    fn: 'Operational cadence of the executive office',
    caps: ['Auto pre-meeting briefs', 'Post-meeting action extraction', 'Action register tracking', 'Board pack assembly', 'Morning briefing orchestration'],
    integ: 'Microsoft Graph · CRM register · SharePoint' },
  { id: 'strategy', n:'02', name: 'Strategy AI', icon: 'compass', color:'var(--gold-500)',
    fn: 'Always-available strategy & intelligence team',
    caps: ['Portfolio benchmarking', 'Live market intelligence', 'Investment opportunity scoring', 'GCC expansion alignment tracking', 'Scenario planning'],
    integ: 'Bloomberg / Refinitiv · regulatory feeds · KB' },
  { id: 'policy', n:'03', name: 'Policy AI', icon: 'gavel', color:'var(--status-info)',
    fn: 'Regulatory intelligence & policy drafting',
    caps: ['Live monitoring of 12 jurisdictions', 'Policy drafting', 'International benchmarking', 'Impact assessment'],
    integ: 'Regulatory RSS + APIs · UAE retail compliance portal' },
  { id: 'relationship', n:'04', name: 'Relationship AI', icon: 'network', color:'var(--sun-2)',
    fn: 'Institutional CRM memory',
    caps: ['Full interaction history', 'Living stakeholder profiles', 'Proactive follow-up alerts', 'Partnership tracking', 'Network mapping'],
    integ: 'CRM bidirectional sync · LinkedIn · Graph' },
  { id: 'comms', n:'05', name: 'Communications AI', icon: 'languages', color:'var(--status-good)',
    fn: 'All executive communications — EN & AR',
    caps: ['Speech drafting', 'Executive writing', 'Correspondence management', 'Bilingual board notes', 'CEO voice learning'],
    integ: 'Microsoft Graph email · KB · style loop' },
];

// ---------- Portfolio benchmarking ----------
export const CENTRES = ['R&B','6thStreet','Club Apparel','Namshi','Noon'];

/**
 * 12-Dimension Benchmark — Apparel Group portfolio vs regional competitors
 * Scale 0–100. Mock data for executive dashboard.
 */
export const BENCH_DIMS: { d: string; src: string; v: number[] }[] = [
  { d: 'Store performance & asset utilisation',
    src: 'R&B Portfolio Review Q1 2026',
    v: [94, 88, 91, 92, 89] },
  { d: 'Design differentiation & brand',
    src: '6thStreet Development Strategy 2026',
    v: [72, 95, 68, 78, 82] },
  { d: 'Community & loyalty programme experience',
    src: 'Club Apparel Operations 2026',
    v: [70, 74, 92, 65, 60] },
  { d: 'Sales velocity & pre-sales',
    src: 'CBRE Dubai Market Q1 2026',
    v: [82, 88, 76, 94, 86] },
  { d: 'Rental yield & collections',
    src: 'R&B Portfolio Review Q1 2026',
    v: [90, 78, 72, 85, 88] },
  { d: 'F&B & RevPAR recovery',
    src: 'STR Global Dubai',
    v: [84, 92, 70, 88, 91] },
  { d: 'Regulatory compliance (UAE retail compliance/DED)',
    src: 'Apparel Group UAE Retail Compliance Framework',
    v: [92, 90, 88, 86, 88] },
  { d: 'Sustainability & ESG credentials',
    src: 'Group ESG Position Paper 2026',
    v: [78, 86, 74, 82, 80] },
  { d: 'Cultural & public art integration',
    src: 'Images RetailME Awards Commission Brief',
    v: [88, 96, 70, 62, 58] },
  { d: 'GCC expansion alignment & economic contribution',
    src: 'Apparel Group GCC Retail Growth Alignment Tracker 2026',
    v: [86, 84, 80, 78, 76] },
  { d: 'Talent retention & Emiratisation',
    src: 'HR Quarterly Review Q1 2026',
    v: [74, 82, 88, 80, 78] },
  { d: 'Digital & proptech adoption',
    src: 'Technology & IT Dashboard',
    v: [80, 86, 84, 88, 82] },
];

// ---------- Briefing formats (focused executive workflows) ----------
export const BRIEF_FORMATS = [
  { id:'premeeting', icon:'calendar-check', name:'Pre-meeting brief', desc:'Paste an agenda, email trail, or upload documents', time:'< 30s' },
  { id:'email', icon:'mail', name:'Email draft', desc:'Paste an email and get a ready-to-send reply', time:'< 20s' },
  { id:'boardpack', icon:'clipboard-list', name:'Board pack summary', desc:'Upload board materials — key decisions & risks', time:'< 60s' },
  { id:'stakeholder', icon:'id-card', name:'Stakeholder profile', desc:'Profile from notes, CRM, and uploaded context', time:'< 30s' },
];

// ---------- 8-week plan ----------
export const PLAN = [
  { w:'01', focus:'Pilot', deliver:'Personalised prototype · 5 deliverables · HR + Sales + Ops loaded · Arabic demonstrated', gate:'CEO approves full build' },
  { w:'02', focus:'Infrastructure', deliver:'Azure UAE North · Kubernetes · Weaviate + Neo4j · Azure AD SSO · RBAC · audit logging', gate:'Apparel Group IT security sign-off' },
  { w:'03', focus:'Knowledge System', deliver:'Ingestion pipeline · 50+ docs seeded · Knowledge Graph · SharePoint auto-sync', gate:'50 test queries pass' },
  { w:'04', focus:'Five Agents', deliver:'All 5 LangGraph agents · orchestration graph · all modules on seeded data', gate:'Agents pass CEO scenarios' },
  { w:'05', focus:'Market & Docs', deliver:'Bloomberg/Refinitiv · UAE retail compliance sync · news feeds · 08:00 & 22:00 GST refresh', gate:'Briefing quality approved' },
  { w:'06', focus:'Relationship & Comms', deliver:'Graph calendar + email · CRM history · Arabic RTL complete', gate:'Arabic QA sign-off' },
  { w:'07', focus:'9 Depts + Regulatory', deliver:'ERP/HR ETL for all 9 departments · regulatory feeds active', gate:'Dashboards reviewed by Apparel Group' },
  { w:'08', focus:'Go-Live', deliver:'Integration testing · security scan · CEO onboarding · go-live', gate:'CEO sign-off on system' },
];

// ---------- Integrations ----------
export const INTEGRATIONS = [
  { name:'Market Data', sys:'Bloomberg / Refinitiv Eikon', wk:'Week 5', icon:'trending-up' },
  { name:'Document Repository', sys:'SharePoint / DMS (Graph)', wk:'Week 5', icon:'folder-sync' },
  { name:'Calendar & Email', sys:'Microsoft Exchange (Graph)', wk:'Week 6', icon:'mail' },
  { name:'CRM & Relationships', sys:'Salesforce or equivalent', wk:'Week 6', icon:'contact' },
  { name:'Regulatory Intel', sys:'UAE retail compliance · DED · DET · CBUAE', wk:'Week 7', icon:'gavel' },
  { name:'Performance & HR', sys:'SAP / Oracle ERP + HR ETL', wk:'Week 7', icon:'database' },
  { name:'Apparel Group UAE retail compliance Portal', sys:'SharePoint + internal API', wk:'Week 5', icon:'building-2' },
  { name:'News & Intelligence', sys:'Reuters · Gulf News · regional', wk:'Week 5', icon:'newspaper' },
];

export const TICKER = [
  { k: 'DFM', v: '5,318.2', c: +0.41 },
  { k: 'ADX', v: '9,742.6', c: +0.84 },
  { k: 'GCC Retail', v: '+8.2%', c: +0.6 },
  { k: 'R&B Stores', v: '100+', c: +2.1 },
  { k: '6thStreet', v: '↑ 14%', c: +1.4 },
  { k: 'Club Apparel', v: '10M+', c: +3.2 },
  { k: 'Store Count', v: '2,500+', c: +1.8 },
  { k: 'KSA Exp.', v: 'Active', c: 0 },
  { k: 'Tim Hortons', v: '300+', c: +0.8 },
  { k: 'USD/AED', v: '3.6725', c: 0.0 },
];

// ---------- Organisational momentum (index) ----------
export const MOMENTUM = { data: [71, 73, 72, 75, 77, 76, 79, 81, 80, 83, 85, 87], labels: ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'] };

// ---------- Capital flows toward Apparel Group retail portfolio ----------
export const FLOWS = [
  { k: 'GCC', kAr: 'الخليج', flow: 92, v: '+4.2%' },
  { k: 'Europe', kAr: 'أوروبا', flow: 68, v: '+2.8%' },
  { k: 'South Asia', kAr: 'جنوب آسيا', flow: 74, v: '+3.4%' },
  { k: 'East Asia', kAr: 'شرق آسيا', flow: 58, v: '+1.9%' },
  { k: 'North America', kAr: 'أمريكا الشمالية', flow: 52, v: '+1.6%' },
];

// ---------- Regulatory change monitor ----------
export const REGULATORY = [
  { body: 'UAE retail compliance', region: 'Dubai', topic: 'Rental index', date: 'Today', title: 'UAE retail compliance updates rental index guidance for Q3', rel: 'High', impact: 'Directly affects R&B portfolio repricing — review within 30 days.', titleAr: 'UAE retail compliance تحدّث إرشادات مؤشر الإيجار للربع الثالث', impactAr: 'يؤثر مباشرة على إعادة تسعير محفظة R&B.' },
  { body: 'DED', region: 'Dubai', topic: 'Registration', date: '2 days ago', title: 'DED streamlines off-plan registration for omnichannel projects', rel: 'High', impact: 'Positive for 6thStreet launch timeline — expedite Dubai Hills Mall filings.', titleAr: 'DED تبسّط تسجيل المشاريع على الخارطة', impactAr: 'إيجابي لجدول إطلاق 6thStreet.' },
  { body: 'DET', region: 'Dubai', topic: 'Tourism', date: '4 days ago', title: 'Dubai tourism targets 20M visitors — F&B incentives expanded', rel: 'High', impact: 'Supports R&B F&B assets and 6thStreet lifestyle positioning.', titleAr: 'دبي تستهدف 20 مليون زائر', impactAr: 'يدعم أصول الضيافة وموقع 6thStreet.' },
  { body: 'Dubai Municipality', region: 'Dubai', topic: 'Planning', date: '5 days ago', title: 'Updated guidelines for public art in residential developments', rel: 'Medium', impact: 'Relevant to Images RetailME Awards sculpture at 6thStreet loyalty programme.', titleAr: 'إرشادات محدّثة للفن العام في المشاريع السكنية', impactAr: 'ذات صلة بمنحوتة Images RetailME Awards.' },
  { body: 'CBUAE', region: 'UAE', topic: 'Mortgage', date: '1 week ago', title: 'Mortgage affordability rules adjusted for expat buyers', rel: 'Medium', impact: 'May lift 6thStreet pre-sales conversion — monitor with Sales.', titleAr: 'تعديل قواعد تمويل الرهن العقاري للمشترين الأجانب', impactAr: 'قد يرفع مبيعات 6thStreet المسبقة.' },
  { body: 'GCC retail growth Office', region: 'Dubai', topic: 'Economic agenda', date: '1 week ago', title: 'GCC retail growth SME accelerator fund — retail tech eligible', rel: 'Medium', impact: 'Club Apparel proptech pilot may qualify — Strategy to assess.', titleAr: 'صندوق مسرّع الشركات الصغيرة GCC retail growth', impactAr: 'تجربة Club Apparel قد تتأهل.' },
  { body: 'UAE retail compliance', region: 'Dubai', topic: 'Compliance', date: '2 weeks ago', title: 'Enhanced rental disclosure requirements for landlords', rel: 'High', impact: 'Group filing due in 11 days — Legal & Compliance action required.', titleAr: 'متطلبات إفصاح إيجار محسّنة', impactAr: 'إيداع المجموعة خلال 11 يوماً.' },
  { body: 'DET', region: 'Dubai', topic: 'Events', date: '2 weeks ago', title: 'Images RetailME 2026 partnership framework published', rel: 'Low', impact: 'Supports Images RetailME Awards commission narrative.', titleAr: 'نشر إطار شراكة Images RetailME 2026', impactAr: 'يدعم سردية منحوتة Images RetailME Awards.' },
];

// ---------- Approved knowledge base ----------
export const KB_CATS = [
  { id: 'strategy', label: 'Strategy', labelAr: 'الاستراتيجية', color: 'var(--teal-300)' },
  { id: 'performance', label: 'Performance', labelAr: 'الأداء', color: 'var(--status-good)' },
  { id: 'market', label: 'Market Intelligence', labelAr: 'استخبارات السوق', color: 'var(--status-info)' },
  { id: 'board', label: 'Board Pack', labelAr: 'حزمة المجلس', color: 'var(--gold-500)' },
  { id: 'policy', label: 'Policy / Regulatory', labelAr: 'السياسات والتنظيم', color: 'var(--sun-2)' },
  { id: 'general', label: 'General', labelAr: 'عام', color: 'var(--ink-3)' },
];
export const KB_DOCS = [
  { t: 'Apparel Group Strategy 2025\u20132030', cat: 'strategy', date: 'May 2026', pages: 64, by: 'SharePoint sync' },
  { t: 'Q1 2026 Board Pack \u2014 Full', cat: 'board', date: 'Apr 2026', pages: 112, by: 'Uploaded' },
  { t: 'UAE retail compliance & DED Compliance Framework', cat: 'policy', date: 'Feb 2026', pages: 22, by: 'Legal & Compliance' },
  { t: 'Dubai Retail Market Benchmark Report', cat: 'market', date: 'May 2026', pages: 41, by: 'CBRE / Knight Frank' },
  { t: 'HR Quarterly Performance Review', cat: 'performance', date: 'Apr 2026', pages: 23, by: 'ERP/HR ETL' },
  { t: 'GCC retail growth Portfolio Alignment Tracker 2026', cat: 'strategy', date: 'May 2026', pages: 16, by: 'Strategy · Approved KB' },
  { t: 'R&B Portfolio Review Q1 2026', cat: 'performance', date: 'Apr 2026', pages: 32, by: 'R&B · Approved KB' },
  { t: '6thStreet Development Strategy 2026', cat: 'strategy', date: 'Mar 2026', pages: 18, by: '6thStreet · Approved KB' },
  { t: 'Club Apparel Loyalty programme Operations 2026', cat: 'performance', date: 'Apr 2026', pages: 14, by: 'Club Apparel · Approved KB' },
  { t: 'Images RetailME Awards — Commission Brief', cat: 'strategy', date: 'Jun 2026', pages: 12, by: 'Images RetailME · Approved KB' },
  { t: 'Apparel Group Values & Leadership', cat: 'general', date: 'May 2026', pages: 8, by: 'apparelgroup.com · Approved KB' },
  { t: 'Images RetailME 2026 Partnership Register', cat: 'general', date: 'Jun 2026', pages: 24, by: 'SharePoint sync' },
  { t: 'Sales Pipeline & Leasing Status', cat: 'performance', date: 'Apr 2026', pages: 14, by: 'CRM sync' },
  { t: 'F&B Recovery Position Paper', cat: 'market', date: 'Mar 2026', pages: 29, by: 'Uploaded' },
  { t: 'UAE retail compliance Rental Disclosure Programme Brief', cat: 'policy', date: 'Apr 2026', pages: 18, by: 'UAE retail compliance portal' },
];

// ---------- Dubai differentiation ----------
export const DIFFERENTIATION = [
  { icon: 'palette', t: 'Lead on omnichannel living', d: '6thStreet curates architecture, culture and commerce — a durable edge over volume developers in Dubai.', tAr: 'الريادة في السكن بتصميم رائد', dAr: '6thStreet تجمع العمارة والثقافة والتجارة — ميزة دائمة على مطوري الحجم.' },
  { icon: 'home', t: 'Own community loyalty programme', d: 'Club Apparel captures young professionals and creatives — a segment Namshi and Noon under-serve.', tAr: 'تصدّر العيش المشترك', dAr: 'Club Apparel تستهدف الشباب والمبدعين — شريحة يقلّل المنافسون خدمتها.' },
  { icon: 'building-2', t: 'Stabilise income via R&B', d: '3,200+ units across Palm Spring Village and The Beach Centre provide resilient recurring revenue.', tAr: 'دخل مستقر عبر R&B', dAr: 'أكثر من 3200 وحدة توفر إيرادات متكررة مرنة.' },
  { icon: 'sparkles', t: 'Culture in public life', d: 'Images RetailME Awards awards acceptance at 6thStreet loyalty programme — art woven into everyday urban life (GCC retail growth fit 94).', tAr: 'الثقافة في الحياة العامة', dAr: 'منحوتة Images RetailME Awards — الفن جزء من الحياة اليومية.' },
];

// ---------- Scripted chat suggestions + canned answers ----------
/** Static fallback; UI uses getTimeBasedChatSuggestions() for GST-aware first chip */
export const SUGGESTIONS = [
  { q: "Good morning — what's happened today?", agents: ['cos'] },
  { q: "How does 6thStreet's omnichannel positioning compare to Namshi this quarter?", agents:['strategy'] },
  { q: "What strategic decisions did Apparel Group make in 2025 and how do they track against GCC retail growth priorities?", agents:['strategy','cos'] },
  { q: "Brief me on my R&B board meeting tomorrow.", agents:['cos','relationship'] },
  { q: "Top investment opportunities in Dubai retail from current capital flows?", agents:['strategy'] },
  { q: "Draft talking points for the Images RetailME Awards sculpture announcement.", agents:['comms'] },
];

export const CANNED = {
  "How does 6thStreet's omnichannel positioning compare to Namshi this quarter?":
`## 6thStreet vs Namshi — design positioning

> **In plain terms:** 6thStreet leads on cultural curation; Namshi leads on scale and brand recognition.

| What it means | Score | Signal |
|---------------|-------|--------|
| 6thStreet design differentiation | 96/100 | 🟢 |
| Namshi brand & scale | 94/100 | 🟢 |
| Pre-sales velocity | 6thStreet catching up | 🟡 |

████████░░ **90/100**

| Topic | 6thStreet | Namshi |
|-------|------|-------|
| Strength | Culture + design | Volume + distribution |
| Weakness | Scale | Design curation |
| Next move | Waterfront launch | N/A |

🔴 **Do this:** Accelerate 6thStreet launch narrative before competitor waterfront announcement.

*Agents: Strategy · Market intelligence*`,

  "What strategic decisions did Apparel Group make in 2025 and how do they track against GCC retail growth priorities?":
`## 2025 decisions vs GCC retail growth

> **In plain terms:** Portfolio initiatives on track; talent retention needs attention.

████████░░ **86/100**

| Initiative | Status | Signal |
|------------|--------|--------|
| 6thStreet omnichannel launches | On track · Q3 2026 | 🟢 |
| Images RetailME Awards commission | Live · Jun 2026 | 🟢 |
| R&B store performance stabilisation | 94.2% | 🟢 |
| Talent pipeline | Attrition elevated | 🔴 |

*Agents: Strategy · Chief of Staff · AG_GCC_Expansion_Alignment_Tracker_2026.xlsx*`,

  "Brief me on my R&B board meeting tomorrow.":
`## Pre-meeting — R&B board

> **In plain terms:** Tomorrow 10:00 — review store performance, sales pipeline, and UAE retail compliance filing.

| Fact | Detail | Signal |
|------|--------|--------|
| When | Tomorrow 10:00 UAE | 🟢 |
| Prep | Ready | 🟢 |
| Focus | Store performance + UAE retail compliance | 🟢 |

**Agenda highlights**
- Q1 store performance 94.2% across core assets
- AED 124M sales pipeline — 1 deal at risk
- UAE retail compliance rental disclosure due in 11 days

🔴 **Do this:** Confirm escalation path for stalled 6thStreet pre-sales link.

*Agents: Chief of Staff · Relationship · Strategy*`,

  "Top investment opportunities in Dubai retail from current capital flows?":
`## Top opportunities — Dubai retail

> **In plain terms:** F&B recovery and omnichannel residential score highest for the portfolio.

| Sector | GCC retail growth score | Signal |
|--------|-----------|--------|
| Omnichannel residential | 90/100 | 🟢 |
| F&B recovery | 88/100 | 🟢 |
| Loyalty programme / flexible living | 84/100 | 🟢 |
| Commercial retail | 82/100 | 🟢 |

█████████░ **90/100**

🔴 **Do this:** Prioritise 6thStreet waterfront pre-sales and R&B F&B asset review.

*Agents: Strategy · Market intelligence*`,

  "Draft talking points for the Images RetailME Awards sculpture announcement.":
`## Images RetailME Awards — talking points

> **In plain terms:** Culture woven into everyday life; permanent sculpture at 6thStreet loyalty programme.

| Theme | Message | Signal |
|-------|---------|--------|
| Commission | Open call live 17 Jun – 25 Jul | 🟢 |
| Partnership | Images RetailME × Apparel Group | 🟢 |
| Inspiration | نظهر أقوى — resilience & renewal | 🟢 |

### Key lines
- "Art should be woven into everyday life."
- "Giving artists freedom to develop bold, individual proposals."
- "A lasting public presence deeply connected to its environment."

*Agents: Communications · ARM_Values_Leadership_2026.pdf*`,
};


export type CommandCentreSignal = (typeof SIGNALS)[number];
export type CommandCentreDepartment = (typeof DEPARTMENTS)[number];
export type CommandCentreAgent = (typeof AGENTS)[number];
