'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Flame, Briefcase, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { getAssetPath } from '../../lib/assets';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function LuxuryFooter({ locale = 'en' }: { locale?: string }) {
  const isArabic = locale === 'ar';

  return (
    <footer className="w-full bg-[#0B132B] border-t border-cyan-500/20 text-slate-400 text-xs transition-colors">
      {/* Top Banner: Saudi Hospitality & Trust */}
      <div className="border-b border-white/5 py-8 bg-[#060B18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-[#00E5FF]" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">{isArabic ? 'مرشدين جبليين معتمدين' : 'Certified Adventure Guides'}</p>
              <p className="text-[11px] text-slate-400">{isArabic ? 'إرشاد احترافي ومعايير سلامة دولية' : 'Accredited wilderness & hike leaders'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6AF2E]/10 border border-[#E6AF2E]/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#E6AF2E]" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">{isArabic ? 'فواتير ضريبية نظامية' : 'ZATCA Phase 2 E-Invoicing'}</p>
              <p className="text-[11px] text-slate-400">{isArabic ? 'شفافية ضريبية 15% وتأكيد فوري' : 'Official VAT invoice & instant QR ticket'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">{isArabic ? 'فروسية أصيلة وتجهيزات كاملة' : 'Purebred Equestrian Safety'}</p>
              <p className="text-[11px] text-slate-400">{isArabic ? 'خيل عربية مدربة وخوذ معتمدة' : 'Trained Arabian horses & safety gear'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">{isArabic ? 'رؤية 2030 للسياحة البيئية' : 'Saudi Vision 2030'}</p>
              <p className="text-[11px] text-slate-400">{isArabic ? 'تنشيط السياحة والمغامرات بجدة' : 'Pioneering outdoor eco-tourism in Jeddah'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Bio */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#121C38] border border-cyan-400/30 flex items-center justify-center p-1 shrink-0 shadow-sm">
              <img src={getAssetPath('/brand/bluehorse-logo.png')} alt="Blue Horse | بلو هورس" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white tracking-wider">
                {isArabic ? 'بلو هورس' : 'BLUE HORSE'}
              </span>
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
                {isArabic ? 'فعاليات ومغامرات جدة' : 'EVENTS & ADVENTURES'}
              </span>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {isArabic
              ? 'المنصة الرسمية الرائدة لتنظيم الفعاليات والمغامرات الخارجية وسياحة الطبيعة في جدة. نجمع بين إثارة الليالي والحفلات وسكون الجبال وصهيل الخيل.'
              : 'Jeddah’s premier event management and outdoor adventure collective bridging the gap between high-energy nightlife and eco-tourism.'}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <a
              href="https://www.instagram.com/_bluehorse/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#00E5FF] text-xs font-bold transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>@_bluehorse</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-white mb-3 text-xs tracking-wider uppercase">
            {isArabic ? 'الأقسام والتجارب' : 'Experience Pillars'}
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href={`/${locale}/#adventures`} className="hover:text-[#00E5FF] transition-colors">{isArabic ? 'هايكنج جبل القمر والتخييم' : 'Moon Mountain Hikes & Stargazing'}</Link></li>
            <li><Link href={`/${locale}/#adventures`} className="hover:text-[#00E5FF] transition-colors">{isArabic ? 'ركوب الخيل على شاطئ البحر' : 'Red Sea Beach Horseback Riding'}</Link></li>
            <li><Link href={`/${locale}/#nightlife`} className="hover:text-[#00E5FF] transition-colors">{isArabic ? 'مهرجان الوايت نايت والحفلات' : 'White Night Festival & Concerts'}</Link></li>
            <li><Link href={`/${locale}/#nightlife`} className="hover:text-[#00E5FF] transition-colors">{isArabic ? 'إلكتريك ديونز وحفلات الصحراء' : 'Electric Dunes Open-Air Rave'}</Link></li>
            <li><Link href={`/${locale}/#corporate`} className="hover:text-[#00E5FF] transition-colors">{isArabic ? 'خلوات الشركات وتطوير الفرق' : 'Executive Corporate Retreats'}</Link></li>
          </ul>
        </div>

        {/* Key Locations in Jeddah */}
        <div>
          <h4 className="font-bold text-white mb-3 text-xs tracking-wider uppercase">
            {isArabic ? 'مواقع المغامرات بجدة' : 'Blue Horse Locations'}
          </h4>
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li><span>📍 Moon Mountain (جبل القمر، عسفان)</span></li>
            <li><span>📍 Obhur North Beachfront (شاطئ أبحر الشمالية)</span></li>
            <li><span>📍 Dahaban Golden Dunes (صحراء ذهبان)</span></li>
            <li><span>📍 Jeddah Waterfront (الواجهة البحرية)</span></li>
          </ul>
        </div>

        {/* Payment Methods & Legal */}
        <div>
          <h4 className="font-bold text-white mb-3 text-xs tracking-wider uppercase">
            {isArabic ? 'طرق الدفع المعتمدة' : 'Accepted Saudi Payments'}
          </h4>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {[
              { name: 'Mada', src: '/payments/Mada_Logo.png' },
              { name: 'Apple Pay', src: '/payments/Apple_Pay.png' },
              { name: 'Visa', src: '/payments/Visa_Logo.png' },
              { name: 'Mastercard', src: '/payments/Mastercard-Logo.png' },
              { name: 'STC Pay', src: '/payments/Stc_pay.png' },
              { name: 'Tamara', src: '/payments/taamara.png' },
              { name: 'Tabby', src: '/payments/tabby-logo.png' },
            ].map((p) => (
              <div
                key={p.name}
                className="h-8 px-2.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center transition-transform hover:scale-105"
                title={p.name}
              >
                <img src={p.src} alt={p.name} className="h-4.5 max-w-[52px] object-contain" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {isArabic
              ? 'حجز مباشر وفوري دون روابط خارجية، مشفر وفق معايير البنك المركزي السعودي (ساما).'
              : 'Native on-domain booking with 256-bit SSL encryption, fully compliant with Saudi Central Bank (SAMA) standards.'}
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/5 py-4 text-center text-[10px] text-slate-400">
        <p>© 2026 Blue Horse (بلو هورس) Event Management & Outdoor Adventures. Kingdom of Saudi Arabia. All rights reserved.</p>
      </div>
    </footer>
  );
}
