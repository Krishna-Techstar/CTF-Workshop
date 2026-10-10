import React, { useState, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import CodeBlock from '../components/CodeBlock';
import StepCard from '../components/StepCard';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import RichText from '../components/RichText';
import { setupContent } from '../content/setup';
import { Search } from 'lucide-react';

export default function Setup() {
  const [activeOsTab, setActiveOsTab] = useState('windows'); // 'windows' | 'mac' | 'linux'
  const [troubleFilter, setTroubleFilter] = useState('');
  const [openSections, setOpenSections] = useState({
    partA: true,
    partB: true,
    partC: true,
    troubleshooting: true,
  });

  const tabListRef = useRef(null);
  const osTabs = ['windows', 'mac', 'linux'];

  const handleTabKeyDown = (e, currentTab) => {
    const currentIndex = osTabs.indexOf(currentTab);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % osTabs.length;
      setActiveOsTab(osTabs[nextIndex]);
      const nextBtn = tabListRef.current?.querySelectorAll('[role="tab"]')[nextIndex];
      nextBtn?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + osTabs.length) % osTabs.length;
      setActiveOsTab(osTabs[prevIndex]);
      const prevBtn = tabListRef.current?.querySelectorAll('[role="tab"]')[prevIndex];
      prevBtn?.focus();
    }
  };

  const handleExpandAll = () => {
    setOpenSections({ partA: true, partB: true, partC: true, troubleshooting: true });
  };

  const handleCollapseAll = () => {
    setOpenSections({ partA: false, partB: false, partC: false, troubleshooting: false });
  };

  const tocItems = [
    { id: 'part-a-picoctf', label: 'Part A: picoCTF' },
    { id: 'part-b-cyberchef', label: 'Part B: CyberChef' },
    { id: 'part-c-terminal', label: 'Part C: Linux Terminal' },
    { id: 'troubleshooting-section', label: 'Troubleshooting Table' },
  ];

  const filteredTroubleshooting = setupContent.troubleshooting.filter(item =>
    item.problem.toLowerCase().includes(troubleFilter.toLowerCase()) ||
    item.fix.toLowerCase().includes(troubleFilter.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={setupContent.title}
        time={setupContent.time}
        accentColor="bg-brutal-blue"
        tagText="SECTION 2"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          <RichText>{setupContent.overview}</RichText>
        </p>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Part A: picoCTF account */}
      <Accordion
        id="part-a-picoctf"
        badge="PART A"
        title={setupContent.partA.title}
        isOpen={openSections.partA}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, partA: state }))}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setupContent.partA.steps.map((st) => (
              <StepCard key={st.num} number={st.num} title={`Step ${st.num}`} accentColor="blue">
                <RichText>{st.text}</RichText>
              </StepCard>
            ))}
          </div>

          <div className="p-4 border-3 border-black bg-cream dark:bg-neutral-900 shadow-brutal-sm text-sm font-mono">
            <span className="font-bold text-brutal-pinkText dark:text-brutal-pink">⚡ Webshell Fallback: </span>
            <RichText>{setupContent.partA.note}</RichText>
          </div>
        </div>
      </Accordion>

      {/* Part B: CyberChef */}
      <Accordion
        id="part-b-cyberchef"
        badge="PART B"
        title={setupContent.partB.title}
        isOpen={openSections.partB}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, partB: state }))}
      >
        <div className="space-y-4">
          <p className="text-sm sm:text-base leading-relaxed">
            <RichText>{setupContent.partB.intro}</RichText>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {setupContent.partB.steps.map((st) => (
              <div key={st.num} className="p-4 border-2 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-brutal-sm">
                <div className="font-heading text-sm mb-2 text-black dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 border border-black bg-brutal-yellow text-black flex items-center justify-center font-bold text-xs">
                    {st.num}
                  </span>
                  <span>Step {st.num}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 m-0">
                  <RichText>{st.text}</RichText>
                </p>
                {st.subitems && (
                  <ul className="mt-2 list-disc list-inside text-xs space-y-1 font-mono text-neutral-700 dark:text-neutral-300">
                    {st.subitems.map((sub, sIdx) => (
                      <li key={sIdx}><RichText>{sub}</RichText></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Accordion>

      {/* Part C: WSL / Terminal (with OS TABS!) */}
      <Accordion
        id="part-c-terminal"
        badge="PART C"
        title="Part C: Terminal Setup (Interactive OS Tabs)"
        isOpen={openSections.partC}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, partC: state }))}
      >
        <div className="space-y-6">
          <p className="text-sm sm:text-base leading-relaxed">
            <RichText>{setupContent.partC.intro}</RichText>
          </p>

          {/* OS Switcher Tabs */}
          <div 
            ref={tabListRef}
            role="tablist"
            aria-label="Operating System terminal setup tabs"
            className="flex flex-wrap gap-2 pb-2 border-b-3 border-black dark:border-white select-none"
          >
            <button
              type="button"
              role="tab"
              id="os-tab-windows"
              aria-controls="os-panel-windows"
              aria-selected={activeOsTab === 'windows'}
              tabIndex={activeOsTab === 'windows' ? 0 : -1}
              onClick={() => setActiveOsTab('windows')}
              onKeyDown={(e) => handleTabKeyDown(e, 'windows')}
              className={`px-4 py-2 font-heading text-xs sm:text-sm uppercase tracking-wide border-3 border-black dark:border-white transition-all ${
                activeOsTab === 'windows'
                  ? 'bg-brutal-yellow text-black shadow-brutal -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream'
              }`}
            >
              🪟 Windows WSL (Ubuntu)
            </button>
            <button
              type="button"
              role="tab"
              id="os-tab-mac"
              aria-controls="os-panel-mac"
              aria-selected={activeOsTab === 'mac'}
              tabIndex={activeOsTab === 'mac' ? 0 : -1}
              onClick={() => setActiveOsTab('mac')}
              onKeyDown={(e) => handleTabKeyDown(e, 'mac')}
              className={`px-4 py-2 font-heading text-xs sm:text-sm uppercase tracking-wide border-3 border-black dark:border-white transition-all ${
                activeOsTab === 'mac'
                  ? 'bg-brutal-pink text-black shadow-brutal -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream'
              }`}
            >
              🍎 macOS (Homebrew)
            </button>
            <button
              type="button"
              role="tab"
              id="os-tab-linux"
              aria-controls="os-panel-linux"
              aria-selected={activeOsTab === 'linux'}
              tabIndex={activeOsTab === 'linux' ? 0 : -1}
              onClick={() => setActiveOsTab('linux')}
              onKeyDown={(e) => handleTabKeyDown(e, 'linux')}
              className={`px-4 py-2 font-heading text-xs sm:text-sm uppercase tracking-wide border-3 border-black dark:border-white transition-all ${
                activeOsTab === 'linux'
                  ? 'bg-brutal-green text-black shadow-brutal -translate-y-0.5'
                  : 'bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-cream'
              }`}
            >
              🐧 Linux (Native Debian/Ubuntu)
            </button>
          </div>

          {/* Tab 1: Windows WSL Content */}
          {activeOsTab === 'windows' && (
            <div id="os-panel-windows" role="tabpanel" aria-labelledby="os-tab-windows" className="space-y-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-950/40 border-2 border-black text-xs font-mono font-bold">
                Target: Windows 10 version 2004+ (build 19041+) or Windows 11. Needs Admin rights.
              </div>

              <div className="space-y-4">
                {setupContent.partC.steps.map((st) => (
                  <div key={st.num} className="p-4 border-2 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-brutal-sm">
                    <div className="font-heading text-sm mb-2 text-black dark:text-white flex items-center gap-2">
                      <span className="w-6 h-6 border border-black bg-brutal-yellow text-black flex items-center justify-center font-bold text-xs">
                        {st.num}
                      </span>
                      <span>Step {st.num}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 m-0">
                      <RichText>{st.text}</RichText>
                    </p>
                    {st.command && (
                      <CodeBlock code={st.command} language={st.language || 'bash'} />
                    )}
                  </div>
                ))}
              </div>

              {/* Things worth knowing */}
              <div className="p-4 sm:p-5 border-3 border-black bg-cream dark:bg-neutral-900 shadow-brutal-sm">
                <h4 className="font-heading text-sm sm:text-base uppercase tracking-wider mb-2 text-black dark:text-white">
                  Things worth knowing:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
                  {setupContent.partC.tips.map((tip, tIdx) => (
                    <li key={tIdx}><RichText>{tip}</RichText></li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: macOS Content */}
          {activeOsTab === 'mac' && (
            <div id="os-panel-mac" role="tabpanel" aria-labelledby="os-tab-mac" className="space-y-4">
              <div className="p-4 border-3 border-black bg-white dark:bg-neutral-900 shadow-brutal-sm">
                <h4 className="font-heading text-base mb-2">macOS Terminal & Homebrew</h4>
                <p className="text-sm leading-relaxed mb-3">
                  Open the <strong>Terminal</strong> app. On Mac install the forensic tools with Homebrew:
                </p>
                <CodeBlock
                  code="brew install exiftool binwalk binutils"
                  language="bash"
                  title="macOS Homebrew Install"
                />
                <div className="p-3 border-2 border-black bg-yellow-100 dark:bg-yellow-950/40 text-xs font-mono mb-4">
                  <strong>Notice on steghide:</strong> Steghide is not reliably available on Mac, so Mac users can follow that one demo on a neighbour&apos;s screen or in the picoCTF webshell.
                </div>

                <h5 className="font-heading text-xs uppercase mb-1">Verify installed tools on macOS:</h5>
                <CodeBlock
                  code={setupContent.partC.verifyCommand}
                  language="bash"
                  title="Verify Tools (macOS)"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Linux Content */}
          {activeOsTab === 'linux' && (
            <div id="os-panel-linux" role="tabpanel" aria-labelledby="os-tab-linux" className="space-y-4">
              <div className="p-4 border-3 border-black bg-white dark:bg-neutral-900 shadow-brutal-sm">
                <h4 className="font-heading text-base mb-2">Native Ubuntu / Debian Terminal</h4>
                <p className="text-sm leading-relaxed mb-3">
                  On Ubuntu or Debian Linux, run the standard apt command to install all required packages:
                </p>
                <CodeBlock
                  code="sudo apt update && sudo apt install -y binutils file libimage-exiftool-perl binwalk steghide xxd zip unzip curl wget python3 python3-pip"
                  language="bash"
                  title="Linux APT Install"
                />

                <h5 className="font-heading text-xs uppercase mb-1 mt-4">Verify installed tools on Linux:</h5>
                <CodeBlock
                  code={setupContent.partC.verifyCommand}
                  language="bash"
                  title="Verify Tools (Linux)"
                />
              </div>
            </div>
          )}

          {/* OverTheWire Bandit note */}
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border-2 border-black dark:border-white text-xs font-mono">
            💡 <RichText>{setupContent.partC.banditFallback}</RichText>
          </div>
        </div>
      </Accordion>

      {/* Troubleshooting Table (Searchable) */}
      <Accordion
        id="troubleshooting-section"
        badge="FAILS"
        title="If WSL fails (Searchable Troubleshooting Table)"
        isOpen={openSections.troubleshooting}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, troubleshooting: state }))}
      >
        <div>
          {/* Search Input for Troubleshooting */}
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
              <input
                type="text"
                value={troubleFilter}
                onChange={(e) => setTroubleFilter(e.target.value)}
                placeholder="Search troubleshooting fixes (e.g. bios, packages, admin, old)..."
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

          {/* Responsive Table */}
          <div className="overflow-x-auto border-3 border-black dark:border-white shadow-brutal-sm">
            <table className="w-full text-left border-collapse bg-white dark:bg-neutral-900 text-xs sm:text-sm">
              <thead>
                <tr className="border-b-3 border-black dark:border-white bg-brutal-yellow text-black font-heading uppercase text-xs">
                  <th className="p-3 border-r-2 border-black">Problem</th>
                  <th className="p-3">Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-neutral-200 dark:divide-neutral-800 font-sans">
                {filteredTroubleshooting.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-4 text-center text-neutral-500 font-mono">
                      No matching errors found. Clear your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredTroubleshooting.map((item, idx) => (
                    <tr key={idx} className="hover:bg-cream dark:hover:bg-neutral-800/50">
                      <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400 border-r-2 border-black dark:border-white">
                        <RichText>{item.problem}</RichText>
                      </td>
                      <td className="p-3 text-neutral-800 dark:text-neutral-200">
                        <RichText>{item.fix}</RichText>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Accordion>

      <PageNav
        prev={{ label: "Worksheet", path: "/worksheet" }}
        next={{ label: "Demo 1: Crypto & encoding", path: "/demo-1" }}
      />
    </div>
  );
}
