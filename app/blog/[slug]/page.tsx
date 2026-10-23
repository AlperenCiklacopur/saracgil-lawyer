import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog-service';
import { ArrowLeft, Clock, Calendar, ArrowUpRight, AlertTriangle } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts(true);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Makale Bulunamadı | Saraçgil Hukuk Bürosu',
    };
  }

  return {
    title: `${post.title} | Saraçgil Hukuk Bürosu`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts(false);
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const renderFormattedContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-[#071324] mt-10 mb-4 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-serif text-xl sm:text-2xl font-semibold text-[#0b1a30] mt-8 mb-3 tracking-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={idx} className="font-serif text-lg font-semibold text-[#071324] mt-6 mb-2">
            {trimmed.replace('#### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-6 p-5 rounded-2xl bg-[#f6f1e8] border-l-4 border-[#c5a059] text-[#071324] italic text-sm font-serif">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((item) => item.replace(/^[*-]\s+/, ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2.5 my-4 text-[#546274] text-sm sm:text-base leading-relaxed font-sans">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#071324] font-semibold">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map((item) => item.replace(/^\d+\.\s+/, ''));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2.5 my-4 text-[#546274] text-sm sm:text-base leading-relaxed font-sans">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#071324] font-semibold">$1</strong>') }} />
              </li>
            ))}
          </ol>
        );
      }

      return (
        <p
          key={idx}
          className="text-[#546274] text-sm sm:text-base leading-relaxed mb-4 font-sans"
          dangerouslySetInnerHTML={{
            __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#071324] font-semibold">$1</strong>'),
          }}
        />
      );
    });
  };

  return (
    <article className="pt-16 pb-24 px-6 md:pt-20 md:pb-32 bg-[#fcfbfa]">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0b1a30] hover:text-[#c5a059] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tüm Makalelere Dön</span>
          </Link>
        </div>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-sans">
          <span className="px-3.5 py-1 rounded-full bg-[#0b1a30] text-[#c5a059] font-bold uppercase tracking-wider text-[11px] border border-[#c5a059]/40">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-[#546274]">
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-[#546274]">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#071324] mb-8 leading-[1.18]">
          {post.title}
        </h1>

        {/* Author Bar with Official Logo Emblem */}
        <div className="flex items-center justify-between py-5 border-y border-[#e4ddd1] mb-10">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white border border-[#c5a059]/50 overflow-hidden p-1 shrink-0 flex items-center justify-center">
              <img
                src="/images/logo.png?v=2"
                alt="Saraçgil Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-[#071324]">{post.author.name}</div>
              <div className="text-xs text-[#c5a059] font-sans font-bold">{post.author.title}</div>
            </div>
          </div>
          <div className="hidden sm:block text-xs font-sans text-[#546274]">
            İstanbul Barosu • Saraçgil Hukuk Bürosu
          </div>
        </div>

        {/* Article Body */}
        <div className="prose max-w-none mb-14 text-[#546274]">
          {renderFormattedContent(post.content)}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-6 rounded-2xl bg-[#f6f1e8] border border-[#e4ddd1] mb-14 flex items-start gap-4 text-xs text-[#546274] leading-relaxed font-sans">
          <AlertTriangle className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#071324] font-semibold block mb-1">Yasal Bilgilendirme ve Uyarı:</strong>
            Bu makalede sunulan açıklamalar genel bilgilendirme amacıyla kaleme alınmış olup, hukuki mütalaa veya avukatlık tavsiyesi teşkil etmez. Her hukuki uyuşmazlığın kendine özgü koşulları bulunduğundan, hak kaybına uğramamak adına somut dosyanız için Saraçgil Hukuk Bürosu ile irtibata geçmeniz tavsiye olunur.
          </div>
        </div>

        {/* Call to action card in Midnight Navy + Gold */}
        <div className="bg-[#0b1a30] text-white rounded-3xl p-8 sm:p-10 mb-14 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#142e54]">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-1">Bu Konuda Hukuki Desteğe mi İhtiyacınız Var?</h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-md">
              İcra takipleri, itirazlar ve tahsilat süreçleriniz için profesyonel dosya incelemesi talep edin.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="btn-brand-gold shrink-0"
          >
            <span>Danışmanlık Al</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-[#e4ddd1]">
            <h3 className="font-serif text-2xl font-bold text-[#071324] mb-6">Diğer Hukuki Makaleler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="p-6 rounded-2xl border border-[#e4ddd1] bg-white hover:shadow-lg transition-all group block"
                >
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#c5a059] block mb-2">
                    {related.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#071324] group-hover:text-[#0b1a30] line-clamp-2 mb-3">
                    {related.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-sans text-[#546274]">
                    <span>{related.date}</span>
                    <span>•</span>
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
