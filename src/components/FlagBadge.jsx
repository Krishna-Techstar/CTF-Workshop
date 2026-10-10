import React, { useState, useEffect } from 'react';
import { IS_PARTICIPANT } from '../utils/mode';
import { getAnswer, subscribeAnswers } from '../utils/answerResolver';

export default function FlagBadge({ id, label = "Flag" }) {
  const [flagText, setFlagText] = useState(() => getAnswer(id));

  useEffect(() => {
    if (!IS_PARTICIPANT) {
      setFlagText(getAnswer(id));
      return subscribeAnswers(() => {
        setFlagText(getAnswer(id));
      });
    }
  }, [id]);

  if (IS_PARTICIPANT) {
    return (
      <div className="p-3 border-2 border-black dark:border-white bg-neutral-100 dark:bg-neutral-800 flex items-center justify-between flex-wrap gap-2">
        <span className="font-heading text-xs uppercase text-neutral-600 dark:text-neutral-400">
          {label}:
        </span>
        <span className="font-mono font-bold text-xs text-neutral-500 italic">
          Flag hidden: submit it in the Flag Checker
        </span>
      </div>
    );
  }

  return (
    <div className="p-3 border-2 border-black dark:border-white bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-between flex-wrap gap-2">
      <span className="font-heading text-xs uppercase text-black dark:text-white">
        {label}:
      </span>
      <code className="font-mono font-bold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
        {flagText || 'flag{...}'}
      </code>
    </div>
  );
}
