import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, AlertCircle, RotateCcw, Award } from 'lucide-react';
import { checkFlag, WORKSHOP_FLAGS } from '../utils/flags';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import Sticker from './Sticker';

export default function FlagChecker() {
  const [inputFlag, setInputFlag] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [feedback, setFeedback] = useState(null);
  const [solvedFlags, setSolvedFlags] = useState(() => {
    return getStorageItem('ctf_solved_flags', []);
  });

  useEffect(() => {
    setStorageItem('ctf_solved_flags', solvedFlags);
  }, [solvedFlags]);

  const totalPossiblePoints = WORKSHOP_FLAGS.reduce((acc, f) => acc + f.points, 0);
  const currentScore = solvedFlags.reduce((acc, flagId) => {
    const item = WORKSHOP_FLAGS.find(f => f.id === flagId);
    return acc + (item ? item.points : 0);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputFlag.trim()) return;

    setStatus('checking');
    const matched = await checkFlag(inputFlag.trim());

    if (matched) {
      const alreadySolved = solvedFlags.includes(matched.id);
      if (!alreadySolved) {
        setSolvedFlags(prev => [...prev, matched.id]);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }
      setStatus('success');
      setFeedback({
        title: matched.title,
        points: matched.points,
        category: matched.category,
        alreadySolved,
      });
      setInputFlag('');
    } else {
      setStatus('error');
      setFeedback({
        message: 'Invalid flag! Ensure you include "flag{...}" without extra trailing whitespace.',
      });
      setTimeout(() => {
        setStatus('idle');
      }, 1500);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your score and solved flags?')) {
      setSolvedFlags([]);
      removeStorageItem('ctf_solved_flags');
      setStatus('idle');
      setFeedback(null);
    }
  };

  return (
    <div className="my-6 border-4 border-black dark:border-white bg-cream dark:bg-brutal-cardDark shadow-brutal-lg dark:shadow-brutal-dark-lg p-5 sm:p-7">
      {/* Score Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b-3 border-black dark:border-white">
        <div className="flex items-center gap-3">
          <div className="p-3 border-3 border-black bg-brutal-yellow shadow-[2px_2px_0px_#000]">
            <Trophy className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl m-0 text-black dark:text-white">
              Official Workshop Flag Checker
            </h3>
            <p className="text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 m-0">
              Validate your discovered flags from any demo or mini-CTF challenge.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono uppercase font-bold text-neutral-600 dark:text-neutral-400">Total Score</div>
            <div className="font-heading text-2xl text-black dark:text-brutal-yellow">
              {currentScore} <span className="text-sm font-mono text-neutral-500">/ {totalPossiblePoints} pts</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            title="Reset Score"
            className="p-2 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 hover:bg-red-300 dark:hover:bg-red-900 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4 text-black dark:text-white" />
          </button>
        </div>
      </div>

      {/* Flag Submission Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputFlag}
              onChange={(e) => setInputFlag(e.target.value)}
              placeholder="Paste flag here, e.g. flag{base64_is_not_encryption}"
              className={`brutal-input w-full font-mono text-sm sm:text-base py-3 px-4 ${
                status === 'error' ? 'border-red-600 ring-4 ring-red-400 animate-shake' : ''
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={!inputFlag.trim()}
            className="brutal-btn bg-brutal-yellow hover:bg-brutal-green text-black px-6 py-3 font-heading uppercase text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Flag 🚩
          </button>
        </div>
      </form>

      {/* Feedback Messages */}
      {status === 'success' && feedback && (
        <div role="status" aria-live="polite" className="mb-5 p-4 border-3 border-black bg-brutal-green text-black shadow-brutal flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span className="font-heading text-base">
              {feedback.alreadySolved ? 'Flag already verified!' : 'CORRECT! Challenge Solved!'}
            </span>
            <span className="font-mono text-sm font-bold">
              ({feedback.title} - +{feedback.points} pts)
            </span>
          </div>
          <Sticker color="yellow" size="sm" rotate={2}>
            +{feedback.points} PTS
          </Sticker>
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="mb-5 p-3.5 border-3 border-black bg-red-400 text-black shadow-brutal flex items-center gap-2">
          <AlertCircle className="w-5 h-5 stroke-[2.5]" />
          <span className="font-heading text-sm">
            {feedback?.message || 'Incorrect flag! Please check formatting and try again.'}
          </span>
        </div>
      )}

      {/* Progress Cards: Solved Challenges List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-heading text-sm sm:text-base uppercase tracking-wider text-black dark:text-neutral-200 m-0">
            Workshop Challenges ({solvedFlags.length} / {WORKSHOP_FLAGS.length} Unlocked)
          </h4>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
            {Math.round((solvedFlags.length / WORKSHOP_FLAGS.length) * 100)}% Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {WORKSHOP_FLAGS.map((flag) => {
            const isSolved = solvedFlags.includes(flag.id);
            return (
              <div
                key={flag.id}
                className={`p-3 border-2 border-black dark:border-white transition-all ${
                  isSolved
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-black dark:text-emerald-100 shadow-[2px_2px_0px_#000]'
                    : 'bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 border border-black bg-cream dark:bg-neutral-800 text-black dark:text-white">
                    {flag.category}
                  </span>
                  <span className="text-xs font-mono font-black text-black dark:text-white">
                    {flag.points} pts
                  </span>
                </div>
                <div className="font-heading text-xs font-bold truncate text-black dark:text-white mb-1">
                  {flag.title}
                </div>
                <div className="text-[11px] font-mono truncate">
                  {isSolved ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 inline" /> Captured
                    </span>
                  ) : (
                    <span className="text-neutral-400 italic">Hint: {flag.hint}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
