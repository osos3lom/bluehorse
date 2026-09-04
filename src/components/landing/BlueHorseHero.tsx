'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Compass, Flame } from 'lucide-react';
import { VideoBackdrop } from '../common/VideoBackdrop';
import { getAssetPath } from '@/lib/assets';

interface BlueHorseHeroProps {
  locale: string;
}

const PHRASES = {
  ar: [
    {
      prefix: 'مغامرات جامحة',
      suffix: 'وليالٍ كهربائية',
      subtitle: 'حيث تلتقي روح الطبيعة في جبل القمر بإثارة الحفلات والموسيقى على شواطئ جدة.',
      tag: 'بلو هورس • جدة 💙',
    },
    {
      prefix: 'من صهيل الخيل',
      suffix: 'إلى قمم جبل القمر',
      subtitle: 'ركوب الخيل على رمال الشاطئ، سفاري الكثبان الرملية، وهايكنج الغروب ورصد النجوم.',
      tag: 'سياحة بيئية واستكشاف 🏔️',
    },
    {
      prefix: 'نبض الليالي',
      suffix: 'وحفلات الوايت نايت',
      subtitle: 'أمسيات دي جي شاطئية استثنائية، عروض إلكترونية، وتجارب خاصة للشركات.',
      tag: 'فعاليات ونايت لايف ⚡',
    },
  ],
  en: [
    {
      prefix: 'Untamed Adventures.',
      suffix: 'Electric Nights.',
      subtitle: 'Bridging the gap between high-energy nightlife and eco-tourism across Jeddah.',
      tag: 'Blue Horse • Jeddah 💙',
    },
    {
      prefix: 'From Beach Gallops',
      suffix: 'to Moon Mountain.',
      subtitle: 'Sunset horseback riding, desert quad safaris, and stargazing from granite summits.',
      tag: 'Eco-Tourism & Wilderness 🏔️',
    },
    {
      prefix: 'Feel the Bass',
      suffix: 'at White Night.',
      subtitle: 'Legendary all-white beach festivals, open-desert DJ sets, and bespoke retreats.',
      tag: 'Entertainment & Nightlife ⚡',
    },
  ],
};

export function BlueHorseHero({ locale }: BlueHorseHeroProps) {
  const isArabic = locale === 'ar';
  const prefersReduced = useReducedMotion() ?? false;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 5500);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  const activePhrases = isArabic ? PHRASES.ar : PHRASES.en;
  const currentPhrase = activePhrases[currentIndex];

  const fade = (delay: number) => ({
    initial: prefersReduced ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center text-white">
      {/* ---------- Full Height Looping Video Background ---------- */}
      <VideoBackdrop src="/bgvideo.mp4" scrimClassName="bg-[#060B18]/35">
        {/* Readability wash kept to the top and bottom edges so the footage stays clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/75 via-transparent to-[#0B132B]/85" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B132B] to-transparent pointer-events-none" />
      </VideoBackdrop>

      {/* Top spacer to balance floating navbar */}
      <div className="w-full h-20 sm:h-24 shrink-0" aria-hidden="true" />

      {/* ---------- Hero Centered Content ---------- */}
      <div className="flex-1 flex items-center justify-center w-full max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        <div className="flex flex-col items-center space-y-6 sm:space-y-7 w-full">
          
          {/* Official Blue Horse Badge with Neon Rim */}
          <motion.div
            {...fade(0.1)}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/12 border border-white/25 dark:border-cyan-400/30 backdrop-blur-xl shadow-lg shadow-cyan-500/15"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden bg-white shrink-0 p-0.5">
              <img src={getAssetPath('/brand/bluehorse-logo.png')} alt="Blue Horse" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-bold text-cyan-200 dark:text-[#00E5FF] tracking-wider uppercase">
              {currentPhrase.tag}
            </span>
          </motion.div>

          {/* Dynamic Headline & Subtitle */}
          <div className="min-h-[190px] sm:min-h-[220px] md:min-h-[250px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={prefersReduced ? undefined : { opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -12, filter: 'blur(8px)' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center space-y-3.5 sm:space-y-4"
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight text-white flex flex-col items-center">
                  <span className="block font-thin">{currentPhrase.prefix}</span>
                  <span className="font-black bg-gradient-to-r from-white via-cyan-200 to-[#00E5FF] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(0,229,255,0.4)]">
                    {currentPhrase.suffix}
                  </span>
                </h1>

                <p className="text-xs sm:text-base md:text-lg text-slate-200 font-light max-w-xl leading-relaxed text-balance">
                  {currentPhrase.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action CTAs */}
          <motion.div {...fade(0.3)} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="#events-discovery"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#00CFFF] to-[#0090C8] hover:brightness-110 text-[#060B18] px-8 py-3.5 text-xs sm:text-sm font-black shadow-xl shadow-cyan-500/35 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#060B18]" />
              <span>{isArabic ? 'استكشف الفعاليات القادمة' : 'Explore Upcoming Events'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#adventures"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md px-6 py-3.5 text-xs sm:text-sm font-semibold text-white transition-all hover:scale-105 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#E6AF2E]" />
              <span>{isArabic ? 'رحلات الهايكنج والفروسية' : 'Hikes & Horseback'}</span>
            </Link>
          </motion.div>

          {/* Live Metrics Strip */}
          <motion.div
            {...fade(0.5)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-4 w-full max-w-3xl"
          >
            <div className="rounded-2xl bg-white/10 border border-white/20 dark:border-cyan-400/20 p-2.5 sm:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
              <span className="block text-base sm:text-xl font-black text-white">15,000+</span>
              <span className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                {isArabic ? 'مغامر مسجل' : 'Adventurers'}
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/20 dark:border-cyan-400/20 p-2.5 sm:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
              <span className="block text-base sm:text-xl font-black text-[#00E5FF]">120+</span>
              <span className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                {isArabic ? 'فعالية وحفلة' : 'Hosted Events'}
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/20 dark:border-cyan-400/20 p-2.5 sm:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
              <span className="block text-base sm:text-xl font-black text-gradient-gold">4.9 ★</span>
              <span className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                {isArabic ? 'تقييم التجارب' : 'Rating'}
              </span>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/20 dark:border-cyan-400/20 p-2.5 sm:p-3 text-center backdrop-blur-xl shadow-lg shadow-black/20">
              <span className="block text-base sm:text-xl font-black text-emerald-400">100%</span>
              <span className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">
                {isArabic ? 'حجز فوري مباشر' : 'Native Booking'}
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ---------- Bottom Scroll Cue ---------- */}
      <motion.div {...fade(0.6)} className="w-full pb-4 sm:pb-6 flex justify-center shrink-0 z-10">
        <Link
          href="#events-discovery"
          aria-label="Scroll down to events"
          className="text-slate-400 hover:text-[#00E5FF] transition-colors p-2 animate-bounce cursor-pointer"
        >
          <ChevronDown className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
