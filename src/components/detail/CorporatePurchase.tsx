'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Check,
  ShieldCheck,
  Calendar,
  Building,
  FileCheck,
  Clock,
  MessageCircle,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Plus,
  Minus,
  Award,
} from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';

interface CorporatePurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function CorporatePurchase({ product, locale = 'en' }: CorporatePurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart, setIsCheckoutOpen } = useBookingStore();

  const tiers = product.tiers || [];
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0] || ({} as TierOption));
  const [teamSize, setTeamSize] = useState(25);
  const [selectedDate, setSelectedDate] = useState('2026-11-15');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Proposal modal/form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const corporateAddons = [
    {
      id: 'corp-video-recap',
      titleEn: '4K Drone & Video Production Recap',
      titleAr: 'توثيق فيديو وإنتاج سينمائي 4K بطائرات درون',
      price: 3500,
    },
    {
      id: 'corp-vip-transport',
      titleEn: 'Executive VIP Chauffeur Fleet (Jeddah to Usfan)',
      titleAr: 'أسطول سيارات VIP مع سائقين من جدة للموقع',
      price: 4800,
    },
    {
      id: 'corp-facilitator',
      titleEn: 'Certified Executive Leadership Facilitator',
      titleAr: 'مدرب وميسر قيادي معتمد لإدارة ورش العمل',
      price: 5000,
    },
    {
      id: 'corp-branding',
      titleEn: 'Custom Company Stage & Site Branding Pack',
      titleAr: 'تجهيز مسرح وهوية الشركة البصرية في الموقع بالكامل',
      price: 2800,
    },
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    const baseRate = selectedTier?.price || product.basePrice || 8500;
    const perPaxExtra = teamSize > 20 ? (teamSize - 20) * 350 : 0;
    const addonsTotal = corporateAddons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return baseRate + perPaxExtra + addonsTotal;
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPhone) return;
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
      {/* Left 2 Columns: Enterprise Badges, Inclusions, and Customization */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Enterprise Compliance Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-[#0D162B] border border-white/10">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{isArabic ? 'الفوترة الضريبية' : 'ZATCA Compliance'}</span>
            </span>
            <p className="text-sm font-bold text-emerald-400">
              {isArabic ? 'نظامية 100%' : 'Phase 2 Ready'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{isArabic ? 'سجل الشركات' : 'Track Record'}</span>
            </span>
            <p className="text-sm font-bold text-white">
              {isArabic ? '+80 جهة وشركة' : '80+ Enterprises'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{isArabic ? 'وقت تسليم العرض' : 'Proposal Speed'}</span>
            </span>
            <p className="text-sm font-bold text-[#00E5FF]">
              {isArabic ? 'خلال 24 ساعة' : 'Within 24 Hours'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{isArabic ? 'التصاريح الأمنية' : 'Permits & Safety'}</span>
            </span>
            <p className="text-sm font-bold text-emerald-400">
              {isArabic ? 'معتمدة بالكامل' : '100% Licensed'}
            </p>
          </div>
        </div>

        {/* Corporate Package Tiers */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#00E5FF]" />
            <span>{isArabic ? 'باقات خلوات وفعاليات الشركات المتاحة' : 'Available Corporate Retreat Packages'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiers.map((t) => {
              const isSelected = selectedTier?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTier(t)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-[#00E5FF] shadow-lg shadow-cyan-500/10'
                      : 'bg-[#111A30] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-white">
                      {t.name[isArabic ? 'ar' : 'en']}
                    </h4>
                    <span className="text-xs font-black text-[#00E5FF] shrink-0">
                      SAR {t.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {t.description[isArabic ? 'ar' : 'en']}
                  </p>
                  
                  {t.perks && (
                    <ul className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                      {t.perks.map((perk, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{perk[isArabic ? 'ar' : 'en']}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Add-ons for Corporate Events */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00E5FF]" />
            <span>{isArabic ? 'خدمات إضافية اختيارية لتجهيز الفعالية' : 'Optional Turnkey Production Upgrades'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {corporateAddons.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => handleToggleAddon(addon.id)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-all ${
                    isChecked
                      ? 'bg-cyan-500/15 border-[#00E5FF] text-white'
                      : 'bg-[#111A30] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        isChecked ? 'bg-[#00E5FF] text-slate-950' : 'border border-white/30'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">
                      {isArabic ? addon.titleAr : addon.titleEn}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#00E5FF] shrink-0">
                    +SAR {addon.price.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct WhatsApp Concierge for Corporate Line */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isArabic ? 'تواصل مباشر مع مدير حسابات الشركات' : 'Direct Corporate Accounts Concierge'}</span>
            </h4>
            <p className="text-xs text-slate-300">
              {isArabic
                ? 'استشارة مجانية ومناقشة تفاصيل الخلوة والجدول الزمني عبر الواتساب مباشرة.'
                : 'Free consultation on agenda, venue customization, and scheduling.'}
            </p>
          </div>

          <a
            href="https://wa.me/966500000000?text=Hello%20Blue%20Horse,%20I%20would%20like%20to%20discuss%20a%20corporate%20retreat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs shadow-lg shadow-green-500/20 hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تواصل عبر الواتساب' : 'WhatsApp Concierge'}</span>
          </a>
        </div>
      </div>

      {/* Right Column: Interactive Proposal Request Form */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 rounded-3xl bg-[#0D162B] border border-cyan-500/30 p-6 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00E5FF]">
              {isArabic ? 'طلب عرض مالي معتمد' : 'Formal Corporate Proposal'}
            </span>
            <h3 className="text-xl font-black text-white">
              {isArabic ? 'تقدير تكلفة الفعالية' : 'Estimate & Proposal'}
            </h3>
          </div>

          {/* Team Size Slider */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>{isArabic ? 'حجم الفريق' : 'Team Headcount'}</span>
              <span className="text-[#00E5FF] font-black text-sm">{teamSize} {isArabic ? 'مشارك' : 'Pax'}</span>
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10 pax</span>
              <span>50 pax</span>
              <span>100+ pax</span>
            </div>
          </div>

          {/* Estimated Investment */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-1">
            <span className="text-[11px] text-slate-400">
              {isArabic ? 'التقدير المالي الاسترشادي (شامل الضريبة)' : 'Estimated Investment (incl. 15% VAT)'}
            </span>
            <div className="text-2xl font-black text-[#00E5FF]">
              SAR {calculateEstimate().toLocaleString()}
            </div>
          </div>

          {/* Proposal Request Form */}
          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {isArabic ? 'تم إرسال الطلب بنجاح!' : 'Proposal Request Sent!'}
              </h4>
              <p className="text-xs text-slate-300">
                {isArabic
                  ? 'سيتم تزويدكم بالعرض المالي المعتمد والفاتورة الأولية خلال 24 ساعة.'
                  : 'Our team will send the official PDF proposal and pro-forma invoice within 24 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitProposal} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isArabic ? 'اسم الشركة / الجهة' : 'Company Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'مثال: شركة سابك' : 'e.g. Aramco / SABIC'}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isArabic ? 'اسم منسق الفعالية' : 'Contact Person'}
                </label>
                <input
                  type="text"
                  placeholder={isArabic ? 'الاسم الثلاثي' : 'Full Name'}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isArabic ? 'رقم الجوال' : 'Mobile Number'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+966 5X XXX XXXX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isArabic ? 'البريد الإلكتروني للعمل' : 'Work Email'}
                </label>
                <input
                  type="email"
                  placeholder="name@company.sa"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-[#00E5FF] text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>{isArabic ? 'إرسال طلب العرض المالي' : 'Submit Proposal Request'}</span>
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isArabic
                ? 'فواتير ضريبية نظامية • عقود معتمدة'
                : 'ZATCA Tax Invoices • Verified Contracts'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
