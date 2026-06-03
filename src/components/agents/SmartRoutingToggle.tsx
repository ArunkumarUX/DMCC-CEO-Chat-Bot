import { Sparkles } from 'lucide-react';

/** Routes queries to the right specialist agents (spec: five-agent orchestration) */
export function SmartRoutingToggle({
  autoRoute,
  onAutoRouteChange,
}: {
  autoRoute: boolean;
  onAutoRouteChange: (on: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <Sparkles className="h-4 w-4 text-adgm-primary shrink-0" aria-hidden />
        <p className="text-xs text-adgm-slate">
          {autoRoute ? 'Smart routing on — best agents selected automatically' : 'Smart routing off'}
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={autoRoute}
          onChange={(e) => onAutoRouteChange(e.target.checked)}
          className="sr-only peer"
        />
        <span className="w-10 h-6 bg-adgm-line rounded-full peer peer-checked:bg-adgm-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-4" />
      </label>
    </div>
  );
}
