import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import TaskList from '../components/TaskList';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import RichText from '../components/RichText';
import { beforeYouStartContent } from '../content/beforeYouStart';

export default function BeforeYouStart() {
  const [openSections, setOpenSections] = useState({
    participants: true,
    facilitator: true,
    ethics: true,
    flagFormat: true,
  });

  const handleExpandAll = () => {
    setOpenSections({ participants: true, facilitator: true, ethics: true, flagFormat: true });
  };

  const handleCollapseAll = () => {
    setOpenSections({ participants: false, facilitator: false, ethics: false, flagFormat: false });
  };

  const tocItems = [
    { id: 'participants-prep', label: 'Participant Prep' },
    { id: 'facilitator-prep', label: 'Your Own Prep (90m)' },
    { id: 'ethics-section', label: 'Ethics (IT Act 2000)' },
    { id: 'flag-format-section', label: 'Flag Format Standards' },
  ];

  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={beforeYouStartContent.title}
        time={beforeYouStartContent.time}
        accentColor="bg-brutal-yellow"
        tagText="SECTION 1"
      >
        <p className="font-bold text-base sm:text-lg mb-2">
          <RichText>{beforeYouStartContent.overview}</RichText>
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="bg-white px-2 py-0.5 border border-black font-bold">DATE: {beforeYouStartContent.date}</span>
          <span className="bg-white px-2 py-0.5 border border-black font-bold">AUTHOR: {beforeYouStartContent.author}</span>
        </div>
      </PageHeader>

      <TableOfContents
        items={tocItems}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      {/* Accordion 1: Participant Prep */}
      <Accordion
        id="participants-prep"
        badge="STEP 1"
        title="Participant Prep (Send 1 Day Before)"
        isOpen={openSections.participants}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, participants: state }))}
      >
        <div className="mb-4">
          <p className="text-sm sm:text-base leading-relaxed mb-3">
            To ensure the workshop runs on schedule without losing the 20-minute setup slot to basic package downloads, send these instructions to all registered attendees 24 hours prior:
          </p>
          <TaskList
            id="participant_prep"
            title="Participant Pre-Flight Checklist"
            tasks={beforeYouStartContent.participantPrepTasks}
            color="yellow"
          />
        </div>
      </Accordion>

      {/* Accordion 2: Facilitator Prep */}
      <Accordion
        id="facilitator-prep"
        badge="STEP 2"
        title="Facilitator Prep (90-Minute Dry Run)"
        isOpen={openSections.facilitator}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, facilitator: state }))}
      >
        <div>
          <p className="text-sm sm:text-base leading-relaxed mb-3">
            Do not skip doing this once from scratch on your own machine. Running through the steps ensures demo files, local web servers, and package repositories behave as expected:
          </p>
          <TaskList
            id="facilitator_prep"
            title="Facilitator Dry-Run Checklist"
            tasks={beforeYouStartContent.facilitatorPrepTasks}
            color="pink"
          />
        </div>
      </Accordion>

      {/* Accordion 3: Ethics */}
      <Accordion
        id="ethics-section"
        badge="CRITICAL"
        title={beforeYouStartContent.ethics.heading}
        isOpen={openSections.ethics}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, ethics: state }))}
      >
        <div className="p-5 border-3 border-black bg-red-100 dark:bg-red-950/40 text-black dark:text-neutral-100 shadow-brutal-sm">
          <div className="flex items-center gap-2 mb-2 font-heading text-lg text-red-600 dark:text-red-400">
            <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            LEGAL WARNING: IT ACT, 2000 (SECTIONS 43 & 66)
          </div>
          <p className="text-sm sm:text-base leading-relaxed font-sans font-medium">
            <RichText>{beforeYouStartContent.ethics.text}</RichText>
          </p>
          <div className="mt-3 p-3 bg-white dark:bg-neutral-900 border-2 border-black text-xs font-mono">
            <strong>Key boundary:</strong> Attacking a practice CTF instance you initiated = OK. Attacking the university network, college lab router, or classmate without permission can violate the IT Act, 2000.
          </div>
        </div>
      </Accordion>

      {/* Accordion 4: Flag Format */}
      <Accordion
        id="flag-format-section"
        badge="SYNTAX"
        title={beforeYouStartContent.flagFormat.heading}
        isOpen={openSections.flagFormat}
        onToggle={(state) => setOpenSections(prev => ({ ...prev, flagFormat: state }))}
      >
        <div className="p-4 border-3 border-black bg-emerald-100 dark:bg-emerald-950/40 text-black dark:text-neutral-100 shadow-brutal-sm">
          <div className="flex items-center gap-2 mb-2 font-heading text-base text-emerald-800 dark:text-emerald-400">
            <Flag className="w-5 h-5 stroke-[2.5]" />
            STANDARD FLAG CONVENTIONS
          </div>
          <p className="text-sm sm:text-base leading-relaxed font-sans mb-3">
            <RichText>{beforeYouStartContent.flagFormat.text}</RichText>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-white dark:bg-neutral-900 border-2 border-black">
              <span className="font-bold text-neutral-500 block mb-1">Workshop Demo Flags (example):</span>
              <code className="text-sm font-bold text-brutal-pinkText dark:text-brutal-pink">flag&#123;demo_flag_format&#125;</code>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-900 border-2 border-black">
              <span className="font-bold text-neutral-500 block mb-1">Official picoCTF Flags (example):</span>
              <code className="text-sm font-bold text-blue-600 dark:text-blue-400">picoCTF&#123;wh0_kn0ws_th3_fl4g_1234&#125;</code>
            </div>
          </div>
        </div>
      </Accordion>

      <PageNav
        prev={{ label: "Home Overview", path: "/" }}
        next={{ label: "Setup (picoCTF, CyberChef, WSL)", path: "/setup" }}
      />
    </div>
  );
}
