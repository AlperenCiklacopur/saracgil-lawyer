'use client';

import React from 'react';
import { Landmark } from 'lucide-react';

interface MarqueeTickerProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  'MELDA SARAÇGİL HUKUK & DANIŞMANLIK',
  'İCRA VE İFLAS HUKUKU',
  'ALACAK TAHSİLATI & TAKİP SÜREÇLERİ',
  'KAMBİYO SENETLERİ (ÇEK - BONO)',
  'İHTİYATİ HACİZ & ACİL MUHAFAZA TEDBİRLERİ',
  'KURUMSAL PORTFÖY YÖNETİMİ',
  'İTİRAZIN İPTALİ & MENFİ TESPİT',
  'KONKORDATO & YENİDEN YAPILANDIRMA',
  'GAZİANTEP & 81 İLDE ADLİ OPERASYON',
];

export default function MarqueeTicker({
  items = DEFAULT_ITEMS,
  className = '',
}: MarqueeTickerProps) {
  return (
    <div className={`w-full overflow-hidden bg-[#0b1a30] text-white py-4 select-none border-y border-[#142e54] ${className}`}>
      <div className="flex animate-marquee-brand whitespace-nowrap">
        {/* First set */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <div key={`item-1-${idx}`} className="flex items-center gap-8">
              <span className="font-serif text-lg md:text-xl font-normal tracking-wider text-white flex items-center gap-3">
                <Landmark className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="hover:text-[#c5a059] transition-colors">{item}</span>
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate set for infinite loop */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <div key={`item-2-${idx}`} className="flex items-center gap-8">
              <span className="font-serif text-lg md:text-xl font-normal tracking-wider text-white flex items-center gap-3">
                <Landmark className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="hover:text-[#c5a059] transition-colors">{item}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
