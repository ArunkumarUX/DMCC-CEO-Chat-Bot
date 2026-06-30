import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HomeHero } from '../home/HomeHero';
import { HomeSectionHeader } from '../home/HomeSectionHeader';
import { ExecutiveSnapshot } from '../home/ExecutiveSnapshot';
import { MorningInsightsPanel } from '../home/MorningInsightsPanel';
import { HomeActivityChart } from '../home/HomeActivityChart';
import { ActionRegisterPreview } from '../home/ActionRegisterPreview';
import { FocusBento } from '../home/FocusBento';
import { CsoCapabilitiesStrip } from '../home/CsoCapabilitiesStrip';
import { FocusStarterGrid } from '../focus/FocusStarterGrid';
import { DepartmentRagGrid } from '../infographics/DepartmentRagGrid';
import { easeOut } from '../../lib/motion';

export function CommandDeck() {
  const {
    sendMessage,
    createConversation,
    morningSignals,
    executiveState,
    completeActionItem,
  } = useApp();
  const navigate = useNavigate();

  const startChat = (prompt: string) => {
    createConversation(prompt.slice(0, 40));
    navigate('/chat');
    setTimeout(() => sendMessage(prompt), 120);
  };

  const dailyBriefing =
    'Give me my overnight intelligence briefing — what are the most important developments I need to know today for Apparel Group and Dubai retail?';

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-mesh-ivory">
      <div className="home-page mx-auto w-full max-w-6xl">
        <HomeHero onDailyBriefing={() => startChat(dailyBriefing)} />

        <section className="home-section">
          <ExecutiveSnapshot metrics={executiveState.metrics} />
        </section>

        <section className="home-section">
          <CsoCapabilitiesStrip />
        </section>

        <section className="home-section">
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-6 lg:items-stretch">
            <motion.div
              className="home-panel flex flex-col lg:col-span-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45, ease: easeOut }}
            >
              <MorningInsightsPanel signals={morningSignals} />
            </motion.div>

            <div className="grid gap-4 lg:col-span-4 lg:grid-rows-2 lg:gap-6">
              <motion.div
                className="home-panel flex flex-col min-h-[220px] lg:min-h-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.45, ease: easeOut }}
              >
                <HomeActivityChart
                  activityWeek={executiveState.activityWeek}
                  avgConfidence={executiveState.metrics.avgConfidence}
                />
              </motion.div>
              <motion.div
                className="home-panel flex flex-col min-h-[200px] lg:min-h-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: easeOut }}
              >
                <ActionRegisterPreview
                  actions={executiveState.actionRegister}
                  onComplete={completeActionItem}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45, ease: easeOut }}
        >
          <HomeSectionHeader
            title="Quick start"
            description="Jump in with one tap — filtered by focus area"
          />
          <div className="home-panel">
            <FocusStarterGrid onSelectPrompt={startChat} showFilters />
          </div>
        </motion.section>

        <motion.section
          className="home-section"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45, ease: easeOut }}
        >
          <HomeSectionHeader
            title="Core focus areas"
            description="Six capabilities of your Chief Strategy Office role"
            action={
              <Link
                to="/prompts"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-adgm-primary hover:underline whitespace-nowrap"
              >
                Prompt library
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            }
          />
          <FocusBento onQuickPrompt={startChat} />
        </motion.section>

        <motion.section
          className="home-section home-section-last"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45, ease: easeOut }}
        >
          <HomeSectionHeader
            title="Portfolio performance"
            description="Nine departments · RAG status at a glance"
            action={
              <Link
                to="/performance"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-adgm-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-adgm-primary-hover whitespace-nowrap"
              >
                Full dashboard
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            }
          />
          <div className="home-panel">
            <DepartmentRagGrid departments={executiveState.departments} />
          </div>
        </motion.section>
      </div>
    </div>
  );
}
