import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search as SearchIcon, 
  Sun, 
  Moon, 
  Printer, 
  Menu, 
  X, 
  CheckCircle2
} from 'lucide-react';
import { NAV_SECTIONS } from '../content/schedule';
import { getStorageItem, setStorageItem } from '../utils/storage';
import Sticker from './Sticker';

export default function Sidebar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  
  const [isDark, setIsDark] = useState(() => {
    const saved = getStorageItem('ctf_theme', null);
    if (saved) return saved === 'dark';
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const location = useLocation();

  // Track viewport width for accessibility / inert attribute
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle dark mode toggle & persistence
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      setStorageItem('ctf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      setStorageItem('ctf_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Recalculate progress based on tasks and flags
  const calculateProgress = () => {
    try {
      // 9 total tasks in before-you-start + 13 flags = 22 total items
      let completedCount = 0;
      const totalItems = 22;

      // Check tasks
      const pTasks = getStorageItem('ctf_task_group_participant_prep', {});
      const fTasks = getStorageItem('ctf_task_group_facilitator_prep', {});
      completedCount += Object.values(pTasks).filter(Boolean).length;
      completedCount += Object.values(fTasks).filter(Boolean).length;

      // Check solved flags
      const solvedFlags = getStorageItem('ctf_solved_flags', []);
      completedCount += solvedFlags.length;

      const pct = Math.min(100, Math.round((completedCount / totalItems) * 100));
      setCompletionPercentage(pct);
    } catch (e) {
      setCompletionPercentage(0);
    }
  };

  useEffect(() => {
    calculateProgress();
    const handleUpdate = () => calculateProgress();
    window.addEventListener('ctf-task-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ctf-task-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const isHiddenOffCanvas = isMobile && !mobileOpen;

  return (
    <>
      {/* Mobile Top Navbar with Hamburger */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-3 border-b-4 border-black dark:border-white bg-cream dark:bg-neutral-900 print:hidden">
        <NavLink to="/" className="flex items-center gap-2 font-heading text-base text-black dark:text-white no-underline">
          <span className="text-xl">🚩</span>
          <span>CTF WORKSHOP</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            aria-label="Open search"
            className="p-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_#000]"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 border-2 border-black dark:border-white bg-brutal-yellow text-black shadow-[2px_2px_0px_#000]"
          >
            {mobileOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay on Mobile */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 print:hidden"
        />
      )}

      {/* Main Sidebar Component */}
      <aside
        inert={isHiddenOffCanvas ? "" : undefined}
        aria-hidden={isHiddenOffCanvas ? true : undefined}
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 sm:w-80 border-r-4 border-black dark:border-white bg-white dark:bg-brutal-cardDark transition-transform duration-200 ease-in-out flex flex-col print:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b-4 border-black dark:border-white bg-cream dark:bg-neutral-900 select-none">
          <div className="flex items-center justify-between mb-2">
            <Sticker color="yellow" size="sm" rotate={-2}>
              OCT 10, 2026
            </Sticker>
            <Sticker color="pink" size="sm" rotate={1}>
              @KRISHNA
            </Sticker>
          </div>
          <NavLink to="/" className="block no-underline">
            <h1 className="font-heading text-lg sm:text-xl text-black dark:text-white m-0 leading-tight">
              CTF WORKSHOP
            </h1>
            <p className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 mt-0.5">
              Detailed Step-by-Step Guide
            </p>
          </NavLink>

          {/* Overall Workshop Progress Bar */}
          <div className="mt-4 pt-3 border-t-2 border-black/20 dark:border-white/20">
            <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
              <span className="flex items-center gap-1 text-black dark:text-neutral-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-brutal-green" />
                Workshop Progress
              </span>
              <span className="px-1.5 py-0.5 bg-brutal-yellow text-black border border-black">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full h-3 border-2 border-black dark:border-white bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div 
                className="h-full bg-brutal-green transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Global Search Trigger Button */}
        <div className="p-3 border-b-3 border-black dark:border-white bg-neutral-100 dark:bg-neutral-800">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono font-bold border-2 border-black dark:border-white bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-brutal-yellow dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <SearchIcon className="w-3.5 h-3.5" />
              <span>Search guide...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] border border-black bg-cream dark:bg-black text-black dark:text-white font-mono">
              /
            </kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2 select-none">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 font-display font-bold text-xs uppercase tracking-wide border-2 border-black dark:border-white transition-all ${
                isActive
                  ? 'bg-brutal-yellow text-black shadow-brutal-sm -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream dark:hover:bg-neutral-800'
              }`
            }
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Overview & Schedule</span>
          </NavLink>

          <div className="pt-2 pb-1 px-1 text-[11px] font-mono font-black uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">
            Thinking Process
          </div>

          <NavLink
            to="/method"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 font-display font-bold text-xs uppercase tracking-wide border-2 border-black dark:border-white transition-all ${
                isActive
                  ? 'bg-brutal-orange text-black shadow-brutal-sm -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream dark:hover:bg-neutral-800'
              }`
            }
          >
            <div className="flex items-center gap-2.5 truncate">
              <span className="truncate">Investigation Method</span>
            </div>
          </NavLink>

          <NavLink
            to="/method-examples"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 font-display font-bold text-xs uppercase tracking-wide border-2 border-black dark:border-white transition-all ${
                isActive
                  ? 'bg-brutal-purple text-black shadow-brutal-sm -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream dark:hover:bg-neutral-800'
              }`
            }
          >
            <div className="flex items-center gap-2.5 truncate">
              <span className="truncate">Worked Examples</span>
            </div>
          </NavLink>

          <NavLink
            to="/worksheet"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 font-display font-bold text-xs uppercase tracking-wide border-2 border-black dark:border-white transition-all ${
                isActive
                  ? 'bg-brutal-green text-black shadow-brutal-sm -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream dark:hover:bg-neutral-800'
              }`
            }
          >
            <div className="flex items-center gap-2.5 truncate">
              <span className="truncate">Worksheet</span>
            </div>
          </NavLink>

          <div className="pt-2 pb-1 px-1 text-[11px] font-mono font-black uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">
            Hands-on Sections
          </div>

          {NAV_SECTIONS.map((sec, idx) => (
            <NavLink
              key={idx}
              to={sec.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 font-display font-bold text-xs uppercase tracking-wide border-2 border-black dark:border-white transition-all ${
                  isActive
                    ? `${sec.colorClass} text-black shadow-brutal-sm -translate-y-0.5`
                    : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream dark:hover:bg-neutral-800'
                }`
              }
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="w-5 h-5 rounded-none border border-black bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-[10px] font-mono shrink-0 font-bold">
                  {idx + 1}
                </span>
                <span className="truncate">{sec.shortTitle}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Utility Bar: Theme Toggle & Print */}
        <div className="p-3 border-t-4 border-black dark:border-white bg-cream dark:bg-neutral-900 flex items-center justify-between gap-2 select-none">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-mono font-bold border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-brutal-yellow shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isDark ? 'LIGHT' : 'DARK'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-mono font-bold border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-brutal-yellow shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            title="Print entire guide cleanly"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT</span>
          </button>
        </div>
      </aside>
    </>
  );
}
