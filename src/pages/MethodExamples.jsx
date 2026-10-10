import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import PageNav from '../components/PageNav';
import RichText from '../components/RichText';
import Sticker from '../components/Sticker';
import ExampleViewer from '../components/ExampleViewer';
import { examplesPageContent, WORKED_EXAMPLES } from '../content/method';
import { FileEdit, BookOpen, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function MethodExamples() {
  const content = examplesPageContent;
  const [activeTabId, setActiveTabId] = useState(WORKED_EXAMPLES[0]?.id || 'ex-base64');
  const tabRefs = useRef({});

  const activeExample = WORKED_EXAMPLES.find((ex) => ex.id === activeTabId) || WORKED_EXAMPLES[0];

  const handleKeyDown = (e, index) => {
    const total = WORKED_EXAMPLES.length;
    let nextIndex = index;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % total;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = total - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextId = WORKED_EXAMPLES[nextIndex].id;
    setActiveTabId(nextId);
    if (tabRefs.current[nextId]) {
      tabRefs.current[nextId].focus();
    }
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHeader
        title={content.title}
        time={content.time}
        tagText={content.tag}
        accentColor="bg-brutal-purple"
      >
        <p className="font-semibold text-base sm:text-lg">
          <strong>Goal:</strong> <RichText>{content.goal}</RichText>
        </p>
      </PageHeader>

      {/* How to Read & Sample Flag Note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* How to read this page */}
        <div className="md:col-span-2 p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black/10 dark:border-white/10">
            <BookOpen className="w-5 h-5 text-black dark:text-brutal-yellow" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white">
              How to Read These Examples
            </h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-sans">
            {content.howToRead.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-1">
                <RichText>{item}</RichText>
              </li>
            ))}
          </ol>
        </div>

        {/* Sample Flag Notice */}
        <div className="p-5 bg-amber-50 dark:bg-amber-950/30 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <Sticker color="yellow" size="sm" rotate={1}>
                TEACHING FLAGS
              </Sticker>
            </div>
            <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed">
              <RichText>{content.note}</RichText>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-white/10">
            <Link
              to={content.trySamePath || '/worksheet'}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black dark:text-white hover:underline"
            >
              <FileEdit className="w-3.5 h-3.5" />
              Try your own challenge in the Worksheet &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Accessible Tablist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl sm:text-2xl text-black dark:text-white">
            Choose an Example Walkthrough
          </h2>
          <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
            Use <kbd className="px-1 border border-black bg-cream text-black">←</kbd> / <kbd className="px-1 border border-black bg-cream text-black">→</kbd> to navigate tabs
          </span>
        </div>

        {/* Tab buttons */}
        <div
          role="tablist"
          aria-label="Worked examples"
          className="flex flex-wrap gap-2 border-b-3 border-black dark:border-white pb-3"
        >
          {WORKED_EXAMPLES.map((ex, idx) => {
            const isActive = ex.id === activeTabId;
            return (
              <button
                key={ex.id}
                ref={(el) => (tabRefs.current[ex.id] = el)}
                role="tab"
                type="button"
                id={`tab-${ex.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${ex.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTabId(ex.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`px-4 py-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wide border-2 border-black dark:border-white transition-all select-none ${
                  isActive
                    ? 'bg-brutal-purple text-white shadow-brutal dark:shadow-brutal-dark translate-x-0.5 -translate-y-0.5'
                    : 'bg-white dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-brutal-sm'
                }`}
              >
                <span>{ex.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        {activeExample && (
          <div
            role="tabpanel"
            id={`tabpanel-${activeExample.id}`}
            aria-labelledby={`tab-${activeExample.id}`}
            className="focus:outline-none"
          >
            <ExampleViewer example={activeExample} />
          </div>
        )}
      </div>

      {/* Callout Link to Worksheet */}
      <div className="p-6 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-lg text-black dark:text-white mb-1">
            Ready to test this yourself?
          </h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans">
            Load these examples into the interactive worksheet, or start fresh with your own challenge.
          </p>
        </div>
        <Link
          to="/worksheet"
          className="inline-flex items-center gap-2 px-4 py-2.5 font-display font-black text-sm uppercase tracking-wider bg-brutal-green text-black border-2 border-black dark:border-white shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shrink-0"
        >
          <span>Open Worksheet</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </Link>
      </div>

      {/* Page Navigation */}
      <PageNav
        prev={{ label: 'Investigation Method', path: '/method' }}
        next={{ label: 'Worksheet', path: '/worksheet' }}
      />
    </div>
  );
}
