import React from 'react';
import PageHeader from '../components/PageHeader';
import PageNav from '../components/PageNav';
import RichText from '../components/RichText';
import Sticker from '../components/Sticker';
import InvestigationWorksheet from '../components/InvestigationWorksheet';
import { worksheetPageContent } from '../content/method';
import { Lightbulb, CheckCircle2, Printer } from 'lucide-react';

export default function WorksheetPage() {
  const content = worksheetPageContent;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHeader
        title={content.title}
        time={content.time}
        tagText={content.tag}
        accentColor="bg-brutal-green"
      >
        <p className="font-semibold text-base sm:text-lg">
          <strong>Goal:</strong> <RichText>{content.goal}</RichText>
        </p>
      </PageHeader>

      {/* Intro & Instructions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* How to use */}
        <div className="p-5 bg-white dark:bg-brutal-cardDark border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black/10 dark:border-white/10">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white">
              How to Use This Worksheet
            </h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-800 dark:text-neutral-200 font-sans">
            {content.howToUse.map((item, idx) => (
              <li key={idx} className="leading-relaxed pl-1">
                <RichText>{item}</RichText>
              </li>
            ))}
          </ol>
        </div>

        {/* Pro Tips */}
        <div className="p-5 bg-cream dark:bg-neutral-900 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black/10 dark:border-white/10">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-black dark:text-white">
              Investigation Tips
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-800 dark:text-neutral-200 font-sans">
            {content.tips.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                <RichText>{item}</RichText>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Worksheet Component */}
      <InvestigationWorksheet storageId="main" compact={false} />

      {/* Page Navigation */}
      <PageNav
        prev={{ label: 'Worked Examples', path: '/method-examples' }}
        next={{ label: 'Setup & Tools', path: '/setup' }}
      />
    </div>
  );
}
