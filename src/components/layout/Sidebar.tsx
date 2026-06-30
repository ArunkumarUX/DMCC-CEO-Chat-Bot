import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  LayoutDashboard,
  Gauge,
  FileText,
  Workflow,
  BookOpen,
  Settings,
  Plus,
  Pin,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { EXECUTIVE_USER, PRODUCT_SHORT_NAME } from '../../config/user';

const STORAGE_KEY = 'adgm-sidebar-collapsed';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/chat', icon: MessageSquare, label: 'Personal AI' },
  { to: '/performance', icon: Gauge, label: 'Performance' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/workflows', icon: Workflow, label: 'Workflows' },
  { to: '/prompts', icon: BookOpen, label: 'Prompts' },
];

function NavItem({
  to,
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  to: string;
  icon: typeof LayoutDashboard;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center rounded-full transition-colors duration-200 ${
        collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'
      } ${
        active
          ? 'bg-adgm-navy text-white'
          : 'text-adgm-navy hover:bg-adgm-sky-bg hover:text-adgm-navy'
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.25 : 2} />
      {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatRoute = location.pathname.startsWith('/chat');
  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    renameConversation,
    pinConversation,
    deleteConversation,
    exportConversation,
    settings,
  } = useApp();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [chatsOpen, setChatsOpen] = useState(true);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const recentChats = [...conversations]
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, 6);

  const initials = settings.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const toggleCollapsed = () => setCollapsed((c) => !c);

  return (
    <motion.aside
      className="hidden md:flex shrink-0 flex-col border-e border-adgm-line bg-white h-full overflow-hidden"
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div
        className={`shrink-0 flex items-center border-b border-adgm-line ${
          collapsed ? 'justify-center p-3' : 'justify-between gap-2 px-3 py-3'
        }`}
      >
        {!collapsed && (
          <Link to="/dashboard" className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-adgm-navy font-display truncate">
              {PRODUCT_SHORT_NAME}
            </p>
          </Link>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="rounded-full p-2 text-adgm-slate hover:bg-adgm-ivory hover:text-adgm-navy transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-[18px] w-[18px]" />
          ) : (
            <PanelLeftClose className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`shrink-0 py-3 ${collapsed ? 'px-2' : 'px-3'}`}
        aria-label="Main navigation"
      >
        <ul className="space-y-1" role="list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavItem
                {...item}
                active={location.pathname.startsWith(item.to)}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>
      </nav>

      {collapsed && isChatRoute && (
        <button
          type="button"
          title="New chat"
          onClick={() => {
            createConversation();
            navigate('/chat');
          }}
          className="mx-2 mb-2 flex items-center justify-center rounded-full bg-adgm-primary p-2.5 text-white hover:bg-adgm-primary-hover"
        >
          <Plus className="h-[18px] w-[18px]" />
        </button>
      )}

      {/* Recent chats — only on Chat route & expanded */}
      <AnimatePresence>
        {!collapsed && isChatRoute && (
          <motion.div
            className="flex-1 flex flex-col min-h-0 border-t border-adgm-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={() => setChatsOpen((o) => !o)}
              className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-semibold text-adgm-mist uppercase tracking-wider hover:text-adgm-slate"
            >
              Recent
              <span className="text-[10px] font-normal normal-case text-adgm-mist">
                {chatsOpen ? '−' : '+'}
              </span>
            </button>

            {chatsOpen && (
              <div className="flex flex-col min-h-0 flex-1 px-2 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    createConversation();
                    navigate('/chat');
                  }}
                  className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-dashed border-adgm-primary/40 py-2 text-xs font-medium text-adgm-primary hover:bg-adgm-sky-bg transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New chat
                </button>
                <div className="flex-1 overflow-y-auto scrollbar-thin space-y-0.5">
                  {recentChats.map((c) => (
                    <div key={c.id} className="relative group">
                      {renamingId === c.id ? (
                        <input
                          autoFocus
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onBlur={() => {
                            if (renameValue.trim()) renameConversation(c.id, renameValue.trim());
                            setRenamingId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              renameConversation(c.id, renameValue.trim());
                              setRenamingId(null);
                            }
                          }}
                          className="w-full rounded-lg border border-adgm-line px-2 py-1.5 text-xs"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            selectConversation(c.id);
                            navigate('/chat');
                          }}
                          className={`w-full rounded-full px-2 py-2 text-start transition-colors ${
                            activeConversationId === c.id
                              ? 'bg-adgm-primary-light/60 text-adgm-navy'
                              : 'hover:bg-adgm-ivory text-adgm-charcoal'
                          }`}
                        >
                          <div className="flex items-center gap-1 min-w-0">
                            {c.pinned && (
                              <Pin className="h-3 w-3 shrink-0 text-adgm-primary opacity-70" />
                            )}
                            <p className="truncate text-xs font-medium">{c.title}</p>
                          </div>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setMenuId(menuId === c.id ? null : c.id)}
                        className="absolute end-0.5 top-1.5 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-white text-adgm-mist"
                        aria-label="Options"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                      {menuId === c.id && (
                        <div className="absolute end-0 top-8 z-30 w-36 rounded-lg border border-adgm-line bg-white py-1 shadow-adgm-lg text-xs">
                          {(
                            [
                              { label: 'Rename', action: () => { setRenamingId(c.id); setRenameValue(c.title); } },
                              { label: c.pinned ? 'Unpin' : 'Pin', action: () => pinConversation(c.id) },
                              { label: 'Export', action: () => exportConversation(c.id) },
                              { label: 'Delete', action: () => deleteConversation(c.id), danger: true },
                            ] as const
                          ).map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              className={`w-full px-2.5 py-1.5 text-start hover:bg-adgm-ivory ${
                                'danger' in item && item.danger ? 'text-adgm-error' : ''
                              }`}
                              onClick={() => {
                                item.action();
                                setMenuId(null);
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isChatRoute && !collapsed && <div className="flex-1" />}

      {/* Footer */}
      <div className={`shrink-0 border-t border-adgm-line ${collapsed ? 'p-2' : 'p-3'}`}>
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Link
              to="/settings"
              title={EXECUTIVE_USER.firstName}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-adgm-navy text-xs font-medium text-white"
            >
              {initials}
            </Link>
            <Link
              to="/settings"
              title="Settings"
              className="rounded-full p-2 text-adgm-slate hover:bg-adgm-ivory"
            >
              <Settings className="h-[18px] w-[18px]" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-adgm-navy text-xs font-medium text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-adgm-navy">{settings.name.split(' ')[0]}</p>
              <p className="truncate text-[10px] text-adgm-mist">CSO</p>
            </div>
            <Link
              to="/settings"
              className="rounded-full p-1.5 text-adgm-slate hover:bg-adgm-ivory"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
