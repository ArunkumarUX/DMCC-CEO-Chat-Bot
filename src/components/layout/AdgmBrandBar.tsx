import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { AdgmLogo } from '../brand/AdgmLogo';
import { ADGM_BRAND } from '../../config/brand';

/** Full-width bar — DMCC navy navigation */
export function AdgmBrandBar() {
  return (
    <header className="shrink-0 border-b border-white/10 bg-adgm-navy adgm-brand-bar">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link to="/dashboard" className="hover:opacity-90 transition-opacity">
          <AdgmLogo variant="onDark" showTagline />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-adgm-sky-200/90 font-medium">
            Personal AI · DMCC Executive OS
          </span>
          <a
            href={ADGM_BRAND.siteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
          >
            dmcc.ae
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
}
