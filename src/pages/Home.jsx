import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Sticker from '../components/Sticker';
import PageNav from '../components/PageNav';
import { SCHEDULE } from '../content/schedule';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto page-fade-in pb-16">
      {/* Hero Banner */}
      <div className="mb-10 p-6 sm:p-12 border-4 border-black dark:border-white bg-brutal-yellow shadow-brutal-xl dark:shadow-brutal-dark-lg text-black relative">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Sticker color="dark" size="md" rotate={-2}>
            CTF WORKSHOP GUIDE
          </Sticker>
          <Sticker color="white" size="md" rotate={2}>
            OCTOBER 10, 2026
          </Sticker>
          <Sticker color="pink" size="md" rotate={-1}>
            BY @KRISHNA
          </Sticker>
        </div>

        <h1 className="font-heading text-3xl sm:text-6xl text-black tracking-tight leading-none mb-4 uppercase">
          Capture The Flag <br />
          <span className="underline decoration-black decoration-wavy decoration-4">Beginner Workshop</span>
        </h1>

        <p className="font-display font-bold text-lg sm:text-2xl text-black/90 max-w-3xl leading-snug mb-6">
          A zero-to-one, hands-on step-by-step master guide. Teach each demo in three beats: 
          <span className="bg-white px-2 py-0.5 mx-1 border-2 border-black">You show it</span> 
          <span className="bg-brutal-pink text-white px-2 py-0.5 mx-1 border-2 border-black">You do it together</span> 
          <span className="bg-brutal-green px-2 py-0.5 mx-1 border-2 border-black">They do it alone</span>.
        </p>

        {/* Start Button & Quick Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/before-you-start"
            className="brutal-btn bg-black text-white hover:bg-brutal-pink hover:text-black text-base sm:text-lg px-8 py-4 shadow-brutal-lg"
          >
            <span>Start Workshop Guide</span>
            <ArrowRight className="w-5 h-5 ml-2 inline stroke-[3]" />
          </Link>

          <Link
            to="/mini-ctf"
            className="brutal-btn bg-white text-black hover:bg-brutal-green text-base sm:text-lg px-6 py-4 shadow-brutal"
          >
            Jump to Mini CTF & Flag Checker 🚩
          </Link>
        </div>
      </div>

      {/* Workshop Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="p-4 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal text-center">
          <div className="font-heading text-3xl sm:text-4xl text-black dark:text-white">3.5 hrs</div>
          <div className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mt-1">Total Duration</div>
        </div>
        <div className="p-4 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal text-center">
          <div className="font-heading text-3xl sm:text-4xl text-black dark:text-white">4 Domains</div>
          <div className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mt-1">Crypto, Web, Forensics, Linux</div>
        </div>
        <div className="p-4 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal text-center">
          <div className="font-heading text-3xl sm:text-4xl text-black dark:text-white">13 Flags</div>
          <div className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mt-1">Real-time Verified</div>
        </div>
        <div className="p-4 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal text-center">
          <div className="font-heading text-3xl sm:text-4xl text-black dark:text-white">100% Free</div>
          <div className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mt-1">Open-Source Tooling</div>
        </div>
      </div>

      {/* Workshop Schedule & Navigation Matrix */}
      <div className="mb-12">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight m-0">
              Workshop Schedule & Syllabus
            </h2>
            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 mt-1">
              Click any schedule block to jump directly to its complete lesson & hands-on materials.
            </p>
          </div>
          <Sticker color="green" size="sm" rotate={2}>
            CLICKABLE TIMELINE
          </Sticker>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHEDULE.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              state={{ anchor: item.anchor }}
              className="group border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal hover:shadow-brutal-lg transition-all duration-150 flex flex-col justify-between motion-safe:hover:-translate-y-1 no-underline text-inherit block"
            >
              <div>
                {/* Header Band */}
                <div 
                  style={{ backgroundColor: item.accent }} 
                  className="p-3.5 border-b-3 border-black dark:border-white flex items-center justify-between text-black"
                >
                  <span className="font-mono text-xs font-black uppercase px-2 py-0.5 border border-black bg-white shadow-[1px_1px_0px_#000]">
                    {item.timeRange}
                  </span>
                  <span className="font-mono text-xs font-bold">
                    {item.durationMinutes} MINS
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="font-heading text-lg sm:text-xl text-black dark:text-white group-hover:text-brutal-pink transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-900 border-t-2 border-black dark:border-white flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400">
                  Open Section
                </span>
                <span className="p-1 border border-black bg-brutal-yellow text-black motion-safe:group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Philosophy & Golden Rules Box */}
      <div className="border-4 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal-lg dark:shadow-brutal-dark-lg p-6 sm:p-8">
        <h3 className="font-heading text-xl sm:text-2xl mb-4 text-black dark:text-white flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-brutal-yellow fill-brutal-yellow" />
          The Facilitator&apos;s 3 Golden Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-900">
            <div className="font-heading text-base mb-1 text-black dark:text-white">1. Pair up early</div>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 m-0">
              If someone is stuck on setup or a command for more than 10 minutes, pair them with a neighbour. Never stop the entire room for one laptop.
            </p>
          </div>
          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-900">
            <div className="font-heading text-base mb-1 text-black dark:text-white">2. Ask Guiding Questions</div>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 m-0">
              Don&apos;t just tell participants the flag. Ask: <em>&quot;What kind of file is it?&quot;</em>, <em>&quot;Did you check the source?&quot;</em>, <em>&quot;Does that string look like Base64?&quot;</em>
            </p>
          </div>
          <div className="p-4 border-2 border-black bg-cream dark:bg-neutral-900">
            <div className="font-heading text-base mb-1 text-black dark:text-white">3. Ethics is non-negotiable</div>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 m-0">
              Only attack systems you have written permission to test. Under the IT Act 2000 (Sections 43 and 66), &quot;it was just for learning&quot; is never a legal defence.
            </p>
          </div>
        </div>
      </div>

      <PageNav next={{ label: "Before you start", path: "/before-you-start" }} />
    </div>
  );
}
