import type { DocSection, GeneratedDocument } from './docTypes';

function sid(i: number) {
  return `sec-${i + 1}`;
}

export function normalizeSection(raw: Partial<DocSection>, i: number): DocSection {
  return {
    id: String(raw.id || sid(i)),
    title: String(raw.title || `Section ${i + 1}`).trim() || `Section ${i + 1}`,
    body: String(raw.body || '').trim(),
    kind: raw.kind ? String(raw.kind) : undefined,
  };
}

export function cloneDocument(doc: GeneratedDocument): GeneratedDocument {
  return {
    ...doc,
    sections: doc.sections.map((s) => ({ ...s })),
    sources: [...(doc.sources || [])],
    brandCheck: [...(doc.brandCheck || [])],
  };
}

export function normalizeDocument(doc: GeneratedDocument): GeneratedDocument {
  const now = new Date().toISOString();
  const sections = (doc.sections || []).map((s, i) => normalizeSection(s, i));
  return {
    id: doc.id || `doc-${Date.now()}`,
    title: (doc.title || 'Untitled document').trim(),
    docType: doc.docType || 'custom',
    purpose: doc.purpose || '',
    audience: doc.audience || '',
    style: doc.style || 'dmcc-brand',
    status: doc.status || 'draft',
    summary: doc.summary || '',
    estimatedPages: Math.max(1, Number(doc.estimatedPages) || Math.max(1, Math.ceil(sections.length / 2))),
    sections,
    sources: Array.isArray(doc.sources) ? doc.sources.map(String) : [],
    brandCheck: Array.isArray(doc.brandCheck) ? doc.brandCheck.map(String) : [],
    createdAt: doc.createdAt || now,
    updatedAt: now,
    version: Number(doc.version) || 1,
  };
}

export function mergeSections(
  existing: DocSection[],
  updates: DocSection[],
): DocSection[] {
  const map = new Map(existing.map((s) => [s.id, s]));
  for (const u of updates) {
    const prev = map.get(u.id);
    map.set(u.id, prev ? { ...prev, ...u, body: u.body ?? prev.body } : normalizeSection(u, map.size));
  }
  // Preserve order: existing order, then any new ids
  const order = [...existing.map((s) => s.id)];
  for (const u of updates) {
    if (!order.includes(u.id)) order.push(u.id);
  }
  return order.map((id) => map.get(id)!).filter(Boolean);
}

export function sanitizeAssistantMessage(msg: string): string {
  return msg.replace(/\s+/g, ' ').trim().slice(0, 1200);
}

export function isFullDocResponse(
  result: { document?: GeneratedDocument | null },
  current: GeneratedDocument | null,
): boolean {
  const secs = result.document?.sections?.length ?? 0;
  if (secs < 2) return false;
  if (!current) return true;
  return secs >= Math.max(2, Math.floor((current.sections.length || 1) * 0.6));
}
