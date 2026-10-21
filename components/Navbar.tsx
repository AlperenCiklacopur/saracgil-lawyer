'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MapPin, 
  Mail, 
  Clock, 
  ArrowUpRight, 
  Menu, 
  X,
  Phone,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hakkımızda', href: '/#hakkimizda' },
    { label: 'Faaliyet Alanları', href: '/#faaliyet-alanlari' },
    { label: 'Hukuki Blog', href: '/blog' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className="w-full relative z-40 bg-white">
      {/* Topbar in Deep Brand Midnight Navy */}
      <div className="hidden lg:block bg-[#071324] text-white border-b border-[#142e54] py-2 px-6 text-[12px] font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-zinc-300">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Şehitkamil / Gaziantep, Türkiye</span>
            </span>
            <span className="text-[#142e54]">|</span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
              <a href="mailto:saracgilhukuk@gmail.com" className="hover:text-[#c5a059] transition-colors">
                saracgilhukuk@gmail.com
              </a>
            </span>
            <span className="text-[#142e54]">|</span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>UYAP & Türkiye Geneli İcra Takip Ağı</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-zinc-300">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Hafta İçi: 08:30 – 18:00</span>
            </span>
            <span className="text-[#142e54]">|</span>
            <Link 
              href="/iletisim" 
              className="text-[#c5a059] hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hukuki Danışmanlık Talebi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 bg-white ${
          scrolled 
            ? 'fixed top-0 left-0 right-0 shadow-lg border-b border-[#e4ddd1] py-3' 
            : 'relative border-b border-[#e4ddd1] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with uploaded official logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 sm:h-14 overflow-hidden rounded-lg border border-[#c5a059]/40 shadow-sm transition-transform group-hover:scale-[1.02] bg-[#0b1a30] p-1 flex items-center">
              <img
                src="/images/logo.jpg"
                alt="Melda Saraçgil Hukuk & Danışmanlık"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-[#0b1a30] leading-tight">
                MELDA SARAÇGİL
              </span>
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#c5a059] font-bold">
                Hukuk & Danışmanlık
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] lg:text-[14px] font-medium tracking-wide transition-colors relative py-1 ${
                    isActive 
                      ? 'text-[#0b1a30] font-semibold' 
                      : 'text-[#546274] hover:text-[#0b1a30]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/iletisim"
              className="btn-brand-primary hidden sm:inline-flex text-xs"
            >
              <span>Randevu Al</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg border border-[#e4ddd1] text-[#0b1a30] hover:bg-[#f6f1e8] transition-colors"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[69px] bg-white border-b border-[#e4ddd1] p-6 shadow-2xl z-50 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif font-medium text-[#071324] hover:text-[#0b1a30] py-2 border-b border-[#f6f1e8]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-brand-primary w-full text-center justify-center py-3"
              >
                <span>Hukuki Danışmanlık Al</span>
                <ArrowUpRight className="w-4 h-4 ml-1 text-[#c5a059]" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
