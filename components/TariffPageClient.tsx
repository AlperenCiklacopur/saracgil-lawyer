'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  FileText, 
  Download, 
  Search, 
  Scale, 
  ShieldCheck, 
  Building2, 
  ArrowUpRight, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Percent,
  Briefcase
} from 'lucide-react';
import { 
  TARIFF_ITEMS, 
  PERCENTAGE_TIERS, 
  calculateProportionalFee, 
  TariffItem 
} from '@/data/tariff-data';

interface ForumOption {
  label: string;
  minFee: number;
}

const FORUM_OPTIONS: ForumOption[] = [
  { label: 'İcra Dairesinde İcra Takibi (Min: 9.000 TL)', minFee: 9000 },
  { label: 'Asliye Mahkemeleri Dava (Min: 45.000 TL)', minFee: 45000 },
  { label: 'Sulh Hukuk Mahkemeleri Dava (Min: 30.000 TL)', minFee: 30000 },
  { label: 'Tüketici Mahkemesi Dava (Min: 22.500 TL)', minFee: 22500 },
  { label: 'İcra Mahkemesi Duruşmalı Dava (Min: 18.000 TL)', minFee: 18000 },
  { label: 'Maktu Taban Olmaksızın (Yalnızca Nispi Oran)', minFee: 0 },
];

