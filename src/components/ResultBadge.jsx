import React from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export default function ResultBadge({ result = 'Supported', className = '', size = 'md' }) {
  const norm = String(result).trim().toLowerCase();

  let colorClasses = 'bg-emerald-400 text-black border-black dark:border-white';
  let Icon = CheckCircle2;
  let label = 'Supported';

  if (norm === 'refuted') {
    colorClasses = 'bg-red-400 text-black border-black dark:border-white';
    Icon = XCircle;
    label = 'Refuted';
  } else if (norm === 'unclear') {
    colorClasses = 'bg-amber-300 text-black border-black dark:border-white';
    Icon = HelpCircle;
    label = 'Unclear';
  } else {
    colorClasses = 'bg-emerald-400 text-black border-black dark:border-white';
    Icon = CheckCircle2;
    label = 'Supported';
  }

  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5 border-2 gap-1'
    : 'text-xs sm:text-sm px-2.5 py-1 border-2 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-display font-extrabold uppercase tracking-wider shadow-brutal-sm dark:shadow-brutal-dark-sm ${colorClasses} ${sizeClasses} ${className}`}
      title={`Test Result: ${label}`}
    >
      <Icon className="w-3.5 h-3.5 stroke-[3] shrink-0" />
      <span>{label}</span>
    </span>
  );
}
