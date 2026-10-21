'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SecretLoginModal from './SecretLoginModal';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [secretModalOpen, setSecretModalOpen] = useState(false);

  // Keyboard shortcut Ctrl + Shift + A or Alt + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setSecretModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa] text-[#041117] selection:bg-[#215153] selection:text-white font-sans">
      {/* Show public navbar on non-admin routes */}
      {!isAdmin && <Navbar />}

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Show public footer on non-admin routes */}
      {!isAdmin && (
        <Footer onSecretTrigger={() => setSecretModalOpen(true)} />
      )}

      {/* Secret Login Modal */}
      <SecretLoginModal
        isOpen={secretModalOpen}
        onClose={() => setSecretModalOpen(false)}
      />
    </div>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfbfa] text-[#041117]">{children}</div>}>
      <SiteChrome>{children}</SiteChrome>
    </Suspense>
  );
}
