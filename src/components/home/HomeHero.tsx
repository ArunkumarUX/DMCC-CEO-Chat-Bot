import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import {
  EXECUTIVE_USER,
  greetingForTime,
  PRODUCT_NAME,
  PRODUCT_SUBTITLE,
  PRODUCT_TAGLINE,
} from '../../config/user';
import { easeOut } from '../../lib/motion';
import { AgentTeamRow } from './AgentTeamRow';

export function HomeHero({ onDailyBriefing }: { onDailyBriefing: () => void }) {
  const navigate = useNavigate();

  return (
    <motion.section
      className="home-hero relative overflow-hidden rounded-2xl text-white lg:rounded-3xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <div className="home-hero-bg pointer-events-none" aria-hidden />
      <div className="hero-shimmer pointer-events-none" aria-hidden />

      <div className="relative p-6 md:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5">
              <span className="live-pulse shrink-0" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-adgm-sky-200/90">
                {PRODUCT_SUBTITLE}
              </span>
            </div>

            <h1 className="font-display text-[1.65rem] sm:text-3xl lg:text-[2rem] font-semibold leading-[1.2] tracking-tight">
              {greetingForTime()},{' '}
              <span className="text-adgm-sky-200">{EXECUTIVE_USER.firstName}</span>
            </h1>
            <p className="mt-2 text-sm font-medium text-white/85">{PRODUCT_NAME}</p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              {PRODUCT_TAGLINE}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onDailyBriefing}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-none bg-[var(--dmcc-pink,#E21F7B)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 hover:bg-[var(--dmcc-pink-hover,#C41868)] transition-colors"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-white" />
                Overnight intelligence briefing
              </button>
              <button
                type="button"
                onClick={() => navigate('/chat')}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-none border border-white/25 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                Ask a strategic question
              </button>
              <Link
                to="/performance"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm text-white/80 hover:text-white transition-colors sm:justify-start"
              >
                Performance &amp; risk
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[260px] rounded-2xl glass-panel-dark p-5">
              <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-wider text-white/50">
                Specialist AI layer
              </p>
              <AgentTeamRow />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
