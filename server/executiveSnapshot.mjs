/**
 * Fresh executive data patch for online refresh (GST / Abu Dhabi dates).
 * Client merges into local state; keeps conversations unless reset requested.
 */

function gstNow() {
  const now = new Date();
  return new Date(now.getTime() + (now.getTimezoneOffset() + 240) * 60000);
}

function dateOnly(d) {
  return d.toISOString().slice(0, 10);
}

function addDays(d, days) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function meetingIso(day, hour, minute = 0) {
  const y = day.getFullYear();
  const m = day.getMonth();
  const dom = day.getDate();
  return new Date(Date.UTC(y, m, dom, hour - 4, minute, 0)).toISOString();
}

const MARKET_ROTATION = [
  {
    gccEquities: '+0.8%',
    digitalAssetsWoW: '+12%',
    competitorNote: 'DIFC fintech sandbox expansion announced',
    topSector: 'Climate tech (D33 score 88)',
  },
  {
    gccEquities: '+1.1%',
    digitalAssetsWoW: '+9%',
    competitorNote: 'Riyadh fintech licence batch — 14 new approvals',
    topSector: 'Digital assets (FSRA pipeline strong)',
  },
  {
    gccEquities: '+0.4%',
    digitalAssetsWoW: '+15%',
    competitorNote: 'MAS stablecoin consultation — retail rules tightening',
    topSector: 'Sovereign wealth co-investments',
  },
  {
    gccEquities: '+0.6%',
    digitalAssetsWoW: '+11%',
    competitorNote: 'Qatar Fintech Hub — custody standards update',
    topSector: 'Regulatory technology',
  },
];

export function buildExecutiveSnapshotPatch() {
  const today = gstNow();
  const todayStr = dateOnly(today);
  const dayIdx = today.getDay() % MARKET_ROTATION.length;

  const meetings = [
    {
      id: 'mtg1',
      title: 'Mubadala leadership — follow-up',
      time: meetingIso(today, 15, 0),
      attendees: 'Khaldoon Al Mubarak, Mubadala CEO',
      location: 'Al Maryah Island',
      prepStatus: 'ready',
    },
    {
      id: 'mtg2',
      title: 'Board risk committee — data policy',
      time: meetingIso(addDays(today, 1), 10, 0),
      attendees: 'Board risk committee',
      location: 'Board room',
      prepStatus: 'pending',
    },
    {
      id: 'mtg3',
      title: 'Singapore MAS delegation',
      time: meetingIso(addDays(today, 2), 15, 0),
      attendees: 'MAS regulatory & market development leads',
      location: 'ADGM Auditorium, Al Maryah',
      prepStatus: 'ready',
    },
  ];

  const actionRegister = [
    {
      id: 'a1',
      title: 'Share digital assets policy update with Mubadala',
      owner: 'Rajiv Sehgal',
      due: dateOnly(addDays(today, -1)),
      status: 'overdue',
      departmentId: 'strategy',
    },
    {
      id: 'a2',
      title: 'Approve retention packages — 2 Strategy roles',
      owner: 'Rajiv Sehgal',
      due: dateOnly(addDays(today, 3)),
      status: 'open',
      departmentId: 'hr',
    },
    {
      id: 'a3',
      title: 'MAS policy comparison note post-consultation',
      owner: 'Policy AI → Rajiv',
      due: dateOnly(addDays(today, 9)),
      status: 'open',
      departmentId: 'policy',
    },
    {
      id: 'a4',
      title: 'Review Arabic ministerial note — HH office',
      owner: 'Rajiv Sehgal',
      due: dateOnly(addDays(today, 2)),
      status: 'open',
    },
  ];

  const documentDates = [
    dateOnly(today),
    dateOnly(addDays(today, -2)),
    dateOnly(addDays(today, -4)),
    dateOnly(addDays(today, -1)),
    dateOnly(addDays(today, -11)),
  ];

  return {
    version: 4,
    lastSync: new Date().toISOString(),
    refreshedAt: new Date().toISOString(),
    timezone: 'Asia/Dubai',
    meetings,
    actionRegister,
    marketSnapshot: MARKET_ROTATION[dayIdx],
    metrics: {
      queriesThisWeek: 42 + (today.getDate() % 12),
      documentsInKb: 52,
      briefingsGenerated: 8,
      avgConfidence: 0.91,
      openActions: actionRegister.filter((a) => a.status !== 'done').length,
    },
    documentUploadedAt: {
      d1: documentDates[0],
      d2: documentDates[1],
      d3: documentDates[2],
      d4: documentDates[3],
      d5: documentDates[4],
    },
    regulatoryHeadline: 'FSRA refreshes virtual-asset custody guidance',
  };
}

export function createExecutiveSnapshotResponse() {
  return {
    ok: true,
    patch: buildExecutiveSnapshotPatch(),
  };
}
