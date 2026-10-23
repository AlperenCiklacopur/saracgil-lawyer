'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError('Bağlantı hatası oluştu.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071324] flex items-center justify-center p-6 relative font-sans text-white">
      {/* Back to site */}
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-zinc-300 hover:text-[#c5a059] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Siteye Dön</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#0b1a30] border border-[#142e54] rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 p-1.5 rounded-2xl bg-white border border-[#c5a059]/40 shrink-0 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-white tracking-wide">Saraçgil Hukuk</h1>
            <p className="text-xs text-[#c5a059] font-sans font-bold tracking-wider mt-0.5 uppercase">Yönetim Portalı</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-sans uppercase text-[#c5a059] mb-1.5 tracking-wider font-semibold">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#071324] border border-[#142e54] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-sans uppercase text-[#c5a059] mb-1.5 tracking-wider font-semibold">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#071324] border border-[#142e54] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-brand-gold justify-center py-3.5 text-sm"
          >
            {loading ? (
              <span>Giriş Yapılıyor...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Yönetici Girişi</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#142e54] flex items-center justify-between text-[11px] font-sans text-zinc-400">
          <span>Güvenli Oturum</span>
          <span className="text-[#c5a059]">Av. Melda Saraçgil / 2026</span>
        </div>
      </div>
    </div>
  );
}
