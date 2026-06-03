import { Link, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  LayoutDashboard,
  Gauge,
  FileText,
  Menu,
} from 'lucide-react';
import { PRODUCT_SHORT_NAME } from '../../config/user';
import { useApp } from '../../context/AppContext';

const tabs = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/chat', icon: MessageSquare, label: 'AI' },
  { to: '/performance', icon: Gauge, label: 'Perf' },
  { to: '/documents', icon: FileText, label: 'Docs' },
];

export function MobileNav() {
  const location = useLocation();
  const { setMobileDrawerOpen } = useApp();

  return (
    <>
      <header className="md:hidden flex items-center justify-between border-b border-white/10 bg-adgm-navy px-4 py-3 safe-area-top">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/dashboard" className="font-display text-base font-semibold text-white truncate max-w-[200px]">
          {PRODUCT_SHORT_NAME}
        </Link>
        <div className="w-9" />
      </header>

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 flex border-t border-adgm-line bg-white/95 backdrop-blur-md safe-area-bottom"
        aria-label="Main navigation"
      >
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
                active ? 'text-adgm-primary' : 'text-adgm-mist'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-adgm-primary' : ''}`} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
