import { Link, useSearchParams } from 'react-router-dom';
import {
  Building2,
  Shield,
  Scale,
  FileText,
  Grid3X3,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WORKFLOWS } from '../data/dummyData';
import { FOCUS_AREA_MAP, getWorkflowsForFocusArea, type FocusAreaId } from '../data/focusAreas';
import type { Workflow } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building2,
  shield: Shield,
  scale: Scale,
  file: FileText,
  grid: Grid3X3,
};

export function WorkflowsPage() {
  const [searchParams] = useSearchParams();
  const focusParam = searchParams.get('focus') as FocusAreaId | null;
  const activeFocus =
    focusParam && FOCUS_AREA_MAP[focusParam] ? FOCUS_AREA_MAP[focusParam] : null;
  const visibleWorkflows = activeFocus
    ? getWorkflowsForFocusArea(activeFocus.id, WORKFLOWS)
    : WORKFLOWS;

  const {
    activeWorkflow,
    workflowStep,
    workflowAnswers,
    startWorkflow,
    setWorkflowAnswer,
    nextWorkflowStep,
    prevWorkflowStep,
    completeWorkflow,
    cancelWorkflow,
  } = useApp();

  if (activeWorkflow) {
    return (
      <WorkflowRunner
        workflow={activeWorkflow}
        step={workflowStep}
        answers={workflowAnswers}
        onAnswer={setWorkflowAnswer}
        onNext={nextWorkflowStep}
        onPrev={prevWorkflowStep}
        onComplete={completeWorkflow}
        onCancel={cancelWorkflow}
      />
    );
  }

  return (
    <div className="grid mi-stagger cc-page cc-legacy" style={{ gap: 20 }}>
      <div className="w-full min-w-0">
        {activeFocus && (
          <Link
            to={`/focus/${activeFocus.id}`}
            className="text-sm text-adgm-primary hover:underline mb-2 inline-block"
          >
            ← {activeFocus.title}
          </Link>
        )}
        <h1 className="font-display text-2xl font-semibold text-adgm-navy">Workflow assistant</h1>
        <p className="text-adgm-slate mt-2 mb-8">
          {activeFocus
            ? `Guided flows for ${activeFocus.shortTitle} — pre-meeting briefs, board packs, policy, and more.`
            : 'Guided multi-step flows mapped to your six CSO focus areas.'}
        </p>
        <div className="grid cc-grid-auto">
          {visibleWorkflows.map((w) => {
            const Icon = iconMap[w.icon] ?? Grid3X3;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => startWorkflow(w)}
                className="flex flex-col rounded-2xl border border-adgm-line bg-white p-6 text-start shadow-adgm-sm hover:border-adgm-gold hover:shadow-adgm-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-adgm-sand/70 text-adgm-navy mb-4 group-hover:bg-adgm-gold/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-semibold text-adgm-navy">{w.title}</h2>
                <p className="text-sm text-adgm-charcoal mt-2 flex-1">{w.description}</p>
                <p className="text-xs text-adgm-mist mt-4 flex items-center gap-1">
                  {w.steps.length} steps · {w.estimatedTime}
                  <ChevronRight className="h-4 w-4 ms-auto text-adgm-gold" />
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WorkflowRunner({
  workflow,
  step,
  answers,
  onAnswer,
  onNext,
  onPrev,
  onComplete,
  onCancel,
}: {
  workflow: Workflow;
  step: number;
  answers: Record<string, string>;
  onAnswer: (id: string, v: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  onCancel: () => void;
}) {
  const isReview = step >= workflow.steps.length;
  const current = workflow.steps[step];
  const progress = isReview ? 100 : ((step + 1) / workflow.steps.length) * 100;

  return (
    <div className="grid mi-stagger cc-page cc-legacy" style={{ gap: 20 }}>
      <div className="w-full min-w-0 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button type="button" onClick={onCancel} className="text-sm text-adgm-mist hover:text-adgm-navy">
            <X className="h-5 w-5" />
          </button>
          <span className="text-xs font-medium text-adgm-mist">
            Step {isReview ? workflow.steps.length : step + 1} of {workflow.steps.length}
          </span>
        </div>

        <div className="h-1.5 rounded-full bg-adgm-line mb-8 overflow-hidden">
          <div
            className="h-full bg-adgm-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!isReview && current ? (
          <>
            <h1 className="font-display text-2xl font-semibold text-adgm-navy">{current.title}</h1>
            {current.description && (
              <p className="text-adgm-slate mt-2 mb-6">{current.description}</p>
            )}
            <textarea
              value={answers[current.id] ?? ''}
              onChange={(e) => onAnswer(current.id, e.target.value)}
              placeholder="Enter your response..."
              rows={4}
              className="w-full rounded-xl border border-adgm-line bg-white px-4 py-3 text-sm focus:border-adgm-gold focus:outline-none"
            />
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onPrev}
                disabled={step === 0}
                className="flex items-center gap-1 rounded-xl border border-adgm-line px-4 py-2 text-sm disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={onNext}
                className="flex items-center gap-1 rounded-full bg-adgm-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-adgm-primary-hover"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-semibold text-adgm-navy mb-2">Review & output</h1>
            <p className="text-adgm-slate mb-6">Generated guidance based on your inputs.</p>
            <div className="rounded-2xl border border-adgm-line bg-white p-6 shadow-adgm-sm space-y-4">
              <div className="flex items-center gap-2 text-adgm-success">
                <Check className="h-5 w-5" />
                <span className="font-medium text-sm">Workflow complete</span>
              </div>
              <div className="prose-adgm text-sm text-adgm-charcoal space-y-3">
                <p>
                  <strong>Entity pathway:</strong>{' '}
                  {answers[workflow.steps[0]?.id] || 'Private Company Limited by Shares (SPV)'}
                </p>
                <p>
                  <strong>Recommended actions:</strong>
                </p>
                <ol className="list-decimal ms-5 space-y-1">
                  <li>Reserve company name via ACCESSADGM</li>
                  <li>Confirm business activity codes with RA</li>
                  <li>Prepare KYC pack for directors and UBOs</li>
                  <li>Engage registered Corporate Service Provider if required</li>
                </ol>
                <p className="text-xs text-adgm-mist pt-2 border-t border-adgm-line">
                  Confidence: 89% · Sources: ADGM Companies Regulations, RA Incorporation Guide
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onComplete}
              className="mt-6 w-full rounded-full bg-adgm-primary py-3 text-sm font-medium text-white hover:bg-adgm-primary-hover"
            >
              Save output & close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