export default function TariffPageClient() {
  // Calculator state
  const [claimAmount, setClaimAmount] = useState<number>(500000);
  const [selectedForumIdx, setSelectedForumIdx] = useState<number>(0);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);

  // Directory / Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const selectedForum = FORUM_OPTIONS[selectedForumIdx];
  const calculation = useMemo(() => {
    return calculateProportionalFee(claimAmount, selectedForum.minFee);
  }, [claimAmount, selectedForum]);

  // Filtered tariff items
  const filteredItems = useMemo(() => {
    return TARIFF_ITEMS.filter((item) => {
      const matchesSearch = 
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.itemNo && item.itemNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === 'all') return true;
      if (activeCategory === 'icra-iflas') return item.isEnforcement || item.category === 'icra-iflas';
      return item.category === activeCategory;
    });
  }, [searchQuery, activeCategory]);

  const formatTL = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-[#fcfbfa] min-h-screen text-[#071324]">
      {/* Top Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-[#071324] via-[#0b1a30] to-[#071324] text-white overflow-hidden border-b border-[#142e54]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142e54]/80 border border-[#c5a059]/40 text-[#c5a059] text-xs font-sans font-semibold tracking-wider uppercase">
              <Scale className="w-3.5 h-3.5" />
              <span>Resmî Gazete Tebliği • 4 Kasım 2025 Tarihli</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Avukatlık Asgari <br />
              <span className="text-[#c5a059]">Ücret Tarifesi (AAÜT)</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              Türkiye Barolar Birliği tarafından hazırlanan ve Resmî Gazete&apos;de yayımlanarak yürürlüğe giren güncel Avukatlık Asgari Ücret Tarifesi ve İcra / Dava vekalet ücreti hesaplama tablosu.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="/documents/avukatlik-asgari-ucret-tarifesi-2025-2026.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-brand-gold"
              >
                <Download className="w-4 h-4" />
                <span>Resmî Gazete PDF&apos;ini İndir</span>
              </a>
              <a 
                href="#hesaplama-araci"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-zinc-500 hover:border-[#c5a059] text-white text-xs font-sans font-semibold uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#c5a059]" />
                <span>Nispi Ücret Hesapla</span>
              </a>
            </div>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-[#142e54]">
            <div className="p-4 rounded-2xl bg-[#0b1a30]/80 border border-[#142e54]">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-bold block mb-1">
                İcra Dairesi Takip
              </span>
              <div className="font-serif text-2xl font-bold text-white">9.000 TL</div>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">Maktu Asgari Ücret</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b1a30]/80 border border-[#142e54]">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-bold block mb-1">
                Büroda Sözlü Danışma
              </span>
              <div className="font-serif text-2xl font-bold text-white">4.000 TL</div>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">İlk 1 saate kadar</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b1a30]/80 border border-[#142e54]">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-bold block mb-1">
                Asliye Mahkemeleri
              </span>
              <div className="font-serif text-2xl font-bold text-white">45.000 TL</div>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">Dava Maktu Tabanı</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b1a30]/80 border border-[#142e54]">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-bold block mb-1">
                A.Ş. Zorunlu Avukat
              </span>
              <div className="font-serif text-2xl font-bold text-white">45.000 TL</div>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">Aylık Asgari Ücret</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator Section */}
      <section id="hesaplama-araci" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
              / İnteraktif Hesaplama Aracı /
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#071324]">
              Nispi Vekalet Ücreti Hesaplama
            </h2>
            <p className="text-xs sm:text-sm text-[#546274] font-sans leading-relaxed">
              Konusu para veya para ile değerlendirilebilen icra takipleri ve davalarda, Tarifenin Üçüncü Kısmı uyarınca kademeli olarak hesaplanan yasal asgari vekalet ücreti.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Calculator Controls */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e4ddd1] shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#071324] mb-2">
                  Dava / Takip veya Alacak Miktarı (TL)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-serif font-bold text-[#c5a059]">
                    ₺
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={claimAmount || ''}
                    onChange={(e) => setClaimAmount(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#e4ddd1] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] text-lg font-serif font-bold text-[#071324] outline-none transition-all"
                    placeholder="Miktar giriniz (örn: 500000)"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span className="text-[#546274] font-medium mr-1">Hızlı Seçim:</span>
                  {[100000, 250000, 500000, 1000000, 2500000, 5000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setClaimAmount(preset)}
                      className={`px-3 py-1 rounded-full border transition-colors ${
                        claimAmount === preset
                          ? 'bg-[#0b1a30] text-white border-[#0b1a30]'
                          : 'bg-[#fcfbfa] border-[#e4ddd1] text-[#071324] hover:border-[#c5a059]'
                      }`}
                    >
                      {new Intl.NumberFormat('tr-TR').format(preset)} TL
                    </button>
                  ))}
                </div>
              </div>

              {/* Forum Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#071324] mb-2">
                  Yargı Yeri / Takip Türü (Maktu Taban Kontrolü)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FORUM_OPTIONS.map((opt, idx) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedForumIdx(idx)}
                      className={`text-left p-3 rounded-xl border text-xs font-sans transition-all flex items-start gap-2.5 ${
                        selectedForumIdx === idx
                          ? 'bg-[#0b1a30] text-white border-[#0b1a30] shadow-sm'
                          : 'bg-[#fcfbfa] border-[#e4ddd1] text-[#071324] hover:border-[#c5a059]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        selectedForumIdx === idx ? 'border-[#c5a059] bg-[#c5a059]' : 'border-zinc-400'
                      }`}>
                        {selectedForumIdx === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#0b1a30]" />}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#546274] font-sans mt-2">
                  * Tarife gereğince nispi olarak hesaplanan vekalet ücreti, ilgili mahkeme veya icra dairesinin maktu ücretinin altında kalamaz.
                </p>
              </div>

              {/* Kademeli Dilim Açıklaması */}
              <div className="p-4 rounded-xl bg-[#f6f1e8] border border-[#e4ddd1] text-xs font-sans text-[#546274] space-y-1.5">
                <div className="font-bold text-[#071324] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#c5a059]" />
                  <span>Kademeli Azalan Oran Sistemi (Üçüncü Kısım)</span>
                </div>
                <p>
                  İlk 600.000 TL için %16, sonraki 600.000 TL için %15, 1.2M TL&apos;lik dilimler için %14 ve %13 oranları uygulanarak toplam meblağ kademelendirilir.
                </p>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#071324] via-[#0b1a30] to-[#071324] rounded-3xl p-6 sm:p-8 text-white border-2 border-[#c5a059] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#142e54] pb-4 mb-6">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#c5a059]">
                  Hesaplama Sonucu
                </span>
                <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#142e54] border border-[#c5a059]/40 text-zinc-200">
                  Resmî Asgari Tarife
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-zinc-400 font-sans block mb-1">Hesaplanan Asgari Vekalet Ücreti</span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#c5a059]">
                    {formatTL(calculation.totalFee)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#142e54] text-xs">
                  <div>
                    <span className="text-zinc-400 block mb-0.5">Uyuşmazlık Tutarı:</span>
                    <strong className="text-white font-serif">{formatTL(claimAmount)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block mb-0.5">Efektif Oran:</span>
                    <strong className="text-[#c5a059] font-mono">
                      {claimAmount > 0 ? `%${((calculation.totalFee / claimAmount) * 100).toFixed(2)}` : '%0.00'}
                    </strong>
                  </div>
                </div>

                {calculation.appliedMinimum && (
                  <div className="p-3 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/40 text-xs text-[#e8d7b8] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>
                      Hesaplanan nispi tutar, seçilen takip/dava türünün maktu alt sınırının altında kaldığı için yasal taban olan <strong>{formatTL(selectedForum.minFee)}</strong> uygulanmıştır.
                    </span>
                  </div>
                )}

                {/* Tier Breakdown Table */}
                <div className="pt-4 border-t border-[#142e54]">
                  <div className="flex items-center justify-between mb-3 text-xs font-sans">
                    <span className="text-zinc-300 font-semibold">Dilim Bazında Hesaplama Dökümü</span>
                    <button
                      type="button"
                      onClick={() => setShowBreakdown(!showBreakdown)}
                      className="text-[#c5a059] hover:underline"
                    >
                      {showBreakdown ? 'Gizle' : 'Göster'}
                    </button>
                  </div>

                  {showBreakdown && (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-[11px] font-sans">
                      {calculation.breakdown.length === 0 ? (
                        <div className="text-zinc-400 italic">Miktar girildiğinde dilim dökümü görüntülenecektir.</div>
                      ) : (
                        calculation.breakdown.map((b, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-[#071324] border border-[#142e54] flex items-center justify-between"
                          >
                            <div>
                              <div className="text-white font-medium">{b.range}</div>
                              <div className="text-zinc-400 text-[10px]">
                                {formatTL(b.amountInTier)} × %{b.rate}
                              </div>
                            </div>
                            <div className="text-[#c5a059] font-mono font-bold">
                              {formatTL(b.feeInTier)}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* CTA inside card */}
                <div className="pt-4 border-t border-[#142e54]">
                  <Link
                    href="/iletisim"
                    className="btn-brand-gold w-full text-center py-3 text-xs flex items-center justify-center gap-2"
                  >
                    <span>Dosyanız İçin Danışmanlık Alın</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Percentage Tiers Overview (Üçüncü Kısım Tablosu) */}
      <section className="py-16 px-6 bg-[#f6f1e8] border-y border-[#e4ddd1]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-1">
              / Tarife Üçüncü Kısım /
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071324]">
              Kademeli Nispi Oran Tablosu
            </h3>
            <p className="text-xs text-[#546274] font-sans mt-1">
              Konusu para olan dava ve icra takiplerinde uygulanan resmi kademeli yüzdelik baremler:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e4ddd1] bg-white shadow-sm">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0b1a30] text-white">
                <tr>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Sıra</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Dilim Aralığı</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Uygulanan Oran</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Dilim Tavan Ücreti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4ddd1]">
                {PERCENTAGE_TIERS.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-[#fcfbfa] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#546274]">{idx + 1}.</td>
                    <td className="py-3 px-4 font-semibold text-[#071324]">{tier.range}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f6f1e8] text-[#0b1a30] font-mono font-bold border border-[#c5a059]/40">
                        {tier.rateFormatted}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#546274]">
                      {tier.maxFeeInTier ? formatTL(tier.maxFeeInTier) : 'Sınırsız Bakiye'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complete Maktu Tariff Directory & Search */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e4ddd1] pb-6">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-1">
                / Maktu Ücret Cetveli /
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#071324]">
                Tüm Tarife Kalemleri & Mahkeme Ücretleri
              </h2>
              <p className="text-xs text-[#546274] font-sans mt-1">
                Resmî Gazete&apos;de yayımlanan Birinci ve İkinci Kısım maktu ücretlerinin tamamı.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 text-[#546274] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tarifede ara (örn: icra, ihtiyati haciz, kira)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e4ddd1] bg-white text-xs font-sans focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
            {[
              { id: 'all', label: 'Tüm Kalemler' },
              { id: 'icra-iflas', label: '🏛 İcra & İflas Takipleri' },
              { id: 'danisma-sozlesme', label: 'Danışma & Sözleşmeler' },
              { id: 'mahkemeler', label: 'Mahkeme Dava Vekillikleri' },
              { id: 'sozlesmeli-avukat', label: 'Sözleşmeli / Zorunlu Avukatlık' },
              { id: 'is-takibi', label: 'İş Takibi' },
              { id: 'yuksek-yargi', label: 'İstinaf & Yüksek Yargı' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0b1a30] text-white border-[#0b1a30] shadow-sm font-semibold'
                    : 'bg-white border-[#e4ddd1] text-[#546274] hover:text-[#0b1a30] hover:border-[#c5a059]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          <div className="text-xs text-[#546274] font-sans flex items-center justify-between">
            <span>Toplam <strong>{filteredItems.length}</strong> kalem listeleniyor</span>
            {activeCategory === 'icra-iflas' && (
              <span className="text-[#c5a059] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Saraçgil Hukuk Bürosu Temel Faaliyet Alanı</span>
              </span>
            )}
          </div>

          {/* Grid of Tariff Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between ${
                  item.isEnforcement
                    ? 'border-[#c5a059]/60 shadow-md hover:border-[#c5a059] bg-gradient-to-b from-white to-[#fdfbf7]'
                    : 'border-[#e4ddd1] shadow-sm hover:border-[#c5a059]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f6f1e8] text-[#546274]">
                      Madde {item.itemNo || '•'}
                    </span>
                    {item.isEnforcement && (
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#c5a059] flex items-center gap-1">
                        <Scale className="w-3 h-3" />
                        <span>İcra & Haciz</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#071324] leading-snug mb-2">
                    {item.title}
                  </h4>

                  {item.description && (
                    <p className="text-xs text-[#546274] font-sans leading-relaxed mb-4">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[#f6f1e8] flex items-baseline justify-between mt-4">
                  <span className="text-[11px] text-[#546274] font-sans">
                    {item.unit ? `${item.unit} Ücreti:` : 'Asgari Ücret:'}
                  </span>
                  <div className="font-serif text-xl font-bold text-[#0b1a30]">
                    {item.feeFormatted}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#e4ddd1] p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-[#c5a059] mx-auto" />
              <h4 className="font-serif text-lg font-bold text-[#071324]">Aradığınız Kriterde Kalem Bulunamadı</h4>
              <p className="text-xs text-[#546274] font-sans max-w-sm mx-auto">
                Arama teriminizi sadeleştirip veya filtreleri temizleyerek tekrar deneyebilirsiniz.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="btn-brand-primary text-xs mt-2"
              >
                <span>Filtreleri Sıfırla</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Legal Disclaimer & Ethics Information */}
      <section className="py-16 px-6 bg-[#f6f1e8] border-t border-[#e4ddd1]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e4ddd1] shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#e4ddd1] pb-4">
              <ShieldCheck className="w-6 h-6 text-[#c5a059]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#071324]">
                Avukatlık Kanunu ve Meslek Kuralları Uyarınca Önemli Bilgilendirme
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#546274] font-sans leading-relaxed">
              <div className="space-y-2">
                <strong className="block text-[#071324] font-serif text-sm">
                  1. Asgari Taban Sınırı (1136 S.K. m. 164)
                </strong>
                <p>
                  Avukatlık asgari ücret tarifesi altında vekalet ücreti kararlaştırılamaz. Bu tarifede yer alan tutarlar, avukatın mesleki emeği karşılığında kanunen uygulanması zorunlu en alt yasal sınırları belirler.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="block text-[#071324] font-serif text-sm">
                  2. Akdi Vekalet & Karşı Taraf Vekalet Ücreti
                </strong>
                <p>
                  Dava veya icra takibi sonucunda mahkemece/icra dairesince haksız çıkan tarafa yükletilen vekalet ücreti (karşı yan vekalet ücreti), kanun gereği müvekkil ile avukat arasındaki akdi vekalet ücretinden bağımsız olarak avukata aittir.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="block text-[#071324] font-serif text-sm">
                  3. Vergi ve Masraf Sorumluluğu
                </strong>
                <p>
                  Tarifede gösterilen ücretlere Katma Değer Vergisi (KDV) ayrıca ilave edilir. Dava ve takip işlemlerinde harç, keşif, bilirkişi, tebligat ve haciz masrafları müvekkile aittir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#071324] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0b1a30] rounded-3xl p-10 md:p-14 border border-[#142e54] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
                / Hukuki Danışmanlık & Alacak İncelemesi /
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Alacağınız veya Uyuşmazlığınız İçin <br />
                <span className="text-[#c5a059]">Net Ücret ve Süreç Değerlendirmesi Alın</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                İcra takipleri, çek-senet tahsilatları veya ticari davalarınız için dosyanızı ön değerlendirmeye alıyor, kanuni asgari tarifeye uygun ve şeffaf çalışma koşullarımızı paylaşıyoruz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/iletisim" className="btn-brand-gold text-center">
                <span>Ön Değerlendirme Formu</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
