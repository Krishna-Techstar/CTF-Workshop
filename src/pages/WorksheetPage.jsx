import React from 'react';
import PageHeader from '../components/PageHeader';
import PageNav from '../components/PageNav';
import { worksheetPageContent } from '../content/method';

export default function WorksheetPage() {
  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={worksheetPageContent.title}
        time={worksheetPageContent.time}
        tagText={worksheetPageContent.tag}
        accentColor="bg-brutal-green"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          {worksheetPageContent.goal}
        </p>
      </PageHeader>
      <PageNav
        prev={{ label: "Worked Examples", path: "/method-examples" }}
        next={{ label: "Setup Guide", path: "/setup" }}
      />
    </div>
  );
}
