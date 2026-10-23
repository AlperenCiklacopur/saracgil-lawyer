'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface SecretLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecretLoginModal({ isOpen, onClose }: SecretLoginModalProps) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    setError(null);
    setUsername('');
    setPassword('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

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
      handleClose();
    } catch {
      setError('Bağlantı hatası oluştu.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#071324] border border-[#142e54] rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-[#0b1a30] transition-colors"
          title="Kapat (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Official Logo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 p-1 rounded-xl bg-white border border-[#c5a059]/40 shrink-0 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Yönetim Girişi</h3>
              <span className="text-[10px] font-sans uppercase px-2 py-0.5 rounded bg-[#0b1a30] border border-[#142e54] text-[#c5a059] font-bold">
                Gizli Portal
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">Saraçgil Hukuk Bürosu</p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-800 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full px-4 py-2.5 rounded-xl bg-[#0b1a30] border border-[#142e54] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
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
              className="w-full px-4 py-2.5 rounded-xl bg-[#0b1a30] border border-[#142e54] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-brand-gold justify-center py-3.5 text-sm"
            >
              {loading ? (
                <span>Doğrulanıyor...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Panele Giriş Yap</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#142e54] flex items-center justify-between text-[11px] font-sans text-zinc-400">
          <span>Güvenli Oturum</span>
          <span className="text-[#c5a059]">Av. Melda Saraçgil / 2026</span>
        </div>
      </div>
    </div>
  );
}
