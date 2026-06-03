import { MessageSquare, FileText, Globe2, Gauge } from 'lucide-react';
import { CSO_DAILY_CAPABILITIES } from '../../config/user';

const icons = [MessageSquare, FileText, Globe2, Gauge];

export function CsoCapabilitiesStrip() {
  return (
    <div className="home-panel">
      <p className="text-xs font-semibold uppercase tracking-wider text-adgm-mist mb-3">
        What you can do
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {CSO_DAILY_CAPABILITIES.map((text, i) => {
          const Icon = icons[i];
          return (
            <li key={text} className="flex items-start gap-3 rounded-xl border border-adgm-line/80 bg-adgm-ivory/50 px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-adgm-primary shadow-adgm-sm">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-xs leading-relaxed text-adgm-charcoal">{text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
