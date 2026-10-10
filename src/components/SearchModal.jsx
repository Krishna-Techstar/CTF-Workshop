import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SEARCH_INDEX } from '../content/searchIndex';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? SEARCH_INDEX.slice(0, 5) // recent/suggested
    : SEARCH_INDEX.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q)
        );
      });

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-none">
      <div 
        className="w-full max-w-2xl border-4 border-black dark:border-white bg-cream dark:bg-brutal-cardDark shadow-brutal-xl dark:shadow-brutal-dark-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        role="dialog"
        aria-modal="true"
        aria-label="Search CTF Workshop Guide"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b-4 border-black dark:border-white bg-white dark:bg-black">
          <Search className="w-6 h-6 text-black dark:text-white stroke-[2.5]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search (e.g. base64, steghide, cookies, wsl)..."
            className="flex-1 bg-transparent text-base sm:text-lg font-mono font-bold text-black dark:text-white placeholder:text-neutral-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 hover:bg-brutal-pink text-black dark:text-white shadow-[2px_2px_0px_#000]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {results.length === 0 ? (
            <div className="p-8 text-center font-mono">
              <div className="font-heading text-lg mb-1">NO MATCHES FOUND</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Try searching for keywords like "rot13", "exiftool", "bandit", or "cookie".
              </p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.path)}
                className="group p-3 sm:p-4 border-3 border-black dark:border-white bg-white dark:bg-neutral-900 hover:bg-brutal-yellow dark:hover:bg-neutral-800 cursor-pointer shadow-brutal-sm dark:shadow-brutal-dark-sm hover:translate-x-1 transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 border border-black bg-cream dark:bg-black text-black dark:text-white">
                    {item.section}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-black dark:group-hover:text-white flex items-center gap-1">
                    Jump to section <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="font-heading text-base text-black dark:text-white group-hover:text-black dark:group-hover:text-brutal-yellow mb-1">
                  {item.title}
                </div>
                <p className="text-xs sm:text-sm font-sans text-neutral-700 dark:text-neutral-300 line-clamp-2 m-0">
                  {item.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-neutral-900 border-t-3 border-black dark:border-white text-neutral-300 text-xs font-mono flex items-center justify-between px-4 select-none">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-600 text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-600 text-[10px]">/</kbd>
            <span>shortcut to open search anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
