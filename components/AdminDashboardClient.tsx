'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost, BlogPostInput } from '@/types/blog';
import { CaseStudy, CaseStudyInput } from '@/types/case';
import { Inquiry, InquiryStatus } from '@/types/inquiry';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  LogOut, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  ExternalLink,
  BookOpen,
  Briefcase,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Inbox,
  CheckCircle2
} from 'lucide-react';

interface AdminDashboardClientProps {
  initialPosts: BlogPost[];
  initialCases: CaseStudy[];
  initialInquiries?: Inquiry[];
  username: string;
}

function formatPhoneForWhatsapp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('90')) return digits;
  if (digits.startsWith('0')) return '9' + digits;
  if (digits.length === 10) return '90' + digits;
  return digits;
}

export default function AdminDashboardClient({
  initialPosts,
  initialCases,
  initialInquiries = [],
  username,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'posts' | 'cases'>('inquiries');
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [cases, setCases] = useState<CaseStudy[]>(initialCases);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Inquiries state
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | InquiryStatus>('all');
  const [inquiryNoteText, setInquiryNoteText] = useState('');

  // Post modal & form state
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [postFormData, setPostFormData] = useState<BlogPostInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'İcra Hukuku',
    readTime: '5 dk okuma',
    date: '20 Ekim 2026',
    author: {
      name: 'Av. Melda Saraçgil',
      title: 'Kurucu Avukat / İcra & İflas Departmanı',
    },
    published: true,
    featured: false,
  });

  // Case modal & form state
  const [isCreatingCase, setIsCreatingCase] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [deletingCaseId, setDeletingCaseId] = useState<string | null>(null);
  const [caseFormData, setCaseFormData] = useState<CaseStudyInput>({
    title: '',
    category: 'İcra Hukuku',
    summary: '',
    outcome: '',
    date: '2026',
    published: true,
  });

  // --- INQUIRY HANDLERS ---
  const handleOpenInquiryDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setInquiryNoteText(inquiry.notes || '');
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: InquiryStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Durum güncellenemedi.');
      }

      setInquiries((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(data.inquiry);
      }
      setStatusMessage({ type: 'success', text: 'Talep durumu güncellendi.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Hata oluştu.";
      setStatusMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInquiryNotes = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: inquiryNoteText }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Not kaydedilemedi.');
      }

      setInquiries((prev) => prev.map((item) => (item.id === id ? data.inquiry : item)));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(data.inquiry);
      }
      setStatusMessage({ type: 'success', text: 'Avukat notu kaydedildi.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Hata oluştu.";
      setStatusMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Silme işlemi başarısız.');
      }

      setInquiries((prev) => prev.filter((item) => item.id !== id));
      setDeletingInquiryId(null);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      setStatusMessage({ type: 'success', text: 'Talep kaydı silindi.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Hata oluştu.";
      setStatusMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  // --- POST HANDLERS ---
  const handleOpenCreatePost = () => {
    setPostFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'İcra Hukuku',
      readTime: '5 dk okuma',
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: {
        name: 'Av. Melda Saraçgil',
        title: 'Kurucu Avukat / İcra & İflas Departmanı',
      },
      published: true,
      featured: false,
    });
    setEditingPost(null);
    setIsCreatingPost(true);
    setStatusMessage(null);
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setPostFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      date: post.date,
      author: post.author,
      coverImage: post.coverImage,
      published: post.published,
      featured: post.featured,
    });
    setEditingPost(post);
    setIsCreatingPost(true);
    setStatusMessage(null);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      if (editingPost) {
        const res = await fetch(`/api/blog/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postFormData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Güncelleme başarısız.');
        }

        setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? data.post : p)));
        setStatusMessage({ type: 'success', text: 'Makale başarıyla güncellendi.' });
      } else {
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postFormData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Kayıt başarısız.');
        }

        setPosts((prev) => [data.post, ...prev]);
        setStatusMessage({ type: 'success', text: 'Yeni makale başarıyla yayınlandı.' });
      }

      setIsCreatingPost(false);
      setEditingPost(null);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bir hata oluştu.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Silme işlemi başarısız.');
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeletingPostId(null);
      setStatusMessage({ type: 'success', text: 'Makale silindi.' });
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Silme hatası.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  // --- CASE HANDLERS ---
  const handleOpenCreateCase = () => {
    setCaseFormData({
      title: '',
      category: 'İcra Hukuku',
      summary: '',
      outcome: '',
      date: '2026',
      published: true,
    });
    setEditingCase(null);
    setIsCreatingCase(true);
    setStatusMessage(null);
  };

  const handleOpenEditCase = (caseItem: CaseStudy) => {
    setCaseFormData({
      title: caseItem.title,
      category: caseItem.category,
      summary: caseItem.summary,
      outcome: caseItem.outcome,
      date: caseItem.date,
      published: caseItem.published,
    });
    setEditingCase(caseItem);
    setIsCreatingCase(true);
    setStatusMessage(null);
  };

  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      if (editingCase) {
        const res = await fetch(`/api/cases/${editingCase.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(caseFormData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Güncelleme başarısız.');
        }

        setCases((prev) => prev.map((c) => (c.id === editingCase.id ? data.caseStudy : c)));
        setStatusMessage({ type: 'success', text: 'Emsal karar başarıyla güncellendi.' });
      } else {
        const res = await fetch('/api/cases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(caseFormData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Kayıt başarısız.');
        }

        setCases((prev) => [data.caseStudy, ...prev]);
        setStatusMessage({ type: 'success', text: 'Yeni emsal karar eklendi.' });
      }

      setIsCreatingCase(false);
      setEditingCase(null);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bir hata oluştu.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCase = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cases/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Silme işlemi başarısız.');
      }

      setCases((prev) => prev.filter((c) => c.id !== id));
      setDeletingCaseId(null);
      setStatusMessage({ type: 'success', text: 'Emsal karar silindi.' });
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Silme hatası.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((item) => {
    if (inquiryFilter === 'all') return true;
    return item.status === inquiryFilter;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'yeni').length;

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'yeni':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            Yeni Talep
          </span>
        );
      case 'arandi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold uppercase tracking-wider">
            <Phone className="w-2.5 h-2.5" />
            Arandı / Görüşüldü
          </span>
        );
      case 'randevu_verildi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider">
            <Calendar className="w-2.5 h-2.5" />
            Randevu Verildi
          </span>
        );
      case 'tamamlandi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-300 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Tamamlandı
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#071324] p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#e4ddd1]">
          <div className="flex items-center gap-4">
            <div className="h-16 p-1.5 rounded-2xl bg-[#0b1a30] border border-[#c5a059]/40 shadow-md shrink-0">
              <img
                src="/images/logo.jpg"
                alt="Melda Saraçgil Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#071324] tracking-wide">
                  Melda Saraçgil Hukuk & Danışmanlık
                </h1>
                <span className="text-[11px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#f6f1e8] border border-[#c5a059] text-[#0b1a30]">
                  Yönetim Paneli
                </span>
              </div>
              <p className="text-xs text-[#546274] font-sans mt-0.5">
                Randevular, Makaleler ve Emsal Kararlar • Aktif Kullanıcı: <strong className="text-[#0b1a30]">{username}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#e4ddd1] text-xs font-bold uppercase tracking-wider text-[#0b1a30] hover:border-[#c5a059] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Sitede Gör</span>
            </Link>

            {activeTab === 'posts' && (
              <button
                onClick={handleOpenCreatePost}
                className="btn-brand-primary text-xs"
              >
                <Plus className="w-4 h-4 text-[#c5a059]" />
                <span>Yeni Makale Yaz</span>
              </button>
            )}

            {activeTab === 'cases' && (
              <button
                onClick={handleOpenCreateCase}
                className="btn-brand-primary text-xs"
              >
                <Plus className="w-4 h-4 text-[#c5a059]" />
                <span>Yeni Emsal Karar Ekle</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700 hover:bg-red-100 transition-colors"
              title="Oturumu Kapat"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#e4ddd1] pb-4">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'inquiries'
                ? 'bg-[#0b1a30] text-[#c5a059] shadow-md'
                : 'bg-white border border-[#e4ddd1] text-[#546274] hover:text-[#0b1a30]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Gelen Başvurular & Randevular ({inquiries.length})</span>
            {newInquiriesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-[#071324] text-[10px] flex items-center justify-center font-bold">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'posts'
                ? 'bg-[#0b1a30] text-[#c5a059] shadow-md'
                : 'bg-white border border-[#e4ddd1] text-[#546274] hover:text-[#0b1a30]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Hukuki Makaleler ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'cases'
                ? 'bg-[#0b1a30] text-[#c5a059] shadow-md'
                : 'bg-white border border-[#e4ddd1] text-[#546274] hover:text-[#0b1a30]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Emsal Kararlar & Dosyalar ({cases.length})</span>
          </button>
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between font-medium ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================= INQUIRIES TAB ======================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Top Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#e4ddd1] shadow-sm">
                <span className="text-[11px] font-sans uppercase font-bold text-[#546274] block">Toplam Talep</span>
                <span className="font-serif text-2xl font-bold text-[#071324] mt-1 block">{inquiries.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-sm">
                <span className="text-[11px] font-sans uppercase font-bold text-amber-800 block">Yeni / İncelenmemiş</span>
                <span className="font-serif text-2xl font-bold text-amber-900 mt-1 block">
                  {inquiries.filter((i) => i.status === 'yeni').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-sm">
                <span className="text-[11px] font-sans uppercase font-bold text-blue-800 block">Arandı / İletişimde</span>
                <span className="font-serif text-2xl font-bold text-blue-900 mt-1 block">
                  {inquiries.filter((i) => i.status === 'arandi').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-sm">
                <span className="text-[11px] font-sans uppercase font-bold text-emerald-800 block">Randevu Verildi</span>
                <span className="font-serif text-2xl font-bold text-emerald-900 mt-1 block">
                  {inquiries.filter((i) => i.status === 'randevu_verildi').length}
                </span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {(['all', 'yeni', 'arandi', 'randevu_verildi', 'tamamlandi'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setInquiryFilter(filterKey)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-colors ${
                    inquiryFilter === filterKey
                      ? 'bg-[#0b1a30] text-white'
                      : 'bg-white border border-[#e4ddd1] text-[#546274] hover:text-[#071324]'
                  }`}
                >
                  {filterKey === 'all' && `Tümü (${inquiries.length})`}
                  {filterKey === 'yeni' && `Yeni (${inquiries.filter((i) => i.status === 'yeni').length})`}
                  {filterKey === 'arandi' && `Arandı (${inquiries.filter((i) => i.status === 'arandi').length})`}
                  {filterKey === 'randevu_verildi' && `Randevu (${inquiries.filter((i) => i.status === 'randevu_verildi').length})`}
                  {filterKey === 'tamamlandi' && `Tamamlandı (${inquiries.filter((i) => i.status === 'tamamlandi').length})`}
                </button>
              ))}
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length === 0 ? (
              <div className="p-16 rounded-3xl bg-white border border-[#e4ddd1] text-center space-y-4">
                <Inbox className="w-12 h-12 text-[#c5a059] mx-auto opacity-50" />
                <h3 className="font-serif text-xl font-bold text-[#071324]">Henüz Başvuru Bulunmuyor</h3>
                <p className="text-xs text-[#546274] max-w-md mx-auto">
                  Web sitenizin iletişim sayfasındaki ön değerlendirme formu doldurulduğunda talepler burada anlık olarak listelenecektir.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-[#e4ddd1] shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        {getStatusBadge(item.status)}
                        <span className="text-xs font-sans text-zinc-400">
                          {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">#{item.id}</span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-2 pt-1">
                        <h3 className="font-serif text-lg font-bold text-[#071324]">{item.name}</h3>
                        <span className="text-xs text-[#c5a059] font-sans font-bold">• {item.subject}</span>
                      </div>

                      <p className="text-xs text-[#546274] font-sans line-clamp-2 max-w-3xl leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-sans">
                        <a
                          href={`tel:${item.phone}`}
                          className="inline-flex items-center gap-1.5 text-[#0b1a30] font-bold hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{item.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${formatPhoneForWhatsapp(item.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-600 font-bold hover:underline"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`mailto:${item.email}`}
                          className="inline-flex items-center gap-1.5 text-[#546274] hover:text-[#071324]"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>{item.email}</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#f6f1e8]">
                      <button
                        onClick={() => handleOpenInquiryDetails(item)}
                        className="px-4 py-2 rounded-xl bg-[#0b1a30] text-[#c5a059] font-sans text-xs font-bold hover:bg-[#071324] transition-colors"
                      >
                        İncele & İşlem Yap
                      </button>
                      <button
                        onClick={() => setDeletingInquiryId(item.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Talebi Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================= POSTS TAB CONTENT ======================= */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="p-16 rounded-3xl bg-white border border-[#e4ddd1] text-center space-y-4">
                <FileText className="w-12 h-12 text-[#c5a059] mx-auto opacity-50" />
                <h3 className="font-serif text-xl font-bold text-[#071324]">Henüz Makale Bulunmuyor</h3>
                <p className="text-xs text-[#546274] max-w-md mx-auto">
                  Yeni makale yaz butonuna tıklayarak ilk hukuki makalenizi yayınlayabilirsiniz.
                </p>
                <button onClick={handleOpenCreatePost} className="btn-brand-primary text-xs">
                  <span>İlk Makaleyi Yaz</span>
                </button>
              </div>
            ) : (
              <div className="bg-white border border-[#e4ddd1] rounded-2xl overflow-hidden shadow-sm divide-y divide-[#e4ddd1]">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#fcfbfa] transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-sans uppercase font-bold text-[#c5a059] tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-xs text-zinc-400 font-sans">•</span>
                        <span className="text-xs text-zinc-500 font-sans">{post.date}</span>
                        {post.published ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle className="w-3 h-3" /> Yayında
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Clock className="w-3 h-3" /> Taslak
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#071324] leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#546274] font-sans line-clamp-1 max-w-2xl">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2.5 rounded-xl border border-[#e4ddd1] text-[#071324] hover:bg-white hover:border-[#c5a059] transition-colors"
                        title="Makaleyi Gör"
                      >
                        <Eye className="w-4 h-4 text-[#c5a059]" />
                      </Link>

                      <button
                        onClick={() => handleOpenEditPost(post)}
                        className="p-2.5 rounded-xl border border-[#e4ddd1] text-[#071324] hover:bg-white hover:border-[#c5a059] transition-colors"
                        title="Düzenle"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeletingPostId(post.id)}
                        className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================= CASES TAB CONTENT ======================= */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            {cases.length === 0 ? (
              <div className="p-16 rounded-3xl bg-white border border-[#e4ddd1] text-center space-y-4">
                <Briefcase className="w-12 h-12 text-[#c5a059] mx-auto opacity-50" />
                <h3 className="font-serif text-xl font-bold text-[#071324]">Henüz Emsal Karar Bulunmuyor</h3>
                <p className="text-xs text-[#546274] max-w-md mx-auto">
                  Asılsız veriler kaldırılmıştır. Dilediğiniz zaman gerçek emsal dosya ve hukuki kararlarınızı buradan ekleyebilirsiniz.
                </p>
                <button onClick={handleOpenCreateCase} className="btn-brand-primary text-xs">
                  <span>İlk Emsal Kararı Ekle</span>
                </button>
              </div>
            ) : (
              <div className="bg-white border border-[#e4ddd1] rounded-2xl overflow-hidden shadow-sm divide-y divide-[#e4ddd1]">
                {cases.map((c) => (
                  <div
                    key={c.id}
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#fcfbfa] transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-sans uppercase font-bold text-[#c5a059] tracking-wider">
                          {c.category}
                        </span>
                        <span className="text-xs text-zinc-400 font-sans">•</span>
                        <span className="text-xs text-zinc-500 font-sans">{c.date}</span>
                        {c.published ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle className="w-3 h-3" /> Sitede Yayında
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Clock className="w-3 h-3" /> Taslak (Gizli)
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#071324] leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-[#546274] font-sans line-clamp-1 max-w-2xl">
                        {c.summary}
                      </p>
                      <p className="text-xs text-[#0b1a30] font-sans font-semibold">
                        Sonuç: {c.outcome}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => handleOpenEditCase(c)}
                        className="p-2.5 rounded-xl border border-[#e4ddd1] text-[#071324] hover:bg-white hover:border-[#c5a059] transition-colors"
                        title="Düzenle"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeletingCaseId(c.id)}
                        className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================= INQUIRY DETAIL MODAL ======================= */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white border border-[#e4ddd1] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-sans max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-[#e4ddd1]">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    {getStatusBadge(selectedInquiry.status)}
                    <span className="text-xs text-zinc-400">#{selectedInquiry.id}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#071324]">{selectedInquiry.name}</h3>
                  <p className="text-xs text-[#c5a059] font-bold mt-0.5">{selectedInquiry.subject}</p>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-full text-[#546274] hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fast Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0b1a30] text-[#c5a059] text-xs font-bold hover:bg-[#071324] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hemen Telefonla Ara</span>
                </a>
                <a
                  href={`https://wa.me/${formatPhoneForWhatsapp(selectedInquiry.phone)}?text=${encodeURIComponent(
                    `Sayın ${selectedInquiry.name}, Melda Saraçgil Hukuk Bürosu'na ilettiğiniz ${selectedInquiry.subject} konulu başvurunuz hakkında görüşmek üzere iletişime geçmekteyiz.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp&apos;tan Yaz</span>
                </a>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Hukuki Ön Değerlendirme Talebiniz Hakkında - Av. Melda Saraçgil`
                  )}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-100 text-[#071324] text-xs font-bold hover:bg-zinc-200 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#c5a059]" />
                  <span>E-posta Gönder</span>
                </a>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs">
                <div>
                  <span className="text-zinc-400 block mb-0.5">Telefon Numarası:</span>
                  <span className="font-bold text-[#071324] font-mono">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block mb-0.5">E-Posta Adresi:</span>
                  <span className="font-bold text-[#071324]">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block mb-0.5">Başvuru Tarihi:</span>
                  <span className="font-bold text-[#071324]">
                    {new Date(selectedInquiry.createdAt).toLocaleString('tr-TR')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block mb-0.5">Mevcut Durum:</span>
                  <span className="font-bold uppercase text-[#c5a059]">{selectedInquiry.status}</span>
                </div>
              </div>

              {/* Client Message */}
              <div>
                <label className="block text-xs uppercase font-bold text-[#071324] mb-2">
                  Müvekkil Dosya / Olay Özeti:
                </label>
                <div className="p-4 rounded-2xl bg-white border border-[#e4ddd1] text-xs text-[#546274] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Radio Group */}
              <div>
                <label className="block text-xs uppercase font-bold text-[#071324] mb-2">
                  Talep Durumunu Güncelle:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['yeni', 'arandi', 'randevu_verildi', 'tamamlandi'] as InquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedInquiry.status === st
                          ? 'bg-[#0b1a30] text-[#c5a059] border-[#0b1a30]'
                          : 'bg-white border-[#e4ddd1] text-[#546274] hover:border-[#0b1a30]'
                      }`}
                    >
                      {st === 'yeni' && 'Yeni Talep'}
                      {st === 'arandi' && 'Arandı'}
                      {st === 'randevu_verildi' && 'Randevu Verildi'}
                      {st === 'tamamlandi' && 'Tamamlandı'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lawyer Internal Notes */}
              <div>
                <label className="block text-xs uppercase font-bold text-[#071324] mb-2">
                  Avukat Dahili Notları (Sadece siz görebilirsiniz):
                </label>
                <textarea
                  rows={3}
                  value={inquiryNoteText}
                  onChange={(e) => setInquiryNoteText(e.target.value)}
                  placeholder="Örn: 24 Ekim Salı günü saat 15:00 için ofis randevusu verildi..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30] resize-none"
                />
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleSaveInquiryNotes(selectedInquiry.id)}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-[#0b1a30] text-white text-xs font-bold hover:bg-[#071324] transition-colors"
                  >
                    Notu Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal for Inquiry */}
        {deletingInquiryId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white border border-[#e4ddd1] rounded-3xl p-6 space-y-4 shadow-2xl font-sans">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <h4 className="font-serif text-lg font-bold text-[#071324]">Talebi Silmek İstiyor musunuz?</h4>
              </div>
              <p className="text-xs text-[#546274] leading-relaxed">
                Bu başvuru kaydı kalıcı olarak silinecektir.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeletingInquiryId(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#546274] hover:text-black transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  onClick={() => handleDeleteInquiry(deletingInquiryId)}
                  disabled={loading}
                  className="px-5 py-2 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Siliniyor...' : 'Evet, Sil'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================= POST CREATE / EDIT MODAL ======================= */}
        {isCreatingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-white border border-[#e4ddd1] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-sans max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#e4ddd1]">
                <h3 className="font-serif text-2xl font-bold text-[#071324]">
                  {editingPost ? 'Makaleyi Düzenle' : 'Yeni Hukuki Makale Ekle'}
                </h3>
                <button
                  onClick={() => setIsCreatingPost(false)}
                  className="p-2 rounded-full text-[#546274] hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-5">
                <div>
                  <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                    Makale Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={postFormData.title}
                    onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                      Kategori *
                    </label>
                    <input
                      type="text"
                      required
                      value={postFormData.category}
                      onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                      Tahmini Okuma Süresi
                    </label>
                    <input
                      type="text"
                      value={postFormData.readTime}
                      onChange={(e) => setPostFormData({ ...postFormData, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                    Kısa Özet (Excerpt) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={postFormData.excerpt}
                    onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                    Makale İçeriği (Markdown) *
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={postFormData.content}
                    onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30] font-mono resize-y"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-sans font-semibold">
                    <input
                      type="checkbox"
                      checked={postFormData.published}
                      onChange={(e) => setPostFormData({ ...postFormData, published: e.target.checked })}
                      className="rounded text-[#0b1a30] focus:ring-[#0b1a30]"
                    />
                    <span>Hemen Yayına Al</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-sans font-semibold">
                    <input
                      type="checkbox"
                      checked={postFormData.featured}
                      onChange={(e) => setPostFormData({ ...postFormData, featured: e.target.checked })}
                      className="rounded text-[#0b1a30] focus:ring-[#0b1a30]"
                    />
                    <span>Öne Çıkarılan Makale</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e4ddd1]">
                  <button
                    type="button"
                    onClick={() => setIsCreatingPost(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-[#546274] hover:text-black transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brand-primary text-xs"
                  >
                    {loading ? 'Kaydediliyor...' : editingPost ? 'Değişiklikleri Kaydet' : 'Makaleyi Yayınla'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================= CASE CREATE / EDIT MODAL ======================= */}
        {isCreatingCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white border border-[#e4ddd1] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-sans max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#e4ddd1]">
                <h3 className="font-serif text-2xl font-bold text-[#071324]">
                  {editingCase ? 'Emsal Kararı Düzenle' : 'Yeni Emsal Karar Ekle'}
                </h3>
                <button
                  onClick={() => setIsCreatingCase(false)}
                  className="p-2 rounded-full text-[#546274] hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCase} className="space-y-5">
                <div>
                  <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                    Karar / Dosya Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={caseFormData.title}
                    onChange={(e) => setCaseFormData({ ...caseFormData, title: e.target.value })}
                    placeholder="Örn: Kambiyo Senedine Dayalı Takipte İhtiyati Haciz Kararı"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                      Hukuk Alanı / Kategori *
                    </label>
                    <input
                      type="text"
                      required
                      value={caseFormData.category}
                      onChange={(e) => setCaseFormData({ ...caseFormData, category: e.target.value })}
                      placeholder="Örn: Kambiyo & İhtiyati Haciz"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                      Tarih / Yıl
                    </label>
                    <input
                      type="text"
                      value={caseFormData.date}
                      onChange={(e) => setCaseFormData({ ...caseFormData, date: e.target.value })}
                      placeholder="Örn: 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                    Uyuşmazlık ve Süreç Özeti *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={caseFormData.summary}
                    onChange={(e) => setCaseFormData({ ...caseFormData, summary: e.target.value })}
                    placeholder="Borçlunun itirazı, mal kaçırma riski ve yürütülen hukuki işlemler..."
                    className="w-full px-4 py-2 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                    Hukuki Sonuç & Netice *
                  </label>
                  <input
                    type="text"
                    required
                    value={caseFormData.outcome}
                    onChange={(e) => setCaseFormData({ ...caseFormData, outcome: e.target.value })}
                    placeholder="Örn: Mahkeme kararıyla ihtiyati haciz tatbik edilerek alacak tahsil edildi."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-sans font-semibold">
                    <input
                      type="checkbox"
                      checked={caseFormData.published}
                      onChange={(e) => setCaseFormData({ ...caseFormData, published: e.target.checked })}
                      className="rounded text-[#0b1a30] focus:ring-[#0b1a30]"
                    />
                    <span>Sitede Yayınla</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e4ddd1]">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCase(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-[#546274] hover:text-black transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brand-primary text-xs"
                  >
                    {loading ? 'Kaydediliyor...' : editingCase ? 'Değişiklikleri Kaydet' : 'Kararı Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal for Posts */}
        {deletingPostId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white border border-[#e4ddd1] rounded-3xl p-6 space-y-4 shadow-2xl font-sans">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <h4 className="font-serif text-lg font-bold text-[#071324]">Yazıyı Silmek İstiyor musunuz?</h4>
              </div>
              <p className="text-xs text-[#546274] leading-relaxed">
                Bu işlem geri alınamaz. Makale blog arşivinden kalıcı olarak silinecektir.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeletingPostId(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#546274] hover:text-black transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  onClick={() => handleDeletePost(deletingPostId)}
                  disabled={loading}
                  className="px-5 py-2 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Siliniyor...' : 'Evet, Sil'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal for Cases */}
        {deletingCaseId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white border border-[#e4ddd1] rounded-3xl p-6 space-y-4 shadow-2xl font-sans">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <h4 className="font-serif text-lg font-bold text-[#071324]">Emsal Kararı Silmek İstiyor musunuz?</h4>
              </div>
              <p className="text-xs text-[#546274] leading-relaxed">
                Bu işlem geri alınamaz. Emsal karar arşivden kalıcı olarak silinecektir.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeletingCaseId(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#546274] hover:text-black transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  onClick={() => handleDeleteCase(deletingCaseId)}
                  disabled={loading}
                  className="px-5 py-2 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Siliniyor...' : 'Evet, Sil'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
