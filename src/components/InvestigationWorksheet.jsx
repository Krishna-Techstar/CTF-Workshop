import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { WORKED_EXAMPLES, STUCK_LADDER, methodPageContent } from '../content/method';
import Sticker from './Sticker';
import RichText from './RichText';
import ResultBadge from './ResultBadge';
import {
  HelpCircle,
  X,
  Plus,
  Trash2,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowDown,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const EMPTY_ROUND = () => ({
  hypothesis: '',
  prediction: '',
  test: '',
  observed: '',
  result: 'Supported',
});

const DEFAULT_DATA = {
  challengeName: '',
  asking: '',
  clues: ['', ''],
  rounds: [EMPTY_ROUND()],
  learned: '',
  flag: '',
};

export default function InvestigationWorksheet({
  storageId = 'main',
  compact = false,
  initialExampleId = null,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const storageKey = `ctf_worksheet_${storageId}`;

  // State
  const [data, setData] = useState(() => {
    const saved = getStorageItem(storageKey, null);
    if (saved && typeof saved === 'object') {
      return {
        challengeName: saved.challengeName || '',
        asking: saved.asking || '',
        clues: Array.isArray(saved.clues) && saved.clues.length > 0 ? saved.clues : ['', ''],
        rounds: Array.isArray(saved.rounds) && saved.rounds.length > 0 ? saved.rounds : [EMPTY_ROUND()],
        learned: saved.learned || '',
        flag: saved.flag || '',
      };
    }
    return DEFAULT_DATA;
  });

  const [savedStatus, setSavedStatus] = useState(false);
  const [isStuckOpen, setIsStuckOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null); // 'copied' | 'failed'
  const [showPreview, setShowPreview] = useState(false);
  const [printMode, setPrintMode] = useState('filled'); // 'blank' | 'filled'

  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Check URL query param ?example=<id> or initialExampleId
  useEffect(() => {
    const paramExampleId = searchParams.get('example') || initialExampleId;
    if (paramExampleId) {
      const match = WORKED_EXAMPLES.find((e) => e.id === paramExampleId);
      if (match) {
        loadExampleIntoWorksheet(match, false);
      }
    }
  }, [searchParams, initialExampleId]);

  // Autosave to storage
  useEffect(() => {
    setStorageItem(storageKey, data);
    setSavedStatus(true);
    const timer = setTimeout(() => {
      setSavedStatus(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, storageKey]);

  // Trapping focus in Stuck Modal
  useEffect(() => {
    if (isStuckOpen) {
      previouslyFocusedRef.current = document.activeElement;
      if (modalRef.current) {
        modalRef.current.focus();
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsStuckOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (previouslyFocusedRef.current) {
          previouslyFocusedRef.current.focus();
        }
      };
    }
  }, [isStuckOpen]);

  // Load example handler
  const loadExampleIntoWorksheet = (example, confirmPrompt = true) => {
    if (!example || !example.worksheet) return;

    const hasContent =
      data.challengeName.trim() ||
      data.asking.trim() ||
      data.clues.some((c) => c.trim()) ||
      data.rounds.some((r) => r.hypothesis.trim() || r.test.trim()) ||
      data.learned.trim();

    if (confirmPrompt && hasContent) {
      const confirm = window.confirm(
        'Loading this example will replace your current worksheet text. Continue?'
      );
      if (!confirm) return;
    }

    setData({
      challengeName: example.challenge?.title || example.title || '',
      asking: example.worksheet.asking || '',
      clues:
        example.worksheet.clues && example.worksheet.clues.length > 0
          ? [...example.worksheet.clues]
          : ['', ''],
      rounds:
        example.worksheet.rounds && example.worksheet.rounds.length > 0
          ? example.worksheet.rounds.map((r) => ({ ...r }))
          : [EMPTY_ROUND()],
      learned: example.worksheet.learned || '',
      flag: example.worksheet.flag || '',
    });
  };

  // Clear worksheet handler
  const handleClear = () => {
    if (window.confirm('Clear all entries in this worksheet?')) {
      setData({
        challengeName: '',
        asking: '',
        clues: ['', ''],
        rounds: [EMPTY_ROUND()],
        learned: '',
        flag: '',
      });
      removeStorageItem(storageKey);
    }
  };

  // Field change helpers
  const handleTextChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClueChange = (index, value) => {
    setData((prev) => {
      const newClues = [...prev.clues];
      newClues[index] = value;
      return { ...prev, clues: newClues };
    });
  };

  const handleAddClue = () => {
    setData((prev) => ({ ...prev, clues: [...prev.clues, ''] }));
  };

  const handleRemoveClue = (index) => {
    setData((prev) => {
      const newClues = prev.clues.filter((_, idx) => idx !== index);
      return { ...prev, clues: newClues.length > 0 ? newClues : [''] };
    });
  };

  const handleRoundChange = (roundIndex, field, value) => {
    setData((prev) => {
      const newRounds = [...prev.rounds];
      newRounds[roundIndex] = { ...newRounds[roundIndex], [field]: value };
      return { ...prev, rounds: newRounds };
    });
  };

  const handleAddRound = () => {
    setData((prev) => ({ ...prev, rounds: [...prev.rounds, EMPTY_ROUND()] }));
  };

  const handleRemoveRound = (roundIndex) => {
    setData((prev) => {
      const newRounds = prev.rounds.filter((_, idx) => idx !== roundIndex);
      return { ...prev, rounds: newRounds.length > 0 ? newRounds : [EMPTY_ROUND()] };
    });
  };

  // Calculate completed steps (0 to 5)
  const isStep1Done = data.asking.trim().length > 0;
  const isStep2Done = data.clues.some((c) => c.trim().length > 0);
  const isRoundValid = data.rounds.some(
    (r) =>
      r.hypothesis.trim().length > 0 &&
      r.prediction.trim().length > 0 &&
      r.test.trim().length > 0 &&
      r.result.trim().length > 0
  );
  const isStep3Done = isRoundValid;
  const isStep4Done = isRoundValid;
  const isStep5Done = data.learned.trim().length > 0;

  const completedStepsCount = [isStep1Done, isStep2Done, isStep3Done, isStep4Done, isStep5Done].filter(
    Boolean
  ).length;

  // Build Markdown Write-Up
  const markdownWriteup = [
    `# ${data.challengeName.trim() || 'Challenge name'}`,
    `Category: ___ | Points: ___ | Platform: ___`,
    '',
    `## 1. What is the challenge asking?`,
    data.asking.trim() || '(your own words, and what you were given)',
    '',
    `## 2. Clues`,
    data.clues.filter((c) => c.trim()).length > 0
      ? data.clues
          .filter((c) => c.trim())
          .map((c) => `- ${c}`)
          .join('\n')
      : '- (no clues recorded yet)',
    '',
    `## 3 and 4. Hypotheses and tests`,
    data.rounds.length > 0
      ? data.rounds
          .map((r, i) =>
            [
              `### Round ${i + 1}`,
              `- Hypothesis: ${r.hypothesis || '___'}`,
              `- Prediction: ${r.prediction || '___'}`,
              `- Test: ${r.test || '___'}`,
              `- Observed: ${r.observed || '___'}`,
              `- Result: ${r.result || 'Supported'}`,
            ].join('\n')
          )
          .join('\n\n')
      : '### Round 1\n- Hypothesis: ___\n- Prediction: ___\n- Test: ___\n- Observed: ___\n- Result: Supported',
    '',
    `## 5. What I learned`,
    data.learned.trim() || 'When I see ___, I should try ___.',
    '',
    `## Flag`,
    data.flag.trim() || 'flag{...}',
  ].join('\n');

  // Clipboard copy with fallback
  const handleCopyMarkdown = async () => {
    let success = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(markdownWriteup);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = markdownWriteup;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (e) {
        success = false;
      }
    }

    if (success) {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(null), 2500);
    } else {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus(null), 4000);
    }
  };

  // Print handlers
  const handlePrintBlank = () => {
    setPrintMode('blank');
    setTimeout(() => window.print(), 100);
  };

  const handlePrintFilled = () => {
    setPrintMode('filled');
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="space-y-8">
      {/* =========================================================================
          PRINT-ONLY VIEW (Hidden on screen, formatted for print)
          ========================================================================= */}
      <div className="hidden worksheet-print print:block p-8 font-sans text-black">
        <div className="border-b-4 border-black pb-4 mb-6 flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-wider font-heading">
              CTF Investigation Worksheet
            </h1>
            <p className="text-xs font-mono text-neutral-600 mt-1">
              Method: Ask &rarr; Clues &rarr; Hypothesis &rarr; Test &rarr; Learn
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold">
              Challenge: ______________________
            </span>
          </div>
        </div>

        {printMode === 'blank' ? (
          /* Blank Printable Worksheet with Ruled Lines */
          <div className="space-y-6 text-sm">
            <div>
              <h2 className="font-bold font-heading text-base uppercase mb-1">
                1. What is the challenge asking? (Goal & Givens)
              </h2>
              <div className="worksheet-ruled-line" />
              <div className="worksheet-ruled-line" />
            </div>

            <div>
              <h2 className="font-bold font-heading text-base uppercase mb-1">
                2. What clues do you have? (Observations & Facts)
              </h2>
              <div className="worksheet-ruled-line" />
              <div className="worksheet-ruled-line" />
              <div className="worksheet-ruled-line" />
            </div>

            <div className="border-2 border-black p-3 space-y-4">
              <div className="flex justify-between items-center border-b border-black pb-1">
                <h2 className="font-bold font-heading text-base uppercase">
                  3 & 4. Hypotheses & Tests (Rounds 1 to 3)
                </h2>
                <span className="text-xs font-mono italic">
                  &ldquo;I think ___ because ___. If I am right, I will see ___.&rdquo;
                </span>
              </div>

              {[1, 2, 3].map((rNum) => (
                <div key={rNum} className="border-t border-dashed border-neutral-400 pt-2 space-y-2">
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Round {rNum}</span>
                    <span>Result: [ ] Supported &nbsp; [ ] Refuted &nbsp; [ ] Unclear</span>
                  </div>
                  <div className="text-xs font-mono">Hypothesis & Prediction:</div>
                  <div className="worksheet-ruled-line" />
                  <div className="text-xs font-mono">Test & Observed:</div>
                  <div className="worksheet-ruled-line" />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <h2 className="font-bold font-heading text-base uppercase mb-1">
                5. What did you learn? (Rule for next time)
              </h2>
              <div className="worksheet-ruled-line" />
              <div className="worksheet-ruled-line" />
            </div>

            <div className="pt-2 border-t border-black flex justify-between items-center">
              <span className="font-bold font-mono">FLAG:</span>
              <span className="border-b-2 border-black w-3/4 inline-block">&nbsp;</span>
            </div>
          </div>
        ) : (
          /* Filled Printable Answers */
          <div className="space-y-5 text-sm">
            <div>
              <h2 className="font-bold font-heading text-base uppercase">Challenge Name</h2>
              <p className="font-mono">{data.challengeName || '(None)'}</p>
            </div>

            <div>
              <h2 className="font-bold font-heading text-base uppercase">
                1. What is the challenge asking?
              </h2>
              <p className="whitespace-pre-wrap">{data.asking || '(Empty)'}</p>
            </div>

            <div>
              <h2 className="font-bold font-heading text-base uppercase">2. Clues</h2>
              <ul className="list-disc list-inside">
                {data.clues.filter((c) => c.trim()).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-bold font-heading text-base uppercase">3 & 4. Rounds</h2>
              {data.rounds.map((r, i) => (
                <div key={i} className="border border-black p-2 my-2 space-y-1">
                  <div className="font-bold">
                    Round {i + 1} - Result: {r.result}
                  </div>
                  <div>
                    <strong>Hypothesis:</strong> {r.hypothesis}
                  </div>
                  <div>
                    <strong>Prediction:</strong> {r.prediction}
                  </div>
                  <div>
                    <strong>Test:</strong> {r.test}
                  </div>
                  <div>
                    <strong>Observed:</strong> {r.observed}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-bold font-heading text-base uppercase">5. What did you learn?</h2>
              <p className="whitespace-pre-wrap">{data.learned || '(Empty)'}</p>
            </div>

            <div className="border-t border-black pt-2">
              <strong>Flag:</strong> {data.flag || '(None)'}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          SCREEN VIEW (Hidden when printing)
          ========================================================================= */}
      <div className="print:hidden space-y-8">
        {/* Top Control Bar: Progress, Example Loader, Stuck, Save Status, Clear */}
        <div className="p-4 sm:p-5 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark flex flex-wrap items-center justify-between gap-4">
          {/* Progress indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-black text-sm sm:text-base px-3 py-1 bg-black text-white dark:bg-white dark:text-black">
              Steps completed {completedStepsCount}/5
            </span>

            {/* Autosave badge */}
            <span
              role="status"
              className={`text-xs font-mono font-bold transition-opacity ${
                savedStatus
                  ? 'text-emerald-700 dark:text-emerald-400 opacity-100'
                  : 'opacity-0'
              }`}
            >
              Saved
            </span>
          </div>

          {/* Action buttons & Example Select */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Stuck button */}
            <button
              type="button"
              onClick={() => setIsStuckOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brutal-yellow text-black font-display font-black text-xs sm:text-sm uppercase tracking-wide border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <HelpCircle className="w-4 h-4 stroke-[3]" />
              Stuck?
            </button>

            {/* Load Example Dropdown */}
            <div className="flex items-center gap-1 text-xs font-mono">
              <label htmlFor={`load-example-${storageId}`} className="sr-only">
                Load an example
              </label>
              <select
                id={`load-example-${storageId}`}
                onChange={(e) => {
                  const ex = WORKED_EXAMPLES.find((item) => item.id === e.target.value);
                  if (ex) loadExampleIntoWorksheet(ex, true);
                  e.target.value = '';
                }}
                defaultValue=""
                className="px-2.5 py-1.5 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white font-mono text-xs shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
              >
                <option value="" disabled>
                  Load an example...
                </option>
                {WORKED_EXAMPLES.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-xs border-2 border-black dark:border-white hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 transition-colors"
              title="Clear worksheet"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Challenge Name Field */}
        <div className="p-4 sm:p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
          <label
            htmlFor={`challenge-name-${storageId}`}
            className="block font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider text-black dark:text-white mb-1.5"
          >
            Challenge Name
          </label>
          <input
            id={`challenge-name-${storageId}`}
            type="text"
            value={data.challengeName}
            onChange={(e) => handleTextChange('challengeName', e.target.value)}
            placeholder="e.g. Mystery Text / Demo 1 / Flag Hunter"
            className="w-full p-2.5 font-mono text-sm sm:text-base border-2 border-black dark:border-white bg-cream dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
          />
        </div>

        {/* =====================================================================
            THE FIVE STEPS
            ===================================================================== */}
        <div className="space-y-6">
          {/* STEP 1: What is the challenge asking? */}
          <div className="p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-black/10 dark:border-white/10">
              <span className="w-7 h-7 rounded-full bg-brutal-yellow text-black font-mono font-black text-sm flex items-center justify-center border-2 border-black">
                1
              </span>
              <label
                htmlFor={`step1-asking-${storageId}`}
                className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white"
              >
                What is the challenge asking?
              </label>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans mb-2">
              Rewrite the goal in one sentence. List what you were given (text, URL, file) and what the answer looks like.
            </p>
            <textarea
              id={`step1-asking-${storageId}`}
              rows={3}
              value={data.asking}
              onChange={(e) => handleTextChange('asking', e.target.value)}
              placeholder="e.g. I was given one line of text. I must turn it into a readable flag that starts with flag{..."
              className="w-full p-3 font-sans text-sm sm:text-base border-2 border-black dark:border-white bg-cream/60 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
            />
          </div>

          {/* STEP 2: What clues do you have? (Target of loop-back) */}
          <div
            id={`step2-clues-section-${storageId}`}
            className="p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark"
          >
            <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b-2 border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brutal-blue text-black font-mono font-black text-sm flex items-center justify-center border-2 border-black">
                  2
                </span>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white">
                  What clues do you have?
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddClue}
                className="inline-flex items-center gap-1 px-2.5 py-1 font-display font-extrabold text-xs uppercase bg-brutal-yellow text-black border-2 border-black shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                Add clue
              </button>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans mb-3">
              Observations only. Characters, length, extensions, titles, oddities. Everything is a clue.
            </p>

            <div className="space-y-2">
              {data.clues.map((clue, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <label htmlFor={`clue-row-${storageId}-${idx}`} className="sr-only">
                    Clue {idx + 1}
                  </label>
                  <input
                    id={`clue-row-${storageId}-${idx}`}
                    type="text"
                    value={clue}
                    onChange={(e) => handleClueChange(idx, e.target.value)}
                    placeholder={`Clue ${idx + 1}: e.g. Length is 32 characters, ends with =`}
                    className="flex-1 p-2 font-sans text-sm border-2 border-black dark:border-white bg-cream/60 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveClue(idx)}
                    aria-label={`Remove clue ${idx + 1}`}
                    className="p-2 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 hover:bg-red-100 dark:hover:bg-red-950 text-neutral-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STEPS 3 & 4: Repeatable Rounds Container */}
          <div className="p-5 sm:p-6 bg-purple-50/50 dark:bg-purple-950/20 border-3 border-dashed border-brutal-purple shadow-brutal dark:shadow-brutal-dark space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-purple-300 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Sticker color="purple" size="sm" rotate={0}>
                  STEPS 3 & 4
                </Sticker>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-black dark:text-white">
                  Hypotheses & Tests (Repeat as rounds)
                </h3>
              </div>

              <button
                type="button"
                onClick={handleAddRound}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brutal-purple text-white font-display font-black text-xs sm:text-sm uppercase tracking-wide border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Add another round
              </button>
            </div>

            {/* Individual Rounds */}
            {data.rounds.map((round, rIdx) => {
              const roundNum = rIdx + 1;
              const hasHypoText = round.hypothesis.trim().length > 0;
              const missingBecause =
                hasHypoText && !round.hypothesis.toLowerCase().includes('because');
              const hasTestWithoutPrediction =
                round.test.trim().length > 0 && round.prediction.trim().length === 0;

              return (
                <div
                  key={rIdx}
                  className="p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark space-y-4"
                >
                  {/* Round Header */}
                  <div className="flex items-center justify-between gap-3 pb-2 border-b-2 border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black">
                        Round {roundNum}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        Hypothesis & Test
                      </span>
                    </div>

                    {data.rounds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRound(rIdx)}
                        aria-label={`Remove round ${roundNum}`}
                        className="inline-flex items-center gap-1 text-xs font-mono text-red-600 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove round
                      </button>
                    )}
                  </div>

                  {/* Step 3: Hypothesis */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <label
                        htmlFor={`round-${rIdx}-hypo-${storageId}`}
                        className="font-heading font-extrabold text-sm uppercase tracking-wide text-black dark:text-white"
                      >
                        Step 3: Hypothesis (Reason + Clue)
                      </label>
                      <span className="text-xs font-mono text-neutral-500 italic">
                        Must contain &ldquo;because&rdquo;
                      </span>
                    </div>
                    <textarea
                      id={`round-${rIdx}-hypo-${storageId}`}
                      rows={2}
                      value={round.hypothesis}
                      onChange={(e) => handleRoundChange(rIdx, 'hypothesis', e.target.value)}
                      placeholder="I think ___ because ___."
                      className="w-full p-2.5 font-sans text-sm border-2 border-black dark:border-white bg-cream/40 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
                    />
                    {/* Gentle inline hint for because */}
                    {missingBecause && (
                      <p
                        role="status"
                        className="mt-1 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        A hypothesis needs a clue: add a &lsquo;because&rsquo;
                      </p>
                    )}
                  </div>

                  {/* Prediction */}
                  <div>
                    <label
                      htmlFor={`round-${rIdx}-pred-${storageId}`}
                      className="block font-heading font-extrabold text-sm uppercase tracking-wide text-black dark:text-white mb-1"
                    >
                      Prediction (What you expect before running)
                    </label>
                    <textarea
                      id={`round-${rIdx}-pred-${storageId}`}
                      rows={2}
                      value={round.prediction}
                      onChange={(e) => handleRoundChange(rIdx, 'prediction', e.target.value)}
                      placeholder="If I am right, I will see ___."
                      className="w-full p-2.5 font-sans text-sm border-2 border-black dark:border-white bg-sky-50/50 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
                    />
                  </div>

                  {/* Step 4: Test & Observed */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`round-${rIdx}-test-${storageId}`}
                        className="block font-heading font-extrabold text-sm uppercase tracking-wide text-black dark:text-white mb-1"
                      >
                        Step 4: Test (Tool or command)
                      </label>
                      <textarea
                        id={`round-${rIdx}-test-${storageId}`}
                        rows={2}
                        value={round.test}
                        onChange={(e) => handleRoundChange(rIdx, 'test', e.target.value)}
                        placeholder="e.g. CyberChef From Base64 / file challenge.jpg"
                        className="w-full p-2.5 font-mono text-xs sm:text-sm border-2 border-black dark:border-white bg-cream/40 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
                      />
                      {/* Gentle inline hint for prediction before test */}
                      {hasTestWithoutPrediction && (
                        <p
                          role="status"
                          className="mt-1 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          Write what you expect before you run it
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`round-${rIdx}-obs-${storageId}`}
                        className="block font-heading font-extrabold text-sm uppercase tracking-wide text-black dark:text-white mb-1"
                      >
                        Observed (What actually happened)
                      </label>
                      <textarea
                        id={`round-${rIdx}-obs-${storageId}`}
                        rows={2}
                        value={round.observed}
                        onChange={(e) => handleRoundChange(rIdx, 'observed', e.target.value)}
                        placeholder="e.g. Output shows readable text / Output is broken bytes"
                        className="w-full p-2.5 font-sans text-sm border-2 border-black dark:border-white bg-cream/40 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
                      />
                    </div>
                  </div>

                  {/* Result selection */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`round-${rIdx}-res-${storageId}`}
                        className="font-heading font-extrabold text-sm uppercase tracking-wide text-black dark:text-white"
                      >
                        Result:
                      </label>
                      <select
                        id={`round-${rIdx}-res-${storageId}`}
                        value={round.result}
                        onChange={(e) => handleRoundChange(rIdx, 'result', e.target.value)}
                        className="p-1.5 font-mono text-xs font-bold border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
                      >
                        <option value="Supported">Supported</option>
                        <option value="Refuted">Refuted</option>
                        <option value="Unclear">Unclear</option>
                      </select>
                    </div>

                    <ResultBadge result={round.result} size="sm" />
                  </div>
                </div>
              );
            })}

            {/* Loop-back Callout inside Rounds */}
            {!compact && (
              <div className="p-3 bg-brutal-orange/20 border-2 border-black dark:border-white text-xs sm:text-sm font-mono font-bold text-black dark:text-white flex items-center justify-between gap-2">
                <span>Not solved yet? Step 4 result gives a new clue.</span>
                <a
                  href={`#step2-clues-section-${storageId}`}
                  className="underline hover:text-black dark:hover:text-brutal-yellow shrink-0"
                >
                  &larr; Loop back to Step 2
                </a>
              </div>
            )}
          </div>

          {/* STEP 5: What did you learn? */}
          <div className="p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-black/10 dark:border-white/10">
              <span className="w-7 h-7 rounded-full bg-brutal-green text-black font-mono font-black text-sm flex items-center justify-center border-2 border-black">
                5
              </span>
              <label
                htmlFor={`step5-learned-${storageId}`}
                className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white"
              >
                What did you learn? (Rule for next time)
              </label>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans">
              Write the reusable pattern: &ldquo;When I see ___, I should try ___.&rdquo;
            </p>
            <textarea
              id={`step5-learned-${storageId}`}
              rows={3}
              value={data.learned}
              onChange={(e) => handleTextChange('learned', e.target.value)}
              placeholder="e.g. When I see letters and digits ending with =, I should check Base64 first..."
              className="w-full p-3 font-sans text-sm sm:text-base border-2 border-black dark:border-white bg-cream/60 dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
            />
          </div>

          {/* FLAG FIELD */}
          <div className="p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
            <label
              htmlFor={`flag-field-${storageId}`}
              className="block font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider text-black dark:text-white mb-1.5"
            >
              Flag (Optional)
            </label>
            <input
              id={`flag-field-${storageId}`}
              type="text"
              value={data.flag}
              onChange={(e) => handleTextChange('flag', e.target.value)}
              placeholder="flag{...}"
              className="w-full p-2.5 font-mono text-sm sm:text-base border-2 border-black dark:border-white bg-cream dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-bold shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
            />
          </div>
        </div>

        {/* =====================================================================
            WRITE-UP EXPORT & PRINT BUTTONS
            ===================================================================== */}
        <div className="p-5 sm:p-6 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-black dark:text-white">
                Export & Print Options
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans">
                Copy your write-up in Markdown format or generate clean printables.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Copy Write-up button */}
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 font-display font-black text-xs uppercase tracking-wider bg-brutal-yellow text-black border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {copyStatus === 'copied' ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy as write-up (Markdown)</span>
                  </>
                )}
              </button>

              {/* Print blank worksheet */}
              <button
                type="button"
                onClick={handlePrintBlank}
                className="inline-flex items-center gap-1.5 px-3 py-2 font-display font-bold text-xs uppercase tracking-wider bg-white dark:bg-neutral-800 text-black dark:text-white border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                Print blank worksheet
              </button>

              {/* Print my answers */}
              <button
                type="button"
                onClick={handlePrintFilled}
                className="inline-flex items-center gap-1.5 px-3 py-2 font-display font-bold text-xs uppercase tracking-wider bg-white dark:bg-neutral-800 text-black dark:text-white border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                Print my answers
              </button>

              {/* Toggle Preview Button */}
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center gap-1 px-2.5 py-2 font-mono text-xs border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white"
              >
                {showPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showPreview ? 'Hide preview' : 'Show preview'}
              </button>
            </div>
          </div>

          {/* Copy failed message fallback */}
          {copyStatus === 'failed' && (
            <p role="status" className="text-xs font-mono text-red-600 font-bold">
              Copy failed, select the text manually from preview.
            </p>
          )}

          {/* Preview Textarea */}
          {showPreview && (
            <div className="pt-2">
              <label
                htmlFor={`markdown-preview-${storageId}`}
                className="block font-mono text-xs font-bold text-neutral-500 uppercase mb-1"
              >
                Markdown Preview
              </label>
              <textarea
                id={`markdown-preview-${storageId}`}
                rows={10}
                readOnly
                value={markdownWriteup}
                className="w-full p-3 font-mono text-xs border-2 border-black dark:border-white bg-white dark:bg-neutral-950 text-black dark:text-neutral-100 select-all"
              />
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          STUCK LADDER MODAL (Focus trapped, ESC to close)
          ========================================================================= */}
      {isStuckOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="stuck-dialog-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsStuckOpen(false)}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white dark:bg-brutal-cardDark border-4 border-black dark:border-white shadow-brutal-lg dark:shadow-brutal-dark-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 outline-none space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b-3 border-black dark:border-white">
              <div className="flex items-center gap-2">
                <Sticker color="yellow" size="sm" rotate={-1}>
                  STUCK LADDER
                </Sticker>
                <h3
                  id="stuck-dialog-title"
                  className="font-heading font-extrabold text-lg sm:text-xl text-black dark:text-white"
                >
                  Climb One Rung at a Time
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsStuckOpen(false)}
                aria-label="Close stuck ladder dialog"
                className="p-1 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_#000] hover:bg-neutral-100"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans">
              {methodPageContent.stuck.intro}
            </p>

            <div className="space-y-3">
              {STUCK_LADDER.map((rung) => (
                <div
                  key={rung.rung}
                  className="p-3.5 bg-cream/70 dark:bg-neutral-800 border-2 border-black dark:border-white shadow-brutal-sm flex items-start gap-3"
                >
                  <span className="font-mono font-black text-xs px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black shrink-0">
                    Rung {rung.rung}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs font-bold text-neutral-500">
                        {rung.minutes}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-black dark:text-white">
                      <RichText>{rung.action}</RichText>
                    </h4>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-0.5 font-sans">
                      <RichText>{rung.detail}</RichText>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t-2 border-black/20 dark:border-white/20 flex justify-end">
              <button
                type="button"
                onClick={() => setIsStuckOpen(false)}
                className="px-4 py-1.5 font-display font-extrabold text-xs uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
