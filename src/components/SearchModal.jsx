import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { SEARCH_INDEX } from '../content/searchIndex';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Track and restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Tokenize multi-word search
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = tokens.length === 0
    ? SEARCH_INDEX.slice(0, 6)
    : SEARCH_INDEX.filter((item) => {
        const combined = `${item.title} ${item.content} ${item.section}`.toLowerCase();
        return tokens.every(token => combined.includes(token));
      });

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeElement = resultsContainerRef.current.children[selectedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item) => {
    onClose();
    if (item.anchor) {
      window.dispatchEvent(new CustomEvent('ctf-open-section', { detail: item.anchor }));
    }
    if (location.pathname === item.path) {
      if (item.anchor) {
        setTimeout(() => {
          const el = document.getElementById(item.anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 80);
      }
    } else {
      navigate(item.path, { state: { anchor: item.anchor, ts: Date.now() } });
    }
  };

  // Keyboard navigation & Focus trapping
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex(prev => (prev + 1) % results.length);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
      return;
    }

    // Trap focus inside modal
    if (e.key === 'Tab' && modalRef.current) {
      const focusables = modalRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        onKeyDown={handleKeyDown}
        className="w-full max-w-2xl border-4 border-black dark:border-white bg-cream dark:bg-brutal-cardDark shadow-brutal-xl dark:shadow-brutal-dark-lg overflow-hidden"
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
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="p-1.5 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 hover:bg-brutal-pink text-black dark:text-white shadow-[2px_2px_0px_#000]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div 
          id="search-results-list"
          ref={resultsContainerRef}
          role="listbox"
          aria-label="Search suggestions"
          className="max-h-[60vh] overflow-y-auto p-4 space-y-3"
        >
          {results.length === 0 ? (
            <div className="p-8 text-center font-mono">
              <div className="font-heading text-lg mb-1">NO MATCHES FOUND</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Try searching for keywords like &quot;rot13&quot;, &quot;exiftool&quot;, &quot;bandit&quot;, or &quot;cookie&quot;.
              </p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 sm:p-4 border-3 border-black dark:border-white cursor-pointer shadow-brutal-sm dark:shadow-brutal-dark-sm transition-all block ${
                    isSelected
                      ? 'bg-brutal-yellow text-black -translate-x-1 ring-3 ring-black dark:ring-white'
                      : 'bg-white dark:bg-neutral-900 hover:bg-cream dark:hover:bg-neutral-800 text-black dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 border border-black bg-cream dark:bg-black text-black dark:text-white">
                      {item.section}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                      Jump to section <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="font-heading text-base text-black dark:text-white mb-1">
                    {item.title}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-neutral-700 dark:text-neutral-300 line-clamp-2 m-0">
                    {item.content}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-neutral-900 border-t-3 border-black dark:border-white text-neutral-300 text-xs font-mono flex items-center justify-between px-4 select-none">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-600 text-[10px]">↑/↓</kbd>
            <span>navigate</span>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-600 text-[10px]">ENTER</kbd>
            <span>select</span>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-600 text-[10px]">ESC</kbd>
            <span>close</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-600 text-[10px]">/</kbd>
            <span>search anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
