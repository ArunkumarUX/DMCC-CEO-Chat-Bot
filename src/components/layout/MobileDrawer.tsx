import { Link } from 'react-router-dom';
import { X, Plus, Settings, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function MobileDrawer() {
  const {
    mobileDrawerOpen,
    setMobileDrawerOpen,
    conversations,
    activeConversationId,
    selectConversation,
    createConversation,
    searchQuery,
    setSearchQuery,
    settings,
  } = useApp();

  if (!mobileDrawerOpen) return null;

  return (
    <>
      <div
        className="md:hidden fixed inset-0 z-[60] bg-adgm-navy/30"
        onClick={() => setMobileDrawerOpen(false)}
        aria-hidden
      />
      <div className="md:hidden fixed inset-y-0 start-0 z-[70] w-[min(100%,300px)] flex flex-col bg-white shadow-adgm-lg animate-slide-up">
        <div className="flex items-center justify-between border-b border-adgm-line p-4">
          <p className="font-semibold text-adgm-navy">Conversations</p>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="rounded-lg p-2 hover:bg-adgm-ivory"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-3 space-y-2">
          <button
            type="button"
            onClick={() => {
              createConversation();
              setMobileDrawerOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-adgm-primary py-3 text-sm font-medium text-white hover:bg-adgm-primary-hover"
          >
            <Plus className="h-4 w-4" />
            New chat
          </button>
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-adgm-line px-3 py-2 text-sm"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {conversations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectConversation(c.id)}
              className={`w-full text-start rounded-lg px-3 py-2.5 mb-1 ${
                activeConversationId === c.id ? 'bg-adgm-sand/60' : 'hover:bg-adgm-ivory'
              }`}
            >
              <p className="text-sm font-medium truncate">{c.title}</p>
              <p className="text-xs text-adgm-mist truncate">{c.preview}</p>
            </button>
          ))}
        </div>
        <div className="border-t border-adgm-line p-3 flex gap-2">
          <Link
            to="/prompts"
            onClick={() => setMobileDrawerOpen(false)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-adgm-line py-2 text-sm"
          >
            <BookOpen className="h-4 w-4" />
            Prompts
          </Link>
          <Link
            to="/settings"
            onClick={() => setMobileDrawerOpen(false)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-adgm-line py-2 text-sm"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
        <p className="px-4 pb-4 text-xs text-adgm-mist">{settings.name}</p>
      </div>
    </>
  );
}
