'use client';

import React from 'react';

interface RollingTextProps {
  text: string;
  suffix?: string;
  className?: string;
  containerClassName?: string;
}

export default function RollingText({
  text,
  suffix,
  className = '',
  containerClassName = '',
}: RollingTextProps) {
  return (
    <span className={`inline-flex items-center group overflow-hidden ${containerClassName}`}>
      <span className="relative inline-flex flex-col h-[1.3em] overflow-hidden leading-tight">
        <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full will-change-transform">
          <span className={`inline-block ${className}`}>{text}</span>
          {suffix && <span className="ml-1 opacity-60 text-xs">{suffix}</span>}
        </span>
        <span className="absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full will-change-transform">
          <span className={`inline-block text-white ${className}`}>{text}</span>
          {suffix && <span className="ml-1 text-emerald-400 text-xs">{suffix}</span>}
        </span>
      </span>
    </span>
  );
}
