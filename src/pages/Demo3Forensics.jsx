import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import Sticker from '../components/Sticker';
import RichText from '../components/RichText';
import FlagBadge from '../components/FlagBadge';
import { demo3ForensicsContent } from '../content/demo3Forensics';
import { Coffee, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';

export default function Demo3Forensics() {
  const [stepperIdx, setStepperIdx] = useState(0);
  const [openSections, setOpenSections] = useState({
    breakSection: true,
    step0: true,
    prep: true,
    stepperSection: true,
    allSteps: true,
    summaryTable: true,
    picoCtf: true,
  });

  const handleExpandAll = () => {
    setOpenSections({
      breakSection: true, step0: true, prep: true, stepperSection: true,
      allSteps: true, summaryTable: true, picoCtf: true
    });
  };

  const handleCollapseAll = () => {
    setOpenSections({
      breakSection: false, step0: false, prep: false, stepperSection: false,
      allSteps: false, summaryTable: false, picoCtf: false
    });
  };

  const tocItems = [
    { id: 'break-section', label: 'Break & Files' },
    { id: 'step-0-file-basics', label: 'Step 0: File Anatomy' },
    { id: 'prep-evidence-files', label: 'Prep: Build Files' },
    { id: 'forensics-stepper', label: 'Command Stepper' },
    { id: 'all-steps-detailed', label: 'Detailed Steps 1-6' },
    { id: 'summary-table-slide', label: 'Slide Summary Table' },
    { id: 'picoctf-forensics-practice', label: 'Practice on picoCTF' },
  ];

  const currentStep = demo3ForensicsContent.steps[stepperIdx];

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={demo3ForensicsContent.title}
        time={demo3ForensicsContent.time}
        accentColor="bg-brutal-purple"
        tagText="DEMO 3: FORENSICS"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          From file signatures and strings to metadata carving, binwalk extraction, and steganography.
        </p>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Break & Hand out files */}
      <Accordion
        id="break-section"
        badge="BREAK"
        title={demo3ForensicsContent.breakTitle}
        isOpen={openSections.breakSection}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, breakSection: state }))}
      >
        <div className="p-4 border-3 border-black bg-orange-100 dark:bg-orange-950/40 text-black dark:text-neutral-100 shadow-brutal-sm">
          <div className="flex items-center gap-2 mb-2 font-heading text-base text-orange-800 dark:text-orange-400">
            <Coffee className="w-5 h-5 stroke-[2.5]" />
            10-MINUTE BREAK &amp; FILE DISTRIBUTION PROTOCOL
          </div>
          <p className="text-sm sm:text-base leading-relaxed font-sans mb-3">
            <RichText>{demo3ForensicsContent.breakInstructions}</RichText>
          </p>
          <div className="p-3 bg-white dark:bg-neutral-900 border-2 border-black font-mono text-xs text-red-600 dark:text-red-400 font-bold">
            ⚠️ Warning: never send them as a photo; send as a ZIP or file. Messaging apps silently re-compress images and destroy hidden payload bytes.
          </div>
        </div>
      </Accordion>

      {/* Step 0: Why files can hide things */}
      <Accordion
        id="step-0-file-basics"
        badge="STEP 0"
        title={demo3ForensicsContent.step0.title}
        isOpen={openSections.step0}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step0: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">
            <RichText>{demo3ForensicsContent.step0.intro}</RichText>
          </p>

          <div>
            <h5 className="font-heading text-xs uppercase tracking-wider mb-2">Magic Numbers / File Signatures:</h5>
            <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase text-xs">
                    <th className="p-3 border-r-2 border-black">File type</th>
                    <th className="p-3 border-r-2 border-black">First bytes (hex)</th>
                    <th className="p-3">As text</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
                  {demo3ForensicsContent.step0.magicNumbersTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                      <td className="p-3 font-heading text-black dark:text-white border-r-2 border-black dark:border-white">
                        <RichText>{row.type}</RichText>
                      </td>
                      <td className="p-3 font-bold text-brutal-pink border-r-2 border-black dark:border-white">
                        <RichText>{row.bytes}</RichText>
                      </td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">
                        <RichText>{row.text}</RichText>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-800 text-xs font-mono font-bold">
            📌 <RichText>{demo3ForensicsContent.step0.routine}</RichText>
          </div>
        </div>
      </Accordion>

      {/* Prep: build sample files */}
      <Accordion
        id="prep-evidence-files"
        badge="PREP"
        title={demo3ForensicsContent.prep.title}
        isOpen={openSections.prep}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, prep: state }))}
      >
        <div className="space-y-3">
          <p className="text-sm leading-relaxed"><RichText>{demo3ForensicsContent.prep.intro}</RichText></p>
          <CodeBlock code={demo3ForensicsContent.prep.script} language="bash" title="Create evidence.jpg & stego.jpg" />
          <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <RichText>{demo3ForensicsContent.prep.verification}</RichText>
          </p>
        </div>
      </Accordion>

      {/* INTERACTIVE FORENSICS COMMAND-ORDER STEPPER */}
      <div id="forensics-stepper" className="my-8 border-4 border-black dark:border-white bg-cream dark:bg-brutal-cardDark shadow-brutal-lg dark:shadow-brutal-dark-lg p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-3 border-black dark:border-white">
          <div className="flex items-center gap-2">
            <div className="p-2 border-2 border-black bg-brutal-purple text-white">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl m-0 text-black dark:text-white">
                Forensics Command-Order Stepper
              </h3>
              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 m-0">
                The standard sequence: cheap and fast tools first, advanced steganography last.
              </p>
            </div>
          </div>

          {/* Stepper Indicator Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {demo3ForensicsContent.steps.map((st, idx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStepperIdx(idx)}
                className={`px-2.5 py-1 text-xs font-mono font-black uppercase border-2 border-black transition-all ${
                  stepperIdx === idx
                    ? 'bg-brutal-yellow text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {idx + 1}. {st.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Step Box */}
        <div className="p-5 border-3 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-brutal">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 border-2 border-black bg-brutal-yellow text-black font-heading font-black text-sm flex items-center justify-center">
                {stepperIdx + 1}
              </span>
              <h4 className="font-heading text-base sm:text-lg m-0 text-black dark:text-white">
                {currentStep.title}
              </h4>
            </div>
            <Sticker color="purple" size="sm" rotate={1}>
              TOOL #{stepperIdx + 1} OF {demo3ForensicsContent.steps.length}
            </Sticker>
          </div>

          <div className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 mb-3">
            Purpose: <span className="text-black dark:text-white font-normal"><RichText>{currentStep.purpose}</RichText></span>
          </div>

          {/* Render all commands in current step */}
          <div className="space-y-4">
            {currentStep.commands.map((cmd, cIdx) => (
              <div key={cIdx} className="border-t-2 border-neutral-200 dark:border-neutral-800 pt-3 first:border-t-0 first:pt-0">
                <div className="text-xs font-heading uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  {cIdx + 1}. {cmd.label}
                </div>
                <CodeBlock code={cmd.code} language="bash" title={cmd.label} />
                <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border-2 border-black text-xs font-mono">
                  <RichText>{cmd.note}</RichText>
                </div>
              </div>
            ))}
          </div>

          {currentStep.flagId && (
            <div className="mt-4">
              <FlagBadge id={currentStep.flagId} label="Discovered Flag" />
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              disabled={stepperIdx === 0}
              onClick={() => setStepperIdx(prev => prev - 1)}
              className="brutal-btn text-xs bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous Tool
            </button>

            <span className="font-mono text-xs text-neutral-500">
              Step {stepperIdx + 1} / {demo3ForensicsContent.steps.length}
            </span>

            <button
              type="button"
              disabled={stepperIdx === demo3ForensicsContent.steps.length - 1}
              onClick={() => setStepperIdx(prev => prev + 1)}
              className="brutal-btn text-xs bg-brutal-yellow text-black hover:bg-brutal-green disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next Tool
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Complete Step-by-Step Accordions */}
      <Accordion
        id="all-steps-detailed"
        badge="STEPS 1-6"
        title="Full Command Walkthrough & Extended Details (Steps 1 to 6)"
        isOpen={openSections.allSteps}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, allSteps: state }))}
      >
        <div className="space-y-6">
          {demo3ForensicsContent.steps.map((st, idx) => (
            <div key={st.id} className="p-4 border-2 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-brutal-sm">
              <h5 className="font-heading text-base mb-2 text-black dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 border border-black bg-brutal-yellow text-black flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <span>{st.title}</span>
              </h5>
              <p className="text-xs sm:text-sm leading-relaxed mb-3 text-neutral-700 dark:text-neutral-300">
                <strong>Purpose: </strong><RichText>{st.purpose}</RichText>
              </p>

              <div className="space-y-4">
                {st.commands.map((cmd, cIdx) => (
                  <div key={cIdx} className="border-t border-neutral-200 dark:border-neutral-800 pt-3 first:border-t-0 first:pt-0">
                    <div className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                      {cIdx + 1}. {cmd.label}:
                    </div>
                    <CodeBlock code={cmd.code} language="bash" title={cmd.label} />
                    <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 border-2 border-black text-xs font-mono">
                      <RichText>{cmd.note}</RichText>
                    </div>
                  </div>
                ))}
              </div>

              {st.flagId && (
                <div className="mt-4">
                  <FlagBadge id={st.flagId} label="Flag" />
                </div>
              )}
            </div>
          ))}

          {/* Other tools to name drop */}
          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-800 text-xs font-mono">
            ℹ️ <RichText>{demo3ForensicsContent.otherTools}</RichText>
          </div>
        </div>
      </Accordion>

      {/* Summary table to put on a slide */}
      <Accordion
        id="summary-table-slide"
        badge="SUMMARY"
        title="Summary table to put on a slide"
        isOpen={openSections.summaryTable}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, summaryTable: state }))}
      >
        <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
          <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
            <thead>
              <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase text-xs">
                <th className="p-3 border-r-2 border-black">Symptom</th>
                <th className="p-3 border-r-2 border-black">Tool</th>
                <th className="p-3">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
              {demo3ForensicsContent.summaryTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                  <td className="p-3 text-neutral-800 dark:text-neutral-200 border-r-2 border-black dark:border-white">
                    <RichText>{row.symptom}</RichText>
                  </td>
                  <td className="p-3 font-bold text-black dark:text-white border-r-2 border-black dark:border-white">
                    <RichText>{row.tool}</RichText>
                  </td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">
                    <RichText>{row.command}</RichText>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      {/* Practice on picoCTF */}
      <Accordion
        id="picoctf-forensics-practice"
        badge="PRACTICE"
        title={demo3ForensicsContent.picoCtfPractice.title}
        isOpen={openSections.picoCtf}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, picoCtf: state }))}
      >
        <p className="text-sm leading-relaxed m-0">
          <RichText>{demo3ForensicsContent.picoCtfPractice.text}</RichText>
        </p>
      </Accordion>

      <PageNav
        prev={{ label: "Demo 2: Web", path: "/demo-2" }}
        next={{ label: "Linux basics & Bandit", path: "/linux-basics" }}
      />
    </div>
  );
}
