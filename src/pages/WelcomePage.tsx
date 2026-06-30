import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { AdgmLogo } from '../components/brand/AdgmLogo';
import { ADGM_BRAND } from '../config/brand';
import {
  EXECUTIVE_USER,
  PRODUCT_NAME,
  PRODUCT_SUBTITLE,
  PRODUCT_TAGLINE,
  CEO_DAILY_CAPABILITIES,
} from '../config/user';
import { CORE_FOCUS_AREAS } from '../data/focusAreas';
import { FocusAreaCard } from '../components/focus/FocusAreaCard';
import { MagneticButton } from '../components/motion/MagneticButton';

export function WelcomePage() {
  return (
    <motion.div className="min-h-full overflow-y-auto bg-mesh-ivory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="command-hero relative overflow-hidden text-white">
        <div className="hero-shimmer pointer-events-none" aria-hidden />
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-12">
          <AdgmLogo variant="onDark" showTagline />
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Enter workspace
          </Link>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:py-20 md:text-start">
          <p className="text-xs uppercase tracking-[0.2em] text-adgm-sky-200/90">
            {ADGM_BRAND.tagline} · {PRODUCT_SUBTITLE}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">{PRODUCT_NAME}</h1>
          <p className="mt-3 text-lg text-white/85">
            {EXECUTIVE_USER.title} · {EXECUTIVE_USER.organisation}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:mx-0">{PRODUCT_TAGLINE}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <MagneticButton
              className="inline-flex items-center justify-center gap-2 rounded-full bg-adgm-primary px-8 py-3.5 font-semibold text-white"
              onClick={() => {
                window.location.href = '/dashboard';
              }}
            >
              <MessageSquare className="h-5 w-5" />
              Open Personal AI
            </MagneticButton>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 font-medium hover:bg-white/10"
            >
              Ask a question
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
        <h2 className="text-center font-display text-xl font-semibold text-adgm-navy">CEO daily intelligence</h2>
        <p className="mx-auto mb-8 mt-2 max-w-lg text-center text-sm text-adgm-slate">
          Five priority pillars: overnight intelligence, market signals, portfolio moves, regulatory shifts, and
          performance &amp; risk alerts.
        </p>
        <ul className="mb-14 grid gap-3 sm:grid-cols-2">
          {CEO_DAILY_CAPABILITIES.map((cap) => (
            <li
              key={cap}
              className="rounded-xl border border-adgm-line bg-white px-4 py-3 text-sm leading-relaxed text-adgm-charcoal shadow-adgm-sm"
            >
              {cap}
            </li>
          ))}
        </ul>

        <h2 className="text-center font-display text-2xl font-semibold text-adgm-navy">Core focus areas</h2>
        <p className="mx-auto mb-10 mt-2 max-w-xl text-center text-sm text-adgm-slate">
          Strategic intelligence, meetings, regulation, communications, stakeholders, and institutional knowledge.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_FOCUS_AREAS.map((area) => (
            <FocusAreaCard key={area.id} area={area} />
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-adgm-mist">
          <a
            href={ADGM_BRAND.siteUrl}
            className="text-adgm-primary hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Apparel Group — apparelgroup.com
          </a>
        </p>
      </section>
    </motion.div>
  );
}
