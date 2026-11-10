import React from 'react';
import type { Metadata } from 'next';
import TariffPageClient from '@/components/TariffPageClient';

export const metadata: Metadata = {
  title: 'Avukatlık Asgari Ücret Tarifesi (AAÜT) & Hesaplama | Saraçgil Hukuk Bürosu',
  description:
    '4 Kasım 2025 tarihli Resmî Gazete\'de yayımlanan güncel Avukatlık Asgari Ücret Tarifesi (AAÜT). İcra takibi, dava vekalet ücreti ve nispi avukatlık ücreti hesaplama tablosu.',
  keywords: [
    'Avukatlık Asgari Ücret Tarifesi',
    'AAÜT',
    'Avukatlık Asgari Ücret Hesaplama',
    'İcra Takibi Vekalet Ücreti',
    'Nispi Vekalet Ücreti',
    'Resmî Gazete Avukatlık Ücret Tarifesi',
    'Saraçgil Hukuk Bürosu',
    'Avukat Danışma Ücreti',
  ],
  openGraph: {
    title: 'Avukatlık Asgari Ücret Tarifesi (AAÜT) & Hesaplama | Saraçgil Hukuk',
    description:
      'Resmî Gazete\'de yayımlanan güncel Avukatlık Asgari Ücret Tarifesi ve interaktif nispi vekalet ücreti hesaplayıcı.',
    type: 'website',
  },
};

export default function AsgariUcretTarifesiPage() {
  return <TariffPageClient />;
}
