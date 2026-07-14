/** Generate Document — executive document model */

export type DocStatus = 'draft' | 'under-review' | 'leadership-review' | 'approved' | 'published' | 'archived';

export type DocSection = {
  id: string;
  title: string;
  /** Markdown body */
  body: string;
  kind?: string;
};

export type GeneratedDocument = {
  id: string;
  title: string;
  docType: string;
  purpose: string;
  audience: string;
  style: string;
  status: DocStatus;
  summary: string;
  estimatedPages: number;
  sections: DocSection[];
  sources: string[];
  brandCheck: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
};

export type DocChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  ts: number;
};

export type DocAgentResponse = {
  action: 'message' | 'create' | 'update' | 'preview';
  message?: string;
  document?: GeneratedDocument | null;
  /** Partial section updates */
  updatedSections?: DocSection[] | null;
};

export type DocBrief = {
  docType?: string;
  purpose?: string;
  audience?: string;
  style?: string;
  /** Free-text notes / information to include */
  includeNotes?: string;
};
