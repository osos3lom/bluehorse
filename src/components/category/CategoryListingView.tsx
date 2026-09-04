'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  Flame,
  Briefcase,
  Ticket,
  Anchor,
  Home,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  ChevronDown,
  MessageCircle,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { ProductCard } from '../luxury/ProductCard';
import { LuxuryNavbar } from '../luxury/LuxuryNavbar';
import { LuxuryFooter } from '../luxury/LuxuryFooter';
import { UnifiedCheckoutModal } from '../checkout/UnifiedCheckoutModal';
import { useBookingStore } from '../../lib/bookingStore';

interface CategoryListingViewProps {
  locale: string;
  category: 'adventures' | 'nightlife' | 'corporate' | 'events' | 'voyages' | 'real-estate' | 'memberships';
}

interface CategoryMetaItem {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  dbCategory: string;
  icon: React.ReactNode;
  heroBg: string;
  accentColor: string;
  trustChips: { en: string; ar: string }[];
}

const CATEGORY_META: Record<string, CategoryMetaItem> = {
  adventures: {
    titleEn: 'Wilderness Adventures & Eco-Tourism',
    titleAr: 'مغامرات الطبيعة والسياحة البيئية',
    subtitleEn: 'Moon Mountain summit treks, Red Sea beach horseback riding, and desert buggies in Jeddah.',
    subtitleAr: 'صعود قمة جبل القمر، ركوب الخيل على شواطئ البحر الأحمر، وسفاري الكثبان الرملية في جدة.',
    dbCategory: 'adventures',
    icon: <Compass className="w-4 h-4 text-[#E6AF2E]" />,
    heroBg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#E6AF2E',
    trustChips: [
      { en: 'Certified Wilderness Guides', ar: 'مرشدين معتمدين' },
      { en: 'Telescope Stargazing Included', ar: 'رصد فلكي بالتلسكوب' },
      { en: 'Safety Gear & Hydration Provided', ar: 'معدات السلامة ومياه المسار' },
      { en: 'Digital Liability Waiver Ready', ar: 'إقرار سلامة فوري' },
    ],
  },
  nightlife: {
    titleEn: 'Entertainment & Nightlife Festivals',
    titleAr: 'الحفلات الموسيقية والمهرجانات الشاطئية',
    subtitleEn: 'Iconic all-white beach parties, melodic house desert raves, and shoreline concert stages.',
    subtitleAr: 'حفلات الوايت نايت الشاطئية الأيقونية، سهرات الملوديك تكنو في الصحراء، ومسارح البحر.',
    dbCategory: 'nightlife',
    icon: <Flame className="w-4 h-4 text-[#00E5FF]" />,
    heroBg: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#00E5FF',
    trustChips: [
      { en: 'Top International & Saudi Guest DJs', ar: 'ألمع الفنانين والدي جي' },
      { en: 'Seaside Fireworks & Laser Shows', ar: 'عروض ألعاب نارية وليزر' },
      { en: 'VIP Raised Lounges & Valet', ar: 'منصات VIP ومواقف خاصة' },
      { en: 'Instant QR Code Check-In', ar: 'دخول فوري بالباركود' },
    ],
  },
  corporate: {
    titleEn: 'Corporate Services & Executive Retreats',
    titleAr: 'خدمات الشركات والخلوات القيادية',
    subtitleEn: 'Purpose-driven team offsites, wilderness leadership treks, and turnkey private festival curation.',
    subtitleAr: 'خلوات عمل استثنائية لفرق العمل، قيادة المغامرة في الطبيعة، وتنظيم الفعاليات الكبرى.',
    dbCategory: 'corporate',
    icon: <Briefcase className="w-4 h-4 text-indigo-400" />,
    heroBg: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#00E5FF',
    trustChips: [
      { en: 'ZATCA Phase 2 E-Invoicing Compliant', ar: 'فواتير ضريبية نظامية 100%' },
      { en: '80+ Leading Saudi Enterprises Hosted', ar: 'أكثر من 80 جهة وشركة' },
      { en: 'Full Sound, Stage & Permitted Security', ar: 'إنتاج وتصاريح متكاملة' },
      { en: 'Guaranteed 24-Hour Proposal Turnaround', ar: 'عرض مالي خلال 24 ساعة' },
    ],
  },
  events: {
    titleEn: 'Shoreline Concerts & Events',
    titleAr: 'فعاليات وأمسيات البحر الأحمر',
    subtitleEn: 'Live Tarab nights, beach music sessions, and acoustic concerts by the water.',
    subtitleAr: 'جلسات طرب حية، ليالي الشاطئ، وأمسيات موسيقية راقية على الواجهة البحرية.',
    dbCategory: 'events',
    icon: <Ticket className="w-4 h-4 text-cyan-400" />,
    heroBg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#00E5FF',
    trustChips: [
      { en: 'Prime Coastal Amphitheaters', ar: 'مسارح شاطئية حصرية' },
      { en: 'Reserved Seating & VIP Majlis', ar: 'مقاعد مخصصة ومجالس VIP' },
      { en: 'Artisan Hospitality Included', ar: 'ضيافة فاخرة متضمنة' },
    ],
  },
  voyages: {
    titleEn: 'Private Sea Charters & Voyages',
    titleAr: 'رحلات بحرية ويخوت خاصة',
    subtitleEn: 'Catamaran day sails to Bayada reef and private sunset motor yacht charters.',
    subtitleAr: 'إبحار إلى شعاب بياضة الفيروزية ويخوت خاصة للغروب مع طاقم معتمد.',
    dbCategory: 'voyages',
    icon: <Anchor className="w-4 h-4 text-blue-400" />,
    heroBg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#00E5FF',
    trustChips: [
      { en: 'Saudi Coast Guard Permitted', ar: 'تصاريح حرس الحدود معتمدة' },
      { en: 'Certified Captain & Deck Crew', ar: 'قبطان وطاقم بحري معتمد' },
      { en: 'Snorkeling & Water Sports Gear', ar: 'معدات غوص وألعاب مائية' },
    ],
  },
  'real-estate': {
    titleEn: 'VIP Memberships & Passes',
    titleAr: 'العضويات والباقات الشاطئية',
    subtitleEn: 'Exclusive cabana passes and annual VIP coastal club memberships in Jeddah.',
    subtitleAr: 'باقات الكابانا للأصدقاء وعضويات سنوية حصرية لدخول أرقى المنتجعات.',
    dbCategory: 'real-estate',
    icon: <Home className="w-4 h-4 text-emerald-400" />,
    heroBg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#E6AF2E',
    trustChips: [
      { en: 'Private Beachfront Cabanas', ar: 'كابانات شاطئية خاصة' },
      { en: 'Year-Round Priority Booking', ar: 'أولوية الحجز طوال العام' },
      { en: 'Dedicated Concierge Service', ar: 'خدمة كونسيرج مخصصة' },
    ],
  },
  memberships: {
    titleEn: 'VIP Memberships & Passes',
    titleAr: 'العضويات والباقات الشاطئية',
    subtitleEn: 'Exclusive cabana passes and annual VIP coastal club memberships in Jeddah.',
    subtitleAr: 'باقات الكابانا للأصدقاء وعضويات سنوية حصرية لدخول أرقى المنتجعات.',
    dbCategory: 'real-estate',
    icon: <Home className="w-4 h-4 text-emerald-400" />,
    heroBg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80',
    accentColor: '#E6AF2E',
    trustChips: [
      { en: 'Private Beachfront Cabanas', ar: 'كابانات شاطئية خاصة' },
      { en: 'Year-Round Priority Booking', ar: 'أولوية الحجز طوال العام' },
      { en: 'Dedicated Concierge Service', ar: 'خدمة كونسيرج مخصصة' },
    ],
  },
};

