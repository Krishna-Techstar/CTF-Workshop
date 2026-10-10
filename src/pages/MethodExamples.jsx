import React from 'react';
import PageHeader from '../components/PageHeader';
import PageNav from '../components/PageNav';
import { examplesPageContent } from '../content/method';

export default function MethodExamples() {
  return (
    <div className="max-w-5xl mx-auto page-fade-in pb-16">
      <PageHeader
        title={examplesPageContent.title}
        time={examplesPageContent.time}
        tagText={examplesPageContent.tag}
        accentColor="bg-brutal-purple"
      >
        <p className="font-bold text-base sm:text-lg mb-0 text-black">
          {examplesPageContent.goal}
        </p>
      </PageHeader>
      <PageNav
        prev={{ label: "Investigation Method", path: "/method" }}
        next={{ label: "Worksheet", path: "/worksheet" }}
      />
    </div>
  );
}
