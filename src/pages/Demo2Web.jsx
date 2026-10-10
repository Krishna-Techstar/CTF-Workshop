import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import Sticker from '../components/Sticker';
import RichText from '../components/RichText';
import FlagBadge from '../components/FlagBadge';
import InvestigationWorksheet from '../components/InvestigationWorksheet';
import { demo2WebContent } from '../content/demo2Web';

export default function Demo2Web() {
  const [activeDevTab, setActiveDevTab] = useState('Elements');
  const [openSections, setOpenSections] = useState({
    step0: true,
    step1: true,
    step2: true,
    step3: true,
    step4: true,
    step5: true,
    bonusCurl: true,
    boardFlow: true,
    picoCtf: true,
    tryProcess: true,
  });

  const handleExpandAll = () => {
    setOpenSections({
      step0: true, step1: true, step2: true, step3: true,
      step4: true, step5: true, bonusCurl: true, boardFlow: true, picoCtf: true
    });
  };

  const handleCollapseAll = () => {
    setOpenSections({
      step0: false, step1: false, step2: false, step3: false,
      step4: false, step5: false, bonusCurl: false, boardFlow: false, picoCtf: false
    });
  };

  const tocItems = [
    { id: 'step-0-web-how', label: 'Step 0: How Web Works' },
    { id: 'step-1-build-site', label: 'Step 1: Build Demo Site' },
    { id: 'step-2-view-source', label: 'Step 2: View Source' },
    { id: 'step-3-devtools-tour', label: 'Step 3: DevTools Tour' },
    { id: 'step-4-cookies', label: 'Step 4: Cookie Admin' },
    { id: 'step-5-robots', label: 'Step 5: robots.txt' },
    { id: 'bonus-curl', label: 'Bonus: curl Terminal' },
    { id: 'board-flow-web', label: 'Board Solving Flow' },
    { id: 'picoctf-web-practice', label: 'Practice on picoCTF' },
  ];

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={demo2WebContent.title}
        time={demo2WebContent.time}
        accentColor="bg-brutal-green"
        tagText="DEMO 2: WEB"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          Goal: <RichText>{demo2WebContent.goal}</RichText>
        </p>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Step 0: How a website reaches you */}
      <Accordion
        id="step-0-web-how"
        badge="STEP 0"
        title={demo2WebContent.step0.title}
        isOpen={openSections.step0}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step0: state }))}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {demo2WebContent.step0.flow.map((item, idx) => (
              <div key={idx} className="p-3 border-2 border-black dark:border-white bg-white dark:bg-neutral-900 font-mono text-xs sm:text-sm">
                <RichText>{item}</RichText>
              </div>
            ))}
          </div>

          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-800 text-xs sm:text-sm leading-relaxed">
            <span className="font-heading uppercase text-xs text-brutal-pinkText dark:text-brutal-pink block mb-1">COOKIE ANATOMY:</span>
            <RichText>{demo2WebContent.step0.cookieExplanation}</RichText>
          </div>
        </div>
      </Accordion>

      {/* Step 1: Build the demo website */}
      <Accordion
        id="step-1-build-site"
        badge="STEP 1"
        title={demo2WebContent.step1.title}
        isOpen={openSections.step1}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step1: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed"><RichText>{demo2WebContent.step1.intro}</RichText></p>
          <CodeBlock
            code={demo2WebContent.step1.script}
            language="bash"
            title="Create ~/webdemo & Challenge Files"
          />

          <div>
            <h5 className="font-heading text-sm uppercase mb-1">Start a tiny web server in that folder:</h5>
            <CodeBlock
              code={demo2WebContent.step1.runServerCommand}
              language="bash"
              title="Python HTTP Server"
            />
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <RichText>{demo2WebContent.step1.serverInstructions}</RichText>
            </p>
          </div>

          {/* Table: What is hidden where */}
          <div>
            <h5 className="font-heading text-sm uppercase mb-2">What is hidden where:</h5>
            <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase text-xs">
                    <th className="p-3 border-r-2 border-black">Flag</th>
                    <th className="p-3 border-r-2 border-black">Where it hides</th>
                    <th className="p-3">Technique</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
                  {demo2WebContent.step1.hiddenFlagsTable.map((f, idx) => (
                    <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                      <td className="p-3 font-bold border-r-2 border-black dark:border-white">
                        <RichText>{f.flagPlaceholder}</RichText>
                      </td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200 border-r-2 border-black dark:border-white">
                        <RichText>{f.where}</RichText>
                      </td>
                      <td className="p-3 font-bold text-black dark:text-white">
                        <RichText>{f.technique}</RichText>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Accordion>

      {/* Step 2: View source */}
      <Accordion
        id="step-2-view-source"
        badge="STEP 2"
        title={demo2WebContent.step2.title}
        isOpen={openSections.step2}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step2: state }))}
      >
        <div className="space-y-4">
          <ol className="list-decimal list-inside p-4 border-2 border-black dark:border-white bg-white dark:bg-neutral-900 space-y-2 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
            {demo2WebContent.step2.steps.map((st, idx) => (
              <li key={idx} className="leading-relaxed">
                <RichText>{st}</RichText>
              </li>
            ))}
          </ol>

          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-800 text-xs sm:text-sm leading-relaxed">
            <span className="font-heading uppercase text-xs text-brutal-pinkText dark:text-brutal-pink block mb-1">CORE LESSON:</span>
            <RichText>{demo2WebContent.step2.lesson}</RichText>
          </div>

          <FlagBadge id="web-viewsource" label="Demo 2 Flag #1" />
        </div>
      </Accordion>

      {/* Step 3: DevTools tour, tab by tab */}
      <Accordion
        id="step-3-devtools-tour"
        badge="STEP 3"
        title={demo2WebContent.step3.title}
        isOpen={openSections.step3}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step3: state }))}
      >
        <div className="space-y-5">
          <p className="text-sm leading-relaxed"><RichText>{demo2WebContent.step3.intro}</RichText></p>

          {/* Interactive DevTools Cheat Selector Buttons */}
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border-3 border-black dark:border-white">
            <div className="text-xs font-mono font-bold uppercase mb-2 text-neutral-600 dark:text-neutral-300">
              Interactive DevTools Tab Navigator (Click or press Enter on a tab to highlight):
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="DevTools Tab Selector">
              {demo2WebContent.step3.devToolsTabs.map((tab) => (
                <button
                  key={tab.name}
                  type="button"
                  aria-pressed={activeDevTab === tab.name}
                  onClick={() => setActiveDevTab(tab.name)}
                  className={`px-3 py-1.5 font-heading text-xs uppercase tracking-wide border-2 border-black dark:border-white transition-all ${
                    activeDevTab === tab.name
                      ? 'bg-brutal-yellow text-black shadow-brutal-sm -translate-y-0.5'
                      : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* DevTools Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demo2WebContent.step3.devToolsTabs.map((tab) => {
              const isSelected = activeDevTab === tab.name;
              return (
                <div
                  key={tab.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setActiveDevTab(tab.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveDevTab(tab.name);
                    }
                  }}
                  className={`p-4 border-3 border-black dark:border-white transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-yellow-50 dark:bg-yellow-950/40 shadow-brutal ring-4 ring-brutal-yellow scale-[1.01]'
                      : 'bg-white dark:bg-neutral-900 shadow-brutal-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading text-base text-black dark:text-white m-0">
                      {tab.name} {tab.subname && <span className="text-xs font-mono text-neutral-500 font-normal">({tab.subname})</span>}
                    </h4>
                    {isSelected && (
                      <Sticker color="yellow" size="sm" rotate={1}>SELECTED</Sticker>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 mb-2">
                    What it shows: <span className="text-black dark:text-white font-normal"><RichText>{tab.shows}</RichText></span>
                  </div>
                  <div className="text-xs sm:text-sm font-sans text-neutral-800 dark:text-neutral-200 bg-white dark:bg-black p-2.5 border border-black dark:border-white/40">
                    <strong>In Demo: </strong><RichText>{tab.whatToDo}</RichText>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Things to teach about Network tab */}
          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-800 text-xs sm:text-sm">
            <h5 className="font-heading text-xs uppercase tracking-wider mb-2 text-black dark:text-white">
              Things to teach about the Network tab, because they matter in real challenges:
            </h5>
            <ul className="list-disc list-inside space-y-1 font-mono text-neutral-800 dark:text-neutral-200">
              {demo2WebContent.step3.networkKeyPoints.map((pt, idx) => (
                <li key={idx}><RichText>{pt}</RichText></li>
              ))}
            </ul>
          </div>
        </div>
      </Accordion>

      {/* Step 4: Cookies, change the value and win */}
      <Accordion
        id="step-4-cookies"
        badge="STEP 4"
        title={demo2WebContent.step4.title}
        isOpen={openSections.step4}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step4: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed"><RichText>{demo2WebContent.step4.intro}</RichText></p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Method 1 */}
            <div className="p-4 border-2 border-black dark:border-white bg-white dark:bg-neutral-900">
              <h5 className="font-heading text-sm uppercase mb-2 text-black dark:text-white">
                {demo2WebContent.step4.method1.name}
              </h5>
              <ol className="list-decimal list-inside space-y-1 text-xs font-mono text-neutral-800 dark:text-neutral-200">
                {demo2WebContent.step4.method1.steps.map((st, idx) => (
                  <li key={idx}><RichText>{st}</RichText></li>
                ))}
              </ol>
            </div>

            {/* Method 2 */}
            <div className="p-4 border-2 border-black dark:border-white bg-white dark:bg-neutral-900">
              <h5 className="font-heading text-sm uppercase mb-2 text-black dark:text-white">
                {demo2WebContent.step4.method2.name}
              </h5>
              <CodeBlock code={demo2WebContent.step4.method2.code} language="javascript" title="Console Cookie Snippet" />
            </div>
          </div>

          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-800 text-xs font-mono">
            <RichText>{demo2WebContent.step4.realWorldNote}</RichText>
          </div>

          <FlagBadge id={demo2WebContent.step4.flagId} label="Demo 2 Flag #2" />
        </div>
      </Accordion>

      {/* Step 5: robots.txt hunt */}
      <Accordion
        id="step-5-robots"
        badge="STEP 5"
        title={demo2WebContent.step5.title}
        isOpen={openSections.step5}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step5: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed"><RichText>{demo2WebContent.step5.intro}</RichText></p>

          <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
            {demo2WebContent.step5.steps.map((st, idx) => (
              <li key={idx}><RichText>{st}</RichText></li>
            ))}
          </ol>

          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-800 text-xs font-mono">
            💡 <RichText>{demo2WebContent.step5.commonPathsToTry}</RichText>
          </div>

          <FlagBadge id={demo2WebContent.step5.flagId} label="Demo 2 Flag #3" />
        </div>
      </Accordion>

      {/* Bonus: terminal with curl */}
      <Accordion
        id="bonus-curl"
        badge="BONUS"
        title={demo2WebContent.bonusCurl.title}
        isOpen={openSections.bonusCurl}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, bonusCurl: state }))}
      >
        <div className="space-y-2">
          <p className="text-sm leading-relaxed"><RichText>{demo2WebContent.bonusCurl.intro}</RichText></p>
          <CodeBlock code={demo2WebContent.bonusCurl.command} language="bash" title="Terminal cURL Commands" />
        </div>
      </Accordion>

      {/* Solving flow to write on the board */}
      <Accordion
        id="board-flow-web"
        badge="BOARD"
        title={demo2WebContent.boardFlow.title}
        isOpen={openSections.boardFlow}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, boardFlow: state }))}
      >
        <div className="p-4 sm:p-5 border-3 border-black bg-neutral-900 text-neutral-100 font-mono text-xs sm:text-sm space-y-2">
          {demo2WebContent.boardFlow.steps.map((st, idx) => (
            <div key={idx} className="pb-1 border-b border-neutral-800 last:border-b-0">
              <RichText>{st}</RichText>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Practice on picoCTF */}
      <Accordion
        id="picoctf-web-practice"
        badge="PRACTICE"
        title={demo2WebContent.picoCtfPractice.title}
        isOpen={openSections.picoCtf}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, picoCtf: state }))}
      >
        <p className="text-sm leading-relaxed m-0">
          <RichText>{demo2WebContent.picoCtfPractice.text}</RichText>
        </p>
      </Accordion>

      {/* Try the Process Worksheet */}
      <Accordion
        id="demo2-try-the-process"
        badge="PROCESS"
        title="Try the process"
        isOpen={openSections.tryProcess}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, tryProcess: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base font-sans font-medium text-black dark:text-neutral-100 leading-relaxed">
            Before you use any tool, answer the five questions.
          </p>
          <InvestigationWorksheet storageId="demo2" compact={true} />
        </div>
      </Accordion>

      <PageNav
        prev={{ label: "Demo 1: Crypto", path: "/demo-1" }}
        next={{ label: "Break & Demo 3: Forensics", path: "/break-and-demo-3" }}
      />
    </div>
  );
}
