'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Flame, Briefcase, Sparkles, Search, SlidersHorizontal, Calendar, ArrowRight } from 'lucide-react';
import { luxuryCatalog } from '../../data/luxuryCatalog';
import { ProductCard } from '../luxury/ProductCard';
import { ServiceCategory } from '../../types/booking';

interface EventDiscoveryGridProps {
  locale: string;
}

type VibeFilter = 'all' | 'adventures' | 'nightlife' | 'corporate';

export function EventDiscoveryGrid({ locale }: EventDiscoveryGridProps) {
  const isArabic = locale === 'ar';
  const [activeVibe, setActiveVibe] = useState<VibeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: VibeFilter; labelEn: string; labelAr: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      labelEn: 'All Experiences',
      labelAr: 'جميع التجارب',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      count: luxuryCatalog.length,
    },
    {
      id: 'adventures',
      labelEn: 'Adventures & Eco-Tourism',
      labelAr: 'المغامرات والهايكنج',
      icon: <Compass className="w-4 h-4 text-[#E6AF2E]" />,
      count: luxuryCatalog.filter((p) => p.category === 'adventures').length,
    },
    {
      id: 'nightlife',
      labelEn: 'Entertainment & Nightlife',
      labelAr: 'الحفلات والنايت لايف',
      icon: <Flame className="w-4 h-4 text-[#00E5FF]" />,
      count: luxuryCatalog.filter((p) => p.category === 'nightlife').length,
    },
    {
      id: 'corporate',
      labelEn: 'Corporate & Retreats',
      labelAr: 'الشركات والخلوات',
      icon: <Briefcase className="w-4 h-4 text-indigo-400" />,
      count: luxuryCatalog.filter((p) => p.category === 'corporate').length,
    },
  ];

  const filteredEvents = useMemo(() => {
    return luxuryCatalog.filter((product) => {
      // Category match
      if (activeVibe !== 'all') {
        if (product.category !== activeVibe) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleEn = product.title.en.toLowerCase();
        const titleAr = product.title.ar.toLowerCase();
        const descEn = product.description.en.toLowerCase();
        const descAr = product.description.ar.toLowerCase();
        const locEn = product.locationName.en.toLowerCase();
        const locAr = product.locationName.ar.toLowerCase();

        return (
          titleEn.includes(query) ||
          titleAr.includes(query) ||
          descEn.includes(query) ||
          descAr.includes(query) ||
          locEn.includes(query) ||
          locAr.includes(query)
        );
      }

      return true;
    });
  }, [activeVibe, searchQuery]);

  return (
    <section id="events-discovery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-cyan-700 dark:text-[#00E5FF] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>{isArabic ? 'جدول الفعاليات والرحلات' : 'Upcoming Blue Horse Experiences'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
            {isArabic ? (
              <>
                اكتشف مغامرتك <span className="font-extrabold bg-gradient-to-r from-cyan-600 via-[#00E5FF] to-[#E6AF2E] bg-clip-text text-transparent">القادمة في جدة</span>
              </>
            ) : (
              <>
                Curated Events & <span className="font-extrabold bg-gradient-to-r from-cyan-600 via-[#00E5FF] to-[#E6AF2E] bg-clip-text text-transparent">Outdoor Escapes</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-light leading-relaxed">
            {isArabic
              ? 'تجارب حصرية تجمع بين صهيل الخيل على الشاطئ، قمم جبل القمر الساحرة، وحفلات الوايت نايت الأسطورية.'
              : 'Seamless, direct native reservations for desert hikes, beach equestrian gallops, and electric nightlife festivals.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isArabic ? 'ابحث عن هايكنج، حفلة...' : 'Search experiences, DJ...'}
            className="w-full ps-10 pe-4 py-2.5 rounded-full bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-500/20 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] shadow-xs"
          />
        </div>
      </div>

      {/* Categorized Filter Tabs (Pill Switcher) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeVibe === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveVibe(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0B132B] dark:bg-[#00E5FF] text-white dark:text-[#060B18] shadow-lg shadow-cyan-500/25 scale-105 ring-2 ring-cyan-400/40'
                  : 'bg-white/80 dark:bg-[#121C38]/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:bg-white dark:hover:bg-[#18264A]'
              }`}
            >
              {tab.icon}
              <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive
                    ? 'bg-white/20 dark:bg-black/20 text-white dark:text-[#060B18]'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      <AnimatePresence mode="wait">
        {filteredEvents.length > 0 ? (
          <motion.div
            key={activeVibe + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredEvents.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-cyan-500/20 bg-white/40 dark:bg-[#121C38]/40 p-12 text-center space-y-4">
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {isArabic ? 'لم يتم العثور على تجارب مطابقة' : 'No experiences match your search'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isArabic ? 'جرّب البحث بكلمة أخرى أو تغيير القسم.' : 'Try adjusting your search terms or selecting a different category.'}
            </p>
            <button
              onClick={() => {
                setActiveVibe('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#00E5FF] text-[#060B18] text-xs font-bold hover:bg-cyan-300 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'إعادة تعيين البحث' : 'Show All Experiences'}</span>
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
