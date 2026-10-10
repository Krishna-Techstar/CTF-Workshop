import React from 'react';
import PageHeader from '../components/PageHeader';
import PageNav from '../components/PageNav';
import { methodPageContent } from '../content/method';

export default function InvestigationMethod() {
  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={methodPageContent.title}
        time={methodPageContent.time}
        tagText={methodPageContent.tag}
        accentColor="bg-brutal-orange"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          {methodPageContent.goal}
        </p>
      </PageHeader>
      <PageNav
        prev={{ label: "Before you start", path: "/before-you-start" }}
        next={{ label: "Worked Examples", path: "/method-examples" }}
      />
    </div>
  );
}
