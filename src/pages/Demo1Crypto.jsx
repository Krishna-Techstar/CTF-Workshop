import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import Playground from '../components/Playground';
import RichText from '../components/RichText';
import FlagBadge from '../components/FlagBadge';
import { demo1CryptoContent } from '../content/demo1Crypto';

export default function Demo1Crypto() {
  const [openSections, setOpenSections] = useState({
    step0: true,
    part1: true,
    part2: true,
    part3: true,
    part4: true,
    shortcut: true,
    boardFlow: true,
    picoCtf: true,
  });

  const handleExpandAll = () => {
    setOpenSections({
      step0: true, part1: true, part2: true, part3: true,
      part4: true, shortcut: true, boardFlow: true, picoCtf: true
    });
  };

  const handleCollapseAll = () => {
    setOpenSections({
      step0: false, part1: false, part2: false, part3: false,
      part4: false, shortcut: false, boardFlow: false, picoCtf: false
    });
  };

  const tocItems = [
    { id: 'playground-section', label: 'CyberChef Playground' },
    { id: 'step-0-concepts', label: 'Step 0: Concepts' },
    { id: 'part-1-base64', label: 'Part 1: Base64' },
    { id: 'part-2-rot13', label: 'Part 2: ROT13' },
    { id: 'part-3-hex', label: 'Part 3: Hex' },
    { id: 'part-4-layered', label: 'Part 4: Layered' },
    { id: 'shortcut-magic', label: 'Magic Operation' },
    { id: 'board-solving-flow', label: 'Solving Flow' },
    { id: 'picoctf-crypto-practice', label: 'Practice on picoCTF' },
  ];

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={demo1CryptoContent.title}
        time={demo1CryptoContent.time}
        accentColor="bg-brutal-pink"
        tagText="DEMO 1: CRYPTO"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          Goal: <RichText>{demo1CryptoContent.goal}</RichText>
        </p>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Built-in Interactive Playground */}
      <div id="playground-section">
        <Playground />
      </div>

      {/* Step 0: Encoding, encryption and hashing */}
      <Accordion
        id="step-0-concepts"
        badge="STEP 0"
        title={demo1CryptoContent.step0.title}
        isOpen={openSections.step0}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, step0: state }))}
      >
        <div className="space-y-4">
          <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
              <thead>
                <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase">
                  <th className="p-3 border-r-2 border-black">Idea</th>
                  <th className="p-3 border-r-2 border-black">Needs a secret key?</th>
                  <th className="p-3 border-r-2 border-black">Can you reverse it?</th>
                  <th className="p-3">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-sans">
                {demo1CryptoContent.step0.table.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                    <td className="p-3 font-heading text-black dark:text-white border-r-2 border-black dark:border-white">
                      <RichText>{row.idea}</RichText>
                    </td>
                    <td className="p-3 font-mono font-bold border-r-2 border-black dark:border-white">
                      <RichText>{row.needsKey}</RichText>
                    </td>
                    <td className="p-3 font-mono border-r-2 border-black dark:border-white">
                      <RichText>{row.reversible}</RichText>
                    </td>
                    <td className="p-3 font-mono text-neutral-700 dark:text-neutral-300">
                      <RichText>{row.examples}</RichText>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-3 border-black bg-cream dark:bg-neutral-800 text-black dark:text-white shadow-brutal-sm">
            <span className="font-heading text-sm text-brutal-pinkText dark:text-brutal-pink block mb-1">KEY MESSAGE:</span>
            <p className="text-sm sm:text-base m-0 font-medium">
              <RichText>{demo1CryptoContent.step0.keyMessage}</RichText>
            </p>
          </div>
        </div>
      </Accordion>

      {/* Part 1: Base64 */}
      <Accordion
        id="part-1-base64"
        badge="PART 1"
        title={demo1CryptoContent.part1.title}
        isOpen={openSections.part1}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, part1: state }))}
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-heading text-base mb-1">How it works:</h4>
            <p className="text-sm leading-relaxed"><RichText>{demo1CryptoContent.part1.howItWorks}</RichText></p>
          </div>

          {/* Worked example table */}
          <div>
            <h5 className="font-heading text-sm uppercase mb-2">Worked example with the word &quot;Man&quot;:</h5>
            <div className="overflow-x-auto border-2 border-black dark:border-white shadow-brutal-sm">
              <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-neutral-100 dark:bg-neutral-800 font-heading">
                    <th className="p-2.5 border-r border-black">Step</th>
                    <th className="p-2.5">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-black font-mono">
                  {demo1CryptoContent.part1.workedExample.steps.map((s, idx) => (
                    <tr key={idx} className={idx === demo1CryptoContent.part1.workedExample.steps.length - 1 ? 'bg-brutal-yellow/30 font-bold' : ''}>
                      <td className="p-2.5 border-r border-black text-neutral-800 dark:text-neutral-200"><RichText>{s.step}</RichText></td>
                      <td className="p-2.5 font-bold text-black dark:text-white"><RichText>{s.result}</RichText></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-900 font-mono text-xs">
            <strong>How to recognise Base64: </strong>
            <RichText>{demo1CryptoContent.part1.recognition}</RichText>
          </div>

          {/* Decode in CyberChef */}
          <div>
            <h5 className="font-heading text-sm uppercase mb-2">Decode in CyberChef:</h5>
            <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
              {demo1CryptoContent.part1.cyberChefSteps.map((st, idx) => (
                <li key={idx}><RichText>{st}</RichText></li>
              ))}
            </ol>
          </div>

          {/* Decode in terminal */}
          <div>
            <h5 className="font-heading text-sm uppercase mb-1">Decode in the terminal (use -n so echo does not add a hidden newline):</h5>
            <CodeBlock code={demo1CryptoContent.part1.terminalCommand} language="bash" title="Terminal Base64" />
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <RichText>{demo1CryptoContent.part1.terminalExplanation}</RichText>
            </p>
          </div>

          {/* Python version */}
          <div>
            <h5 className="font-heading text-sm uppercase mb-1">Python version:</h5>
            <CodeBlock code={demo1CryptoContent.part1.pythonVersion} language="python" title="Python 3 Base64" />
          </div>

          <FlagBadge id={demo1CryptoContent.part1.flagId} label="Demo 1 Flag #1" />
        </div>
      </Accordion>

      {/* Part 2: ROT13 */}
      <Accordion
        id="part-2-rot13"
        badge="PART 2"
        title={demo1CryptoContent.part2.title}
        isOpen={openSections.part2}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, part2: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line"><RichText>{demo1CryptoContent.part2.howItWorks}</RichText></p>

          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-900 font-mono text-xs">
            <strong>How to recognise it: </strong>
            <RichText>{demo1CryptoContent.part2.recognition}</RichText>
          </div>

          <div>
            <h5 className="font-heading text-sm uppercase mb-2">Decode in CyberChef:</h5>
            <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
              {demo1CryptoContent.part2.cyberChefSteps.map((st, idx) => (
                <li key={idx}><RichText>{st}</RichText></li>
              ))}
            </ol>
          </div>

          <div>
            <h5 className="font-heading text-sm uppercase mb-1">Terminal version:</h5>
            <CodeBlock code={demo1CryptoContent.part2.terminalCommand} language="bash" title="Tr Command ROT13" />
          </div>

          <FlagBadge id={demo1CryptoContent.part2.flagId} label="Demo 1 Flag #2" />
        </div>
      </Accordion>

      {/* Part 3: Hexadecimal */}
      <Accordion
        id="part-3-hex"
        badge="PART 3"
        title={demo1CryptoContent.part3.title}
        isOpen={openSections.part3}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, part3: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed"><RichText>{demo1CryptoContent.part3.howItWorks}</RichText></p>

          <div className="p-3 border-2 border-black bg-cream dark:bg-neutral-900 font-mono text-xs">
            <strong>How to recognise it: </strong>
            <RichText>{demo1CryptoContent.part3.recognition}</RichText>
          </div>

          <div>
            <h5 className="font-heading text-sm uppercase mb-2">Decode in CyberChef:</h5>
            <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
              {demo1CryptoContent.part3.cyberChefSteps.map((st, idx) => (
                <li key={idx}><RichText>{st}</RichText></li>
              ))}
            </ol>
          </div>

          <div>
            <h5 className="font-heading text-sm uppercase mb-1">Terminal version:</h5>
            <CodeBlock code={demo1CryptoContent.part3.terminalCommand} language="bash" title="xxd Hex Decode & Encode" />
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              <RichText>{demo1CryptoContent.part3.terminalExplanation}</RichText>
            </p>
          </div>

          <FlagBadge id={demo1CryptoContent.part3.flagId} label="Demo 1 Flag #3" />
        </div>
      </Accordion>

      {/* Part 4: Layered challenge */}
      <Accordion
        id="part-4-layered"
        badge="PART 4"
        title={demo1CryptoContent.part4.title}
        isOpen={openSections.part4}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, part4: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed"><RichText>{demo1CryptoContent.part4.intro}</RichText></p>

          <div className="p-3 border-2 border-black bg-neutral-900 text-green-400 font-mono text-xs sm:text-sm break-all">
            {demo1CryptoContent.part4.challengeString}
          </div>

          <div className="space-y-2">
            {demo1CryptoContent.part4.layers.map((lyr) => (
              <div key={lyr.step} className="p-3 border-2 border-black dark:border-white bg-white dark:bg-neutral-900 flex items-start gap-3">
                <span className="w-6 h-6 border border-black bg-brutal-pink text-black flex items-center justify-center font-bold text-xs shrink-0">
                  {lyr.step}
                </span>
                <div>
                  <div className="font-heading text-xs uppercase text-black dark:text-white"><RichText>{lyr.action}</RichText></div>
                  <div className="font-mono text-xs text-neutral-700 dark:text-neutral-300"><RichText>{lyr.detail}</RichText></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-800 text-xs font-mono">
            <RichText>{demo1CryptoContent.part4.cyberChefNote}</RichText>
          </div>

          <FlagBadge id={demo1CryptoContent.part4.flagId} label="Demo 1 Flag #4" />
        </div>
      </Accordion>

      {/* Shortcut: the Magic operation */}
      <Accordion
        id="shortcut-magic"
        badge="SHORTCUT"
        title={demo1CryptoContent.shortcut.title}
        isOpen={openSections.shortcut}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, shortcut: state }))}
      >
        <div className="p-4 border-2 border-black bg-yellow-50 dark:bg-neutral-900 text-sm leading-relaxed">
          <RichText>{demo1CryptoContent.shortcut.text}</RichText>
        </div>
      </Accordion>

      {/* Solving flow to write on the board */}
      <Accordion
        id="board-solving-flow"
        badge="BOARD"
        title={demo1CryptoContent.boardFlow.title}
        isOpen={openSections.boardFlow}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, boardFlow: state }))}
      >
        <div className="p-4 sm:p-5 border-3 border-black bg-neutral-900 text-neutral-100 font-mono text-xs sm:text-sm space-y-2">
          {demo1CryptoContent.boardFlow.steps.map((st, idx) => (
            <div key={idx} className="pb-1 border-b border-neutral-800 last:border-b-0">
              <RichText>{st}</RichText>
            </div>
          ))}
        </div>
      </Accordion>

      {/* Practice on picoCTF */}
      <Accordion
        id="picoctf-crypto-practice"
        badge="PRACTICE"
        title={demo1CryptoContent.picoCtfPractice.title}
        isOpen={openSections.picoCtf}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, picoCtf: state }))}
      >
        <p className="text-sm leading-relaxed m-0">
          <RichText>{demo1CryptoContent.picoCtfPractice.text}</RichText>
        </p>
      </Accordion>

      <PageNav
        prev={{ label: "Setup (picoCTF, CyberChef, WSL)", path: "/setup" }}
        next={{ label: "Demo 2: Web", path: "/demo-2" }}
      />
    </div>
  );
}
