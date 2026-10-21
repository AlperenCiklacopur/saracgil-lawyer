'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from '@/components/BlogCard';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
}

export default function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialPosts.map((p) => p.category)));
    return ['Tümü', ...cats];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Tümü' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* Search and Category Filters Bar */}
      <div className="mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-8 border-b border-[#e4dfd7]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#215153] text-white shadow-sm'
                  : 'bg-white border border-[#e4dfd7] text-[#041117] hover:border-[#cdb091] hover:text-[#215153]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cdb091]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Makale veya konu ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#e4dfd7] text-xs text-[#041117] placeholder-[#5e666b] focus:outline-none focus:border-[#215153] transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#5e666b] hover:text-[#041117]"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between mb-8 text-xs font-sans text-[#5e666b]">
        <span className="flex items-center gap-2 font-medium">
          <BookOpen className="w-4 h-4 text-[#cdb091]" />
          <span>Toplam {filteredPosts.length} Hukuki Makale Listeleniyor</span>
        </span>
        <span className="text-[#cdb091] font-semibold">Av. Melda Saraçgil Bilgi Bankası</span>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.id} post={post} index={idx} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-[#e4dfd7] rounded-2xl bg-white">
          <SlidersHorizontal className="w-10 h-10 text-[#cdb091] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#041117] mb-1">Aramanıza Uygun Makale Bulunamadı</h3>
          <p className="text-xs text-[#5e666b] font-sans">Farklı bir anahtar kelime veya kategori seçebilirsiniz.</p>
        </div>
      )}
    </div>
  );
}
