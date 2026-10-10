import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Copy, Check, Wrench, Layers } from 'lucide-react';
import Sticker from './Sticker';

export default function Playground() {
  const [input, setInput] = useState('ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259');
  const [output, setOutput] = useState('');
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [magicResults, setMagicResults] = useState(null);
  const [copied, setCopied] = useState(false);

  const LAYERED_CHALLENGE = '63336c7564487435626d78795a575a66596e4e66636d4677596e463259585239';

  // Crypto transforms
  const decodeBase64 = (str) => {
    try {
      return atob(str.trim());
    } catch (e) {
      return '[Base64 Decode Error: Invalid string]';
    }
  };

  const encodeBase64 = (str) => {
    try {
      return btoa(str);
    } catch (e) {
      return '[Base64 Encode Error]';
    }
  };

  const rot13 = (str, amount = 13) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((code - base + amount) % 26) + base);
    });
  };

  const decodeHex = (str) => {
    try {
      const cleaned = str.replace(/\s+/g, '');
      if (cleaned.length % 2 !== 0) return '[Hex Error: Odd length]';
      let result = '';
      for (let i = 0; i < cleaned.length; i += 2) {
        result += String.fromCharCode(parseInt(cleaned.substr(i, 2), 16));
      }
      return result;
    } catch (e) {
      return '[Hex Decode Error]';
    }
  };

  const encodeHex = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
  };

  // Run a single direct transformation
  const applySingleOp = (opName) => {
    setMagicResults(null);
    let res = '';
    if (opName === 'from_b64') res = decodeBase64(input);
    else if (opName === 'to_b64') res = encodeBase64(input);
    else if (opName === 'rot13') res = rot13(input);
    else if (opName === 'from_hex') res = decodeHex(input);
    else if (opName === 'to_hex') res = encodeHex(input);

    setOutput(res);
  };

  // Run Magic helper to find any string containing "flag{"
  const runMagic = () => {
    const raw = input.trim();
    const attempts = [];

    // Attempt 1: Direct ROT13 shifts
    for (let s = 1; s <= 25; s++) {
      const shifted = rot13(raw, s);
      if (shifted.toLowerCase().includes('flag{')) {
        attempts.push({
          recipe: `ROT${s} (Caesar shift ${s})`,
          result: shifted,
          foundFlag: true,
        });
      }
    }

    // Attempt 2: Base64
    const b64 = decodeBase64(raw);
    if (!b64.startsWith('[Base64')) {
      attempts.push({
        recipe: 'From Base64',
        result: b64,
        foundFlag: b64.toLowerCase().includes('flag{'),
      });
    }

    // Attempt 3: Hex
    const hex = decodeHex(raw);
    if (!hex.startsWith('[Hex')) {
      attempts.push({
        recipe: 'From Hex',
        result: hex,
        foundFlag: hex.toLowerCase().includes('flag{'),
      });

      // Layered 1: Hex -> Base64
      const hexB64 = decodeBase64(hex);
      if (!hexB64.startsWith('[Base64')) {
        attempts.push({
          recipe: 'From Hex → From Base64',
          result: hexB64,
          foundFlag: hexB64.toLowerCase().includes('flag{'),
        });

        // Layered 2: Hex -> Base64 -> ROT13
        const hexB64Rot = rot13(hexB64, 13);
        attempts.push({
          recipe: 'From Hex → From Base64 → ROT13',
          result: hexB64Rot,
          foundFlag: hexB64Rot.toLowerCase().includes('flag{'),
        });
      }

      // Layered 3: Hex -> ROT13
      const hexRot = rot13(hex, 13);
      if (hexRot.toLowerCase().includes('flag{')) {
        attempts.push({
          recipe: 'From Hex → ROT13',
          result: hexRot,
          foundFlag: true,
        });
      }
    }

    // Attempt 4: Base64 -> ROT13
    if (!b64.startsWith('[Base64')) {
      const b64Rot = rot13(b64, 13);
      if (b64Rot.toLowerCase().includes('flag{')) {
        attempts.push({
          recipe: 'From Base64 → ROT13',
          result: b64Rot,
          foundFlag: true,
        });
      }
    }

    const matched = attempts.filter(a => a.foundFlag);
    setMagicResults({
      matched: matched.length > 0 ? matched : attempts.slice(0, 4),
      hasFlag: matched.length > 0,
    });

    if (matched.length > 0) {
      setOutput(matched[0].result);
    }
  };

  const handleCopyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const loadLayeredChallenge = () => {
    setInput(LAYERED_CHALLENGE);
    setOutput('');
    setMagicResults(null);
  };

  return (
    <div className="my-6 border-4 border-black dark:border-white bg-cream dark:bg-brutal-cardDark shadow-brutal-lg dark:shadow-brutal-dark-lg p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-3 border-black dark:border-white">
        <div className="flex items-center gap-2">
          <div className="p-2 border-2 border-black bg-brutal-yellow">
            <Wrench className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="font-heading text-lg sm:text-xl m-0 text-black dark:text-white">
              CyberChef Interactive Mini-Playground
            </h3>
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 m-0">
              Browser-based encoder/decoder for Demo 1. Test strings, stack operations, or use Magic!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadLayeredChallenge}
          className="brutal-btn bg-brutal-pink text-black text-xs hover:bg-brutal-yellow"
        >
          🧩 Load Layered Challenge
        </button>
      </div>

      {/* Main Grid: Input / Operations / Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Input Panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="font-heading text-xs uppercase tracking-wider text-black dark:text-neutral-200">
              Input Data
            </label>
            <button
              onClick={() => { setInput(''); setOutput(''); setMagicResults(null); }}
              className="text-xs font-mono font-bold underline hover:text-brutal-pink"
            >
              Clear
            </button>
          </div>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your encoded text or hex string here..."
            className="brutal-input w-full font-mono text-xs sm:text-sm resize-none mb-3"
          />

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              onClick={() => applySingleOp('from_b64')}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black bg-white hover:bg-brutal-yellow dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              From Base64
            </button>
            <button
              type="button"
              onClick={() => applySingleOp('to_b64')}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black bg-white hover:bg-brutal-yellow dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              To Base64
            </button>
            <button
              type="button"
              onClick={() => applySingleOp('rot13')}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black bg-white hover:bg-brutal-yellow dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              ROT13
            </button>
            <button
              type="button"
              onClick={() => applySingleOp('from_hex')}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black bg-white hover:bg-brutal-yellow dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              From Hex
            </button>
            <button
              type="button"
              onClick={() => applySingleOp('to_hex')}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black bg-white hover:bg-brutal-yellow dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              To Hex
            </button>
            <button
              type="button"
              onClick={runMagic}
              className="px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black bg-brutal-yellow text-black hover:bg-brutal-pink shadow-[2px_2px_0px_#000] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              MAGIC ✨
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="font-heading text-xs uppercase tracking-wider text-black dark:text-neutral-200">
              Decoded Output
            </label>
            {output && (
              <button
                onClick={handleCopyOutput}
                className="text-xs font-mono font-bold flex items-center gap-1 text-black dark:text-white hover:text-brutal-green"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brutal-green" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
            )}
          </div>
          <div className="brutal-card p-3 min-h-[128px] max-h-[170px] overflow-auto font-mono text-xs sm:text-sm bg-neutral-900 text-green-400 border-3 border-black dark:border-white">
            {output ? (
              <div className="whitespace-pre-wrap break-all">{output}</div>
            ) : (
              <span className="text-neutral-500 italic">Click any operation above or run Magic to view decoded results.</span>
            )}
          </div>

          {/* Layered Pipeline Quick Walkthrough */}
          <div className="mt-3 p-3 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-xs font-mono">
            <div className="font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-black dark:text-white">
              <Layers className="w-3.5 h-3.5" />
              Layered Strategy:
            </div>
            <div className="flex items-center gap-1 flex-wrap text-[11px] text-neutral-700 dark:text-neutral-300">
              <span className="bg-yellow-200 dark:bg-yellow-900/60 px-1 border border-black">1. Hex (6333...)</span>
              <ArrowRight className="w-3 h-3" />
              <span className="bg-blue-200 dark:bg-blue-900/60 px-1 border border-black">2. Base64 (c3lud...)</span>
              <ArrowRight className="w-3 h-3" />
              <span className="bg-pink-200 dark:bg-pink-900/60 px-1 border border-black">3. ROT13 (synt&#123;...)</span>
              <ArrowRight className="w-3 h-3" />
              <span className="bg-green-200 dark:bg-green-900/60 px-1 border border-black font-bold">flag&#123;...&#125;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Magic Analysis Drawer */}
      {magicResults && (
        <div className="mt-5 pt-4 border-t-3 border-black dark:border-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black dark:text-brutal-yellow" />
              <span className="font-heading text-sm uppercase tracking-wider">
                Magic Scanner Results
              </span>
            </div>
            {magicResults.hasFlag ? (
              <Sticker color="green" size="sm" rotate={1}>🎯 Flag Detected!</Sticker>
            ) : (
              <span className="text-xs font-mono text-neutral-500">Heuristic trial decodings</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {magicResults.matched.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setOutput(item.result)}
                className={`p-3 border-2 border-black dark:border-white cursor-pointer transition-all ${
                  item.foundFlag
                    ? 'bg-brutal-green text-black font-bold shadow-brutal-sm'
                    : 'bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <div className="text-[11px] font-mono font-bold uppercase tracking-wide opacity-80 mb-1">
                  Recipe: {item.recipe}
                </div>
                <div className="font-mono text-xs truncate">
                  {item.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
