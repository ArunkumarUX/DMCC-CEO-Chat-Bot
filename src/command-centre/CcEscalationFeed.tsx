// @ts-nocheck — escalation feed uses dynamic severity metadata
import { CcIcon } from './CcIcon';

export type EscalationItem = {
  id: string;
  deptId: string;
  icon: string;
  title: string;
  sev: 'High' | 'Medium' | 'Low';
};

const SEV_LABEL = {
  high: { en: 'High', ar: 'عالي' },
  medium: { en: 'Medium', ar: 'متوسط' },
  low: { en: 'Low', ar: 'منخفض' },
};

export function CcEscalationPanel({
  items,
  ar,
  onSelect,
}: {
  items: EscalationItem[];
  ar: boolean;
  onSelect: (deptId: string) => void;
}) {
  return (
    <section className="esc-intel" aria-labelledby="esc-intel-title">
      <header className="esc-intel__head">
        <div className="esc-intel__brand">
          <span className="esc-intel__mark" aria-hidden>
            <CcIcon name="siren" size={18} strokeWidth={2.25} />
          </span>
          <div className="esc-intel__titles">
            <h3 id="esc-intel-title" className="esc-intel__title">
              {ar ? 'ذكاء التصعيد' : 'Escalation intelligence'}
            </h3>
            <p className="esc-intel__subtitle">
              {ar
                ? 'يُعرض استباقياً — النظام لم ينتظر أن تسأل'
                : 'Surfaced proactively — the system did not wait for you to ask'}
            </p>
          </div>
        </div>
        <span className="esc-intel__count">
          {items.length} {ar ? 'تنبيهات' : 'alerts'}
        </span>
      </header>

      <div className="esc-intel__grid" role="list">
        {items.map((item) => {
          const sev = item.sev === 'High' ? 'high' : item.sev === 'Medium' ? 'medium' : 'low';
          return (
            <button
              key={item.id}
              type="button"
              role="listitem"
              className="esc-intel__row"
              onClick={() => onSelect(item.deptId)}
              aria-label={item.title}
            >
              <span className="esc-intel__row-icon" aria-hidden>
                <CcIcon name={item.icon} size={18} strokeWidth={2} />
              </span>
              <span className="esc-intel__row-text">{item.title}</span>
              <span className={`esc-intel__badge esc-intel__badge--${sev}`}>
                {ar ? SEV_LABEL[sev].ar : SEV_LABEL[sev].en}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
