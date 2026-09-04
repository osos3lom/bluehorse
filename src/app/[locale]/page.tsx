'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Compass,
  Flame,
  Briefcase,
  Star,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { LuxuryNavbar } from '../../components/luxury/LuxuryNavbar';
import { LuxuryFooter } from '../../components/luxury/LuxuryFooter';
import { ProductCard } from '../../components/luxury/ProductCard';
import { UnifiedCheckoutModal } from '../../components/checkout/UnifiedCheckoutModal';
import { BlueHorseHero } from '../../components/landing/BlueHorseHero';
import { EventDiscoveryGrid } from '../../components/landing/EventDiscoveryGrid';
import { RichMediaGallery } from '../../components/landing/RichMediaGallery';
import { CorporateRetreatSection } from '../../components/landing/CorporateRetreatSection';
import { VideoBackdrop } from '../../components/common/VideoBackdrop';

export default function BlueHorseLandingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isArabic = locale === 'ar';

  const adventureExperiences = useMemo(
    () => luxuryCatalog.filter((p) => p.category === 'adventures'),
    []
  );

  const nightlifeExperiences = useMemo(
    () => luxuryCatalog.filter((p) => p.category === 'nightlife'),
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#00E5FF] selection:text-[#060B18] transition-colors">
      {/* Top Floating Navbar */}
      <LuxuryNavbar locale={locale} />

      <main className="flex-1 pb-24">
        {/* ==================================================================== */}
        {/* 1. IMMERSIVE HERO — DYNAMIC VIDEO & METRICS                           */}
        {/* ==================================================================== */}
        <BlueHorseHero locale={locale} />

        {/* ==================================================================== */}
        {/* 2. CATEGORIZED EVENT DISCOVERY GRID                                  */}
        {/* ==================================================================== */}
        <EventDiscoveryGrid locale={locale} />

        {/* ==================================================================== */}
        {/* 3. SHOWCASE: ADVENTURES & ECO-TOURISM (مغامرات بيئية وهايكنج)         */}
        {/* ==================================================================== */}
        <section id="adventures" className="relative isolate overflow-hidden py-16 sm:py-20 border-y border-white/10 scroll-mt-24">
          <VideoBackdrop src="/bg3rd.mp4" scrimClassName="bg-[#060B18]/50">
            <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/75 via-transparent to-[#060B18]/75" />
          </VideoBackdrop>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[#E6AF2E] text-xs font-bold uppercase tracking-widest drop-shadow">
                  <Compass className="w-4 h-4" />
                  <span>{isArabic ? 'سياحة بيئية واستكشاف' : 'Eco-Tourism & Adventures'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-light text-white drop-shadow-lg">
                  {isArabic ? (
                    <>
                      استكشف طبيعة جدة من <span className="font-extrabold text-[#F5D982]">جبل القمر إلى الشواطئ</span>
                    </>
                  ) : (
                    <>
                      Explore Untamed Nature: <span className="font-extrabold text-[#F5D982]">Moon Mountain & Coasts</span>
                    </>
                  )}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-light drop-shadow">
                  {isArabic
                    ? 'رحلات هايكنج جبلية مع مرشدين معتمدين، ركوب خيل على رمال الشاطئ، وتخييم بدوي أصيل تحت سماء الصحراء.'
                    : 'Certified mountain trail guides, golden-hour equestrian rides along the Red Sea, and stargazing telescope sessions.'}
                </p>
              </div>

              <Link
                href="#events-discovery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/12 backdrop-blur-xl border border-white/25 text-xs font-bold text-white hover:border-[#E6AF2E] hover:bg-white/20 transition-all shadow-lg shadow-black/20 shrink-0"
              >
                <span>{isArabic ? 'عرض جميع المغامرات' : 'View All Adventures'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {adventureExperiences.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 4. SHOWCASE: NIGHTLIFE & CONCERTS (حفلات ونايت لايف)                 */}
        {/* ==================================================================== */}
        <section id="nightlife" className="relative isolate overflow-hidden py-16 sm:py-20 border-y border-white/10 scroll-mt-24">
          <VideoBackdrop src="/experiance.mp4" scrimClassName="bg-[#060B18]/50">
            <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/75 via-transparent to-[#060B18]/75" />
          </VideoBackdrop>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[#00E5FF] text-xs font-bold uppercase tracking-widest drop-shadow">
                  <Flame className="w-4 h-4" />
                  <span>{isArabic ? 'فعاليات ومهرجانات شاطئية' : 'Nightlife & Beach Festivals'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-light text-white drop-shadow-lg">
                  {isArabic ? (
                    <>
                      نبض الحفلات وسهرات <span className="font-extrabold bg-gradient-to-r from-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">الوايت نايت</span>
                    </>
                  ) : (
                    <>
                      Electric Evenings & <span className="font-extrabold bg-gradient-to-r from-cyan-200 to-[#00E5FF] bg-clip-text text-transparent">White Night Festivals</span>
                    </>
                  )}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-light drop-shadow">
                  {isArabic
                    ? 'أمسيات دي جي شاطئية، مهرجانات إلكترونية مفتوحة في الصحراء، وعروض مسرحية بصرية مبهرة.'
                    : 'World-class DJ sets, immersive laser mapping, all-white dress code beach parties, and energetic dance floors.'}
                </p>
              </div>

              <Link
                href="#events-discovery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/12 backdrop-blur-xl border border-white/25 text-xs font-bold text-white hover:border-[#00E5FF] hover:bg-white/20 transition-all shadow-lg shadow-black/20 shrink-0"
              >
                <span>{isArabic ? 'عرض جميع الحفلات' : 'View All Nightlife'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {nightlifeExperiences.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 5. RICH MEDIA GALLERY (معرض الصور واللحظات)                          */}
        {/* ==================================================================== */}
        <RichMediaGallery locale={locale} />

        {/* ==================================================================== */}
        {/* 6. CORPORATE & BESPOKE RETREATS (خدمات الشركات)                       */}
        {/* ==================================================================== */}
        <CorporateRetreatSection locale={locale} />
      </main>

      {/* Global Native Checkout Modal Controller */}
      <UnifiedCheckoutModal locale={locale} />

      {/* Blue Horse Footer */}
      <LuxuryFooter locale={locale} />
    </div>
  );
}
