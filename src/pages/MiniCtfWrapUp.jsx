import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import FlagChecker from '../components/FlagChecker';
import Sticker from '../components/Sticker';
import { miniCtfContent } from '../content/miniCtf';
import { Trophy, HelpCircle, FileText, Search, Wrench, Shield, Compass } from 'lucide-react';

export default function MiniCtfWrapUp() {
  const [cheatFilter, setCheatFilter] = useState('');
  const [troubleFilter, setTroubleFilter] = useState('');
  const [openSections, setOpenSections] = useState({
    flagChecker: true,
    miniCtfRules: true,
    wrapUp: true,
    cheatSheet: true,
    troubleshooting: true,
    sources: true,
  });

  const handleExpandAll = () => {
    setOpenSections({
      flagChecker: true, miniCtfRules: true, wrapUp: true,
      cheatSheet: true, troubleshooting: true, sources: true
    });
  };

  const handleCollapseAll = () => {
    setOpenSections({
      flagChecker: false, miniCtfRules: false, wrapUp: false,
      cheatSheet: false, troubleshooting: false, sources: false
    });
  };

  const tocItems = [
    { id: 'flag-checker-tool', label: 'Interactive Flag Checker' },
    { id: 'mini-ctf-rules', label: 'Mini CTF (2:30 to 3:15)' },
    { id: 'wrap-up-section', label: 'Wrap-up & Write-ups' },
    { id: 'cheat-sheet-section', label: 'Cheat Sheet Table' },
    { id: 'troubleshooting-section', label: 'Workshop Troubleshooting' },
    { id: 'sources-section', label: 'Sources & Resources' },
  ];

  const filteredCheatSheet = miniCtfContent.cheatSheet.filter(item =>
    item.symptom.toLowerCase().includes(cheatFilter.toLowerCase()) ||
    item.firstMove.toLowerCase().includes(cheatFilter.toLowerCase())
  );

  const filteredTroubleshooting = miniCtfContent.troubleshooting.filter(item =>
    item.problem.toLowerCase().includes(troubleFilter.toLowerCase()) ||
    item.fix.toLowerCase().includes(troubleFilter.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={miniCtfContent.title}
        time={miniCtfContent.time}
        accentColor="bg-brutal-yellow"
        tagText="SECTION 7: FINALE"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          Team competition, write-up mastery, fast diagnostic cheat sheet, and workshop recovery fixes.
        </p>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Flag Checker Tool */}
      <div id="flag-checker-tool">
        <FlagChecker />
      </div>

      {/* Mini CTF (2:30 to 3:15) */}
      <Accordion
        id="mini-ctf-rules"
        badge="COMPETITION"
        title={miniCtfContent.miniCtf.title}
        isOpen={openSections.miniCtfRules}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, miniCtfRules: state }))}
      >
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm font-sans text-neutral-800 dark:text-neutral-200">
            {miniCtfContent.miniCtf.steps.map((st) => (
              <li key={st.num} className="leading-relaxed">
                {st.text}
              </li>
            ))}
          </ol>

          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-800 text-xs sm:text-sm font-mono">
            🎁 <strong>Guaranteed Solvable Fallback: </strong>
            {miniCtfContent.miniCtf.fallbackNote}
          </div>
        </div>
      </Accordion>

      {/* Wrap-up (3:15 to 3:30) */}
      <Accordion
        id="wrap-up-section"
        badge="WRAP-UP"
        title={miniCtfContent.wrapUp.title}
        isOpen={openSections.wrapUp}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, wrapUp: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            {miniCtfContent.wrapUp.steps[0].text}
          </p>

          <div>
            <h5 className="font-heading text-sm uppercase mb-1">Write-up Markdown Template:</h5>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
              A write-up is a short note explaining how you solved a challenge. Writing one is how the learning sticks.
            </p>
            <CodeBlock
              code={miniCtfContent.wrapUp.steps[1].template}
              language="markdown"
              title="Official Write-up Template"
            />
          </div>

          <div className="p-4 border-2 border-black bg-white dark:bg-neutral-900 text-xs sm:text-sm">
            <h5 className="font-heading text-xs uppercase mb-1">Next steps for participants:</h5>
            <p className="m-0 text-neutral-700 dark:text-neutral-300">
              {miniCtfContent.wrapUp.steps[2].text}
            </p>
          </div>

          <div className="p-3 border-2 border-black bg-red-100 dark:bg-red-950/40 text-xs font-mono font-bold text-red-700 dark:text-red-300">
            ⚖️ {miniCtfContent.wrapUp.steps[3].text}
          </div>
        </div>
      </Accordion>

      {/* Cheat sheet: if you see this, try that (with live filter input!) */}
      <Accordion
        id="cheat-sheet-section"
        badge="CHEAT SHEET"
        title="Cheat sheet: if you see this, try that (Live Searchable)"
        isOpen={openSections.cheatSheet}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, cheatSheet: state }))}
      >
        <div className="space-y-4">
          {/* Live Search Input for Cheat Sheet */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
              <input
                type="text"
                value={cheatFilter}
                onChange={(e) => setCheatFilter(e.target.value)}
                placeholder="Filter cheat sheet (e.g. =, hex, synt, port, log, image)..."
                className="brutal-input w-full pl-9 text-xs sm:text-sm"
              />
            </div>
            {cheatFilter && (
              <button
                type="button"
                onClick={() => setCheatFilter('')}
                className="text-xs font-mono font-bold underline px-2"
              >
                Clear
              </button>
            )}
          </div>

          <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
              <thead>
                <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase text-xs">
                  <th className="p-3 border-r-2 border-black">You see</th>
                  <th className="p-3">First move</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
                {filteredCheatSheet.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-4 text-center text-neutral-500 font-mono">
                      No patterns matching &quot;{cheatFilter}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredCheatSheet.map((row, idx) => (
                    <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                      <td className="p-3 font-bold text-black dark:text-white border-r-2 border-black dark:border-white">
                        {row.symptom}
                      </td>
                      <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">
                        {row.firstMove}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Accordion>

      {/* Troubleshooting during the workshop */}
      <Accordion
        id="troubleshooting-section"
        badge="FIXES"
        title="Troubleshooting during the workshop (Live Searchable)"
        isOpen={openSections.troubleshooting}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, troubleshooting: state }))}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
              <input
                type="text"
                value={troubleFilter}
                onChange={(e) => setTroubleFilter(e.target.value)}
                placeholder="Filter workshop troubleshooting (e.g. denied, 8765, garbage, flag)..."
                className="brutal-input w-full pl-9 text-xs sm:text-sm"
              />
            </div>
            {troubleFilter && (
              <button
                type="button"
                onClick={() => setTroubleFilter('')}
                className="text-xs font-mono font-bold underline px-2"
              >
                Clear
              </button>
            )}
          </div>

          <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
              <thead>
                <tr className="border-b-3 border-black dark:border-white bg-brutal-pink text-black font-heading uppercase text-xs">
                  <th className="p-3 border-r-2 border-black">Problem</th>
                  <th className="p-3">Quick fix</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-mono">
                {filteredTroubleshooting.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-4 text-center text-neutral-500 font-mono">
                      No matching problems found.
                    </td>
                  </tr>
                ) : (
                  filteredTroubleshooting.map((row, idx) => (
                    <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                      <td className="p-3 font-bold text-red-600 dark:text-red-400 border-r-2 border-black dark:border-white">
                        {row.problem}
                      </td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200 font-sans">
                        {row.fix}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Accordion>

      {/* Sources and further reading */}
      <Accordion
        id="sources-section"
        badge="RESOURCES"
        title={miniCtfContent.sources.title}
        isOpen={openSections.sources}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, sources: state }))}
      >
        <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-900 text-sm leading-relaxed">
          {miniCtfContent.sources.text}
        </div>
      </Accordion>

      <PageNav
        prev={{ label: "Linux basics & Bandit", path: "/linux-basics" }}
        next={{ label: "Home Overview", path: "/" }}
      />
    </div>
  );
}
