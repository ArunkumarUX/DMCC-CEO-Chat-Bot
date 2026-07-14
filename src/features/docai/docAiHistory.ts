import type { DocChatMessage, GeneratedDocument } from './docTypes';

export interface DocAiHistoryEntry {
  id: string;
  title: string;
  docType: string;
  sectionCount: number;
  previewLine: string;
  updatedAt: string;
  document: GeneratedDocument;
  chatHistory: DocChatMessage[];
}

const STORAGE_KEY = 'dmcc-docai-history-v1';
const MAX_ENTRIES = 24;

function readAll(): DocAiHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DocAiHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(entries: DocAiHistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
  } catch {
    /* quota */
  }
}

export function listDocAiHistory(): DocAiHistoryEntry[] {
  return readAll().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getDocAiHistoryEntry(id: string): DocAiHistoryEntry | null {
  return readAll().find((e) => e.id === id) ?? null;
}

export function upsertDocAiHistory(input: {
  id?: string | null;
  document: GeneratedDocument;
  chatHistory: DocChatMessage[];
}): DocAiHistoryEntry {
  const entries = readAll();
  const firstUser = input.chatHistory.find((m) => m.role === 'user')?.content?.trim() ?? '';
  const next: DocAiHistoryEntry = {
    id: input.id || `docai-${Date.now()}`,
    title: input.document.title || 'Untitled document',
    docType: input.document.docType || 'custom',
    sectionCount: input.document.sections.length,
    previewLine: (firstUser || input.document.summary || input.document.title).slice(0, 120),
    updatedAt: new Date().toISOString(),
    document: input.document,
    chatHistory: input.chatHistory,
  };
  writeAll([next, ...entries.filter((e) => e.id !== next.id)]);
  return next;
}

export function deleteDocAiHistory(id: string) {
  writeAll(readAll().filter((e) => e.id !== id));
}

export function formatDocAiHistoryWhen(iso: string, ar: boolean): string {
  try {
    return new Date(iso).toLocaleString(ar ? 'ar-AE' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso.slice(0, 16);
  }
}
