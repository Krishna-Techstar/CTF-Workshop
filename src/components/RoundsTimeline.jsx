import React from 'react';
import ResultBadge from './ResultBadge';
import RichText from './RichText';
import Sticker from './Sticker';
import { Sparkles, Terminal, Eye, HelpCircle } from 'lucide-react';

export default function RoundsTimeline({ rounds = [] }) {
  if (!rounds || rounds.length === 0) return null;

  return (
    <div className="relative pl-4 sm:pl-6 space-y-8 my-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-1 before:bg-black dark:before:bg-white">
      {rounds.map((round, idx) => {
        const roundNum = idx + 1;
        const normResult = String(round.result || '').trim().toLowerCase();
        const isRefuted = normResult === 'refuted';
        const isUnclear = normResult === 'unclear';
        const isSpecialResult = isRefuted || isUnclear;

        const borderAccentClass = isRefuted
          ? 'border-l-8 border-l-red-500'
          : isUnclear
          ? 'border-l-8 border-l-amber-500'
          : 'border-l-8 border-l-emerald-500';

        return (
          <div key={idx} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-white dark:bg-black border-3 border-black dark:border-white flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  isRefuted ? 'bg-red-500' : isUnclear ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
            </div>

            {/* Round card */}
            <div
              className={`p-4 sm:p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark ${borderAccentClass}`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-sm sm:text-base px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black">
                    Round {roundNum}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Step 3 & 4
                  </span>
                </div>
                <ResultBadge result={round.result} />
              </div>

              {/* Fields */}
              <div className="space-y-3.5 text-sm sm:text-base">
                {/* Hypothesis */}
                <div>
                  <div className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-0.5">
                    Hypothesis (I think ___ because ___)
                  </div>
                  <div className="p-2.5 bg-cream/70 dark:bg-neutral-800 border border-black/20 dark:border-white/20 font-sans font-medium text-black dark:text-white">
                    <RichText>{round.hypothesis}</RichText>
                  </div>
                </div>

                {/* Prediction */}
                <div>
                  <div className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-0.5">
                    Prediction (If I am right, I will see ___)
                  </div>
                  <div className="p-2.5 bg-sky-50/70 dark:bg-sky-950/20 border border-black/20 dark:border-white/20 font-sans text-black dark:text-white">
                    <RichText>{round.prediction}</RichText>
                  </div>
                </div>

                {/* Test */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-0.5">
                    <Terminal className="w-3.5 h-3.5" />
                    Test (What was run)
                  </div>
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-900 border border-black/20 dark:border-white/20 font-mono text-xs sm:text-sm text-black dark:text-white">
                    <RichText>{round.test}</RichText>
                  </div>
                </div>

                {/* Observed */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-0.5">
                    <Eye className="w-3.5 h-3.5" />
                    Observed (What happened)
                  </div>
                  <div className="p-2.5 bg-cream/50 dark:bg-neutral-800/60 border border-black/20 dark:border-white/20 font-sans text-black dark:text-white">
                    <RichText>{round.observed}</RichText>
                  </div>
                </div>

                {/* Note */}
                {round.note && (
                  <div className="mt-3 pt-3 border-t border-dashed border-black/20 dark:border-white/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      {isSpecialResult && (
                        <Sticker color="yellow" size="sm" rotate={-1}>
                          <Sparkles className="w-3 h-3 mr-0.5" />
                          New clue
                        </Sticker>
                      )}
                      <span className="font-mono text-xs font-extrabold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                        Takeaway Note
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 italic font-sans leading-relaxed">
                      <RichText>{round.note}</RichText>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
