import React from 'react';
import { METHOD_STEPS, methodPageContent } from '../content/method';
import RichText from './RichText';
import Sticker from './Sticker';
import { ArrowRight, ArrowDown, RotateCcw } from 'lucide-react';

export default function InvestigationLoop({ className = '' }) {
  const steps = METHOD_STEPS;
  const loopLabel = methodPageContent?.loop?.loopLabel || 'Not solved? Add the new clue and go back to step 2.';

  return (
    <div className={`my-8 ${className}`}>
      {/* Screen reader semantic navigation */}
      <ol className="sr-only" aria-label="Investigation Loop 5 Steps">
        {steps.map((s) => (
          <li key={s.id}>
            Step {s.num}: {s.question} - {s.short} {s.repeats ? '(Repeats in rounds)' : ''}
          </li>
        ))}
      </ol>

      {/* Visual Neobrutal Flow Chart */}
      <div className="relative p-4 sm:p-6 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
        {/* Main Flow: Desktop Horizontal, Mobile Vertical */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center p-4 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
            <span className="w-8 h-8 rounded-full bg-brutal-yellow text-black font-mono font-black text-sm flex items-center justify-center border-2 border-black mb-2">
              1
            </span>
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-black dark:text-white leading-tight">
              <RichText>{steps[0].question}</RichText>
            </h4>
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <RichText>{steps[0].short}</RichText>
            </p>
          </div>

          {/* Arrow 1 -> 2 */}
          <div className="flex items-center justify-center text-black dark:text-white shrink-0">
            <ArrowRight className="hidden lg:block w-6 h-6 stroke-[3]" />
            <ArrowDown className="lg:hidden w-6 h-6 stroke-[3]" />
          </div>

          {/* Step 2 (Clues - target of loop back) */}
          <div 
            id="loop-step-2"
            className="flex-1 flex flex-col items-center text-center p-4 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm relative"
          >
            <span className="w-8 h-8 rounded-full bg-brutal-blue text-black font-mono font-black text-sm flex items-center justify-center border-2 border-black mb-2">
              2
            </span>
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-black dark:text-white leading-tight">
              <RichText>{steps[1].question}</RichText>
            </h4>
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <RichText>{steps[1].short}</RichText>
            </p>
          </div>

          {/* Arrow 2 -> 3 */}
          <div className="flex items-center justify-center text-black dark:text-white shrink-0">
            <ArrowRight className="hidden lg:block w-6 h-6 stroke-[3]" />
            <ArrowDown className="lg:hidden w-6 h-6 stroke-[3]" />
          </div>

          {/* Group: Steps 3 & 4 (Rounds) */}
          <div className="flex-1 lg:flex-[2.1] p-3 border-3 border-dashed border-brutal-purple bg-purple-50/60 dark:bg-purple-950/20 relative flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <Sticker color="purple" size="sm" rotate={0}>
                Repeat as rounds
              </Sticker>
              <span className="text-[11px] font-mono font-bold text-purple-900 dark:text-purple-300">
                Steps 3 & 4 loop
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 flex-1">
              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center p-3 bg-white dark:bg-brutal-cardDark border-2 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
                <span className="w-7 h-7 rounded-full bg-brutal-purple text-black font-mono font-black text-xs flex items-center justify-center border-2 border-black mb-1">
                  3
                </span>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-black dark:text-white leading-tight">
                  <RichText>{steps[2].question}</RichText>
                </h4>
                <p className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 mt-0.5">
                  <RichText>{steps[2].short}</RichText>
                </p>
              </div>

              {/* Arrow 3 -> 4 */}
              <div className="flex items-center justify-center text-black dark:text-white shrink-0">
                <ArrowRight className="hidden lg:block w-5 h-5 stroke-[3]" />
                <ArrowDown className="lg:hidden w-5 h-5 stroke-[3]" />
              </div>

              {/* Step 4 */}
              <div 
                id="loop-step-4"
                className="flex-1 flex flex-col items-center text-center p-3 bg-white dark:bg-brutal-cardDark border-2 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm"
              >
                <span className="w-7 h-7 rounded-full bg-brutal-orange text-black font-mono font-black text-xs flex items-center justify-center border-2 border-black mb-1">
                  4
                </span>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-black dark:text-white leading-tight">
                  <RichText>{steps[3].question}</RichText>
                </h4>
                <p className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 mt-0.5">
                  <RichText>{steps[3].short}</RichText>
                </p>
              </div>
            </div>
          </div>

          {/* Arrow 4 -> 5 */}
          <div className="flex items-center justify-center text-black dark:text-white shrink-0">
            <ArrowRight className="hidden lg:block w-6 h-6 stroke-[3]" />
            <ArrowDown className="lg:hidden w-6 h-6 stroke-[3]" />
          </div>

          {/* Step 5 */}
          <div className="flex-1 flex flex-col items-center text-center p-4 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
            <span className="w-8 h-8 rounded-full bg-brutal-green text-black font-mono font-black text-sm flex items-center justify-center border-2 border-black mb-2">
              5
            </span>
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-black dark:text-white leading-tight">
              <RichText>{steps[4].question}</RichText>
            </h4>
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <RichText>{steps[4].short}</RichText>
            </p>
          </div>

        </div>

        {/* Loop Back Ribbon from Step 4 back to Step 2 */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-black/30 dark:border-white/30 flex items-center justify-center gap-2 bg-brutal-orange/15 dark:bg-brutal-orange/20 px-3 py-2 border-2 border-black dark:border-white">
          <RotateCcw className="w-5 h-5 text-black dark:text-white shrink-0 animate-spin-slow motion-safe:hover:rotate-180 transition-transform" />
          <span className="font-mono text-xs sm:text-sm font-bold text-black dark:text-white text-center">
            <RichText>{loopLabel}</RichText>
          </span>
        </div>
      </div>
    </div>
  );
}
