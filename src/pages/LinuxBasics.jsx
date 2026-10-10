import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import Sticker from '../components/Sticker';
import { linuxBasicsContent } from '../content/linuxBasics';
import { Terminal, Shield, FolderTree, Key, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function LinuxBasics() {
  const [openSections, setOpenSections] = useState({
    step0: true,
    sixCommands: true,
    helpers: true,
    step1: true,
    step2: true,
    step3: true,
    bandit: true,
  });

  const handleExpandAll = () => {
    setOpenSections({
      step0: true, sixCommands: true, helpers: true,
      step1: true, step2: true, step3: true, bandit: true
    });
  };

  const handleCollapseAll = () => {
    setOpenSections({
      step0: false, sixCommands: false, helpers: false,
      step1: false, step2: false, step3: false, bandit: false
    });
  };

  const tocItems = [
    { id: 'step-0-prompt', label: 'Step 0: Shell Prompt' },
    { id: 'six-commands', label: 'The Six Core Commands' },
    { id: 'helpers-section', label: 'Helpers & Shortcuts' },
    { id: 'step-1-build-lab', label: 'Step 1: Build Lab' },
    { id: 'step-2-walkthrough', label: 'Step 2: Walkthrough' },
    { id: 'step-3-try', label: 'Step 3: Hands-on' },
    { id: 'bandit-wargame', label: 'OverTheWire Bandit' },
  ];

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={linuxBasicsContent.title}
        time={linuxBasicsContent.time}
        accentColor="bg-brutal-orange"
        tagText="SECTION 6: LINUX"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          Goal: {linuxBasicsContent.goal}
        </p>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Step 0: Reading the prompt */}
      <Accordion
        id="step-0-prompt"
        badge="STEP 0"
        title={linuxBasicsContent.step0.title}
        isOpen={openSections.step0}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step0: state }))}
      >
        <div className="space-y-3">
          <div className="p-4 border-2 border-black bg-neutral-900 text-green-400 font-mono text-base">
            krishna@LAPTOP:~$ <span className="animate-pulse">_</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed m-0">
            {linuxBasicsContent.step0.explanation}
          </p>
        </div>
      </Accordion>

      {/* The six commands */}
      <Accordion
        id="six-commands"
        badge="CORE"
        title="The Six Commands (Essential CTF Toolkit)"
        isOpen={openSections.sixCommands}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, sixCommands: state }))}
      >
        <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
          <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
            <thead>
              <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase text-xs">
                <th className="p-3 border-r-2 border-black">Command</th>
                <th className="p-3 border-r-2 border-black">What it does</th>
                <th className="p-3">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
              {linuxBasicsContent.sixCommands.map((row, idx) => (
                <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                  <td className="p-3 font-heading text-black dark:text-white border-r-2 border-black dark:border-white">
                    {row.command}
                  </td>
                  <td className="p-3 font-sans text-neutral-800 dark:text-neutral-200 border-r-2 border-black dark:border-white">
                    {row.does}
                  </td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">
                    {row.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      {/* Helpers worth showing in the same breath */}
      <Accordion
        id="helpers-section"
        badge="HELPERS"
        title="Helpers worth showing in the same breath:"
        isOpen={openSections.helpers}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, helpers: state }))}
      >
        <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
          <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
            <thead>
              <tr className="border-b-3 border-black dark:border-white bg-neutral-100 dark:bg-neutral-800 font-heading uppercase text-xs">
                <th className="p-3 border-r-2 border-black dark:border-white">Helper</th>
                <th className="p-3">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
              {linuxBasicsContent.helpers.map((h, idx) => (
                <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                  <td className="p-3 font-bold text-black dark:text-white border-r-2 border-black dark:border-white">
                    {h.helper}
                  </td>
                  <td className="p-3 font-sans text-neutral-800 dark:text-neutral-200">
                    {h.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      {/* Step 1: Build the practice folder */}
      <Accordion
        id="step-1-build-lab"
        badge="STEP 1"
        title={linuxBasicsContent.step1.title}
        isOpen={openSections.step1}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step1: state }))}
      >
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{linuxBasicsContent.step1.intro}</p>
          <CodeBlock code={linuxBasicsContent.step1.command} language="bash" title="Build ~/ctf-lab" />
          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-800 text-xs font-mono">
            {linuxBasicsContent.step1.note}
          </div>
        </div>
      </Accordion>

      {/* Step 2: Guided walkthrough */}
      <Accordion
        id="step-2-walkthrough"
        badge="STEP 2"
        title={linuxBasicsContent.step2.title}
        isOpen={openSections.step2}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step2: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">{linuxBasicsContent.step2.intro}</p>

          <div className="space-y-1.5 p-4 border-2 border-black dark:border-white bg-neutral-900 font-mono text-xs sm:text-sm text-neutral-100">
            {linuxBasicsContent.step2.walkthrough.map((w, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-neutral-800 last:border-b-0">
                <span className="text-green-400 font-bold">{w.cmd}</span>
                {w.comment && (
                  <span className="text-neutral-400 text-xs sm:text-right"># {w.comment}</span>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-2 border-black bg-emerald-100 dark:bg-emerald-950/60 space-y-2">
            <span className="font-heading text-xs uppercase block text-black dark:text-white">Flags to find:</span>
            <div className="flex flex-wrap gap-2">
              {linuxBasicsContent.step2.flagsFound.map((f, idx) => (
                <code key={idx} className="font-mono font-bold text-xs sm:text-sm bg-white dark:bg-black px-2 py-1 border border-black text-emerald-800 dark:text-emerald-300">
                  {f}
                </code>
              ))}
            </div>
            <p className="text-xs font-mono font-bold pt-1 text-black dark:text-white m-0">
              📌 {linuxBasicsContent.step2.pointToLand}
            </p>
          </div>
        </div>
      </Accordion>

      {/* Step 3: Let them try */}
      <Accordion
        id="step-3-try"
        badge="STEP 3"
        title={linuxBasicsContent.step3.title}
        isOpen={openSections.step3}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step3: state }))}
      >
        <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-800 text-sm leading-relaxed">
          {linuxBasicsContent.step3.text}
        </div>
      </Accordion>

      {/* OverTheWire Bandit */}
      <Accordion
        id="bandit-wargame"
        badge="WARGAME"
        title={linuxBasicsContent.bandit.title}
        isOpen={openSections.bandit}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, bandit: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">{linuxBasicsContent.bandit.intro}</p>

          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
            {linuxBasicsContent.bandit.steps.map((st, idx) => (
              <li key={idx} className="whitespace-pre-line">{st}</li>
            ))}
          </ol>

          <div className="p-3 border-2 border-black bg-yellow-100 dark:bg-yellow-950/40 text-xs font-mono font-bold">
            🎯 {linuxBasicsContent.bandit.homeworkNote}
          </div>
        </div>
      </Accordion>

      <PageNav
        prev={{ label: "Break & Demo 3: Forensics", path: "/break-and-demo-3" }}
        next={{ label: "Mini CTF & Cheat Sheet", path: "/mini-ctf" }}
      />
    </div>
  );
}
