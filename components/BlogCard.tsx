import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { ArrowUpRight, Calendar, User, Clock } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post }: BlogCardProps) {
  const fallbackImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="group bg-white border border-[#e4ddd1] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-[#f6f1e8]">
          <img
            src={post.coverImage || fallbackImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category Tag */}
          <span className="absolute top-4 left-4 bg-[#0b1a30] text-[#c5a059] font-sans text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-[#c5a059]/40">
            {post.category}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-7">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs font-sans text-[#546274] mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`} className="block group-hover:text-[#0b1a30] transition-colors">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#071324] mb-3 leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-[#546274] font-sans leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer / Read More */}
      <div className="px-6 md:px-7 pb-6 pt-4 border-t border-[#f6f1e8] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-sans text-[#071324] font-medium">
          <User className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Av. Melda Saraçgil</span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#0b1a30] hover:text-[#c5a059] transition-colors group/link"
        >
          <span>İncele</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
