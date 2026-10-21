'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface PracticeAreaProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export default function PracticeAreaCard({
  number,
  title,
  subtitle,
  description,
  tags,
}: PracticeAreaProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`border-b border-[#e4ddd1] transition-all duration-300 cursor-pointer ${
        expanded ? 'bg-[#f6f1e8]' : 'hover:bg-[#faf7f2]'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="py-7 md:py-9 px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Number & Title */}
        <div className="flex items-start md:items-center gap-6">
          <span className="font-serif text-lg md:text-xl text-[#c5a059] font-bold shrink-0">
            {number}
          </span>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-[#071324] hover:text-[#0b1a30] transition-colors">
              {title}
            </h3>
            <span className="text-xs font-sans uppercase tracking-widest text-[#546274] block mt-1 font-medium">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Right side status / trigger */}
        <div className="flex items-center gap-4 self-end md:self-center">
          <div className="hidden lg:flex items-center gap-2">
            {tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className="text-[12px] font-sans px-3 py-1 rounded-full bg-white border border-[#e4ddd1] text-[#546274]"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              expanded 
                ? 'bg-[#0b1a30] text-[#c5a059] border-[#0b1a30]' 
                : 'bg-white text-[#0b1a30] border-[#e4ddd1] hover:border-[#c5a059]'
            }`}
            aria-label="Detayları Göster"
          >
            {expanded ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content Drawer */}
      {expanded && (
        <div className="pb-8 pt-2 px-6 md:px-16 animate-in fade-in duration-300">
          <p className="text-sm md:text-base text-[#475569] leading-relaxed max-w-4xl mb-6 font-sans">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e4ddd1]">
            <span className="text-xs font-sans font-bold text-[#0b1a30] mr-2">Süreç Kapsamı:</span>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-sans px-3 py-1 rounded-full bg-white border border-[#c5a059] text-[#071324] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
