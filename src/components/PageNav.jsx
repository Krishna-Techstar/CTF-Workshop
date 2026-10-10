import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PageNav({ prev, next }) {
  const navigate = useNavigate();

  // Keyboard navigation for Left and Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowLeft' && prev) {
        navigate(prev.path);
      } else if (e.key === 'ArrowRight' && next) {
        navigate(next.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, navigate]);

  return (
    <div className="mt-12 pt-6 border-t-4 border-black dark:border-white flex flex-col sm:flex-row items-center justify-between gap-4 select-none print:hidden">
      <div>
        {prev ? (
          <button
            type="button"
            onClick={() => navigate(prev.path)}
            className="brutal-btn bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-brutal-yellow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="truncate">Prev: {prev.label}</span>
          </button>
        ) : <div />}
      </div>

      <div className="text-xs font-mono text-neutral-500 text-center hidden md:block">
        Shortcut: <kbd className="px-1 border border-black bg-cream text-black font-bold">←</kbd> / <kbd className="px-1 border border-black bg-cream text-black font-bold">→</kbd> arrow keys to switch pages
      </div>

      <div>
        {next ? (
          <button
            type="button"
            onClick={() => navigate(next.path)}
            className="brutal-btn bg-brutal-yellow text-black hover:bg-brutal-green"
          >
            <span className="truncate">Next: {next.label}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
