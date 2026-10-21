import { BlogPost } from '@/types/blog';

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'İcra Takibine İtiraz Süreleri ve İtirazın İptali Davalarında Kritik Aşamalar',
    slug: 'icra-takibine-itiraz-ve-itirazin-iptali-davasi',
    excerpt: 'İlamsız icra takiplerinde borçlunun itiraz süresi, itirazın sonuçları ve alacaklının itirazın iptali veya kaldırılması yollarına başvururken dikkat etmesi gereken süre ve ispat kuralları.',
    category: 'İcra Hukuku',
    readTime: '5 dk okuma',
    date: '12 Ekim 2026',
    author: {
      name: 'Av. Melda Saraçgil',
      title: 'Kurucu Avukat / İcra & İflas Departmanı',
    },
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: true,
    createdAt: '2026-10-12T09:00:00.000Z',
    updatedAt: '2026-10-12T09:00:00.000Z',
    content: `## İlamsız Takiplerde İtiraz Prosedürü

İlamsız icra takipleri, Türk İcra ve İflas Hukuku'nda (İİK m. 58 vd.) alacaklının elinde bir mahkeme ilamı veya kambiyo senedi bulunmasa dahi genel haciz yoluyla alacağını tahsil etmek amacıyla başvurduğu en yaygın yoldur. Ödeme emrinin borçluya tebliğinden itibaren yasal itiraz süresi **7 gündür**.

Borçlu tarafından bu 7 günlük süre içerisinde icra dairesine sunulan dilekçe ile takibe itiraz edilmesi halinde takip kendiliğinden durur.

### 1. Borca ve İmzaya İtiraz Ayrımı

Borçlunun yapacağı itiraz iki ana grupta toplanır:
* **İmzaya İtiraz:** Takip dayanağı belgedeki imzanın kendisine ait olmadığı iddiasıdır. Açıkça ve ayrıca belirtilmelidir.
* **Borca İtiraz:** Borcun doğmadığı, ödendiği, takas edildiği veya zamanaşımına uğradığı yönündeki iddialardır.

### 2. Alacaklının Önündeki İki Yol: İptal mi, Kaldırılma mı?

Takibi duran alacaklı, duran takibi devam ettirebilmek adına iki hukuki yoldan birini tercih etmek zorundadır:

#### A) İtirazın Kaldırılması (İcra Mahkemesi)
Alacaklının elinde İİK m. 68-68/a kapsamında sayılan belgelerden biri (noter tasdikli borç ikrarı, resmi dairelerin yetkileri dahilinde düzenlediği belgeler vb.) mevcutsa, tebliğden itibaren **6 ay içinde** İcra Mahkemesi'nden itirazın kesin veya geçici kaldırılması talep edilebilir. Bu yol, genel mahkemelere nazaran çok daha seri ve pratik sonuç verir.

#### B) İtirazın İptali Davası (Genel Mahkemeler)
Alacaklının elinde yukarıda bahsedilen nitelikte kesin bir belge yoksa, itirazın tebliğinden itibaren **1 yıl içinde** yetkili ve görevli genel mahkemede (Asliye Hukuk veya Asliye Ticaret Mahkemesi) itirazın iptali davası açılması gerekir.

> **Önemli Not:** İtirazın haksızlığı sabit olursa, mahkeme borçluyu hükmolunan meblağın en az %20'si oranında **icra inkar tazminatına** mahkum eder.

### 3. Zamanaşımı ve Süre Tuzaklarına Dikkat

Alacak takibinde sürelerin kaçırılması, hem icra inkar tazminatı haklarının kaybına hem de haciz isteme yetkisinin düşmesine yol açabilir. Bu nedenle ödeme emri tebliğ tarihinin UYAP sistemi üzerinden anlık takibi hayati önem taşır.`,
  },
  {
    id: 'post-2',
    title: 'Karşılıksız Çek Düzenleme Suçu ve İcra Ceza Mahkemelerinde Şikayet Usulü',
    slug: 'karsiliksiz-cek-duzenleme-ve-icra-ceza-sikayeti',
    excerpt: '5941 sayılı Çek Kanunu kapsamında karşılıksız çıkan çeklerde adli para cezası, çek düzenleme yasağı ve hak düşürücü şikayet sürelerinin detaylı analizi.',
    category: 'Kambiyo Hukuku',
    readTime: '6 dk okuma',
    date: '05 Ekim 2026',
    author: {
      name: 'Av. Melda Saraçgil',
      title: 'Kurucu Avukat / İcra & İflas Departmanı',
    },
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: true,
    createdAt: '2026-10-05T10:30:00.000Z',
    updatedAt: '2026-10-05T10:30:00.000Z',
    content: `## Karşılıksız Çeklerde Hukuki ve Cezai Sorumluluk

Ticari hayatta güven unsurunun en temel güvencelerinden biri olan çek, karşılıksız kalması durumunda hem kambiyo senetlerine özgü haciz yoluyla icra takibine hem de 5941 sayılı Çek Kanunu m. 5 uyarınca cezai yaptırımlara konu olur.

### Karşılıksız Çek Düzenleme Suçunun Unsurları

Çek süresi içerisinde muhatap bankaya ibraz edilmiş olmalı ve banka tarafından çekin arkasına "karşılıksızdır" kaşesi vurulmuş olmalıdır.

Kanun koyucu, karşılıksız kalan çek bedeli tutarından (veya çek yaprağı başına bankanın kanunen sorumlu olduğu asgari tutar düşüldükten sonra kalan kısımdan) daha az olmamak üzere **adli para cezası** öngörmüştür. Ödenmeyen adli para cezaları doğrudan kamuya yararlı işte çalıştırma veya hapis cezasına dönüştürülebilir.

### Hak Düşürücü Şikayet Süreleri

* Şikayet hakkı, fiilin öğrenildiği tarihten itibaren **3 ay** ve her halde fiilin işlendiği tarihten itibaren **1 yıl** geçmekle düşer.
* Yetkili mahkeme: Çekin tahsil için bankaya ibraz edildiği yer veya çek hesabının açıldığı banka şubesinin bulunduğu yer veya hesap sahibinin yerleşim yeri İcra Ceza Mahkemesidir.

### Çek Düzenleme ve Çek Hesabı Açma Yasağı

İcra Ceza Mahkemesi tarafından verilecek mahkumiyet hükmü ile birlikte borçlu ve şirket yetkilileri hakkında "çek düzenleme ve çek hesabı açma yasağı" kararı verilir. Bu karar UYAP ve Risk Merkezi üzerinden tüm bankacılık sistemine anında bildirilir.`,
  },
  {
    id: 'post-3',
    title: 'İhtiyati Haciz Kararı Şartları ve Teminat Yatırma Esasları',
    slug: 'ihtiyati-haciz-karari-sartlari-ve-teminat',
    excerpt: 'Borçlunun mal kaçırma şüphesi bulunduğu durumlarda rehinle temin edilmemiş para alacakları için mahkemeden talep edilen ihtiyati haciz tedbirinin tüm yasal gereksinimleri.',
    category: 'Alacak Yönetimi',
    readTime: '4 dk okuma',
    date: '28 Eylül 2026',
    author: {
      name: 'Av. Melda Saraçgil',
      title: 'Kurucu Avukat / İcra & İflas Departmanı',
    },
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: false,
    createdAt: '2026-09-28T14:15:00.000Z',
    updatedAt: '2026-09-28T14:15:00.000Z',
    content: `## İhtiyati Haciz Nedir ve Neden Hayatidir?

İhtiyati haciz (İİK m. 257 vd.), para alacaklarının zamanında tahsilini güvence altına almak için henüz kesin haciz aşamasına gelinmeden borçlunun taşınır, taşınmaz ve üçüncü kişilerdeki hak ve alacaklarına el konulmasını sağlayan geçici bir hukuki koruma tedbiridir.

### Hangi Durumlarda Talep Edilebilir?

1. **Vadesi Gelmiş (Muaccel) Alacaklar:** Rehinle temin edilmemiş para borcunun vadesi dolmuşsa doğrudan talep edilebilir.
2. **Vadesi Gelmemiş (Müeccel) Alacaklar:**
   * Borçlunun muayyen yerleşim yeri yoksa,
   * Borçlu taahhütlerinden kurtulmak amacıyla mallarını gizlemeye, kaçırmaya veya kendisi kaçmaya hazırlanıyorsa.

### Teminat Miktarları ve Uygulama

Mahkemeler genellikle alacak miktarının **%10 ila %15'i** oranında nakdi teminat veya kesin banka teminat mektubu talep eder. Ancak takip dayanağı bir ilam veya ilam niteliğinde belge ise teminatsız ihtiyati haciz kararı verilebilir.

Kararın infazı için mahkeme karar tarihinden itibaren **10 gün içinde** icra dairesine başvurulması zorunludur. Aksi takdirde karar kendiliğinden hükümsüz kalır.`,
  },
  {
    id: 'post-4',
    title: 'Şirketler İçin Kurumsal Alacak Yönetimi ve Erken Tahsilat Stratejileri',
    slug: 'kurumsal-alacak-yonetimi-ve-erken-tahsilat-stratejileri',
    excerpt: 'KOBİ ve büyük ölçekli işletmelerde tahsilat gecikmelerinin önüne geçmek, nakit akışını korumak ve hukuki sürece girmeden alacak riskini minimize etmenin pratik yolları.',
    category: 'Danışmanlık',
    readTime: '7 dk okuma',
    date: '18 Eylül 2026',
    author: {
      name: 'Av. Melda Saraçgil',
      title: 'Kurucu Avukat / İcra & İflas Departmanı',
    },
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    published: true,
    featured: false,
    createdAt: '2026-09-18T11:00:00.000Z',
    updatedAt: '2026-09-18T11:00:00.000Z',
    content: `## Kurumsal Alacak Yönetiminde Önleyici Hukuk Yaklaşımı

Birçok işletme için finansal darboğazların ana sebebi karsızlık değil, alacakların zamanında tahsil edilememesinden kaynaklanan nakit akışı tıkanıklığıdır. Saraçgil Hukuk Bürosu olarak kurumsal müvekkillerimize uyguladığımız sistem üç temel sacayağı üzerine kuruludur:

### 1. Sözleşme Aşamasında Güvence Oluşturma
* Cari hesap sözleşmelerinde vade farkı ve cezai şart hükümlerinin yasal sınırlara uygun belirlenmesi.
* Teslim tesellüm tutanakları ve irsaliyelerin yetkili şirket imza sirkülerine sahip kişilerce kaşelenip imzalanması.
* Kişisel kefalet (müteselsil kefil) ve teminat mektupları ile alacağın zırhlandırılması.

### 2. Vade Öncesi ve Vade Günü İletişim Protokolü
Borcun vadesinden önce hatırlatma mesajları, mutabakat mektupları ve hesap ekstresi teyitleri borçlunun ödeme takvimine öncelik vermesini sağlar.

### 3. Hukuki Sürece Geçişte Hız İlkesi
Ödeme süresi 15 günü aşan ve uzlaşma iradesi göstermeyen borçlular için derhal yasal takip ve mal varlığı araştırması (MERNİS, TAKBİS, UYAP, Trafik tescil ve banka 89/1 haciz ihbarnameleri) başlatılmalıdır. Çünkü ilk haciz koyan alacaklı, tahsilat yarışında daima bir adım öndedir.`,
  },
];
