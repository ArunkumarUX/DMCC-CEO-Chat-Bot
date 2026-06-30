import { CORE_FOCUS_AREAS } from './focusAreas';
import type { PromptTemplate, Workflow } from '../types';

/** §05 Executive Briefing Generator — five guided workflows (spec) */
export const WORKFLOWS: Workflow[] = [
  {
    id: 'w1',
    focusAreaId: 'meetings',
    title: 'Pre-meeting brief',
    description: 'Auto-triggered from calendar — CRM + knowledge base in under 30 seconds',
    icon: 'briefcase',
    estimatedTime: '< 1 min',
    steps: [
      { id: 's1', title: 'Meeting context', description: 'Calendar event and attendees' },
      { id: 's2', title: 'Stakeholder CRM', description: 'History, commitments, sensitivities' },
      { id: 's3', title: 'Review & output', description: '7-part executive brief' },
    ],
  },
  {
    id: 'w2',
    focusAreaId: 'meetings',
    title: 'Board pack summary',
    description: 'One-click Q2/Q3 board materials synthesis',
    icon: 'file',
    estimatedTime: '5 min',
    steps: [
      { id: 's1', title: 'Select pack', description: 'From document library' },
      { id: 's2', title: 'Focus areas', description: 'Decisions, risks, financials' },
      { id: 's3', title: 'Review & output', description: 'Executive summary for CSO' },
    ],
  },
  {
    id: 'w3',
    focusAreaId: 'stakeholders',
    title: 'Stakeholder profile',
    description: 'Living CRM profile with interaction history',
    icon: 'building',
    estimatedTime: '4 min',
    steps: [
      { id: 's1', title: 'Stakeholder', description: 'Name or organisation' },
      { id: 's2', title: 'Review & output', description: 'Profile + open commitments' },
    ],
  },
  {
    id: 'w4',
    focusAreaId: 'regulatory',
    title: 'Policy impact analysis',
    description: 'Regulatory change assessment across jurisdictions',
    icon: 'shield',
    estimatedTime: '6 min',
    steps: [
      { id: 's1', title: 'Policy scope', description: 'UAE retail compliance, MAS, FCA, etc.' },
      { id: 's2', title: 'Impact dimensions', description: 'Apparel Group operations and strategy' },
      { id: 's3', title: 'Review & output', description: 'Impact memo with citations' },
    ],
  },
  {
    id: 'w5',
    focusAreaId: 'correspondence',
    title: 'Ministerial note (Arabic / English)',
    description: 'Bilingual governmental register — CSO voice learning',
    icon: 'scale',
    estimatedTime: '8 min',
    steps: [
      { id: 's1', title: 'Topic & audience', description: 'HH office, performance, policy' },
      { id: 's2', title: 'Language', description: 'Arabic, English, or side-by-side' },
      { id: 's3', title: 'Review & output', description: 'Draft for approval' },
    ],
  },
];

export const PROMPT_LIBRARY: PromptTemplate[] = CORE_FOCUS_AREAS.flatMap((area) =>
  area.prompts.map((prompt, pi) => ({
    id: `p-${area.id}-${pi}`,
    category: area.shortTitle,
    title: prompt.length > 52 ? `${prompt.slice(0, 52)}…` : prompt,
    description: area.capabilities[pi % area.capabilities.length] ?? area.description,
    prompt,
  })),
);

export const PROMPT_CATEGORIES = ['All', ...CORE_FOCUS_AREAS.map((a) => a.shortTitle)];

export { CONVERSATION_CATEGORIES, ALL_FOCUS_PROMPTS as SUGGESTED_PROMPTS } from './focusAreas';
