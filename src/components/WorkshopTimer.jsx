import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Clock, Minimize2, Maximize2, AlertTriangle } from 'lucide-react';
import { SCHEDULE } from '../content/schedule';
import { getStorageItem, setStorageItem } from '../utils/storage';

export default function WorkshopTimer() {
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState(() => {
    const saved = getStorageItem('ctf_timer_segment', 0);
    return typeof saved === 'number' && saved >= 0 && saved < SCHEDULE.length ? saved : 0;
  });

  const [isRunning, setIsRunning] = useState(false);
  
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const saved = getStorageItem('ctf_timer_remaining', null);
    if (typeof saved === 'number' && saved >= 0) return saved;
    const segIdx = getStorageItem('ctf_timer_segment', 0);
    const validIdx = typeof segIdx === 'number' && segIdx >= 0 && segIdx < SCHEDULE.length ? segIdx : 0;
    return SCHEDULE[validIdx].durationMinutes * 60;
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const endTimeRef = useRef(null);

  const segment = SCHEDULE[currentSegmentIdx] || SCHEDULE[0];

  // Save state on segment change
  useEffect(() => {
    setStorageItem('ctf_timer_segment', currentSegmentIdx);
  }, [currentSegmentIdx]);

  // Save remaining seconds
  useEffect(() => {
    setStorageItem('ctf_timer_remaining', secondsRemaining);
  }, [secondsRemaining]);

  // Accurate interval ticker using target end timestamp
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      endTimeRef.current = Date.now() + secondsRemaining * 1000;
      interval = setInterval(() => {
        const remainingMs = endTimeRef.current - Date.now();
        const remSec = Math.max(0, Math.ceil(remainingMs / 1000));
        setSecondsRemaining(remSec);
        if (remSec <= 0) {
          setIsRunning(false);
          clearInterval(interval);
        }
      }, 250);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleRun = () => {
    if (!isRunning && secondsRemaining === 0) {
      // If time was 0, reset before starting
      const freshSec = segment.durationMinutes * 60;
      setSecondsRemaining(freshSec);
      endTimeRef.current = Date.now() + freshSec * 1000;
    }
    setIsRunning(prev => !prev);
  };

  const resetCurrent = () => {
    setIsRunning(false);
    const initialSec = segment.durationMinutes * 60;
    setSecondsRemaining(initialSec);
    setStorageItem('ctf_timer_remaining', initialSec);
  };

  const nextSegment = () => {
    if (currentSegmentIdx < SCHEDULE.length - 1) {
      setIsRunning(false);
      const nextIdx = currentSegmentIdx + 1;
      setCurrentSegmentIdx(nextIdx);
      const nextSec = SCHEDULE[nextIdx].durationMinutes * 60;
      setSecondsRemaining(nextSec);
      setStorageItem('ctf_timer_remaining', nextSec);
    }
  };

  const prevSegment = () => {
    if (currentSegmentIdx > 0) {
      setIsRunning(false);
      const prevIdx = currentSegmentIdx - 1;
      setCurrentSegmentIdx(prevIdx);
      const prevSec = SCHEDULE[prevIdx].durationMinutes * 60;
      setSecondsRemaining(prevSec);
      setStorageItem('ctf_timer_remaining', prevSec);
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isWarning = secondsRemaining > 0 && secondsRemaining <= 120; // 2 minutes remaining
  const isTimeUp = secondsRemaining === 0;

  // Title flash and short beep when time is up
  useEffect(() => {
    if (isTimeUp && !isRunning) {
      // Audio beep
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        }
      } catch (e) {}

      // Title flash
      const origTitle = document.title;
      let flashState = false;
      const interval = setInterval(() => {
        document.title = flashState ? '⏰ TIME IS UP!' : origTitle;
        flashState = !flashState;
      }, 750);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        document.title = origTitle;
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        document.title = origTitle;
      };
    }
  }, [isTimeUp]);

  // Format time MM:SS
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      id="workshop-timer-widget"
      className="fixed bottom-5 right-5 z-40 select-none print:hidden"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className={`flex items-center gap-2.5 px-3.5 py-2 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark text-black font-display font-black text-sm tracking-wide ${
            isWarning ? 'bg-red-400 motion-safe:animate-pulse' : isRunning ? 'bg-brutal-green' : 'bg-brutal-yellow'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span role="timer" aria-live="polite">{timeFormatted}</span>
          <span className="text-xs uppercase opacity-80">({segment.timeRange})</span>
          <Maximize2 className="w-3.5 h-3.5 ml-1" />
        </button>
      ) : (
        <div
          className={`w-72 sm:w-80 border-4 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal-lg dark:shadow-brutal-dark-lg transition-all ${
            isWarning ? 'ring-4 ring-red-500 motion-safe:animate-pulse' : ''
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-2.5 bg-neutral-900 border-b-3 border-black dark:border-white text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brutal-yellow" />
              <span className="font-heading text-xs tracking-wider uppercase text-neutral-200">
                Workshop Facilitator Timer
              </span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-neutral-800 border border-neutral-600 text-white"
              title="Minimize timer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Segment Details */}
          <div className="p-3.5 bg-cream dark:bg-neutral-800 border-b-3 border-black dark:border-white">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 border border-black bg-white dark:bg-black text-black dark:text-white">
                Segment {currentSegmentIdx + 1} of {SCHEDULE.length}
              </span>
              <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                {segment.timeRange}
              </span>
            </div>
            <div className="font-heading text-sm text-black dark:text-white truncate">
              {segment.title}
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="p-4 text-center bg-white dark:bg-neutral-900">
            <div
              role="timer"
              aria-live="polite"
              className={`font-mono text-4xl sm:text-5xl font-black tracking-tight mb-1 ${
                isTimeUp 
                  ? 'text-red-600 motion-safe:animate-bounce' 
                  : isWarning 
                  ? 'text-red-500' 
                  : 'text-black dark:text-white'
              }`}
            >
              {timeFormatted}
            </div>
            {isWarning && !isTimeUp && (
              <div className="text-xs font-mono font-bold text-red-600 flex items-center justify-center gap-1 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 inline" /> Almost out of time!
              </div>
            )}
            {isTimeUp && (
              <div className="text-xs font-mono font-bold text-red-600 uppercase mb-2">
                ⏰ Segment Time Expired!
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={prevSegment}
                disabled={currentSegmentIdx === 0}
                className="p-2 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000]"
                title="Previous segment"
              >
                <ChevronLeft className="w-4 h-4 text-black dark:text-white" />
              </button>

              <button
                type="button"
                onClick={toggleRun}
                className={`px-4 py-2 border-2 border-black dark:border-white font-heading text-xs uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                  isRunning
                    ? 'bg-brutal-pink text-black'
                    : 'bg-brutal-green text-black hover:bg-brutal-yellow'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Start
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetCurrent}
                className="p-2 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000]"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4 text-black dark:text-white" />
              </button>

              <button
                type="button"
                onClick={nextSegment}
                disabled={currentSegmentIdx === SCHEDULE.length - 1}
                className="p-2 border-2 border-black dark:border-white bg-white dark:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000]"
                title="Next segment"
              >
                <ChevronRight className="w-4 h-4 text-black dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
