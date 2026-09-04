'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Maximize2, ExternalLink, Sparkles, Heart } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface RichMediaGalleryProps {
  locale: string;
}

interface GalleryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'nightlife' | 'hikes' | 'horses' | 'desert';
  imageUrl: string;
  locationEn: string;
  locationAr: string;
  likes: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    titleEn: 'White Night Beach Festival Finale',
    titleAr: 'ختام مهرجان الوايت نايت الشاطئي',
    category: 'nightlife',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'North Obhur, Jeddah',
    locationAr: 'أبحر الشمالية، جدة',
    likes: 1240,
  },
  {
    id: 'g-2',
    titleEn: 'Sunset Gallop on the Red Sea Coast',
    titleAr: 'صهيل الخيل وقت الغروب على ساحل البحر',
    category: 'horses',
    imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'Obhur Beach, Jeddah',
    locationAr: 'شاطئ أبحر، جدة',
    likes: 980,
  },
  {
    id: 'g-3',
    titleEn: 'Moon Mountain Summit Stargazing',
    titleAr: 'رصد النجوم من قمة جبل القمر',
    category: 'hikes',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'Jabal Al-Qamar, Usfan',
    locationAr: 'جبل القمر، عسفان',
    likes: 850,
  },
  {
    id: 'g-4',
    titleEn: 'Electric Dunes Desert Techno Stage',
    titleAr: 'مسرح إلكتريك ديونز في قلب الصحراء',
    category: 'nightlife',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'Moon Valley Arena',
    locationAr: 'وادي القمر، جدة',
    likes: 1420,
  },
  {
    id: 'g-5',
    titleEn: 'Carving Dahaban Golden Sand Dunes',
    titleAr: 'تحدي الكثبان الرملية في صحراء ذهبان',
    category: 'desert',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'Dahaban Desert, Jeddah',
    locationAr: 'صحراء ذهبان، جدة',
    likes: 760,
  },
  {
    id: 'g-6',
    titleEn: 'Purebred Arabian Horse & Seaside Horizon',
    titleAr: 'خيل عربي أصيل وأفق البحر الممتد',
    category: 'horses',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'North Obhur Sands',
    locationAr: 'رمال أبحر الشمالية',
    likes: 1100,
  },
  {
    id: 'g-7',
    titleEn: 'Campfire Gathering & Acoustic Strings',
    titleAr: 'جلسة موقد النار وأنغام العود في الطبيعة',
    category: 'hikes',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'Moon Mountain Camp',
    locationAr: 'مخيم جبل القمر',
    likes: 920,
  },
  {
    id: 'g-8',
    titleEn: 'Neon Rhythm DJ Performance',
    titleAr: 'عرض دي جي حي في مهرجان نيون ريثم',
    category: 'nightlife',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    locationEn: 'Jeddah Waterfront Stage',
    locationAr: 'مسرح واجهة جدة البحرية',
    likes: 1350,
  },
];

export function RichMediaGallery({ locale }: RichMediaGalleryProps) {
  const isArabic = locale === 'ar';
  const [filter, setFilter] = useState<'all' | 'nightlife' | 'hikes' | 'horses' | 'desert'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Highlights', labelAr: 'جميع اللحظات' },
    { id: 'nightlife', labelEn: 'Nightlife & DJs', labelAr: 'الحفلات والدي جي' },
    { id: 'hikes', labelEn: 'Moon Mountain Hikes', labelAr: 'هايكنج جبل القمر' },
    { id: 'horses', labelEn: 'Beach Horseback', labelAr: 'فروسية الشاطئ' },
    { id: 'desert', labelEn: 'Desert Safaris', labelAr: 'سفاري الصحراء' },
  ];

  const items = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6AF2E]/15 border border-[#E6AF2E]/30 text-[#C98E18] dark:text-[#E6AF2E] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>{isArabic ? 'معرض مواسم بلو هورس' : 'Past Seasons & Live Moments'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
            {isArabic ? (
              <>
                ذكريات توثقها <span className="font-extrabold bg-gradient-to-r from-[#00E5FF] to-[#E6AF2E] bg-clip-text text-transparent">العدسة والحماس</span>
              </>
            ) : (
              <>
                Captured Moments, <span className="font-extrabold bg-gradient-to-r from-[#00E5FF] to-[#E6AF2E] bg-clip-text text-transparent">Electric Memories</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-light leading-relaxed">
            {isArabic
              ? 'لقطات حية من ليالي الحفلات الصاخبة، جولات الخيل على الساحل، وتخييم جبل القمر تحت النجوم.'
              : 'Immersive visual masonry showcasing past seasons across Jeddah. Follow us on Instagram for daily stories.'}
          </p>
        </div>

        {/* Instagram Link CTA */}
        <a
          href="https://www.instagram.com/_bluehorse/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-[#060B18] font-bold text-xs hover:scale-105 transition-all shadow-md shrink-0 cursor-pointer"
        >
          <InstagramIcon className="w-4 h-4 text-pink-500" />
          <span>@_bluehorse</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
              filter === cat.id
                ? 'bg-[#0B132B] dark:bg-[#00E5FF] text-white dark:text-[#060B18] shadow-md shadow-cyan-500/20'
                : 'bg-white/80 dark:bg-[#121C38]/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30'
            }`}
          >
            {isArabic ? cat.labelAr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            onClick={() => setActiveItem(item)}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-900/10"
          >
            <img
              src={item.imageUrl}
              alt={isArabic ? item.titleAr : item.titleEn}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Top Right Zoom Icon */}
            <div className="absolute top-3 end-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Bottom Content Info */}
            <div className="absolute bottom-3 start-3 end-3 text-white space-y-1">
              <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider block">
                {isArabic ? item.locationAr : item.locationEn}
              </span>
              <h4 className="text-xs sm:text-sm font-bold line-clamp-1 group-hover:text-[#00E5FF] transition-colors">
                {isArabic ? item.titleAr : item.titleEn}
              </h4>
              <div className="flex items-center gap-1 text-[10px] text-slate-300 pt-0.5">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>{item.likes.toLocaleString()} likes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-[#0B132B] border border-cyan-500/30 shadow-2xl text-white"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 end-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[75vh] w-full bg-black flex items-center justify-center">
                <img
                  src={activeItem.imageUrl}
                  alt={isArabic ? activeItem.titleAr : activeItem.titleEn}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#0B132B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#00E5FF] font-bold uppercase tracking-wider block">
                    {isArabic ? activeItem.locationAr : activeItem.locationEn}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {isArabic ? activeItem.titleAr : activeItem.titleEn}
                  </h3>
                </div>

                <a
                  href="https://www.instagram.com/_bluehorse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00E5FF] hover:bg-cyan-300 text-[#060B18] font-bold text-xs transition-all shadow-md"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{isArabic ? 'شاهد المزيد على إنستغرام' : 'View on Instagram'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
