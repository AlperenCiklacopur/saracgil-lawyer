'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'İcra Takibi ve Alacak Tahsili',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Form iletilirken bir hata oluştu.');
      }

      setInquiryId(data.inquiryId || null);
      setFormSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sunucu ile bağlantı kurulamadı. Lütfen tekrar deneyiniz.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-24 px-6 md:pt-20 md:pb-32 bg-[#fcfbfa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 pb-8 border-b border-[#e4ddd1]">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-2">
            / İletişim & Danışmanlık /
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#071324] mb-4">
            Bize Ulaşın
          </h1>
          <p className="text-sm md:text-base text-[#546274] font-sans max-w-2xl leading-relaxed">
            Alacak takibi, karşılıksız çek veya icra dosyalarınız için bizimle iletişime geçebilirsiniz. Dosyanız ön incelemeye alınarak ivedilikle geri dönüş sağlanır.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-white border border-[#e4ddd1] shadow-sm space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-[#f6f1e8]">
                <div className="h-14 w-14 p-1 rounded-xl bg-white border border-[#c5a059]/40 shrink-0 flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="Saraçgil Hukuk Bürosu Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#071324]">Saraçgil</h3>
                  <p className="text-xs text-[#c5a059] font-sans font-bold uppercase tracking-wider">Hukuk Bürosu</p>
                </div>
              </div>

              <div className="space-y-5 text-xs text-[#546274] font-sans">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071324] mb-0.5 font-medium text-sm">Ofis Adresi</strong>
                    <span>Şehitkamil / Gaziantep, Türkiye</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071324] mb-0.5 font-medium text-sm">E-Posta</strong>
                    <a href="mailto:saracgilhukuk@gmail.com" className="hover:text-[#0b1a30] transition-colors underline font-medium text-[#0b1a30]">
                      saracgilhukuk@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071324] mb-0.5 font-medium text-sm">Çalışma Saatleri</strong>
                    <span>Pazartesi – Cumartesi: 08:30 – 18:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Box */}
            <div className="p-6 rounded-2xl bg-[#0b1a30] text-white space-y-2 shadow-md border border-[#142e54]">
              <div className="flex items-center gap-2 text-[#c5a059] font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Türkiye Geneli Takip & İcra Yetkisi</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                UYAP altyapısı ve adli muhabere kanallarıyla 81 ildeki tüm icra müdürlüklerinde dosya açma, haciz ve fiili muhafaza işlemleri kesintisiz yürütülmektedir.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-[#e4ddd1] shadow-sm">
              {formSubmitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#f6f1e8] border-2 border-[#c5a059] text-[#0b1a30] flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-9 h-9 text-[#c5a059]" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071324]">
                    Başvurunuz Başarıyla Alındı
                  </h3>
                  {inquiryId && (
                    <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#f6f1e8] border border-[#c5a059]/40 text-[#0b1a30] text-xs font-mono font-bold">
                      Takip Kodu: {inquiryId}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-[#546274] font-sans max-w-md mx-auto leading-relaxed">
                    Hukuki başvurunuz ve dosya bilgileriniz <strong>Av. Melda Saraçgil</strong>&apos;e iletilmiştir. Tarafınızla en kısa sürede telefon veya e-posta yoluyla iletişime geçilecektir.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/905000000000?text=${encodeURIComponent(
                        `Merhaba Av. Melda Saraçgil, web sitenizden ${inquiryId || ''} takip kodlu ön değerlendirme formu doldurdum. Bilgi alabilir miyim?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-sans font-bold shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Acil Durumlar İçin WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setInquiryId(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'İcra Takibi ve Alacak Tahsili',
                          message: '',
                        });
                      }}
                      className="inline-flex text-xs font-sans font-bold text-[#0b1a30] hover:text-[#c5a059] underline px-4 py-2"
                    >
                      Yeni bir form gönder
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#071324] mb-1">
                      Ön Değerlendirme & Randevu Formu
                    </h3>
                    <p className="text-xs text-[#546274] font-sans">
                      Lütfen uyuşmazlığınız ile ilgili temel bilgileri eksiksiz doldurunuz.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] placeholder-zinc-400 focus:outline-none focus:border-[#0b1a30]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0 (5XX) XXX XX XX"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] placeholder-zinc-400 focus:outline-none focus:border-[#0b1a30]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                        E-Posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@alanadi.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] placeholder-zinc-400 focus:outline-none focus:border-[#0b1a30]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                        Uyuşmazlık Konusu
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] focus:outline-none focus:border-[#0b1a30]"
                      >
                        <option value="İcra Takibi ve Alacak Tahsili">İcra Takibi ve Alacak Tahsili</option>
                        <option value="Kambiyo Senetleri (Çek/Bono)">Kambiyo Senetleri (Çek/Bono)</option>
                        <option value="İhtiyati Haciz Talebi">İhtiyati Haciz Talebi</option>
                        <option value="İtirazın İptali & Menfi Tespit">İtirazın İptali & Menfi Tespit</option>
                        <option value="Konkordato & Yapılandırma">Konkordato & Yapılandırma</option>
                        <option value="Genel Hukuki Danışmanlık">Genel Hukuki Danışmanlık</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase text-[#071324] font-semibold mb-1.5">
                      Dosya / Olay Özeti *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Alacağın tutarı, vadesi, mevcut belgeler (çek, senet, fatura vb.) hakkında kısa bilgi veriniz..."
                      className="w-full px-4 py-3 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs text-[#071324] placeholder-zinc-400 focus:outline-none focus:border-[#0b1a30] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brand-primary w-full py-4 text-xs tracking-wider disabled:opacity-50"
                  >
                    {loading ? (
                      <span>İletiliyor, Lütfen Bekleyiniz...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#c5a059]" />
                        <span>Hukuki Ön Değerlendirme Talebi Gönder</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#546274] text-center font-sans">
                    Gönderilen bilgiler Avukatlık Kanunu m. 36 (Sır Saklama Yükümlülüğü) ve KVKK kapsamında korunur.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
