import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sticker from './Sticker';
import CodeBlock from './CodeBlock';
import RichText from './RichText';
import RoundsTimeline from './RoundsTimeline';
import { Eye, ChevronRight, FileEdit, Flag, CheckCheck, RefreshCw } from 'lucide-react';

export default function ExampleViewer({ example }) {
  if (!example) return null;

  const totalRounds = example.worksheet?.rounds?.length || 0;
  const [revealedRoundsCount, setRevealedRoundsCount] = useState(0);
  const [showLearned, setShowLearned] = useState(false);

  const isEverythingShown = revealedRoundsCount === totalRounds && showLearned;

  const handleShowNext = () => {
    if (revealedRoundsCount < totalRounds) {
      setRevealedRoundsCount((prev) => prev + 1);
    } else if (!showLearned) {
      setShowLearned(true);
    }
  };

  const handleShowEverything = () => {
    setRevealedRoundsCount(totalRounds);
    setShowLearned(true);
  };

  const handleReset = () => {
    setRevealedRoundsCount(0);
    setShowLearned(false);
  };

  const revealedRounds = (example.worksheet?.rounds || []).slice(0, revealedRoundsCount);

  return (
    <div className="space-y-6 my-6">
      {/* 1. Challenge Card */}
      <div className="p-5 sm:p-6 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Sticker color="blue" size="sm" rotate={-1}>
              {example.category}
            </Sticker>
            <Sticker 
              color={example.difficulty === 'Easy' ? 'green' : 'yellow'} 
              size="sm" 
              rotate={1}
            >
              {example.difficulty}
            </Sticker>
            {example.tools && example.tools.map((t, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2 py-0.5 border border-black/40 dark:border-white/40 bg-cream dark:bg-neutral-800 text-black dark:text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            to={`/worksheet?example=${example.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-display font-extrabold text-xs uppercase tracking-wide bg-brutal-green text-black border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <FileEdit className="w-3.5 h-3.5 stroke-[2.5]" />
            Open this in the worksheet
          </Link>
        </div>

        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-black dark:text-white mb-2">
          <RichText>{example.challenge.title}</RichText>
        </h3>
        <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans mb-4 leading-relaxed">
          <RichText>{example.challenge.description}</RichText>
        </p>

        {/* Given data */}
        {example.challenge.given && (
          <div className="mt-4">
            <span className="block font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
              {example.challenge.givenType || 'Given data'}
            </span>
            <CodeBlock
              code={example.challenge.given}
              title={example.challenge.givenType || 'Challenge Input'}
              language="text"
            />
          </div>
        )}
      </div>

      {/* 2. Interactive Reveal Controls Bar */}
      <div className="p-4 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-black dark:text-white" />
          <span className="font-heading font-bold text-sm sm:text-base text-black dark:text-white">
            Reveal Step by Step
          </span>
          <span className="font-mono text-xs px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black">
            {revealedRoundsCount}/{totalRounds} rounds revealed
            {showLearned ? ' + finished' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!isEverythingShown ? (
            <>
              <button
                type="button"
                onClick={handleShowNext}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 font-display font-black text-xs sm:text-sm uppercase tracking-wide bg-brutal-yellow text-black border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95"
              >
                <span>
                  {revealedRoundsCount < totalRounds
                    ? `Show next round (${revealedRoundsCount + 1})`
                    : 'Show learned & flag'}
                </span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={handleShowEverything}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 font-display font-bold text-xs uppercase tracking-wide bg-white dark:bg-neutral-800 text-black dark:text-white border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                Show everything
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-display font-bold text-xs uppercase tracking-wide bg-white dark:bg-neutral-800 text-black dark:text-white border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
              Start over from beginning
            </button>
          )}
        </div>
      </div>

      {/* 3. Revealed Steps Content */}
      <div className="space-y-6">
        {/* Step 1: Asking */}
        <div className="p-4 sm:p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-brutal-yellow text-black font-mono font-black text-xs flex items-center justify-center border border-black">
              1
            </span>
            <h4 className="font-heading font-extrabold text-base text-black dark:text-white">
              What is the challenge asking?
            </h4>
          </div>
          <p className="text-sm sm:text-base font-sans text-neutral-800 dark:text-neutral-200 pl-8 leading-relaxed">
            <RichText>{example.worksheet.asking}</RichText>
          </p>
        </div>

        {/* Step 2: Clues */}
        <div className="p-4 sm:p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-brutal-blue text-black font-mono font-black text-xs flex items-center justify-center border border-black">
              2
            </span>
            <h4 className="font-heading font-extrabold text-base text-black dark:text-white">
              What clues do you have?
            </h4>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base font-sans text-neutral-800 dark:text-neutral-200 pl-4">
            {example.worksheet.clues.map((clue, idx) => (
              <li key={idx} className="leading-relaxed">
                <RichText>{clue}</RichText>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps 3 & 4: Rounds Timeline */}
        {revealedRounds.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-extrabold text-lg text-black dark:text-white">
                Rounds (Hypothesis & Test)
              </h4>
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                Showing {revealedRounds.length} of {totalRounds}
              </span>
            </div>
            <RoundsTimeline rounds={revealedRounds} />
          </div>
        )}

        {/* Step 5: Learned & Flag */}
        {showLearned && (
          <div className="p-5 sm:p-6 bg-emerald-50/70 dark:bg-emerald-950/30 border-3 border-emerald-600 dark:border-emerald-500 shadow-brutal dark:shadow-brutal-dark space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-brutal-green text-black font-mono font-black text-xs flex items-center justify-center border border-black">
                  5
                </span>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white">
                  What did you learn?
                </h4>
              </div>
              <p className="text-sm sm:text-base font-sans text-neutral-800 dark:text-neutral-200 pl-8 leading-relaxed font-medium">
                <RichText>{example.worksheet.learned}</RichText>
              </p>
            </div>

            {example.worksheet.flag && (
              <div className="pt-3 border-t-2 border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 pl-8">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    Sample Flag (Teaching only)
                  </span>
                </div>
                <code className="font-mono font-bold text-sm sm:text-base px-3 py-1 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white shadow-brutal-sm text-emerald-700 dark:text-emerald-400 select-all">
                  {example.worksheet.flag}
                </code>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
