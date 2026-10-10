import React from 'react';
import { ListFilter, ChevronDown, ChevronUp } from 'lucide-react';

export default function TableOfContents({ items = [], onExpandAll, onCollapseAll }) {
  const scrollToSection = (id) => {
    window.dispatchEvent(new CustomEvent('ctf-open-section', { detail: id }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="mb-6 p-4 border-3 border-black dark:border-white bg-cream dark:bg-neutral-900 shadow-brutal-sm dark:shadow-brutal-dark-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b-2 border-black/20 dark:border-white/20">
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-black dark:text-brutal-yellow" />
          <span className="font-heading text-xs uppercase tracking-wider text-black dark:text-white">
            On this page
          </span>
        </div>

        {(onExpandAll || onCollapseAll) && (
          <div className="flex items-center gap-2 text-xs font-mono">
            {onExpandAll && (
              <button
                type="button"
                onClick={onExpandAll}
                className="px-2 py-0.5 border border-black dark:border-white bg-white dark:bg-black hover:bg-brutal-yellow text-black dark:text-white flex items-center gap-1"
              >
                <ChevronDown className="w-3 h-3" /> Expand all
              </button>
            )}
            {onCollapseAll && (
              <button
                type="button"
                onClick={onCollapseAll}
                className="px-2 py-0.5 border border-black dark:border-white bg-white dark:bg-black hover:bg-brutal-yellow text-black dark:text-white flex items-center gap-1"
              >
                <ChevronUp className="w-3 h-3" /> Collapse all
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className="text-xs font-mono font-bold px-2.5 py-1 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-neutral-200 hover:bg-brutal-yellow dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFF] active:translate-x-0.5 active:translate-y-0.5"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
