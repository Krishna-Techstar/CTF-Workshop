import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBlock({ code, language = 'bash', title = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const getChipColor = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'bash':
      case 'sh':
      case 'shell':
        return 'bg-brutal-green text-black';
      case 'javascript':
      case 'js':
        return 'bg-brutal-yellow text-black';
      case 'python':
      case 'py':
        return 'bg-brutal-blue text-black';
      case 'html':
        return 'bg-brutal-orange text-black';
      case 'css':
        return 'bg-brutal-pink text-black';
      case 'output':
      case 'result':
        return 'bg-brutal-purple text-black';
      default:
        return 'bg-neutral-200 text-black';
    }
  };

  return (
    <div className="my-4 border-3 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark bg-[#1a1b26] text-neutral-100 rounded-none overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-900 border-b-3 border-black dark:border-white select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/40 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/40 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/40 inline-block"></span>
          </div>
          {title && (
            <span className="text-xs font-mono font-bold text-neutral-300 hidden sm:inline-block">
              {title}
            </span>
          )}
          <span className={`text-[11px] font-mono font-extrabold uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] rounded-none ${getChipColor(language)}`}>
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
          className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 border-2 border-black transition-all ${
            copied
              ? 'bg-brutal-green text-black translate-x-0.5 translate-y-0.5 shadow-none'
              : 'bg-white text-black hover:bg-brutal-yellow shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed selection:bg-brutal-yellow selection:text-black">
        <pre className="m-0 text-neutral-100 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
