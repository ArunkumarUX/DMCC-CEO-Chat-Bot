import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Globe2,
  Calendar,
  Scale,
  Mail,
  Users,
  Library,
  ArrowLeft,
  MessageSquare,
  Workflow,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  CORE_FOCUS_AREAS,
  FOCUS_AREA_MAP,
  getDocumentsForFocusArea,
  getWorkflowsForFocusArea,
  type FocusArea,
} from '../data/focusAreas';
import type { FocusAreaId } from '../types';
import { WORKFLOWS } from '../data/dummyData';
import { MagneticButton } from '../components/motion/MagneticButton';

const iconMap: Record<FocusArea['icon'], LucideIcon> = {
  globe: Globe2,
  calendar: Calendar,
  scale: Scale,
  mail: Mail,
  users: Users,
  library: Library,
};

export function FocusAreaDetailPage() {
  const { focusId } = useParams<{ focusId: string }>();
  const navigate = useNavigate();
  const { documents, createConversation, sendMessage } = useApp();

  const area = focusId && FOCUS_AREA_MAP[focusId as FocusAreaId]
    ? FOCUS_AREA_MAP[focusId as FocusAreaId]
    : null;

  const relatedWorkflows = useMemo(
    () => (area ? getWorkflowsForFocusArea(area.id, WORKFLOWS) : []),
    [area],
  );
  const relatedDocs = useMemo(
    () => (area ? getDocumentsForFocusArea(area.id, documents) : []),
    [area, documents],
  );

  if (!area) {
    return (
      <div className="cc-page cc-legacy flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-adgm-slate">Focus area not found.</p>
          <Link to="/dashboard" className="text-sm text-adgm-primary mt-4 inline-block hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[area.icon];

  const startPrompt = (prompt: string) => {
    createConversation(prompt.slice(0, 48), area.shortTitle);
    navigate(`/chat?focus=${area.id}`);
    setTimeout(() => sendMessage(prompt), 80);
  };

  return (
    <div className="grid mi-stagger cc-page cc-legacy" style={{ gap: 20 }}>
      <div className="w-full min-w-0">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-adgm-mist hover:text-adgm-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <header className="rounded-2xl border border-adgm-line bg-white p-6 shadow-adgm-sm mb-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-adgm-primary-light text-adgm-primary">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-adgm-primary">
                Core focus area
              </p>
              <h1 className="font-display text-2xl font-semibold text-adgm-navy mt-1">{area.title}</h1>
              <p className="text-sm text-adgm-slate mt-2 leading-relaxed">{area.description}</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 border-t border-adgm-line pt-5">
            {area.capabilities.map((c) => (
              <li key={c} className="text-sm text-adgm-charcoal flex gap-2">
                <span className="text-adgm-primary shrink-0">✓</span>
                {c}
              </li>
            ))}
          </ul>
          <MagneticButton
            className="mt-6 inline-flex items-center gap-2 rounded-none bg-adgm-primary px-7 py-3 text-sm font-semibold text-white hover:bg-adgm-primary-hover"
            onClick={() => startPrompt(area.prompts[0])}
          >
            <MessageSquare className="h-4 w-4" />
            Start in chat
          </MagneticButton>
        </header>

        <section className="mb-6">
          <h2 className="font-semibold text-adgm-navy mb-3">Starter prompts</h2>
          <div className="space-y-2">
            {area.prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => startPrompt(p)}
                className="w-full text-start rounded-xl border border-adgm-line bg-white px-4 py-3 text-sm text-adgm-charcoal hover:border-adgm-primary/40 hover:bg-adgm-sky-bg/50 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              createConversation(area.shortTitle, area.shortTitle);
              navigate(`/chat?focus=${area.id}`);
            }}
            className="mt-3 text-xs text-adgm-mist hover:text-adgm-primary underline"
          >
            Open empty chat in this focus area
          </button>
        </section>

        {relatedWorkflows.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-adgm-navy mb-3 flex items-center gap-2">
              <Workflow className="h-4 w-4 text-adgm-primary" />
              Guided workflows
            </h2>
            <ul className="space-y-2">
              {relatedWorkflows.map((w) => (
                <li key={w.id}>
                  <Link
                    to={`/workflows?focus=${area.id}`}
                    className="block rounded-xl border border-adgm-line bg-white px-4 py-3 hover:border-adgm-primary/35"
                  >
                    <p className="text-sm font-medium text-adgm-navy">{w.title}</p>
                    <p className="text-xs text-adgm-mist mt-0.5">{w.estimatedTime}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedDocs.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-adgm-navy mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-adgm-primary" />
              Knowledge base
            </h2>
            <ul className="space-y-2">
              {relatedDocs.map((d) => (
                <li key={d.id}>
                  <Link
                    to={`/documents?focus=${area.id}`}
                    className="block rounded-xl border border-adgm-line bg-white px-4 py-3 hover:border-adgm-primary/35"
                  >
                    <p className="text-sm font-medium text-adgm-navy truncate">{d.name}</p>
                    <p className="text-xs text-adgm-mist mt-0.5">{d.summary?.slice(0, 72)}…</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-adgm-mist">
          Agents: {area.agents.map((a) => a.replace(/^\w/, (c) => c.toUpperCase())).join(' · ')} AI
        </p>
      </div>
    </div>
  );
}

export function isValidFocusId(id: string): id is FocusAreaId {
  return CORE_FOCUS_AREAS.some((a) => a.id === id);
}
