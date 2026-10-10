import React from 'react';

export default function StepCard({ 
  number, 
  title, 
  children, 
  accentColor = 'yellow',
  className = ''
}) {
  const accentClasses = {
    yellow: 'bg-brutal-yellow',
    pink: 'bg-brutal-pink',
    blue: 'bg-brutal-blue',
    green: 'bg-brutal-green',
    orange: 'bg-brutal-orange',
    purple: 'bg-brutal-purple',
    white: 'bg-white',
  };

  return (
    <div className={`my-4 border-3 border-black dark:border-white bg-white dark:bg-brutal-cardDark shadow-brutal dark:shadow-brutal-dark ${className}`}>
      <div className={`flex items-center gap-3 p-3.5 border-b-3 border-black dark:border-white ${accentClasses[accentColor] || accentClasses.yellow} text-black`}>
        {number && (
          <div className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-black bg-white font-heading font-black text-base shadow-[2px_2px_0px_#000] shrink-0">
            {number}
          </div>
        )}
        <h4 className="font-heading text-base sm:text-lg tracking-wide text-black m-0">
          {title}
        </h4>
      </div>
      <div className="p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-black dark:text-neutral-100">
        {children}
      </div>
    </div>
  );
}
