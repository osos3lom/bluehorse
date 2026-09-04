import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, ArrowLeft, ShieldCheck, Compass, Share2, Heart } from 'lucide-react';
import { luxuryCatalog } from '../../../../data/luxuryCatalog';
import { LuxuryNavbar } from '../../../../components/luxury/LuxuryNavbar';
import { LuxuryFooter } from '../../../../components/luxury/LuxuryFooter';
import { UnifiedCheckoutModal } from '../../../../components/checkout/UnifiedCheckoutModal';
import { AdventurePurchase } from '../../../../components/detail/AdventurePurchase';
import { NightlifePurchase } from '../../../../components/detail/NightlifePurchase';
import { CorporatePurchase } from '../../../../components/detail/CorporatePurchase';
import { EventTierPurchase } from '../../../../components/detail/EventTierPurchase';
import { DayPassPurchase } from '../../../../components/detail/DayPassPurchase';
import { SeaVoyagePurchase } from '../../../../components/detail/SeaVoyagePurchase';
import { RealEstatePurchase } from '../../../../components/detail/RealEstatePurchase';
import { getAssetPath } from '../../../../lib/assets';

interface PageProps {
  params: Promise<{
    locale: string;
    category: string;
    id: string;
  }>;
}

export function generateStaticParams() {
  const locales = ['en', 'ar'];
  const params: { locale: string; category: string; id: string }[] = [];

  locales.forEach((locale) => {
    luxuryCatalog.forEach((product) => {
      params.push({ locale, category: product.category, id: product.id });
      if (product.slug && product.slug !== product.id) {
        params.push({ locale, category: product.category, id: product.slug });
      }
    });
  });

  return params;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, category, id } = await params;
  const isArabic = locale === 'ar';

  const product = luxuryCatalog.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  const categoryNameLabel: Record<string, { en: string; ar: string }> = {
    adventures: { en: 'Adventures & Eco-Tourism', ar: 'المغامرات والسياحة البيئية' },
    nightlife: { en: 'Entertainment & Nightlife', ar: 'الحفلات والمهرجانات' },
    corporate: { en: 'Corporate Services', ar: 'خدمات الشركات والخلوات' },
    events: { en: 'Concerts & Events', ar: 'حفلات طرب' },
    voyages: { en: 'Sea Voyages', ar: 'رحلات بحرية' },
    'real-estate': { en: 'VIP Memberships', ar: 'العضويات' },
    'day-passes': { en: 'Day Passes', ar: 'تصاريح الدخول اليومية' },
  };

  const currentCatMeta = categoryNameLabel[product.category] || { en: product.category, ar: product.category };

  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col selection:bg-[#00E5FF] selection:text-slate-950 transition-colors">
      <LuxuryNavbar locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-8 w-full">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <Link
            href={`/${locale}/${product.category}`}
            className="inline-flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>
              {isArabic
                ? `العودة إلى ${currentCatMeta.ar}`
                : `Back to ${currentCatMeta.en}`}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
          <div className="md:col-span-2 relative h-80 sm:h-96 md:h-[460px]">
            <img
              src={getAssetPath(product.coverImage)}
              alt={product.title[isArabic ? 'ar' : 'en']}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            {product.badge && (
              <span className={`absolute bottom-4 left-4 px-3.5 py-1 rounded-xl font-extrabold text-xs shadow-lg ${
                product.category === 'adventures'
                  ? 'bg-[#E6AF2E] text-slate-950'
                  : product.category === 'nightlife'
                  ? 'bg-[#00E5FF] text-slate-950'
                  : 'bg-indigo-600 text-white'
              }`}>
                {product.badge[isArabic ? 'ar' : 'en']}
              </span>
            )}
          </div>

          <div className="hidden md:flex flex-col gap-4">
            {product.galleryImages.slice(0, 2).map((imgUrl, idx) => (
              <div key={idx} className="relative flex-1 overflow-hidden">
                <img
                  src={getAssetPath(imgUrl)}
                  alt="Gallery"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Title, Location, and Header Details */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/30">
              {currentCatMeta[isArabic ? 'ar' : 'en']}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount} {isArabic ? 'تقييم موثق' : 'verified reviews'})</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {product.title[isArabic ? 'ar' : 'en']}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0" />
            <span>{product.locationName[isArabic ? 'ar' : 'en']}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl pt-2 font-light">
            {product.description[isArabic ? 'ar' : 'en']}
          </p>
        </div>

        {/* Adaptive Dynamic Purchase Controller */}
        <div className="pt-2">
          {product.category === 'adventures' && (
            <AdventurePurchase product={product} locale={locale} />
          )}
          {product.category === 'nightlife' && (
            <NightlifePurchase product={product} locale={locale} />
          )}
          {product.category === 'corporate' && (
            <CorporatePurchase product={product} locale={locale} />
          )}
          {product.category === 'events' && (
            <EventTierPurchase product={product} locale={locale} />
          )}
          {product.category === 'day-passes' && (
            <DayPassPurchase product={product} locale={locale} />
          )}
          {product.category === 'voyages' && (
            <SeaVoyagePurchase product={product} locale={locale} />
          )}
          {product.category === 'real-estate' && (
            <RealEstatePurchase product={product} locale={locale} />
          )}
        </div>
      </main>

      <UnifiedCheckoutModal locale={locale} />
      <LuxuryFooter locale={locale} />
    </div>
  );
}
