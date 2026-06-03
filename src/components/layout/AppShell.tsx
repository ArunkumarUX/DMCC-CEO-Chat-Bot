import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CommandCentreShell } from './CommandCentreShell';
import { ProductTourHost } from '../onboarding/ProductTourHost';
import { MiPage } from '../motion/MiPage';
import { ToastStack } from '../ui/ToastStack';
import { SourcePanel } from '../chat/SourcePanel';

export function AppShell() {
  return (
    <>
      <ProductTourHost />
      <CommandCentreShell>
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center" style={{ minHeight: 320 }}>
            <div className="flex gap-1 p-8">
              <span className="dot pulse" style={{ color: 'var(--accent-bright)', background: 'var(--accent-bright)' }} />
              <span className="muted">Loading…</span>
            </div>
          </div>
        }
      >
        <MiPage>
          <Outlet />
        </MiPage>
      </Suspense>
      <SourcePanel />
      <ToastStack />
    </CommandCentreShell>
    </>
  );
}
