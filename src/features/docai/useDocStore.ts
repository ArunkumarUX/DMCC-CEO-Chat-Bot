import { create } from 'zustand';
import {
  cloneDocument,
  isFullDocResponse,
  mergeSections,
  normalizeDocument,
  normalizeSection,
} from './docNormalize';
import {
  deleteDocAiHistory,
  getDocAiHistoryEntry,
  listDocAiHistory,
  upsertDocAiHistory,
  type DocAiHistoryEntry,
} from './docAiHistory';
import type { DocAgentResponse, DocBrief, DocChatMessage, GeneratedDocument } from './docTypes';

interface DocStore {
  document: GeneratedDocument | null;
  chatHistory: DocChatMessage[];
  brief: DocBrief;
  sessionId: string | null;
  historyRevision: number;
  activeSectionIndex: number;
  docRevision: number;
  contentKey: string;
  isLoading: boolean;
  loadingStep: number;
  previewFlash: boolean;
  exportBusy: boolean;
  setDocument: (doc: GeneratedDocument) => void;
  setBrief: (patch: Partial<DocBrief>) => void;
  applyAgentResult: (result: DocAgentResponse) => boolean;
  addMessage: (msg: Omit<DocChatMessage, 'id' | 'ts'> & { id?: string; ts?: number }) => void;
  setActiveSection: (i: number) => void;
  setLoading: (v: boolean) => void;
  setLoadingStep: (step: number) => void;
  clearPreviewFlash: () => void;
  setExportBusy: (v: boolean) => void;
  refreshHistory: () => void;
  getHistory: () => DocAiHistoryEntry[];
  persistCurrentSession: () => void;
  restoreSession: (id: string) => boolean;
  removeSession: (id: string) => void;
  reset: () => void;
}

function bumpPreview(
  set: (fn: (s: DocStore) => Partial<DocStore>) => void,
  patch: Partial<DocStore>,
) {
  set((s) => ({
    ...patch,
    docRevision: s.docRevision + 1,
    contentKey: `${Date.now()}-${s.docRevision + 1}`,
    previewFlash: true,
  }));
}

let msgSeq = 0;

export const useDocStore = create<DocStore>((set, get) => ({
  document: null,
  chatHistory: [],
  brief: {},
  sessionId: null,
  historyRevision: 0,
  activeSectionIndex: 0,
  docRevision: 0,
  contentKey: '0',
  isLoading: false,
  loadingStep: 0,
  previewFlash: false,
  exportBusy: false,

  refreshHistory: () => set((s) => ({ historyRevision: s.historyRevision + 1 })),

  getHistory: () => listDocAiHistory(),

  setBrief: (patch) => set((s) => ({ brief: { ...s.brief, ...patch } })),

  persistCurrentSession: () => {
    const { document, chatHistory, sessionId } = get();
    if (!document?.sections?.length) return;
    const saved = upsertDocAiHistory({ id: sessionId, document, chatHistory });
    set({ sessionId: saved.id, historyRevision: get().historyRevision + 1 });
  },

  restoreSession: (id) => {
    const entry = getDocAiHistoryEntry(id);
    if (!entry) return false;
    const normalized = normalizeDocument(cloneDocument(entry.document));
    set({
      document: normalized,
      chatHistory: entry.chatHistory,
      sessionId: entry.id,
      brief: {
        docType: normalized.docType,
        purpose: normalized.purpose,
        audience: normalized.audience,
        style: normalized.style,
      },
      activeSectionIndex: 0,
      docRevision: get().docRevision + 1,
      contentKey: `${Date.now()}-restore`,
      previewFlash: true,
      isLoading: false,
      loadingStep: 0,
    });
    return true;
  },

  removeSession: (id) => {
    deleteDocAiHistory(id);
    const { sessionId } = get();
    set({
      historyRevision: get().historyRevision + 1,
      ...(sessionId === id
        ? {
            document: null,
            chatHistory: [],
            sessionId: null,
            brief: {},
            activeSectionIndex: 0,
          }
        : {}),
    });
  },

  setDocument: (doc) => {
    const normalized = normalizeDocument(cloneDocument(doc));
    bumpPreview(set, { document: normalized, activeSectionIndex: 0 });
    get().persistCurrentSession();
  },

  applyAgentResult: (result) => {
    const { document, activeSectionIndex } = get();
    const hasFull = Boolean(result.document?.sections?.length);
    const hasPartial = Boolean(result.updatedSections?.length);

    if (!hasFull && !hasPartial) return false;

    if (hasFull && isFullDocResponse(result, document)) {
      const normalized = normalizeDocument(cloneDocument(result.document!));
      const nextIndex =
        result.action === 'create' || !document
          ? 0
          : Math.min(activeSectionIndex, normalized.sections.length - 1);
      bumpPreview(set, {
        document: {
          ...normalized,
          version: document ? (document.version || 1) + 1 : normalized.version,
        },
        activeSectionIndex: nextIndex,
        brief: {
          docType: normalized.docType,
          purpose: normalized.purpose,
          audience: normalized.audience,
          style: normalized.style,
        },
      });
      get().persistCurrentSession();
      return true;
    }

    if (hasPartial && document) {
      const updates = result.updatedSections!.map((s, i) => normalizeSection(s, i));
      const sections = mergeSections(document.sections, updates);
      const base = result.document
        ? { ...document, ...result.document, sections }
        : { ...document, sections };
      const normalized = normalizeDocument(
        cloneDocument({
          ...base,
          version: (document.version || 1) + 1,
        }),
      );
      bumpPreview(set, {
        document: normalized,
        activeSectionIndex: Math.min(
          activeSectionIndex,
          Math.max(0, normalized.sections.length - 1),
        ),
      });
      get().persistCurrentSession();
      return true;
    }

    if (hasFull) {
      const normalized = normalizeDocument(cloneDocument(result.document!));
      bumpPreview(set, {
        document: normalized,
        activeSectionIndex: Math.min(activeSectionIndex, normalized.sections.length - 1),
      });
      get().persistCurrentSession();
      return true;
    }

    return false;
  },

  addMessage: (msg) =>
    set((s) => ({
      chatHistory: [
        ...s.chatHistory,
        {
          id: msg.id || `m-${Date.now()}-${++msgSeq}`,
          ts: msg.ts ?? Date.now(),
          role: msg.role,
          content: msg.content,
        },
      ],
    })),

  setActiveSection: (i) => set({ activeSectionIndex: i }),
  setLoading: (v) => set({ isLoading: v, loadingStep: v ? 0 : 0 }),
  setLoadingStep: (step) => set({ loadingStep: step }),
  clearPreviewFlash: () => set({ previewFlash: false }),
  setExportBusy: (v) => set({ exportBusy: v }),

  reset: () => {
    get().persistCurrentSession();
    set({
      document: null,
      chatHistory: [],
      brief: {},
      sessionId: null,
      activeSectionIndex: 0,
      docRevision: get().docRevision + 1,
      contentKey: `${Date.now()}-new`,
      isLoading: false,
      loadingStep: 0,
      previewFlash: false,
      exportBusy: false,
    });
  },
}));
