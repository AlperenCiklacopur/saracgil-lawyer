'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSecretTrigger?: () => void;
}

export default function Footer({ onSecretTrigger }: FooterProps) {
  return (
    <footer className="w-full bg-[#071324] text-white pt-20 pb-12 border-t border-[#142e54]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Big Typography & Logo Header */}
        <div className="border-b border-[#142e54] pb-12 mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="h-16 sm:h-20 p-1.5 rounded-2xl bg-[#0b1a30] border border-[#c5a059]/40 shadow-xl overflow-hidden shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Melda Saraçgil Hukuk & Danışmanlık"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] block mb-1 font-bold">
                  / Hukuki Çözüm & Alacak Yönetimi /
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide font-bold">
                  Melda Saraçgil Hukuk & Danışmanlık
                </h2>
              </div>
            </div>

            <Link
              href="/iletisim"
              className="btn-brand-gold self-start md:self-auto shrink-0"
            >
              <span>Hukuki Danışmanlık Al</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-[#142e54] text-sm font-sans">
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white tracking-wider flex items-center gap-2">
              <span className="text-[#c5a059]">🏛</span>
              <span>SARAÇGİL HUKUK</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Gaziantep merkezli olup başta İcra ve İflas Hukuku olmak üzere, alacak tahsili ve genel avukatlık hizmetlerinde disiplinli, şeffaf ve sonuç odaklı çözümler üretmekteyiz.
            </p>
            <div className="pt-2">
              <span className="text-xs text-[#c5a059] font-semibold block">Kurucu Avukat:</span>
              <span className="text-sm font-serif text-white font-bold">Av. Melda Saraçgil</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5 pb-2 border-b border-[#142e54] inline-block">
              Uzmanlık Alanları
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  İlamlı ve İlamsız İcra Takipleri
                </Link>
              </li>
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  Kambiyo Senetleri (Çek & Bono)
                </Link>
              </li>
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  İhtiyati Haciz & Acil Muhafaza
                </Link>
              </li>
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  İtirazın İptali & Menfi Tespit
                </Link>
              </li>
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  İflas ve Konkordato Danışmanlığı
                </Link>
              </li>
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  Kurumsal Alacak & Portföy Yönetimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5 pb-2 border-b border-[#142e54] inline-block">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li>
                <Link href="/" className="hover:text-[#c5a059] transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/#hakkimizda" className="hover:text-[#c5a059] transition-colors">
                  Hakkımızda & Av. Melda Saraçgil
                </Link>
              </li>
              <li>
                <Link href="/#faaliyet-alanlari" className="hover:text-[#c5a059] transition-colors">
                  Faaliyet Alanları
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#c5a059] transition-colors">
                  Hukuki Blog & Makaleler
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-[#c5a059] transition-colors">
                  İletişim & Lokasyon
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5 pb-2 border-b border-[#142e54] inline-block">
              Ofis & İletişim
            </h4>
            <ul className="space-y-3.5 text-xs text-zinc-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Şehitkamil / Gaziantep, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="mailto:saracgilhukuk@gmail.com" className="hover:text-[#c5a059] transition-colors">
                  saracgilhukuk@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Hafta İçi: 08:30 – 18:00</span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-[11px] text-[#c5a059]">
                <ShieldCheck className="w-4 h-4" />
                <span>UYAP & Türkiye Geneli Adli Operasyon</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Secret Trigger Dot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-400">
          <div>
            © 2026 MELDA SARAÇGİL HUKUK & DANIŞMANLIK. TÜM HAKLARI SAKLIDIR.
            {/* Secret button dot */}
            <button
              type="button"
              onClick={onSecretTrigger}
              className="inline-block ml-1 text-[#142e54] hover:text-[#c5a059] transition-colors cursor-pointer select-none px-1 text-base leading-none"
              title="Yönetim"
              aria-label="Gizli Portal"
            >
              •
            </button>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Gaziantep Barosu</span>
            <span>/</span>
            <span>TBB Meslek Kuralları</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
