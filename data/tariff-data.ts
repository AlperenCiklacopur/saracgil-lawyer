export interface TariffItem {
  id: string;
  category: 'danisma-sozlesme' | 'is-takibi' | 'sozlesmeli-avukat' | 'icra-iflas' | 'mahkemeler' | 'yuksek-yargi';
  sectionTitle: string;
  itemNo?: string;
  title: string;
  description?: string;
  fee: number;
  feeFormatted: string;
  unit?: string;
  isEnforcement?: boolean;
}

export interface PercentageTier {
  range: string;
  fromAmount: number;
  upToAmount: number | null;
  rate: number;
  rateFormatted: string;
  maxFeeInTier: number | null;
}

export const PERCENTAGE_TIERS: PercentageTier[] = [
  { range: 'İlk 600.000,00 TL için', fromAmount: 0, upToAmount: 600000, rate: 16.0, rateFormatted: '%16,00', maxFeeInTier: 96000 },
  { range: 'Sonra gelen 600.000,00 TL için', fromAmount: 600000, upToAmount: 1200000, rate: 15.0, rateFormatted: '%15,00', maxFeeInTier: 90000 },
  { range: 'Sonra gelen 1.200.000,00 TL için', fromAmount: 1200000, upToAmount: 2400000, rate: 14.0, rateFormatted: '%14,00', maxFeeInTier: 168000 },
  { range: 'Sonra gelen 1.200.000,00 TL için', fromAmount: 2400000, upToAmount: 3600000, rate: 13.0, rateFormatted: '%13,00', maxFeeInTier: 156000 },
  { range: 'Sonra gelen 1.800.000,00 TL için', fromAmount: 3600000, upToAmount: 5400000, rate: 11.0, rateFormatted: '%11,00', maxFeeInTier: 198000 },
  { range: 'Sonra gelen 2.400.000,00 TL için', fromAmount: 5400000, upToAmount: 7800000, rate: 8.0, rateFormatted: '%8,00', maxFeeInTier: 192000 },
  { range: 'Sonra gelen 3.000.000,00 TL için', fromAmount: 7800000, upToAmount: 10800000, rate: 5.0, rateFormatted: '%5,00', maxFeeInTier: 150000 },
  { range: 'Sonra gelen 3.600.000,00 TL için', fromAmount: 10800000, upToAmount: 14400000, rate: 3.0, rateFormatted: '%3,00', maxFeeInTier: 108000 },
  { range: 'Sonra gelen 4.200.000,00 TL için', fromAmount: 14400000, upToAmount: 18600000, rate: 2.0, rateFormatted: '%2,00', maxFeeInTier: 84000 },
  { range: '18.600.000,00 TL\'den yukarısı için', fromAmount: 18600000, upToAmount: null, rate: 1.0, rateFormatted: '%1,00', maxFeeInTier: null },
];

