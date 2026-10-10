import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Accordion({ 
  id, 
  title, 
  badge, 
  children, 
  defaultOpen = true,
  isOpen: controlledIsOpen,
  onToggle
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  useEffect(() => {
    const handleOpenSection = (e) => {
      if (e.detail === id) {
        if (onToggle) {
          onToggle(true);
        } else {
          setInternalOpen(true);
        }
      }
    };
    window.addEventListener('ctf-open-section', handleOpenSection);
    return () => window.removeEventListener('ctf-open-section', handleOpenSection);
  }, [id, onToggle]);

  const toggle = () => {
    if (onToggle) {
      onToggle(!isOpen);
    } else {
      setInternalOpen(!isOpen);
    }
  };

  return (
    <div 
      id={id} 
      className="my-5 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal dark:shadow-brutal-dark transition-all duration-150"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        className="w-full flex items-center justify-between p-4 text-left font-display font-bold text-lg sm:text-xl border-b-3 border-black dark:border-white bg-cream dark:bg-neutral-800 text-black dark:text-white hover:bg-brutal-yellow dark:hover:bg-neutral-700 transition-colors select-none"
      >
        <div className="flex items-center gap-3 flex-wrap">
          {badge && (
            <span className="inline-block px-2.5 py-0.5 text-xs font-mono font-extrabold bg-black text-white dark:bg-white dark:text-black border border-black shadow-[1px_1px_0px_#000]">
              {badge}
            </span>
          )}
          <span className="font-heading tracking-wide text-base sm:text-lg">{title}</span>
        </div>
        <div className="flex items-center justify-center w-8 h-8 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#FFF] shrink-0 ml-2">
          {isOpen ? <ChevronUp className="w-5 h-5 stroke-[3]" /> : <ChevronDown className="w-5 h-5 stroke-[3]" />}
        </div>
      </button>

      {/* Body is kept in DOM with hidden attribute & print:block so it prints and aria-controls is valid */}
      <div 
        id={`accordion-content-${id}`} 
        hidden={!isOpen}
        className={`p-4 sm:p-6 text-black dark:text-neutral-100 ${!isOpen ? 'hidden print:block' : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
