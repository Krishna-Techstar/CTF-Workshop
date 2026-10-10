import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import RichText from '../components/RichText';
import Sticker from '../components/Sticker';
import ResultBadge from '../components/ResultBadge';
import WeakStrong from '../components/WeakStrong';
import StepExplainer from '../components/StepExplainer';
import InvestigationLoop from '../components/InvestigationLoop';
import {
  METHOD_STEPS,
  RESULT_GUIDE,
  MINDSET_RULES,
  BAD_HABITS,
  STUCK_LADDER,
  CATEGORY_STARTERS,
  COACH_QUESTIONS,
  methodPageContent,
} from '../content/method';
import {
  Play,
  Square,
  RotateCcw,
  Search,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Brain,
  HelpCircle,
  Clock,
  CheckSquare,
  Square as EmptySquare,
} from 'lucide-react';

export default function InvestigationMethod() {
  const content = methodPageContent;

  // TOC items
  const tocItems = [
    { id: content.loop.anchor, label: 'The Loop' },
    { id: content.stepsAnchor, label: 'Five Questions' },
    { id: content.hypothesis.anchor, label: 'Hypothesis Rules' },
    { id: content.results.anchor, label: 'Reading Results' },
    { id: content.mindset.anchor, label: 'Mindset' },
    { id: content.habits.anchor, label: 'Bad Habits' },
    { id: content.stuck.anchor, label: 'Stuck Ladder' },
    { id: content.byCategory.anchor, label: 'By Category' },
    { id: content.facilitator.anchor, label: 'Facilitator Script' },
    { id: 'glossary', label: 'Glossary' },
  ];

  // Stuck ladder session-only checkboxes
  const [checkedRungs, setCheckedRungs] = useState({});
  const toggleRung = (rungNum) => {
    setCheckedRungs((prev) => ({
      ...prev,
      [rungNum]: !prev[rungNum],
    }));
  };

  // Category filter
  const [categoryQuery, setCategoryQuery] = useState('');
  const filteredCategories = CATEGORY_STARTERS.filter((row) => {
    const q = categoryQuery.toLowerCase();
    return (
      row.category.toLowerCase().includes(q) ||
      row.firstClues.toLowerCase().includes(q) ||
      row.firstTools.toLowerCase().includes(q) ||
      row.typicalHypothesis.toLowerCase().includes(q)
    );
  });

  // Facilitator Script Stopwatch (Date.now() timestamp deadline-based)
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerStartRef = useRef(null);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timerStartRef.current = Date.now() - elapsedSeconds * 1000;
      timerIntervalRef.current = setInterval(() => {
        const now = Date.now();
        const diff = Math.floor((now - timerStartRef.current) / 1000);
        setElapsedSeconds(diff);
      }, 250);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning]);

  const handleStartTimer = () => setTimerRunning(true);
  const handleStopTimer = () => setTimerRunning(false);
  const handleResetTimer = () => {
    setTimerRunning(false);
    setElapsedSeconds(0);
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to parse facilitator step time string "0:30 to 1:30"
  const parseTimeSpan = (timeStr) => {
    const parts = timeStr.split(' to ');
    if (parts.length !== 2) return { start: 0, end: 9999 };
    const toSeconds = (s) => {
      const clean = s.trim().replace('After ', '');
      const [m, sec] = clean.split(':').map(Number);
      return (m || 0) * 60 + (sec || 0);
    };
    return {
      start: toSeconds(parts[0]),
      end: toSeconds(parts[1]),
    };
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <PageHeader
        title={content.title}
        time={content.time}
        tagText={content.tag}
        accentColor="bg-brutal-orange"
      >
        <p className="font-semibold text-base sm:text-lg">
          <strong>Goal:</strong> <RichText>{content.goal}</RichText>
        </p>
      </PageHeader>

      {/* Intro paragraphs */}
      <div className="space-y-4 text-base sm:text-lg font-sans text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-4xl">
        {content.intro.map((p, idx) => (
          <p key={idx}>
            <RichText>{p}</RichText>
          </p>
        ))}
      </div>

      {/* Quick Card: Large, Projector-Friendly */}
      <div className="my-8 p-6 sm:p-8 bg-brutal-yellow text-black border-4 border-black dark:border-white shadow-brutal-lg dark:shadow-brutal-dark-lg select-all">
        <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b-3 border-black">
          <span className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider">
            Quick Card (Projector View)
          </span>
          <Sticker color="white" size="sm" rotate={2}>
            5 QUESTIONS
          </Sticker>
        </div>
        <ol className="space-y-3.5 text-base sm:text-xl font-heading font-black tracking-tight leading-snug">
          {content.quickCard.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <RichText>{item}</RichText>
            </li>
          ))}
        </ol>
      </div>

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      {/* SECTION 1: THE LOOP */}
      <section id={content.loop.anchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="orange" size="sm" rotate={-1}>
            PROCESS
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.loop.title}</RichText>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
          <RichText>{content.loop.text}</RichText>
        </p>

        {/* Visual Loop Component */}
        <InvestigationLoop />

        <div className="p-4 bg-cream dark:bg-neutral-800/60 border-2 border-black dark:border-white shadow-brutal-sm text-sm text-neutral-800 dark:text-neutral-200">
          <span className="font-mono font-bold text-black dark:text-white mr-1.5">Note:</span>
          <RichText>{content.loop.note}</RichText>
        </div>
      </section>

      {/* SECTION 2: FIVE QUESTIONS ONE BY ONE */}
      <section id={content.stepsAnchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="blue" size="sm" rotate={1}>
            DEEP DIVE
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.stepsTitle}</RichText>
          </h2>
        </div>

        <div className="space-y-4">
          {METHOD_STEPS.map((step) => (
            <StepExplainer key={step.id} step={step} defaultOpen={step.num === 1} />
          ))}
        </div>
      </section>

      {/* SECTION 3: HOW TO WRITE A GOOD HYPOTHESIS */}
      <section id={content.hypothesis.anchor} className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <Sticker color="purple" size="sm" rotate={-1}>
            FORMULA
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.hypothesis.title}</RichText>
          </h2>
        </div>

        {/* Template Callout */}
        <div className="p-5 sm:p-6 bg-purple-50 dark:bg-purple-950/40 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <span className="block font-mono text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-2">
            The Hypothesis Template
          </span>
          <div className="font-heading font-extrabold text-lg sm:text-2xl text-black dark:text-white">
            &ldquo;<RichText>{content.hypothesis.template}</RichText>&rdquo;
          </div>
        </div>

        {/* The 4 Rules as Cards */}
        <div>
          <h3 className="font-heading font-bold text-lg text-black dark:text-white mb-3">
            The 4 Rules
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.hypothesis.rules.map((r, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider text-black dark:text-white">
                    <RichText>{r.rule}</RichText>
                  </h4>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                  <RichText>{r.text}</RichText>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak / Strong pairs */}
        <div>
          <h3 className="font-heading font-bold text-lg text-black dark:text-white mb-2">
            Weak vs Strong Examples
          </h3>
          <div className="space-y-3">
            {content.hypothesis.pairs.map((pair, idx) => (
              <WeakStrong key={idx} weak={pair.weak} strong={pair.strong} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: READING YOUR TEST RESULTS */}
      <section id={content.results.anchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="green" size="sm" rotate={1}>
            OUTCOMES
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.results.title}</RichText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RESULT_GUIDE.map((item, idx) => {
            const isSupported = item.result === 'Supported';
            const isRefuted = item.result === 'Refuted';
            const bgClass = isSupported
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500'
              : isRefuted
              ? 'bg-red-50 dark:bg-red-950/30 border-red-500'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-400';

            return (
              <div
                key={idx}
                className={`p-5 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark flex flex-col justify-between ${bgClass}`}
              >
                <div>
                  <div className="mb-3">
                    <ResultBadge result={item.result} size="md" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-black dark:text-white mb-2">
                    Meaning
                  </h4>
                  <p className="text-sm font-sans text-neutral-800 dark:text-neutral-200 mb-4 leading-relaxed">
                    <RichText>{item.meaning}</RichText>
                  </p>
                </div>
                <div className="pt-3 border-t-2 border-black/15 dark:border-white/15">
                  <span className="block font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1">
                    What to do next
                  </span>
                  <p className="text-xs sm:text-sm font-sans font-medium text-black dark:text-white leading-relaxed">
                    <RichText>{item.next}</RichText>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: SIX RULES OF MINDSET */}
      <section id={content.mindset.anchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="yellow" size="sm" rotate={-1}>
            HABITS
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.mindset.title}</RichText>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MINDSET_RULES.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-black dark:text-brutal-yellow" />
                  <h4 className="font-heading font-bold text-base text-black dark:text-white">
                    <RichText>{item.rule}</RichText>
                  </h4>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                  <RichText>{item.meaning}</RichText>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: HABITS THAT WASTE TIME */}
      <section id={content.habits.anchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="red" size="sm" rotate={1}>
            AVOID
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.habits.title}</RichText>
          </h2>
        </div>

        <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <table className="w-full text-left border-collapse bg-white dark:bg-brutal-cardDark">
            <thead>
              <tr className="bg-cream dark:bg-neutral-800 border-b-3 border-black dark:border-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider text-black dark:text-white">
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white">Habit</th>
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white">Why it fails</th>
                <th className="p-3 sm:p-4">Do instead</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/20 dark:divide-white/20 text-xs sm:text-sm font-sans">
              {BAD_HABITS.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-red-600 dark:text-red-400 border-r-2 border-black/20 dark:border-white/20 whitespace-nowrap">
                    <RichText>{item.habit}</RichText>
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-800 dark:text-neutral-200 border-r-2 border-black/20 dark:border-white/20">
                    <RichText>{item.whyItFails}</RichText>
                  </td>
                  <td className="p-3 sm:p-4 font-medium text-emerald-800 dark:text-emerald-300">
                    <RichText>{item.instead}</RichText>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: THE STUCK LADDER */}
      <section id={content.stuck.anchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="blue" size="sm" rotate={-1}>
            TROUBLESHOOTING
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.stuck.title}</RichText>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
          <RichText>{content.stuck.intro}</RichText>
        </p>

        {/* Visual Ladder */}
        <div className="space-y-3 relative pl-4 sm:pl-8 before:content-[''] before:absolute before:left-2 sm:before:left-4 before:top-4 before:bottom-4 before:w-1.5 before:bg-black dark:before:bg-white">
          {STUCK_LADDER.map((rung) => {
            const isChecked = !!checkedRungs[rung.rung];

            return (
              <div
                key={rung.rung}
                onClick={() => toggleRung(rung.rung)}
                className={`cursor-pointer p-4 border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm transition-all duration-150 flex items-start gap-4 ${
                  isChecked
                    ? 'bg-neutral-100 dark:bg-neutral-900 opacity-60 line-through'
                    : 'bg-white dark:bg-brutal-cardDark hover:-translate-y-0.5'
                }`}
              >
                {/* Custom Checkbox button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRung(rung.rung);
                  }}
                  aria-label={`Toggle rung ${rung.rung}`}
                  className="shrink-0 mt-0.5 text-black dark:text-white"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <EmptySquare className="w-5 h-5 stroke-[2]" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono font-black text-xs px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black">
                      Rung {rung.rung}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      ⏱ {rung.minutes}
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white">
                    <RichText>{rung.action}</RichText>
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans mt-0.5">
                    <RichText>{rung.detail}</RichText>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: WHERE TO START BY CATEGORY */}
      <section id={content.byCategory.anchor} className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="orange" size="sm" rotate={1}>
            STARTING POINTS
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.byCategory.title}</RichText>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
          <RichText>{content.byCategory.intro}</RichText>
        </p>

        {/* Live Filter Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            placeholder="Filter categories, clues, or tools..."
            aria-label="Filter category starters"
            className="w-full pl-9 pr-3 py-2 text-sm font-mono border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm focus:outline-none focus:ring-2 focus:ring-brutal-yellow"
          />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <table className="w-full text-left border-collapse bg-white dark:bg-brutal-cardDark text-xs sm:text-sm font-sans">
            <thead>
              <tr className="bg-cream dark:bg-neutral-800 border-b-3 border-black dark:border-white font-display font-extrabold uppercase tracking-wider text-black dark:text-white">
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white whitespace-nowrap">Category</th>
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white">First Clues to Look For</th>
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white">First Tools to Try</th>
                <th className="p-3 sm:p-4">Typical Hypothesis</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/20 dark:divide-white/20">
              {filteredCategories.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="p-3 sm:p-4 font-bold font-mono text-black dark:text-white border-r-2 border-black/20 dark:border-white/20 whitespace-nowrap">
                    <RichText>{row.category}</RichText>
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-800 dark:text-neutral-200 border-r-2 border-black/20 dark:border-white/20">
                    <RichText>{row.firstClues}</RichText>
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-800 dark:text-neutral-200 border-r-2 border-black/20 dark:border-white/20 font-mono text-xs">
                    <RichText>{row.firstTools}</RichText>
                  </td>
                  <td className="p-3 sm:p-4 font-medium italic text-neutral-700 dark:text-neutral-300">
                    &ldquo;<RichText>{row.typicalHypothesis}</RichText>&rdquo;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 9: FACILITATOR SCRIPT */}
      <section id={content.facilitator.anchor} className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3">
          <Sticker color="purple" size="sm" rotate={-1}>
            TEACHING
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            <RichText>{content.facilitator.title}</RichText>
          </h2>
        </div>

        <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
          <RichText>{content.facilitator.intro}</RichText>
        </p>

        {/* Live Stopwatch Control Bar */}
        <div className="p-4 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-black dark:text-white" />
            <div>
              <span className="font-mono text-xs font-bold text-neutral-500 uppercase block">
                Walkthrough Stopwatch
              </span>
              <span className="font-mono font-black text-2xl text-black dark:text-white">
                {formatTimer(elapsedSeconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!timerRunning ? (
              <button
                type="button"
                onClick={handleStartTimer}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brutal-green text-black font-display font-extrabold text-xs uppercase tracking-wider border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                Start Walkthrough
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStopTimer}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-400 text-black font-display font-extrabold text-xs uppercase tracking-wider border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                <Square className="w-3.5 h-3.5 fill-black" />
                Pause
              </button>
            )}

            <button
              type="button"
              onClick={handleResetTimer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-800 text-black dark:text-white font-display font-bold text-xs uppercase tracking-wider border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Steps Table with Active Highlight */}
        <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <table className="w-full text-left border-collapse bg-white dark:bg-brutal-cardDark text-xs sm:text-sm font-sans">
            <thead>
              <tr className="bg-cream dark:bg-neutral-800 border-b-3 border-black dark:border-white font-display font-extrabold uppercase tracking-wider text-black dark:text-white">
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white whitespace-nowrap">Step / Time</th>
                <th className="p-3 sm:p-4 border-r-2 border-black dark:border-white">Say (Prompt to Room)</th>
                <th className="p-3 sm:p-4">Do (Action on Board / Screen)</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/20 dark:divide-white/20">
              {content.facilitator.steps.map((st, idx) => {
                const { start, end } = parseTimeSpan(st.time);
                const isCurrent = timerRunning && elapsedSeconds >= start && elapsedSeconds < end;

                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-brutal-yellow/30 dark:bg-brutal-yellow/20 border-l-6 border-l-brutal-yellow font-medium'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    <td className="p-3 sm:p-4 border-r-2 border-black/20 dark:border-white/20 whitespace-nowrap align-top">
                      <div className="font-mono font-bold text-xs px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black inline-block mb-1">
                        Step {idx + 1}
                      </div>
                      <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                        {st.time}
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 border-r-2 border-black/20 dark:border-white/20 font-medium text-black dark:text-white align-top">
                      &ldquo;<RichText>{st.say}</RichText>&rdquo;
                    </td>
                    <td className="p-3 sm:p-4 text-neutral-800 dark:text-neutral-200 align-top">
                      <RichText>{st.doThis}</RichText>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Coach Questions Box */}
        <div className="p-5 bg-sky-50 dark:bg-sky-950/30 border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-sky-700 dark:text-sky-300" />
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-sky-900 dark:text-sky-200">
              <RichText>{content.facilitator.coachTitle}</RichText>
            </h4>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-800 dark:text-neutral-200 font-sans">
            {COACH_QUESTIONS.map((q, idx) => (
              <li key={idx} className="leading-relaxed font-medium">
                &ldquo;<RichText>{q}</RichText>&rdquo;
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 10: GLOSSARY */}
      <section id="glossary" className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-3">
          <Sticker color="green" size="sm" rotate={1}>
            VOCABULARY
          </Sticker>
          <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white">
            Glossary
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {content.glossary.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm"
            >
              <h4 className="font-mono font-black text-sm uppercase tracking-wider text-black dark:text-white mb-1">
                <RichText>{item.term}</RichText>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                <RichText>{item.meaning}</RichText>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Links */}
      <div className="p-6 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
        <h3 className="font-heading font-bold text-lg text-black dark:text-white mb-3">
          Where to Go Next
        </h3>
        <div className="flex flex-wrap gap-4">
          {content.nextLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="inline-flex items-center gap-2 px-4 py-2 font-display font-extrabold text-sm uppercase tracking-wide bg-brutal-yellow text-black border-2 border-black dark:border-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          ))}
        </div>
      </div>

      {/* Page Navigation */}
      <PageNav
        prev={{ label: 'Before You Start', path: '/before-you-start' }}
        next={{ label: 'Worked Examples', path: '/method-examples' }}
      />
    </div>
  );
}
