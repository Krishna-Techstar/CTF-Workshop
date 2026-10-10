import React from 'react';

export default function Sticker({ 
  children, 
  color = 'yellow', 
  rotate = -2, 
  className = '', 
  variant = 'normal',
  size = 'md'
}) {
  const colorMap = {
    yellow: 'bg-brutal-yellow text-black',
    pink: 'bg-brutal-pink text-black',
    blue: 'bg-brutal-blue text-black',
    green: 'bg-brutal-green text-black',
    orange: 'bg-brutal-orange text-black',
    purple: 'bg-brutal-purple text-black',
    white: 'bg-white text-black dark:bg-neutral-800 dark:text-white',
    dark: 'bg-black text-white dark:bg-white dark:text-black',
    red: 'bg-red-400 text-black',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 border-2',
    md: 'text-xs sm:text-sm px-3 py-1 border-3',
    lg: 'text-sm sm:text-base px-4 py-1.5 border-3',
  };

  const rotationStyles = {
    transform: `rotate(${rotate}deg)`,
  };

  return (
    <span 
      style={rotationStyles}
      className={`inline-flex items-center gap-1.5 font-display font-extrabold uppercase tracking-wider border-black dark:border-white shadow-brutal-sm dark:shadow-brutal-dark-sm transition-transform hover:scale-105 select-none ${colorMap[color] || colorMap.yellow} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {children}
    </span>
  );
}
