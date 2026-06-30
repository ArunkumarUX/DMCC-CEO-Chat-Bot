import '../../styles/auth-gate.css';
import { APPAREL_GROUP_PORTFOLIO } from '../../config/apparelGroupGuidelines';

const PORTFOLIO = APPAREL_GROUP_PORTFOLIO.map((p) => ({
  name: p.name,
  tagline: p.tagline,
}));

export function AuthPortfolioBand() {
  return (
    <section className="auth-portfolio-band" aria-label="Apparel Group retail portfolio">
      <p className="auth-portfolio-band__eyebrow">Our Retail Portfolio</p>
      <div className="auth-portfolio-band__logos auth-portfolio-band__logos--text">
        {PORTFOLIO.map((brand) => (
          <div key={brand.name} className="auth-portfolio-band__brand">
            <span className="auth-portfolio-band__brand-name">{brand.name}</span>
            <span className="auth-portfolio-band__brand-tag">{brand.tagline}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