export const TARIFF_ITEMS: TariffItem[] = [
  // BİRİNCİ KISIM - BİRİNCİ BÖLÜM
  {
    id: 'danisma-buro-1',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '1',
    title: 'Büroda Sözlü Danışma (İlk bir saate kadar)',
    description: 'Büroda gerçekleştirilen ilk 1 saatlik yüz yüze hukuki danışma ücreti.',
    fee: 4000,
    feeFormatted: '4.000,00 TL',
    unit: 'İlk saat'
  },
  {
    id: 'danisma-buro-ek',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '1/b',
    title: 'Büroda Sözlü Danışma (Takip eden her saat için)',
    fee: 1800,
    feeFormatted: '1.800,00 TL',
    unit: 'Her ek saat'
  },
  {
    id: 'danisma-cagri-1',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '2',
    title: 'Çağrı Üzerine Gidilen Yerde Sözlü Danışma (İlk bir saate kadar)',
    description: 'Müvekkil iş yeri veya belirlenen adreste verilen hukuki danışmanlık.',
    fee: 7000,
    feeFormatted: '7.000,00 TL',
    unit: 'İlk saat'
  },
  {
    id: 'danisma-cagri-ek',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '2/b',
    title: 'Çağrı Üzerine Gidilen Yerde Sözlü Danışma (Takip eden her saat için)',
    fee: 3500,
    feeFormatted: '3.500,00 TL',
    unit: 'Her ek saat'
  },
  {
    id: 'danisma-yazili-1',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '3',
    title: 'Yazılı Danışma (İlk bir saate kadar)',
    description: 'Yazılı hukuki mütalaa, değerlendirme raporu ve hukuki bilgi notları.',
    fee: 7000,
    feeFormatted: '7.000,00 TL',
    unit: 'İlk saat'
  },
  {
    id: 'danisma-yazili-ek',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '3/b',
    title: 'Yazılı Danışma (Takip eden her saat için)',
    fee: 3500,
    feeFormatted: '3.500,00 TL',
    unit: 'Her ek saat'
  },
  {
    id: 'dilekce-ihtarname',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '4',
    title: 'Her Türlü Dilekçe Yazılması, İhbarname, İhtarname, Protesto Düzenlenmesi',
    description: 'Noter ihtarnameleri, alacak ihtar mektupları ve resmi mercilere dilekçe tanzimi.',
    fee: 6000,
    feeFormatted: '6.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'sozlesme-kira',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '5/a',
    title: 'Kira Sözleşmesi ve Benzeri Belgelerin Hazırlanması',
    fee: 8000,
    feeFormatted: '8.000,00 TL'
  },
  {
    id: 'sozlesme-tuzuk-miras',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '5/b',
    title: 'Tüzük, Yönetmelik, Miras Sözleşmesi, Vasiyetname, Vakıf Senedi Hazırlanması',
    fee: 32000,
    feeFormatted: '32.000,00 TL'
  },
  {
    id: 'sozlesme-sirket-devir',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '5/c',
    title: 'Şirket Ana Sözleşmesi, Devir, Birleşme vb. Ticari İşlerle İlgili Sözleşmeler',
    fee: 21000,
    feeFormatted: '21.000,00 TL'
  },
  {
    id: 'arabuluculuk-taraf-vekili',
    category: 'danisma-sozlesme',
    sectionTitle: 'Birinci Kısım: Dava ve Takiplerin Dışındaki Hukuki Yardımlar',
    itemNo: '6',
    title: 'Arabuluculuk Faaliyetinin Anlaşmazlıkla Sonuçlanması Halinde Taraf Vekilliği',
    fee: 8000,
    feeFormatted: '8.000,00 TL'
  },

  // BİRİNCİ KISIM - İKİNCİ BÖLÜM (İŞ TAKİBİ)
  {
    id: 'is-takibi-belgelendirme',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '1',
    title: 'Bir Durumun Belgelendirilmesi, Ödeme Aşamasındaki Paranın Tahsili veya Belge Örneği Çıkarılması',
    fee: 6000,
    feeFormatted: '6.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'is-takibi-hak-tespiti',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '2/a',
    title: 'Bir Hakkın Doğumu, Tespiti, Tescili, Nakli, Değiştirilmesi, Sona Erdirilmesi veya Korunması',
    fee: 12000,
    feeFormatted: '12.000,00 TL'
  },
  {
    id: 'is-takibi-ipotek-fekk',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '2/b',
    title: 'İpotek Tesisi ve Fekki İşlemleri (Sürekli Sözleşmeli Finans Kuruluşları / Bankalar İçin Her İşlem)',
    fee: 3000,
    feeFormatted: '3.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'is-takibi-sirket-kurulus',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '3',
    title: 'Şirket Kuruluş Sözleşmelerinin İmzalanması, Ruhsat/İmtiyaz Alınması, Devri ve Vatandaşlık Takibi',
    fee: 60000,
    feeFormatted: '60.000,00 TL'
  },
  {
    id: 'is-takibi-vergi-komisyonu',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '4',
    title: 'Vergi Komisyonlarında Takip Edilen İşler',
    fee: 24000,
    feeFormatted: '24.000,00 TL'
  },
  {
    id: 'is-takibi-uluslararasi-durusmasiz',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '5/a',
    title: 'Uluslararası Yargı Yerlerinde Takip Edilen İşler (Duruşmasız)',
    fee: 110000,
    feeFormatted: '110.000,00 TL'
  },
  {
    id: 'is-takibi-uluslararasi-durusmali',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '5/b',
    title: 'Uluslararası Yargı Yerlerinde Takip Edilen İşler (Duruşmalı)',
    fee: 200000,
    feeFormatted: '200.000,00 TL'
  },
  {
    id: 'is-takibi-tuketici-hakem-heyeti',
    category: 'is-takibi',
    sectionTitle: 'Birinci Kısım: İş Takibi Konusundaki Hukuki Yardımlar',
    itemNo: '6',
    title: 'İl ve İlçe Tüketici Hakem Heyetleri Nezdinde Hukuki Yardım (Maktu Alt Sınır)',
    fee: 7000,
    feeFormatted: '7.000,00 TL'
  },

  // BİRİNCİ KISIM - ÜÇÜNCÜ & DÖRDÜNCÜ BÖLÜM (SÖZLEŞMELİ AVUKATLIK)
  {
    id: 'sozlesmeli-yapi-koop',
    category: 'sozlesmeli-avukat',
    sectionTitle: 'Zorunlu ve Sözleşmeli Avukatlara Aylık Ödenecek Ücretler',
    itemNo: '35. Md / 1',
    title: 'Yapı Kooperatiflerinde Zorunlu Sözleşmeli Avukatlık Ücreti',
    description: '1136 Sayılı Avukatlık Kanunu m. 35 uyarınca bulundurulması zorunlu kooperatif vekilliği.',
    fee: 27000,
    feeFormatted: '27.000,00 TL',
    unit: 'Aylık'
  },
  {
    id: 'sozlesmeli-anonim-sirket',
    category: 'sozlesmeli-avukat',
    sectionTitle: 'Zorunlu ve Sözleşmeli Avukatlara Aylık Ödenecek Ücretler',
    itemNo: '35. Md / 2',
    title: 'Anonim Şirketlerde Zorunlu Sözleşmeli Avukatlık Ücreti',
    description: '1136 Sayılı Kanun gereği esas sermaye şartını sağlayan A.Ş.\'lerde bulundurulması zorunlu avukatlık.',
    fee: 45000,
    feeFormatted: '45.000,00 TL',
    unit: 'Aylık',
    isEnforcement: true
  },
  {
    id: 'sozlesmeli-ozel-tuzel',
    category: 'sozlesmeli-avukat',
    sectionTitle: 'Zorunlu ve Sözleşmeli Avukatlara Aylık Ödenecek Ücretler',
    itemNo: 'Dördüncü Bölüm / 1',
    title: 'Özel Kişi ve Tüzel Kişilerin Sözleşmeli Avukatlarına Ödeyecekleri Ücret',
    fee: 33000,
    feeFormatted: '33.000,00 TL',
    unit: 'Aylık'
  },
  {
    id: 'sozlesmeli-kamu',
    category: 'sozlesmeli-avukat',
    sectionTitle: 'Zorunlu ve Sözleşmeli Avukatlara Aylık Ödenecek Ücretler',
    itemNo: 'Dördüncü Bölüm / 2',
    title: 'Kamu Kurum ve Kuruluşlarının Sözleşmeli Avukatlarına Ödeyecekleri Ücret',
    fee: 33000,
    feeFormatted: '33.000,00 TL',
    unit: 'Aylık'
  },

  // İKİNCİ KISIM - İCRA VE İFLAS İŞLERİ (ÖZEL VURGU)
  {
    id: 'icra-daireleri-takip',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: İcra ve İflas Takipleri & İcra Yargılamaları',
    itemNo: '2. Bölüm / 1',
    title: 'İcra Dairelerinde Yapılan Takipler İçin Maktu Asgari Ücret',
    description: 'İlamsız genel haciz, kambiyo senetlerine özgü haciz veya ilamlı icra takipleri asgari taban ücreti.',
    fee: 9000,
    feeFormatted: '9.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'icra-mahkemesi-isler',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: İcra ve İflas Takipleri & İcra Yargılamaları',
    itemNo: '2. Bölüm / 2',
    title: 'İcra Mahkemelerinde Takip Edilen İşler İçin',
    description: 'İcra memur muamelesini şikayet, icra takibine dair duruşmasız başvurular.',
    fee: 11000,
    feeFormatted: '11.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'icra-mahkemesi-dava',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: İcra ve İflas Takipleri & İcra Yargılamaları',
    itemNo: '2. Bölüm / 3',
    title: 'İcra Mahkemelerinde Takip Edilen Dava ve Duruşmalı İşler',
    description: 'İtirazın kaldırılması davaları, istihkak davaları ve icra mahkemesi duruşmalı işleri.',
    fee: 18000,
    feeFormatted: '18.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'icra-tahliye',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: İcra ve İflas Takipleri & İcra Yargılamaları',
    itemNo: '2. Bölüm / 4',
    title: 'Tahliyeye İlişkin İcra Takipleri İçin',
    description: 'Tahliye taahhütnamesi veya kira borcu nedeniyle taşınmazın tahliyesi icra takipleri.',
    fee: 20000,
    feeFormatted: '20.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'icra-ceza',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: İcra ve İflas Takipleri & İcra Yargılamaları',
    itemNo: '2. Bölüm / 5',
    title: 'İcra Mahkemelerinde Takip Edilen Ceza İşleri İçin',
    description: 'Karşılıksız çek şikayeti (Çek K. m. 5), taahhüdü ihlal, nafaka borcunu ödememe cezaları.',
    fee: 15000,
    feeFormatted: '15.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'ihtiyati-haciz-durusmasiz',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: Maktu Ücrete Bağlı Hukuki Yardımlar',
    itemNo: '1. Bölüm / 1/a',
    title: 'İhtiyati Haciz, İhtiyati Tedbir, Delil Tespiti, İcranın Geri Bırakılması (Duruşmasız)',
    description: 'Dava açılmadan evvel acil mal varlığı güvencesi sağlamak amacıyla alınan ihtiyati haciz kararları.',
    fee: 10000,
    feeFormatted: '10.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'ihtiyati-haciz-durusmali',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: Maktu Ücrete Bağlı Hukuki Yardımlar',
    itemNo: '1. Bölüm / 1/b',
    title: 'İhtiyati Haciz, İhtiyati Tedbir, Delil Tespiti, İcranın Geri Bırakılması (Duruşmalı)',
    fee: 12500,
    feeFormatted: '12.500,00 TL',
    isEnforcement: true
  },
  {
    id: 'satis-memurlugu',
    category: 'icra-iflas',
    sectionTitle: 'İkinci Kısım: Maktu Ücrete Bağlı Hukuki Yardımlar',
    itemNo: '1. Bölüm / 2',
    title: 'Ortaklığın Giderilmesi İçin Satış Memurluğunda Yapılacak İşlerin Takibi',
    fee: 18000,
    feeFormatted: '18.000,00 TL',
    isEnforcement: true
  },

  // İKİNCİ KISIM - GENEL MAHKEMELER
  {
    id: 'sulh-hukuk',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 8',
    title: 'Sulh Hukuk Mahkemelerinde Takip Edilen Davalar',
    description: 'Kira bedeli tespiti, tahliye davaları, ortaklığın giderilmesi, mirasçılık belgesi vb.',
    fee: 30000,
    feeFormatted: '30.000,00 TL'
  },
  {
    id: 'sulh-ceza-infaz',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 9',
    title: 'Sulh Ceza Hâkimlikleri ve İnfaz Hâkimliklerinde Takip Edilen Davalar',
    fee: 18000,
    feeFormatted: '18.000,00 TL'
  },
  {
    id: 'asliye-hukuk-ticaret',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 10',
    title: 'Asliye Mahkemelerinde Takip Edilen Davalar (Asliye Hukuk, Asliye Ticaret, İş Mahkemeleri)',
    description: 'İtirazın iptali davaları, menfi tespit davaları, istirdat ve ticari alacak davaları maktu alt sınırı.',
    fee: 45000,
    feeFormatted: '45.000,00 TL',
    isEnforcement: true
  },
  {
    id: 'tuketici-mahkemesi',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 11',
    title: 'Tüketici Mahkemelerinde Takip Edilen Davalar',
    fee: 22500,
    feeFormatted: '22.500,00 TL'
  },
  {
    id: 'fikri-sinai-haklar',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 12',
    title: 'Fikri ve Sınai Haklar Mahkemelerinde Takip Edilen Davalar',
    fee: 55000,
    feeFormatted: '55.000,00 TL'
  },
  {
    id: 'agir-ceza',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 13',
    title: 'Ağır Ceza Mahkemelerinde Takip Edilen Davalar',
    fee: 65000,
    feeFormatted: '65.000,00 TL'
  },
  {
    id: 'idare-vergi-durusmasiz',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 17/a',
    title: 'İdare ve Vergi Mahkemelerinde Takip Edilen Davalar (Duruşmasız)',
    fee: 30000,
    feeFormatted: '30.000,00 TL'
  },
  {
    id: 'idare-vergi-durusmali',
    category: 'mahkemeler',
    sectionTitle: 'İkinci Kısım: İlk Derece Mahkemelerinde Dava Vekilliği',
    itemNo: '2. Bölüm / 17/b',
    title: 'İdare ve Vergi Mahkemelerinde Takip Edilen Davalar (Duruşmalı)',
    fee: 40000,
    feeFormatted: '40.000,00 TL'
  },

  // ÜST DERECE VE YÜKSEK YARGI
  {
    id: 'bam-ilk-derece',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 18/a',
    title: 'Bölge Adliye ve Bölge İdare Mahkemelerinde İlk Derecede Görülen Davalar',
    fee: 35000,
    feeFormatted: '35.000,00 TL'
  },
  {
    id: 'bam-istinaf-tek-durusma',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 18/b',
    title: 'İstinaf Yolu ile Görülen Bir Duruşması Olan İşler',
    fee: 22000,
    feeFormatted: '22.000,00 TL'
  },
  {
    id: 'bam-istinaf-cok-durusma',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 18/c',
    title: 'İstinaf Yolu ile Görülen Birden Fazla Duruşması veya Keşif İşlemi Olan İşler',
    fee: 42000,
    feeFormatted: '42.000,00 TL'
  },
  {
    id: 'temyiz-durusma',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 22',
    title: 'Yargıtay, Danıştay ve Sayıştay\'da Temyiz Yolu ile Görülen İşlerin Duruşması',
    fee: 40000,
    feeFormatted: '40.000,00 TL'
  },
  {
    id: 'aym-bireysel-durusmasiz',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 24/b',
    title: 'Anayasa Mahkemesi Bireysel Başvuru (Duruşmasız)',
    fee: 40000,
    feeFormatted: '40.000,00 TL'
  },
  {
    id: 'aym-bireysel-durusmali',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 24/b',
    title: 'Anayasa Mahkemesi Bireysel Başvuru (Duruşmalı)',
    fee: 80000,
    feeFormatted: '80.000,00 TL'
  },
  {
    id: 'aym-yuce-divan',
    category: 'yuksek-yargi',
    sectionTitle: 'İkinci Kısım: İstinaf ve Yüksek Yargı Mercileri',
    itemNo: '2. Bölüm / 24/a',
    title: 'Anayasa Mahkemesi Yüce Divan Sıfatı ile Bakılan Davalar',
    fee: 120000,
    feeFormatted: '120.000,00 TL'
  }
];

