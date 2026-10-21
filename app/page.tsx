import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-service';
import { getAllCases } from '@/lib/case-service';
import MarqueeTicker from '@/components/MarqueeTicker';
import PracticeAreaCard from '@/components/PracticeAreaCard';
import BlogCard from '@/components/BlogCard';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Scale,
  Gavel,
  Award
} from 'lucide-react';

export default async function HomePage() {
  const posts = await getAllPosts(false);
  const recentPosts = posts.slice(0, 3);
  const cases = await getAllCases();

  const practiceAreas = [
    {
      number: '01',
      title: 'İlamlı ve İlamsız İcra Takipleri',
      subtitle: 'Para ve Teminat Alacakları / Kira ve Tahliye Süreçleri',
      description:
        'Mahkeme kararlarına dayanan alacakların (ilamlı) veya fatura, cari hesap ve sözleşmeye dayalı para alacaklarının (ilamsız) tahsili amacıyla icra müdürlükleri nezdinde başlatılan cebri icra süreçleridir. Borçlunun banka hesapları, taşınmazları, araçları ve üçüncü kişilerdeki hak ve alacakları üzerine anında haciz tatbik edilir.',
      tags: ['7 Günlük Ödeme Emri', 'Banka Haczi (89/1)', 'Taşınır/Taşınmaz Satışı', 'Kira Tahliyesi'],
    },
    {
      number: '02',
      title: 'Kambiyo Senetlerine Özgü Haciz Yolu',
      subtitle: 'Çek, Bono (Senet) ve Poliçe Alacaklarının Seri Tahsili',
      description:
        'Kambiyo vasfına haiz çek ve senetlerin tahsili için kanunun tanıdığı 10 günlük seri takip yoludur. İtirazın doğrudan takibi durdurmadığı bu süreçte borçlunun mal kaçırmasını engelleyen en hızlı cebri icra mekanizmaları işletilir. Karşılıksız çek durumunda İcra Ceza Mahkemesi şikayetleri eş zamanlı yürütülür.',
      tags: ['10 Günlük Süre', 'Karşılıksız Çek Şikayeti', 'İcra Ceza', 'Protesto & Keşide'],
    },
    {
      number: '03',
      title: 'İhtiyati Haciz & Hızlı Muhafaza Tedbirleri',
      subtitle: 'Mal Kaçırma Riskine Karşı Acil Mahkeme Koruma Kararı',
      description:
        'Borçlunun taşınır ve taşınmaz mallarını devretme, gizleme veya kaçırma girişimlerini önlemek amacıyla genel mahkemelerden teminat mukabilinde alınan acil koruma tedbiridir. Karar alındıktan sonra 10 gün içinde icra dairesi aracılığıyla infaz edilerek borçlunun tüm mal varlığı derhal bloke edilir.',
      tags: ['Acil Mahkeme Kararı', 'Teminat İşlemleri', 'MERNİS & TAKBİS Tespiti', 'Fiili Haciz & Yediemin'],
    },
    {
      number: '04',
      title: 'İtirazın İptali, Menfi Tespit & İstirdat Davaları',
      subtitle: 'İcra Takibine Bağlı Dava ve Uyuşmazlık Çözümü',
      description:
        'Haksız yere takibe itiraz eden borçlulara karşı %20 icra inkar tazminatı talepli itirazın iptali davaları; borçlu olunmadığının tespiti için açılan menfi tespit davaları ve cebri icra tehdidi altında ödenen paranın iadesi (istirdat) davalarında yetkin vekillik sunulur.',
      tags: ['İtirazın İptali (İİK m. 67)', 'Menfi Tespit (İİK m. 72)', 'İcra İnkar Tazminatı (%20)', 'Asliye Ticaret Mahkemesi'],
    },
    {
      number: '05',
      title: 'İflas, Konkordato ve Şirket Yeniden Yapılandırma',
      subtitle: 'Alacaklı ve Borçlu Şirketlerin Yasal Korunması',
      description:
        'Mali güçlüğe düşen borçlu şirketlerin alacaklılarla anlaşarak borçlarını tasfiye etmesi (konkordato) süreçlerinde proje hazırlanması veya konkordato ilan eden şirketlerden alacağı bulunan alacaklıların haklarının korunması, alacak kaydı ve komiserler kurulu süreçlerinin takibi.',
      tags: ['Konkordato Projesi', 'Alacak Kaydı', 'İflas Masası', 'Sermaye Şirketleri'],
    },
    {
      number: '06',
      title: 'Kurumsal Alacak & Portföy Tahsilat Yönetimi',
      subtitle: 'Şirketler ve KOBİ’ler İçin Toplu Dosya & Risk Analizi',
      description:
        'Ticari işletmeler ve şirketlerin vadeli alacaklarının hukuki güvenceye alınması, cari hesap sözleşmelerinin düzenlenmesi, teminat mektubu ve kefalet protokollerinin hazırlanması ile düzenli UYAP raporlama sistemi ile sürdürülen kurumsal hukuk danışmanlığıdır.',
      tags: ['Ticari Sözleşmeler', 'Risk Analizi', 'Toplu İcra Operasyonu', 'Gaziantep & Türkiye Geneli'],
    },
  ];

  return (
    <div className="w-full bg-[#fcfbfa]">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-14 md:pb-28 px-6 bg-gradient-to-b from-[#f6f1e8] to-[#fcfbfa] border-b border-[#e4ddd1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-8">
              {/* Top Pill / Badge with Logo Accent */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-[#c5a059] text-[#0b1a30] text-xs font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                <span>Melda Saraçgil Hukuk & Danışmanlık</span>
              </div>

              {/* Main Auctor Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-bold text-[#071324] leading-[1.08] tracking-tight">
                İcra ve İflas Hukukunda <br />
                <span className="text-[#0b1a30]">Güvenilir & Kararlı</span> <br />
                Çözüm Ortağınız.
              </h1>

              {/* Split Sub-row: Law Seal Card left, Description & Accreditation right */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t border-[#e4ddd1]">
                {/* Official Accreditation Seal Card */}
                <div className="sm:col-span-4 rounded-2xl border border-[#c5a059]/40 bg-[#071324] p-5 shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#0b1a30] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-3">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif text-sm font-bold text-white tracking-wide">
                      T.C. Gaziantep Barosu
                    </div>
                    <div className="text-[11px] text-[#c5a059] font-sans font-semibold mt-0.5">
                      Resmi Kayıtlı Avukatlık Bürosu
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-8 flex flex-col justify-between space-y-4">
                  <p className="text-sm text-[#546274] leading-relaxed font-sans">
                    Melda Saraçgil Hukuk & Danışmanlık; alacak takibi, icra infaz ve ticari dava vekilliğinde haklarınızı korur, cebri icra süreçlerini titizlikle yönetir ve hukuki güvenliğinizi teminat altına alır. Hız, strateji ve mesleki özen temel ilkemizdir.
                  </p>

                  {/* Ethical Accreditation Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-sans">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e4ddd1] text-[#071324] font-medium shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                      Gaziantep Barosu Levhası
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e4ddd1] text-[#071324] font-medium shadow-sm">
                      <Building2 className="w-3.5 h-3.5 text-[#c5a059]" />
                      UYAP & e-Duruşma
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e4ddd1] text-[#071324] font-medium shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                      Şeffaf Dosya Raporlaması
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/iletisim" className="btn-brand-primary">
                  <span>Hukuki Danışmanlık Al</span>
                  <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                </Link>
                <a href="#faaliyet-alanlari" className="btn-brand-outline">
                  <span>Faaliyet Alanlarımız</span>
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Bespoke Law Office Profile Card with Official Logo */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059] shadow-2xl bg-gradient-to-b from-[#071324] via-[#0b1a30] to-[#071324] p-8 text-white">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#142e54] pb-5 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
                      <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#c5a059]">
                        Hukuk & Danışmanlık
                      </span>
                    </div>
                    <span className="text-[11px] font-sans px-2.5 py-1 rounded bg-[#0b1a30] border border-[#142e54] text-zinc-300">
                      Gaziantep
                    </span>
                  </div>

                  {/* Central Emblem & Lawyer Title */}
                  <div className="flex flex-col items-center text-center my-2">
                    <div className="relative mb-5">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#071324] border-2 border-[#c5a059] p-3 shadow-2xl flex items-center justify-center relative overflow-hidden">
                        <img
                          src="/images/logo.jpg"
                          alt="Melda Saraçgil Logo"
                          className="w-full h-full object-contain relative z-10"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#c5a059] text-[#071324] flex items-center justify-center shadow-lg">
                        <Scale className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mb-1">
                      Av. Melda Saraçgil
                    </h3>
                    <p className="text-xs text-[#c5a059] font-sans font-semibold tracking-wider uppercase mb-3">
                      Gaziantep Barosu • Kurucu Avukat
                    </p>
                    <p className="text-xs text-zinc-300 font-sans max-w-sm leading-relaxed mb-4">
                      İcra ve İflas Hukuku başta olmak üzere ticari alacaklar, kambiyo takipleri ve kurumsal hukuki danışmanlık alanlarında yetkin temsil.
                    </p>
                  </div>

                  {/* Credentials Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#142e54] text-left">
                    <div className="p-3 rounded-xl bg-[#0b1a30]/80 border border-[#142e54]">
                      <div className="text-[10px] uppercase font-sans text-[#c5a059] font-bold">Faaliyet Odağı</div>
                      <div className="text-xs font-serif font-bold text-white mt-0.5">İcra & İflas Hukuku</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b1a30]/80 border border-[#142e54]">
                      <div className="text-[10px] uppercase font-sans text-[#c5a059] font-bold">Adli Kapsam</div>
                      <div className="text-xs font-serif font-bold text-white mt-0.5">81 İl Adli Takip</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b1a30]/80 border border-[#142e54]">
                      <div className="text-[10px] uppercase font-sans text-[#c5a059] font-bold">Bilişim Altyapısı</div>
                      <div className="text-xs font-serif font-bold text-white mt-0.5">UYAP & e-Duruşma</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b1a30]/80 border border-[#142e54]">
                      <div className="text-[10px] uppercase font-sans text-[#c5a059] font-bold">Ofis Konumu</div>
                      <div className="text-xs font-serif font-bold text-white mt-0.5">Şehitkamil / Gaziantep</div>
                    </div>
                  </div>

                  {/* Bottom Bar Info */}
                  <div className="mt-5 pt-4 border-t border-[#142e54] flex items-center justify-between text-[11px] font-sans text-zinc-400">
                    <span>Avukatlık Meslek İlkelerine Bağlı</span>
                    <span className="text-[#c5a059] font-semibold">Resmi Vekillik</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker />

      {/* Services Section */}
      <section id="faaliyet-alanlari" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#e4ddd1]">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-2">
                / Uzmanlık Alanlarımız /
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#071324]">
                Hukuki Faaliyet Alanları
              </h2>
            </div>
            <Link href="/iletisim" className="btn-brand-primary self-start md:self-auto">
              <span>Tüm Hizmetler</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </Link>
          </div>

          {/* Cards List */}
          <div className="border-t border-[#e4ddd1]">
            {practiceAreas.map((area, idx) => (
              <PracticeAreaCard
                key={idx}
                number={area.number}
                title={area.title}
                subtitle={area.subtitle}
                description={area.description}
                tags={area.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About & Attorney Spotlight (#hakkimizda) */}
      <section id="hakkimizda" className="py-24 md:py-32 px-6 bg-[#f6f1e8] border-y border-[#e4ddd1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Card: Office Profile & Ethical Values */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#c5a059] shadow-xl bg-[#071324] text-white p-8">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#142e54]">
                  <div className="w-16 h-16 rounded-2xl bg-[#0b1a30] border border-[#c5a059]/40 p-2 shrink-0 flex items-center justify-center">
                    <img
                      src="/images/logo.jpg"
                      alt="Melda Saraçgil Logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">Av. Melda Saraçgil</h3>
                    <p className="text-xs text-[#c5a059] font-sans font-semibold">Saraçgil Hukuk & Danışmanlık</p>
                    <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Şehitkamil / Gaziantep</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans text-zinc-300 leading-relaxed mb-6">
                  <p>
                    Ofisimiz, Avukatlık Kanunu ve Türkiye Barolar Birliği Meslek Kuralları çerçevesinde; müvekkillerine bağımsızlık, sır saklama yükümlülüğü ve özen borcu ile vekillik hizmeti sunar.
                  </p>
                  <p>
                    Özellikle zamanla yarışılan icra ve iflas takipleri, ihtiyati haciz kararları ve kambiyo senedi tahsilatlarında seri ve stratejik adımlar atarak alacağın teminat altına alınmasını sağlar.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#142e54] text-xs">
                  <div className="flex items-center gap-2.5 text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>Gaziantep Barosu Levhasına Kayıtlı</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>Doğrudan Avukat Temsili & Şeffaf İletişim</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>UYAP Üzerinden 81 İlde Anlık İcra İnfazı</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                    <span>Sır Saklama & Yüksek Mesleki Gizlilik</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
                / Hakkımızda & İlkelerimiz /
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#071324] leading-tight">
                Alacak takibinde hız, <br />
                <span className="text-[#0b1a30]">disiplin ve hukuki güvence.</span>
              </h2>

              <p className="text-sm md:text-base text-[#546274] leading-relaxed font-sans">
                Melda Saraçgil Hukuk & Danışmanlık, Gaziantep merkezli olarak Türkiye genelindeki adliyelerde icra ve iflas hukuku odaklı vekillik hizmeti sunmaktadır. Kurucumuz <strong>Av. Melda Saraçgil</strong> liderliğinde; çek, senet, fatura ve sözleşmelerden doğan alacakların tahsilinde zamanaşımı ve mal kaçırma risklerine karşı proaktif ve kararlı hukuki mekanizmalar işletilmektedir.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white border border-[#e4ddd1]">
                  <Zap className="w-5 h-5 text-[#c5a059] mb-2" />
                  <h4 className="font-serif text-base font-bold text-[#071324] mb-1">Hızlı İnfaz</h4>
                  <p className="text-xs text-[#546274] font-sans">
                    Ödeme emri ve ihtiyati haczin ivedilikle uygulanması.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#e4ddd1]">
                  <ShieldCheck className="w-5 h-5 text-[#c5a059] mb-2" />
                  <h4 className="font-serif text-base font-bold text-[#071324] mb-1">Yasal Koruma</h4>
                  <p className="text-xs text-[#546274] font-sans">
                    Mal varlığı araştırması ve yasal blokaj güvencesi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#e4ddd1]">
                  <Building2 className="w-5 h-5 text-[#c5a059] mb-2" />
                  <h4 className="font-serif text-base font-bold text-[#071324] mb-1">Kurumsal UYAP</h4>
                  <p className="text-xs text-[#546274] font-sans">
                    81 ilde online takip ve şeffaf dosya raporlaması.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <Link href="/iletisim" className="btn-brand-primary">
                  <span>Ofisimizle İletişime Geçin</span>
                  <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                </Link>
                <div className="text-xs font-sans text-[#546274]">
                  <span className="block font-bold text-[#071324]">Şehitkamil / Gaziantep</span>
                  <span>saracgilhukuk@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Precedent Decisions / Emsal Kararlar Section (rendered only if cases are added via admin) */}
      {cases && cases.length > 0 && (
        <section id="emsal-dosyalar" className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
                    / Emsal Dosyalar & Kararlar /
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#071324] leading-tight">
                    Neticelenen <br />
                    <span className="text-[#0b1a30]">İcra ve Dava Dosyaları</span>
                  </h2>
                  <p className="text-sm text-[#546274] leading-relaxed font-sans">
                    Ofisimiz tarafından yürütülen ve emsal teşkil eden icra takipleri ve dava süreçlerine dair hukuki değerlendirmeler.
                  </p>
                  <div>
                    <Link href="/iletisim" className="btn-brand-primary">
                      <span>Dosyanızı Değerlendirelim</span>
                      <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Dynamic Case Cards */}
              <div className="lg:col-span-7 space-y-6">
                {cases.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white border border-[#e4ddd1] rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-sans uppercase tracking-wider font-bold text-[#c5a059]">
                        {item.category}
                      </span>
                      {item.date && (
                        <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#f6f1e8] text-[#0b1a30] font-semibold">
                          {item.date}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#071324] mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#546274] font-sans leading-relaxed mb-4">
                      {item.summary}
                    </p>
                    <div className="p-4 rounded-xl bg-[#fcfbfa] border border-[#e4ddd1] text-xs font-sans text-[#071324] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#071324] block mb-0.5">Hukuki Sonuç / Karar:</strong>
                        <span>{item.outcome}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Professional Competencies & Ethics Section (TBB Compliant, replaces fabricated stats) */}
      <section className="py-20 bg-[#0b1a30] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#071324] border border-[#142e54] hover:border-[#c5a059]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b1a30] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">Gaziantep Barosu</h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Avukatlık meslek kurallarına ve etik ilkelerine tam bağlılıkla bağımsız ve yetkin vekillik.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071324] border border-[#142e54] hover:border-[#c5a059]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b1a30] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">81 İl Adli Takip</h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                UYAP altyapısı sayesinde Türkiye genelindeki tüm icra dairelerinde eş zamanlı infaz ve işlem yürütme kabiliyeti.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071324] border border-[#142e54] hover:border-[#c5a059]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b1a30] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">Hızlı & Kararlı Takip</h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Zamanaşımı ve mal kaçırma risklerine karşı ihtiyati haciz ve acil muhafaza tedbirleri ile proaktif koruma.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071324] border border-[#142e54] hover:border-[#c5a059]/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b1a30] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">Şeffaf Raporlama</h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Dosyanın açılışından tahsilatına kadar her aşamada müvekkile düzenli ve açık bilgilendirme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#e4ddd1]">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-2">
                / Bilgi Bankası & Hukuki Bülten /
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#071324]">
                Güncel İcra & Hukuk Makaleleri
              </h2>
            </div>
            <Link href="/blog" className="btn-brand-primary self-start md:self-auto">
              <span>Tüm Makaleleri Gör</span>
              <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#fcfbfa]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0b1a30] rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border border-[#142e54]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
                  / Hızlı İletişim & Danışmanlık /
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  Alacaklarınızı Riske Atmayın, <br />
                  <span className="text-[#c5a059]">Hukuki Süreci Hemen Başlatalım.</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-2xl leading-relaxed">
                  İcra takipleri, karşılıksız çek veya tahsilat uyuşmazlıklarınız için ön değerlendirme talebinde bulunabilirsiniz. Gaziantep ofisimizde veya online kanallarla hızlı geri dönüş sağlıyoruz.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <Link href="/iletisim" className="btn-brand-gold w-full text-center py-4">
                  <span>Danışmanlık Formu Doldur</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:saracgilhukuk@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-[#0b1a30] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>saracgilhukuk@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
