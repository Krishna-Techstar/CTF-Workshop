import React from 'react';
import { resolveFlagPlaceholder } from '../utils/answerResolver';

export default function RichText({ children, className = '' }) {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // Clean up stray spacing before punctuation while preserving code integrity
  let cleaned = children
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')');

  // Tokenize regex matching {{flag:...}}, `...`, and **...**
  const regex = /({{flag:[a-zA-Z0-9_-]+}}|`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = cleaned.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Check for {{flag:id}}
        const flagMatch = part.match(/^{{flag:([a-zA-Z0-9_-]+)}}$/);
        if (flagMatch) {
          const flagId = flagMatch[1];
          const display = resolveFlagPlaceholder(flagId);
          return (
            <code
              key={index}
              className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-1 py-0.5 border border-black/30 dark:border-white/30"
            >
              {display}
            </code>
          );
        }

        // Check for `code`
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          const content = part.slice(1, -1);
          return (
            <code
              key={index}
              className="font-mono text-[0.88em] px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 border border-black/30 dark:border-white/30 text-black dark:text-neutral-100 font-bold"
            >
              {content}
            </code>
          );
        }

        // Check for **bold**
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const content = part.slice(2, -2);
          return (
            <strong key={index} className="font-bold text-black dark:text-white">
              {content}
            </strong>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