export function calculateProportionalFee(amount: number, minimumBaseFee: number = 0): {
  totalFee: number;
  breakdown: Array<{
    range: string;
    rate: number;
    amountInTier: number;
    feeInTier: number;
  }>;
  appliedMinimum: boolean;
} {
  if (amount <= 0 || isNaN(amount)) {
    return {
      totalFee: minimumBaseFee,
      breakdown: [],
      appliedMinimum: minimumBaseFee > 0,
    };
  }

  let calculatedFee = 0;
  const breakdown: Array<{
    range: string;
    rate: number;
    amountInTier: number;
    feeInTier: number;
  }> = [];

  let remaining = amount;

  // Tier 1: ilk 600.000 (%16)
  const tier1Amount = Math.min(remaining, 600000);
  if (tier1Amount > 0) {
    const fee = (tier1Amount * 16) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'İlk 600.000 TL', rate: 16, amountInTier: tier1Amount, feeInTier: fee });
    remaining -= tier1Amount;
  }

  // Tier 2: sonraki 600.000 (%15)
  if (remaining > 0) {
    const tier2Amount = Math.min(remaining, 600000);
    const fee = (tier2Amount * 15) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 600.000 TL (600k – 1.2M)', rate: 15, amountInTier: tier2Amount, feeInTier: fee });
    remaining -= tier2Amount;
  }

  // Tier 3: sonraki 1.200.000 (%14)
  if (remaining > 0) {
    const tier3Amount = Math.min(remaining, 1200000);
    const fee = (tier3Amount * 14) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 1.200.000 TL (1.2M – 2.4M)', rate: 14, amountInTier: tier3Amount, feeInTier: fee });
    remaining -= tier3Amount;
  }

  // Tier 4: sonraki 1.200.000 (%13)
  if (remaining > 0) {
    const tier4Amount = Math.min(remaining, 1200000);
    const fee = (tier4Amount * 13) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 1.200.000 TL (2.4M – 3.6M)', rate: 13, amountInTier: tier4Amount, feeInTier: fee });
    remaining -= tier4Amount;
  }

  // Tier 5: sonraki 1.800.000 (%11)
  if (remaining > 0) {
    const tier5Amount = Math.min(remaining, 1800000);
    const fee = (tier5Amount * 11) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 1.800.000 TL (3.6M – 5.4M)', rate: 11, amountInTier: tier5Amount, feeInTier: fee });
    remaining -= tier5Amount;
  }

  // Tier 6: sonraki 2.400.000 (%8)
  if (remaining > 0) {
    const tier6Amount = Math.min(remaining, 2400000);
    const fee = (tier6Amount * 8) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 2.400.000 TL (5.4M – 7.8M)', rate: 8, amountInTier: tier6Amount, feeInTier: fee });
    remaining -= tier6Amount;
  }

  // Tier 7: sonraki 3.000.000 (%5)
  if (remaining > 0) {
    const tier7Amount = Math.min(remaining, 3000000);
    const fee = (tier7Amount * 5) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 3.000.000 TL (7.8M – 10.8M)', rate: 5, amountInTier: tier7Amount, feeInTier: fee });
    remaining -= tier7Amount;
  }

  // Tier 8: sonraki 3.600.000 (%3)
  if (remaining > 0) {
    const tier8Amount = Math.min(remaining, 3600000);
    const fee = (tier8Amount * 3) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 3.600.000 TL (10.8M – 14.4M)', rate: 3, amountInTier: tier8Amount, feeInTier: fee });
    remaining -= tier8Amount;
  }

  // Tier 9: sonraki 4.200.000 (%2)
  if (remaining > 0) {
    const tier9Amount = Math.min(remaining, 4200000);
    const fee = (tier9Amount * 2) / 100;
    calculatedFee += fee;
    breakdown.push({ range: 'Sonraki 4.200.000 TL (14.4M – 18.6M)', rate: 2, amountInTier: tier9Amount, feeInTier: fee });
    remaining -= tier9Amount;
  }

  // Tier 10: 18.600.000 TL'den yukarısı (%1)
  if (remaining > 0) {
    const fee = (remaining * 1) / 100;
    calculatedFee += fee;
    breakdown.push({ range: '18.600.000 TL üzeri bakiye', rate: 1, amountInTier: remaining, feeInTier: fee });
  }

  const appliedMinimum = calculatedFee < minimumBaseFee;
  const totalFee = appliedMinimum ? minimumBaseFee : calculatedFee;

  return {
    totalFee,
    breakdown,
    appliedMinimum,
  };
}
