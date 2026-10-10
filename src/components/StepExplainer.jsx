import React from 'react';
import Accordion from './Accordion';
import RichText from './RichText';
import Sticker from './Sticker';
import WeakStrong from './WeakStrong';
import { HelpCircle, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function StepExplainer({ step, defaultOpen = true }) {
  if (!step) return null;

  return (
    <div className="my-6">
      <Accordion
        id={`step-${step.num}-${step.id}`}
        title={`Step ${step.num}: ${step.question}`}
        badge={`Step ${step.num}`}
        defaultOpen={defaultOpen}
      >
        <div className="space-y-6">
          {/* Header metadata & Repeats indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black/20 dark:border-white/20">
            <span className="font-mono text-sm font-bold text-neutral-600 dark:text-neutral-400">
              <RichText>{step.short}</RichText>
            </span>
            {step.repeats && (
              <Sticker color="purple" size="sm" rotate={0}>
                Repeats as a round
              </Sticker>
            )}
          </div>

          {/* Why this step matters */}
          <div className="p-4 bg-cream dark:bg-neutral-800/80 border-2 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
            <h5 className="flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              <Lightbulb className="w-4 h-4 text-black dark:text-white" />
              Why this step matters
            </h5>
            <p className="text-sm sm:text-base text-black dark:text-white leading-relaxed font-sans font-medium">
              <RichText>{step.why}</RichText>
            </p>
          </div>

          {/* How to do it */}
          {step.howTo && step.howTo.length > 0 && (
            <div>
              <h5 className="flex items-center gap-2 font-display font-extrabold text-sm uppercase tracking-wider text-black dark:text-white mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                How to do it
              </h5>
              <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                {step.howTo.map((item, idx) => (
                  <li key={idx} className="pl-1 leading-relaxed">
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Prompts to ask yourself */}
          {step.prompts && step.prompts.length > 0 && (
            <div className="p-4 bg-sky-50 dark:bg-sky-950/30 border-2 border-black dark:border-white">
              <h5 className="flex items-center gap-2 font-display font-extrabold text-sm uppercase tracking-wider text-sky-900 dark:text-sky-300 mb-2">
                <HelpCircle className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                Questions to ask yourself
              </h5>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-neutral-800 dark:text-neutral-200 font-sans">
                {step.prompts.map((prompt, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <RichText>{prompt}</RichText>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weak vs Strong comparison */}
          {step.weak && step.strong && (
            <div>
              <h5 className="font-display font-extrabold text-sm uppercase tracking-wider text-black dark:text-white mb-1">
                Weak vs Strong
              </h5>
              <WeakStrong weak={step.weak} strong={step.strong} />
            </div>
          )}

          {/* Common Mistakes */}
          {step.mistakes && step.mistakes.length > 0 && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-black dark:border-white">
              <h5 className="flex items-center gap-2 font-display font-extrabold text-sm uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Common mistakes
              </h5>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-neutral-800 dark:text-neutral-200 font-sans">
                {step.mistakes.map((mistake, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <RichText>{mistake}</RichText>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
}
