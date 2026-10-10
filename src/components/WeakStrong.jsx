import React from 'react';
import Sticker from './Sticker';
import RichText from './RichText';

export default function WeakStrong({ weak, strong, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 my-4 ${className}`}>
      {/* Weak Card */}
      <div className="p-4 bg-red-50 dark:bg-red-950/40 border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Sticker color="red" size="sm" rotate={-1}>
              WEAK
            </Sticker>
            <span className="text-xs font-mono font-bold text-red-700 dark:text-red-300">
              Vague / Guessing
            </span>
          </div>
          <div className="text-sm font-sans text-neutral-800 dark:text-neutral-200 mt-2 leading-relaxed">
            <RichText>{weak}</RichText>
          </div>
        </div>
      </div>

      {/* Strong Card */}
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Sticker color="green" size="sm" rotate={1}>
              STRONG
            </Sticker>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
              Clue + Prediction
            </span>
          </div>
          <div className="text-sm font-sans text-neutral-800 dark:text-neutral-200 mt-2 leading-relaxed">
            <RichText>{strong}</RichText>
          </div>
        </div>
      </div>
    </div>
  );
}
