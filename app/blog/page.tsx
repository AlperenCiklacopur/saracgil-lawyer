import React from 'react';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog-service';
import BlogListingClient from '@/components/BlogListingClient';

export const metadata: Metadata = {
  title: 'Hukuki Blog & Makaleler | Melda Saraçgil Hukuk & Danışmanlık',
  description:
    'İcra ve İflas Hukuku, alacak tahsili, çek-senet uyuşmazlıkları ve şirketler için hukuki danışmanlık rehberleri.',
};

export default async function BlogPage() {
  const posts = await getAllPosts(false);

  return (
    <div className="pt-16 pb-24 px-6 md:pt-20 md:pb-32 bg-[#fcfbfa]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Page Header */}
        <div className="mb-14 pb-8 border-b border-[#e4ddd1]">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-2">
            / Hukuki Bilgi Bankası & Yayınlar /
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#071324] mb-4">
            Hukuki Makaleler & İncelemeler
          </h1>
          <p className="text-sm md:text-base text-[#546274] font-sans max-w-3xl leading-relaxed">
            Melda Saraçgil Hukuk & Danışmanlık olarak hazırladığımız güncel hukuki analizler, Yargıtay emsal kararları, icra takip süreleri ve alacak tahsilat stratejileri.
          </p>
        </div>

        {/* Interactive Filter & Grid */}
        <BlogListingClient initialPosts={posts} />
      </div>
    </div>
  );
}
