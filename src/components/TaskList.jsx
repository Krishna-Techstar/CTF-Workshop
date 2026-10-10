import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { getStorageItem, setStorageItem } from '../utils/storage';

export default function TaskList({ 
  id, 
  title = "Checklist Tasks", 
  tasks = [], 
  color = "yellow" 
}) {
  const storageKey = `ctf_task_group_${id}`;
  const [completed, setCompleted] = useState(() => {
    return getStorageItem(storageKey, {});
  });

  useEffect(() => {
    setStorageItem(storageKey, completed);
    // Dispatch custom event so the global workshop progress bar knows tasks updated
    window.dispatchEvent(new CustomEvent('ctf-task-update'));
  }, [completed, storageKey]);

  const toggleTask = (index) => {
    setCompleted(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = tasks.filter((_, idx) => completed[idx]).length;
  const isAllDone = tasks.length > 0 && completedCount === tasks.length;

  return (
    <div className="my-5 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal dark:shadow-brutal-dark">
      <div className="flex items-center justify-between p-3.5 border-b-3 border-black dark:border-white bg-cream dark:bg-neutral-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-black dark:text-brutal-yellow" />
          <span className="font-heading text-sm sm:text-base uppercase tracking-wider text-black dark:text-white">
            {title}
          </span>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 border-2 border-black dark:border-white bg-brutal-yellow text-black shadow-[2px_2px_0px_#000]">
          {completedCount} / {tasks.length} DONE
        </span>
      </div>

      <div className="p-3 sm:p-4 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
        {tasks.map((task, idx) => {
          const isDone = !!completed[idx];
          return (
            <label
              key={idx}
              className={`flex items-start gap-3.5 py-2.5 px-2 cursor-pointer transition-colors select-none ${
                isDone 
                  ? 'bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 line-through' 
                  : 'hover:bg-cream dark:hover:bg-neutral-800/60 text-black dark:text-neutral-100'
              }`}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(idx);
                }}
                className={`w-6 h-6 shrink-0 mt-0.5 border-2 border-black dark:border-white flex items-center justify-center transition-all ${
                  isDone 
                    ? 'bg-brutal-green text-black shadow-[1px_1px_0px_#000]' 
                    : 'bg-white dark:bg-neutral-900 shadow-[2px_2px_0px_#000] hover:bg-brutal-yellow'
                }`}
              >
                {isDone && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
              <span className="text-sm sm:text-base leading-snug font-medium">
                {task}
              </span>
            </label>
          );
        })}
      </div>

      {isAllDone && (
        <div className="p-2.5 bg-brutal-green border-t-2 border-black text-black text-center font-display font-extrabold text-xs uppercase tracking-wider">
          🎉 All tasks in this section checked off!
        </div>
      )}
    </div>
  );
}
