/** Server-side mirror of src/utils/sourceHandles.ts for chat prompts */

const KB_NUM = {
  d1: 'KB-001',
  d2: 'KB-002',
  d3: 'KB-003',
  d4: 'KB-004',
  d5: 'KB-005',
};

function kbHandle(docId, index = 0) {
  return KB_NUM[docId] ?? `KB-${String(index + 1).padStart(3, '0')}`;
}

function calHandle(meetingId, time) {
  const hhmm = time.match(/T(\d{2})(\d{2})/);
  if (hhmm) return `CAL-${hhmm[1]}${hhmm[2]}`;
  return `CAL-${meetingId.replace(/\D/g, '').slice(0, 4) || '0000'}`;
}

function actHandle(actionId, index) {
  const n = actionId.replace(/\D/g, '');
  return n ? `ACT-${n.padStart(2, '0')}` : `ACT-${String(index + 1).padStart(2, '0')}`;
}

function mktHandle(asOf) {
  return `MKT-${asOf.slice(0, 10)}`;
}

function crmHandle(slug) {
  return `CRM-${slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function meetingCrmSlug(title) {
  const t = title.toLowerCase();
  if (t.includes('mubadala')) return 'mubadala';
  if (t.includes('mas') || t.includes('singapore')) return 'mas';
  if (t.includes('board')) return 'board-risk';
  return title.split(/\s+/).slice(0, 2).join('-').toLowerCase();
}

export function buildGroundedRecordsFromContext(ctx) {
  const records = [];
  const docs = ctx?.documents || [];
  const meetings = ctx?.meetings || [];
  const actions = ctx?.openActions || [];
  const market = ctx?.marketSnapshot;
  const lastSync = ctx?.lastSync || new Date().toISOString();

  docs.forEach((doc, i) => {
    records.push({
      handle: doc.handle || kbHandle(doc.id, i),
      kind: 'internal',
      system: 'Knowledge base',
      label: doc.name,
      snippet: doc.summary || '',
      asOf: doc.asOf || doc.uploadedAt || lastSync.slice(0, 10),
    });
  });

  (ctx?.meetingsDetailed || meetings).forEach((m) => {
    const id = m.id || m.title;
    const time = m.time || '';
    const cal = m.handle || calHandle(id, time);
    records.push({
      handle: cal,
      kind: 'internal',
      system: 'Calendar (Microsoft Graph demo)',
      label: m.title,
      snippet: `${time} · ${m.attendees} · ${m.location} · prep ${m.prepStatus}`,
      asOf: time.slice(0, 10) || lastSync.slice(0, 10),
    });
    const crm = m.crmHandle || crmHandle(meetingCrmSlug(m.title));
    records.push({
      handle: crm,
      kind: 'internal',
      system: 'CRM register',
      label: `Stakeholder — ${m.title}`,
      snippet: `Attendees: ${m.attendees}. Linked to ${cal}.`,
      asOf: time.slice(0, 10) || lastSync.slice(0, 10),
    });
  });

  (ctx?.actionsDetailed || actions).forEach((a, i) => {
    records.push({
      handle: a.handle || actHandle(a.id || `a${i}`, i),
      kind: 'internal',
      system: 'Action register',
      label: a.title,
      snippet: `[${a.status}] due ${a.due} · owner ${a.owner}`,
      asOf: a.due || lastSync.slice(0, 10),
    });
  });

  if (market) {
    const mktH = ctx?.marketHandle || mktHandle(lastSync);
    records.push({
      handle: mktH,
      kind: 'external',
      system: 'Market snapshot (Bloomberg / Refinitiv demo feed)',
      label: 'GCC & digital-assets market',
      snippet: `GCC ${market.gccEquities} · digital assets ${market.digitalAssetsWoW} · ${market.competitorNote} · top sector ${market.topSector}`,
      asOf: lastSync.slice(0, 10),
    });
  }

  return records;
}

export function formatGroundedContextBlock(records) {
  const internal = records.filter((r) => r.kind === 'internal');
  const external = records.filter((r) => r.kind === 'external');
  const line = (r) =>
    `[${r.handle}] (${r.system}, as of ${r.asOf}) ${r.label}\n  Snippet: ${r.snippet}`;

  return `INTERNAL SOURCES OF TRUTH (institutional — cite by handle):
${internal.map(line).join('\n') || '(none)'}

EXTERNAL SOURCES OF TRUTH (market & regulatory feeds — cite by handle):
${external.map(line).join('\n') || '(none)'}

Valid handles for this turn: ${records.map((r) => r.handle).join(', ')}`;
}
