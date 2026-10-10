import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchModal from './components/SearchModal';
import WorkshopTimer from './components/WorkshopTimer';

// Pages
import Home from './pages/Home';
import BeforeYouStart from './pages/BeforeYouStart';
import Setup from './pages/Setup';
import Demo1Crypto from './pages/Demo1Crypto';
import Demo2Web from './pages/Demo2Web';
import Demo3Forensics from './pages/Demo3Forensics';
import LinuxBasics from './pages/LinuxBasics';
import MiniCtfWrapUp from './pages/MiniCtfWrapUp';
import InvestigationMethod from './pages/InvestigationMethod';
import MethodExamples from './pages/MethodExamples';
import WorksheetPage from './pages/WorksheetPage';

const PAGE_TITLES = {
  '/': 'Overview & Schedule',
  '/before-you-start': 'Before You Start',
  '/method': 'Investigation Method',
  '/method-examples': 'Worked Examples',
  '/worksheet': 'Investigation Worksheet',
  '/setup': 'Setup Guide',
  '/demo-1': 'Demo 1: Cryptography & Encoding',
  '/demo-2': 'Demo 2: Web Exploitation',
  '/break-and-demo-3': 'Break & Demo 3: Forensics & Steganography',
  '/linux-basics': 'Linux Basics & Bandit',
  '/mini-ctf': 'Mini CTF & Wrap-up'
};

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll to anchor or top, set document title, and focus h1 on route change
  useEffect(() => {
    const pageTitle = PAGE_TITLES[location.pathname] || 'Guide';
    document.title = `${pageTitle} | CTF Workshop`;

    setTimeout(() => {
      const h1 = document.querySelector('main h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    }, 50);

    const anchor = location.state?.anchor;
    if (anchor) {
      window.dispatchEvent(new CustomEvent('ctf-open-section', { detail: anchor }));
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  // Global keyboard shortcut: "/" opens search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-cream dark:bg-brutal-dark text-black dark:text-neutral-100 flex flex-col font-sans transition-colors duration-150">
      {/* Sidebar Navigation */}
      <Sidebar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content Area */}
      <div className="lg:pl-80 flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/before-you-start" element={<BeforeYouStart />} />
            <Route path="/before-start" element={<Navigate to="/before-you-start" replace />} />
            <Route path="/method" element={<InvestigationMethod />} />
            <Route path="/method-examples" element={<MethodExamples />} />
            <Route path="/worksheet" element={<WorksheetPage />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/demo-1" element={<Demo1Crypto />} />
            <Route path="/demo-2" element={<Demo2Web />} />
            <Route path="/break-and-demo-3" element={<Demo3Forensics />} />
            <Route path="/demo-3" element={<Navigate to="/break-and-demo-3" replace />} />
            <Route path="/forensics" element={<Navigate to="/break-and-demo-3" replace />} />
            <Route path="/linux-basics" element={<LinuxBasics />} />
            <Route path="/mini-ctf" element={<MiniCtfWrapUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Floating Facilitator Workshop Timer Widget */}
      <WorkshopTimer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