export function CategoryListingView({ locale, category }: CategoryListingViewProps) {
  const isArabic = locale === 'ar';
  const meta = CATEGORY_META[category] || CATEGORY_META.adventures;
  const { addToCart, setIsCheckoutOpen } = useBookingStore();

  // Corporate estimator state
  const [teamSize, setTeamSize] = useState<number>(20);
  const [selectedPackage, setSelectedPackage] = useState<'desert' | 'festival'>('desert');
  const [corpName, setCorpName] = useState('');
  const [corpPhone, setCorpPhone] = useState('');
  const [corpSubmitted, setCorpSubmitted] = useState(false);

  // FAQ toggle state for adventures
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const items = luxuryCatalog.filter((item) => item.category === meta.dbCategory);

  const navCategories = [
    { id: 'adventures', path: 'adventures', en: 'Adventures', ar: 'المغامرات', icon: <Compass className="w-3.5 h-3.5 text-[#E6AF2E]" /> },
    { id: 'nightlife', path: 'nightlife', en: 'Nightlife', ar: 'الحفلات', icon: <Flame className="w-3.5 h-3.5 text-[#00E5FF]" /> },
    { id: 'corporate', path: 'corporate', en: 'Corporate', ar: 'الشركات', icon: <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'events', path: 'events', en: 'Concerts', ar: 'حفلات طرب', icon: <Ticket className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'voyages', path: 'voyages', en: 'Sea Voyages', ar: 'رحلات بحرية', icon: <Anchor className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'memberships', path: 'memberships', en: 'Memberships', ar: 'عضويات', icon: <Home className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  const handleQuickAdventureBook = () => {
    const moonProduct = luxuryCatalog.find((p) => p.id === 'bh-moon-mountain-hike');
    if (!moonProduct) return;
    const tier = moonProduct.tiers?.[0];
    addToCart({
      id: `${moonProduct.id}-quick-${Date.now()}`,
      productId: moonProduct.id,
      category: 'adventures',
      title: moonProduct.title,
      coverImage: moonProduct.coverImage,
      locationName: moonProduct.locationName,
      selectedDate: '2026-10-24',
      tier: tier ? { id: tier.id, name: tier.name, price: tier.price } : undefined,
      quantity: 1,
      unitPrice: tier?.price || moonProduct.basePrice,
      addOns: [],
    });
    setIsCheckoutOpen(true);
  };

  const handleQuickNightlifeBook = () => {
    const whiteProduct = luxuryCatalog.find((p) => p.id === 'bh-white-night-party');
    if (!whiteProduct) return;
    const tier = whiteProduct.tiers?.[0];
    addToCart({
      id: `${whiteProduct.id}-quick-${Date.now()}`,
      productId: whiteProduct.id,
      category: 'nightlife',
      title: whiteProduct.title,
      coverImage: whiteProduct.coverImage,
      locationName: whiteProduct.locationName,
      selectedDate: '2026-11-28',
      tier: tier ? { id: tier.id, name: tier.name, price: tier.price } : undefined,
      quantity: 1,
      unitPrice: tier?.price || whiteProduct.basePrice,
      addOns: [],
    });
    setIsCheckoutOpen(true);
  };

  const adventureFaqs = [
    {
      qEn: 'What footwear and clothing are recommended for Moon Mountain?',
      qAr: 'ما هي الأحذية والملابس المناسبة لهايكنج جبل القمر؟',
      aEn: 'Sturdy hiking boots or sports shoes with good grip are required. Comfortable breathable activewear and a light evening windbreaker are recommended.',
      aAr: 'يُنصح بارتداء حذاء مشي جبلي أو حذاء رياضي بنعل مانع للانزلاق. يُفضل ارتداء ملابس رياضية مريحة وسترة خفيفة للمساء بعد غروب الشمس.',
    },
    {
      qEn: 'Where is the exact gathering point in Usfan?',
      qAr: 'أين تقع نقطة التجمع في عسفان؟',
      aEn: 'The meeting point is at the Blue Horse Usfan Base Camp, approximately 45 minutes north of central Jeddah. A live GPS pin and route guide are sent upon booking.',
      aAr: 'نقطة التجمع في مخيم بلو هورس بقاعدة عسفان (حوالي 45 دقيقة شمال جدة). يتم إرسال موقع GPS فوري ودليل الوصول فور تأكيد الحجز.',
    },
    {
      qEn: 'Is the Moon Mountain hike suitable for beginners and families?',
      qAr: 'هل هايكنج جبل القمر مناسب للمبتدئين والعائلات؟',
      aEn: 'Yes! The trail is classified as moderate with well-paced ascents, frequent rest stops, and certified guides assisting at every step. Suitable for ages 10 and above.',
      aAr: 'نعم، المسار مصنف بمستوى متوسط مع فترات راحة منتظمة ومرشدين معتمدين يرافقون المشاركين في كل خطوة. مناسب لجميع الأعمار من 10 سنوات فما فوق.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col selection:bg-[#00E5FF] selection:text-slate-950 transition-colors">
      <LuxuryNavbar locale={locale} />

      {/* Hero Category Banner */}
      <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={meta.heroBg}
            alt={isArabic ? meta.titleAr : meta.titleEn}
            className="w-full h-full object-cover opacity-25 scale-105 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1E]/70 via-[#070D1E]/90 to-[#070D1E]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Back Link & Category Navigation Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#00E5FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isArabic ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </Link>

            {/* Quick Floating Category Switcher */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {navCategories.map((c) => {
                const active = c.id === category || (category === 'memberships' && c.id === 'memberships');
                return (
                  <Link
                    key={c.id}
                    href={`/${locale}/${c.path}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all ${
                      active
                        ? 'bg-gradient-to-r from-[#00E5FF] to-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-105'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{isArabic ? c.ar : c.en}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Page Title & Subtitle */}
          <div className="space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-slate-200 backdrop-blur-md">
              {meta.icon}
              <span style={{ color: meta.accentColor }}>{isArabic ? meta.titleAr : meta.titleEn}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {isArabic ? (
                <>
                  استكشف <span className="bg-gradient-to-r from-[#00E5FF] via-white to-[#E6AF2E] bg-clip-text text-transparent">{meta.titleAr}</span>
                </>
              ) : (
                <>
                  Explore <span className="bg-gradient-to-r from-[#00E5FF] via-white to-[#E6AF2E] bg-clip-text text-transparent">{meta.titleEn}</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
              {isArabic ? meta.subtitleAr : meta.subtitleEn}
            </p>

            {/* Category Trust Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3">
              {meta.trustChips.map((chip, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium backdrop-blur-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{isArabic ? chip.ar : chip.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Product Cards */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">
        
        {/* Experience Cards Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                <span>{isArabic ? 'التجارب والباقات المتاحة' : 'Available Experiences & Packages'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isArabic ? `عرض ${items.length} تجارب نشطة مع حجز فوري مؤكد` : `Displaying ${items.length} active experiences with instant confirmed booking`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} locale={locale} />
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORY SPECIFIC CTA SECTIONS                            */}
        {/* ========================================================= */}

        {/* 1. ADVENTURES SPECIFIC CTA & FAQ */}
        {category === 'adventures' && (
          <section className="space-y-10">
            {/* Sticky Departure Strip CTA */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#141E33] to-[#0D1527] border border-[#E6AF2E]/40 p-6 sm:p-8 shadow-2xl">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E6AF2E]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6AF2E]/15 border border-[#E6AF2E]/30 text-xs font-bold text-[#E6AF2E]">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span>{isArabic ? 'الرحلة القادمة: الجمعة 04:30 مساءً' : 'Next Departure: Friday 04:30 PM'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isArabic ? 'جاهز لصعود قمة جبل القمر ورصد النجوم؟' : 'Ready to Summit Moon Mountain & Stargaze?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    {isArabic
                      ? 'باقي 8 مقاعد فقط لرحلة هذا الأسبوع في عسفان. تشمل الصعود مع المرشد، عشاء الشواء البدوي، ورصد الكواكب بالتلسكوب.'
                      : 'Only 8 spots remaining for this week’s expedition. Includes certified summit guide, Bedouin BBQ dinner, and telescope observation.'}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={handleQuickAdventureBook}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E6AF2E] to-amber-500 hover:from-amber-400 hover:to-[#E6AF2E] text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{isArabic ? 'احجز تصريح المغامرة الآن' : 'Book Adventure Pass Now'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Adventure FAQs */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isArabic ? 'الأسئلة الشائعة حول مغامرات الهايكنج' : 'Adventure & Hiking FAQs'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'كل ما تحتاج معرفته قبل الانطلاق للمسار' : 'Everything you need to know before heading to the trail'}
                </p>
              </div>

              <div className="space-y-3">
                {adventureFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#111A30] border border-white/10 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start font-semibold text-sm text-slate-200 hover:text-white"
                    >
                      <span>{isArabic ? faq.qAr : faq.qEn}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#E6AF2E] transition-transform duration-200 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-black/20">
                        {isArabic ? faq.aAr : faq.aEn}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2. NIGHTLIFE SPECIFIC CTA (VIP TABLE CONCIERGE) */}
        {category === 'nightlife' && (
          <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C152B] via-[#111E3D] to-[#0A1224] border border-[#00E5FF]/40 p-6 sm:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'خدمة كبار الشخصيات VIP' : 'Exclusive VIP Table Booking'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isArabic ? 'تخطط لحضور جماعي أو حجز طاولة VIP؟' : 'Planning a Private Group or VIP Table?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {isArabic
                    ? 'احجز مجلس كبار الشخصيات خلف الكواليس أو منصة VIP المرتفعة لـ 5 إلى 10 ضيوف مع خدمة صف السيارات والضيافة الخاصة عبر كونسيرج بلو هورس.'
                    : 'Reserve an elevated VIP raised lounge or Royal Backstage Majlis for 5-10 guests with bottle service, private butler, and valet via Blue Horse Concierge.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="https://wa.me/966500000000?text=Hello%20Blue%20Horse%20Concierge,%20I%20would%20like%20to%20reserve%20a%20VIP%20Table%20for%20the%20upcoming%20festival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm shadow-xl shadow-green-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isArabic ? 'حجز طاولة VIP عبر الواتساب' : 'Book VIP Table via WhatsApp'}</span>
                </a>

                <button
                  onClick={handleQuickNightlifeBook}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-[#00E5FF] text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{isArabic ? 'احجز تذكرة الحفل' : 'Secure Festival Pass'}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 3. CORPORATE SPECIFIC ESTIMATOR & INQUIRY FORM */}
        {category === 'corporate' && (
          <section className="space-y-8">
            <div className="rounded-3xl bg-[#0D162B] border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-300">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'حاسبة تقدير عروض الشركات' : 'Instant Corporate Quote Estimator'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isArabic ? 'صمم خلوة أو فعالية فريقك خلال ثوانٍ' : 'Customize Your Team Offsite in Seconds'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isArabic
                    ? 'اختر حجم الفريق ونوع الفعالية للحصول على تقدير استرشادي فوري وطلب عرض مالي معتمد'
                    : 'Select your team headcount and experience format for an instant estimate and formal proposal'}
                </p>
              </div>

              {/* Interactive Estimator Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Team Size Selector */}
                <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>{isArabic ? 'عدد أفراد الفريق / المشاركين' : 'Team Size (Headcount)'}</span>
                    <span className="text-[#00E5FF] font-black text-base">{teamSize} {isArabic ? 'مشارك' : 'Pax'}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>10 {isArabic ? 'أفراد' : 'pax'}</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150+</span>
                  </div>
                </div>

                {/* Package Type Selector */}
                <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <label className="text-xs font-bold text-slate-300">
                    {isArabic ? 'نوع التجربة المطلوبة' : 'Experience Format'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPackage('desert')}
                      className={`p-3 rounded-xl text-xs font-bold transition-all text-start border ${
                        selectedPackage === 'desert'
                          ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>{isArabic ? 'خلوة جبل القمر' : 'Desert Summit Offsite'}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        {isArabic ? 'هايكنج + عشاء + ورش' : 'Hike + Dinner + Strategy'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackage('festival')}
                      className={`p-3 rounded-xl text-xs font-bold transition-all text-start border ${
                        selectedPackage === 'festival'
                          ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>{isArabic ? 'مهرجان خاص متكامل' : 'Turnkey Brand Gala'}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        {isArabic ? 'مسرح + دي جي + صوتيات' : 'Stage + DJ + AV Setup'}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Estimate Banner */}
              <div className="max-w-4xl mx-auto mt-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {isArabic ? 'التقدير المالي المبدئي المتوقع' : 'Estimated Investment Range'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#00E5FF] flex items-baseline gap-1">
                    <span>
                      {selectedPackage === 'desert'
                        ? `SAR ${(teamSize * 420).toLocaleString()}`
                        : `SAR ${(25000 + teamSize * 300).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      {isArabic ? 'شامل الضريبة 15%' : 'incl. 15% VAT'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/966500000000?text=Corporate%20Inquiry:%20Team%20Size%20${teamSize},%20Package:%20${selectedPackage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>{isArabic ? 'محادثة فورية' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>

              {/* Instant Proposal Request Form */}
              <div className="max-w-4xl mx-auto mt-8 pt-8 border-t border-white/10">
                {corpSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-bold text-white">
                      {isArabic ? 'تم استلام طلبكم بنجاح!' : 'Proposal Request Received!'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {isArabic
                        ? 'سيقوم مستشار فعاليات الشركات لدى بلو هورس بالتواصل معكم وإرسال العرض المعتمد خلال 24 ساعة عمل.'
                        : 'Our Corporate Accounts Lead will reach out with the certified proposal within 24 business hours.'}
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (corpName && corpPhone) {
                        setCorpSubmitted(true);
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
                  >
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {isArabic ? 'اسم الجهة / الشركة' : 'Company Name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isArabic ? 'مثال: شركة أرامكو السعودية' : 'e.g. Acme Corp Saudi'}
                        value={corpName}
                        onChange={(e) => setCorpName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {isArabic ? 'رقم جوال المسؤول' : 'Mobile Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+966 5X XXX XXXX"
                        value={corpPhone}
                        onChange={(e) => setCorpPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-[#00E5FF] text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{isArabic ? 'طلب عرض مالي رسمي' : 'Request Official Proposal'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <UnifiedCheckoutModal locale={locale} />
      <LuxuryFooter locale={locale} />
    </div>
  );
}
