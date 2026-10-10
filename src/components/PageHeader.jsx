import React from 'react';
import Sticker from './Sticker';

export default function PageHeader({ 
  title, 
  time, 
  accentColor = 'bg-brutal-yellow', 
  tagText = "WORKSHOP GUIDE",
  children 
}) {
  return (
    <div className={`mb-8 p-5 sm:p-8 border-4 border-black dark:border-white ${accentColor} shadow-brutal-lg dark:shadow-brutal-dark-lg text-black relative overflow-hidden`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {tagText && (
          <Sticker color="dark" size="sm" rotate={-2}>
            {tagText}
          </Sticker>
        )}
        {time && (
          <Sticker color="white" size="sm" rotate={1}>
            ⏱ TIME: {time}
          </Sticker>
        )}
      </div>

      <h1 className="font-heading text-2xl sm:text-4xl text-black tracking-tight leading-tight m-0">
        {title}
      </h1>

      {children && (
        <div className="mt-3 text-sm sm:text-base font-sans font-medium text-black/90 leading-relaxed max-w-4xl">
          {children}
        </div>
      )}
    </div>
  );
}
