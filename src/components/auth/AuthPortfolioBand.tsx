import '../../styles/auth-gate.css';
import { DMCC_ECOSYSTEMS } from '../../config/dmccGuidelines';

const ECOSYSTEMS = DMCC_ECOSYSTEMS.slice(0, 4).map((e) => ({
  name: e.name,
  tagline: e.tagline,
}));

export function AuthPortfolioBand() {
  return (
    <section className="auth-portfolio-band" aria-label="DMCC trade ecosystems">
      <p className="auth-portfolio-band__eyebrow">Trade Ecosystems</p>
      <div className="auth-portfolio-band__logos auth-portfolio-band__logos--text">
        {ECOSYSTEMS.map((eco) => (
          <div key={eco.name} className="auth-portfolio-band__brand">
            <span className="auth-portfolio-band__brand-name">{eco.name}</span>
            <span className="auth-portfolio-band__brand-tag">{eco.tagline}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
