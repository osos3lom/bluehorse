'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, ShoppingBag, Sparkles, Flame, Briefcase, Ticket, Globe, PhoneCall, Camera } from 'lucide-react';
import { useBookingStore } from '../../lib/bookingStore';
import { ThemeToggle } from '../common/ThemeToggle';
import { getAssetPath } from '../../lib/assets';

interface LuxuryNavbarProps {
  locale?: string;
  onOpenCart?: () => void;
}

export function LuxuryNavbar({ locale = 'en', onOpenCart }: LuxuryNavbarProps) {
  const isArabic = locale === 'ar';
  const pathname = usePathname();
  const router = useRouter();
  const { pricing, setIsCheckoutOpen } = useBookingStore();

  const switchLocale = (newLocale: 'en' | 'ar') => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
  };

  const navLinks = [
    {
      href: `/${locale}/#adventures`,
      labelEn: 'Adventures',
      labelAr: 'المغامرات',
      icon: <Compass className="w-3.5 h-3.5 text-[#E6AF2E]" />,
    },
    {
      href: `/${locale}/#nightlife`,
      labelEn: 'Nightlife',
      labelAr: 'الحفلات',
      icon: <Flame className="w-3.5 h-3.5 text-[#00E5FF]" />,
    },
    {
      href: `/${locale}/#corporate`,
      labelEn: 'Corporate',
      labelAr: 'الشركات',
      icon: <Briefcase className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      href: `/${locale}/#gallery`,
      labelEn: 'Gallery',
      labelAr: 'المعرض',
      icon: <Camera className="w-3.5 h-3.5 text-cyan-300" />,
    },
    {
      href: `/${locale}/my-tickets`,
      labelEn: 'My Passes',
      labelAr: 'تذاكري',
      icon: <Ticket className="w-3.5 h-3.5 text-emerald-400" />,
    },
  ];

  const handleCartClick = () => {
    if (onOpenCart) onOpenCart();
    else setIsCheckoutOpen(true);
  };

  return (
    <>
      {/* ==================================================================== */}
      {/* TOP FLOATING GLASSMORPHISM NAVBAR (DESKTOP & TABLET) */}
      {/* ==================================================================== */}
      <div className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
        <header className="max-w-7xl mx-auto pointer-events-auto rounded-2xl bg-white/80 dark:bg-[#0B132B]/85 backdrop-blur-xl border border-slate-200/80 dark:border-cyan-500/20 shadow-xl shadow-slate-900/5 dark:shadow-cyan-950/20 text-slate-900 dark:text-white px-3.5 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300">
          {/* Left: Brand Logo & Title */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-400/30 flex items-center justify-center p-1 shadow-md shadow-cyan-500/10 group-hover:scale-105 group-hover:border-[#00E5FF] transition-all">
              <img
                src={getAssetPath('/brand/bluehorse-logo.png')}
                alt="Blue Horse | بلو هورس"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base tracking-wider bg-gradient-to-r from-[#0B132B] via-[#076B9A] to-[#C98E18] dark:from-white dark:via-[#00E5FF] dark:to-[#E6AF2E] bg-clip-text text-transparent uppercase">
                {isArabic ? 'بلو هورس' : 'BLUE HORSE'}
              </span>
              <span className="text-[9px] tracking-widest text-[#C98E18] dark:text-[#E6AF2E] uppercase font-bold hidden sm:block">
                {isArabic ? 'فعاليات ومغامرات' : 'EVENTS & ADVENTURES'}
              </span>
            </div>
          </Link>

          {/* Center: Clean Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-[#00E5FF] hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                {link.icon}
                <span>{isArabic ? link.labelAr : link.labelEn}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Actions & Glowing Booking Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* VIP Concierge Phone / WhatsApp */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#00E5FF]/40 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00E5FF]" />
              <span className="text-[11px] font-semibold">{isArabic ? 'خدمة VIP' : 'VIP Concierge'}</span>
            </a>

            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle className="bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200" />

            {/* Language Switcher */}
            <button
              onClick={() => switchLocale(isArabic ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-[#00E5FF]" />
              <span className="text-[11px]">{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* Glowing Blue Horse Booking Button */}
            <button
              onClick={handleCartClick}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-primary text-white dark:text-[#060B18] hover:brightness-110 font-black text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="relative z-10 hidden sm:inline">{isArabic ? 'احجز الآن' : 'Book Experience'}</span>

              {pricing.totalItemCount > 0 && (
                <span className="relative z-10 w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-950 animate-bounce">
                  {pricing.totalItemCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM FLOATING GLASSMORPHISM NAV (MOBILE SCREENS) */}
      {/* ==================================================================== */}
      <nav className="fixed bottom-4 left-3 right-3 sm:left-6 sm:right-6 z-50 md:hidden pointer-events-auto">
        <div className="max-w-md mx-auto rounded-full bg-white/85 dark:bg-[#0B132B]/90 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/20 shadow-2xl shadow-slate-900/20 dark:shadow-cyan-950/50 text-slate-900 dark:text-white px-3 py-2 flex items-center justify-between gap-1 transition-all">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center py-1 px-2 rounded-2xl text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00E5FF] active:scale-95 transition-all"
            >
              <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 mb-0.5">
                {link.icon}
              </div>
              <span className="truncate">{isArabic ? link.labelAr : link.labelEn}</span>
            </Link>
          ))}

          {/* Quick Mobile Cart Floating Trigger */}
          <button
            onClick={handleCartClick}
            className="relative p-2.5 rounded-full bg-gradient-primary text-white dark:text-[#060B18] shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-90 transition-transform cursor-pointer"
            aria-label="Cart and Checkout"
          >
            <ShoppingBag className="w-4 h-4" />
            {pricing.totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px] flex items-center justify-center border-2 border-white dark:border-slate-950">
                {pricing.totalItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
