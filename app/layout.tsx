import type { Metadata } from 'next';
import { Marcellus, Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const marcellus = Marcellus({
  weight: '400',
  variable: '--font-marcellus',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saracgil-lawyer.vercel.app'),
  title: 'Saraçgil Hukuk Bürosu | İcra ve İflas Hukuku',
  description:
    'İstanbul Barosu levhasına kayıtlı Saraçgil Hukuk Bürosu; İcra ve İflas Hukuku, alacak tahsili, kambiyo takipleri ve kurumsal hukuk danışmanlığı alanında uzman ve kararlı çözümler sunar.',
  keywords: [
    'Saraçgil Hukuk Bürosu',
    'Saraçgil Hukuk & Danışmanlık',
    'İstanbul İcra Avukatı',
    'İcra ve İflas Hukuku',
    'Alacak Tahsili',
    'Karşılıksız Çek Şikayeti',
    'İhtiyati Haciz',
    'İstanbul Avukat',
  ],
  authors: [{ name: 'Saraçgil Hukuk Bürosu' }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Saraçgil Hukuk Bürosu',
    description: 'İcra ve İflas Hukuku, Alacak Yönetimi ve Genel Avukatlık Danışmanlığı - İstanbul Barosu',
    type: 'website',
    locale: 'tr_TR',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${marcellus.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfbfa] text-[#071324] font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
