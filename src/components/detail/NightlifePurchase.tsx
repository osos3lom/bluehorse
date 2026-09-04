'use client';

import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Sparkles,
  Users,
  Check,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertCircle,
  MessageCircle,
  Ticket,
  Plus,
  Minus,
  CheckCircle2,
  Crown,
  Wine,
} from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';

interface NightlifePurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function NightlifePurchase({ product, locale = 'en' }: NightlifePurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart, setIsCheckoutOpen } = useBookingStore();

  const tiers = product.tiers || [];
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0] || ({} as TierOption));
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2026-11-28');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addOns = product.availableAddOns || [];

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const tierPrice = selectedTier?.price || product.basePrice || 0;
    const baseTotal = tierPrice * quantity;
    const addonsTotal = addOns
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.price * quantity, 0);
    return baseTotal + addonsTotal;
  };

  const handleReserve = () => {
    if (!selectedTier) return;
    const addOnsToAdd = addOns
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => ({
        id: a.id,
        title: a.title,
        price: a.price,
        quantity,
      }));

    addToCart({
      id: `${product.id}-${selectedTier.id}-${Date.now()}`,
      productId: product.id,
      category: 'nightlife',
      title: product.title,
      coverImage: product.coverImage,
      locationName: product.locationName,
      selectedDate,
      tier: {
        id: selectedTier.id,
        name: selectedTier.name,
        price: selectedTier.price,
      },
      quantity,
      unitPrice: selectedTier.price,
      addOns: addOnsToAdd,
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
      {/* Left 2 Columns: Festival Experience, Lineup, Dress Code & VIP Concierge */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Festival Vibe & Schedule Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-[#0D162B] border border-cyan-500/20">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{isArabic ? 'موعد الحفل' : 'Festival Date'}</span>
            </span>
            <p className="text-sm font-bold text-white">
              {product.dateOrSchedule || '2026-11-28 • 08:00 PM'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{isArabic ? 'الزي المعتمد' : 'Dress Code'}</span>
            </span>
            <p className="text-sm font-bold text-[#00E5FF]">
              {isArabic ? 'الزي الأبيض الأنيق' : 'All-White Glamour'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isArabic ? 'الفئة العمرية' : 'Age Restriction'}</span>
            </span>
            <p className="text-sm font-bold text-emerald-400">
              {isArabic ? '+18 سنة فما فوق' : '18+ Verified ID'}
            </p>
          </div>
        </div>

        {/* Dress Code Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-[#00E5FF] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">
              {isArabic ? 'شروط الدخول والزي الأبيض الأيقوني' : 'Iconic All-White Dress Code Policy'}
            </h4>
            <p className="text-xs text-slate-300">
              {isArabic
                ? 'يُشترط ارتداء ملابس بيضاء بالكامل للدخول إلى ساحات الحفل والمنصات. يرجى إبراز الباركود الرقمي المشفر عند البوابات.'
                : 'All-white attire is mandatory for entry to all festival zones and lounges. Digital encrypted QR pass must be shown at the entrance.'}
            </p>
          </div>
        </div>

        {/* VIP Majlis Table Concierge Feature */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#141C35] to-[#0E1528] border border-cyan-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#00E5FF]" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              {isArabic ? 'طاولات ومجالس VIP خلف الكواليس' : 'Royal Backstage Majlis & VIP Tables'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {isArabic
              ? 'هل ترغب في تجربة استثنائية مع أصدقائك؟ احجز مجلس كبار الشخصيات مع خدمة ضيافة خاصة، موقف سيارات VIP، ولقاء نجوم الحفل عبر كونسيرج بلو هورس المباشر.'
              : 'Looking for the ultimate VIP experience? Reserve a private backstage majlis with dedicated butler, private valet, and artist meet-and-greet via Blue Horse Concierge.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/966500000000?text=Hello%20Blue%20Horse%20Concierge,%20I%20would%20like%20to%20reserve%20a%20VIP%20Table%20for%20the%20upcoming%20festival"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs shadow-lg shadow-green-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isArabic ? 'احجز طاولة VIP عبر الواتساب' : 'Reserve VIP Table via WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Lineup & Production Highlights */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#00E5FF]" />
            <span>{isArabic ? 'مزايا الإنتاج الموسيقي والمسرح' : 'Production & Stage Highlights'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                en: 'State-of-the-art D&B Audiotechnik Sound System',
                ar: 'نظام صوتي عالمي فائق النقاء',
              },
              {
                en: 'Synchronized 3D Laser & Visual Stage Mapping',
                ar: 'عروض ليزر وإسقاط ضوئي ثلاثي الأبعاد',
              },
              {
                en: 'Midnight Red Sea Beach Fireworks Spectacle',
                ar: 'عروض ألعاب نارية شاطئية في منتصف الليل',
              },
              {
                en: 'Artisan Mixology Bar (Zero Alcohol Craft Mocktails)',
                ar: 'ركن موكتيلات مبتكرة وعصائر منعشة',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111A30] border border-white/10 flex items-center gap-3 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>{isArabic ? item.ar : item.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Booking & Pass Selection Card */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 rounded-3xl bg-[#0D162B] border border-cyan-500/30 p-6 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00E5FF]">
              {isArabic ? 'حجز تذاكر الحفل الرسمية' : 'Official Festival Passes'}
            </span>
            <h3 className="text-xl font-black text-white">
              {isArabic ? 'اختر فئة الدخول' : 'Select Admission Tier'}
            </h3>
          </div>

          {/* Tier Cards Selector */}
          <div className="space-y-2.5">
            {tiers.map((t) => {
              const isSelected = selectedTier?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTier(t)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-[#00E5FF] shadow-lg shadow-cyan-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-white">
                      {t.name[isArabic ? 'ar' : 'en']}
                    </div>
                    <div className="text-sm font-extrabold text-[#00E5FF]">
                      SAR {t.price}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t.description[isArabic ? 'ar' : 'en']}
                  </p>
                  <div className="mt-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Ticket className="w-3 h-3" />
                    <span>
                      {isArabic
                        ? `متبقي ${t.capacityRemaining} تذاكر فقط`
                        : `${t.capacityRemaining} passes remaining`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-slate-300">
              {isArabic ? 'عدد التذاكر المطلوبة' : 'Pass Quantity'}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-extrabold text-white w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add-Ons Options */}
          {addOns.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                {isArabic ? 'ترقيات كبار الشخصيات' : 'VIP Add-ons & Perks'}
              </label>
              <div className="space-y-1.5">
                {addOns.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-cyan-500/10 border-[#00E5FF] text-white'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            isChecked ? 'bg-[#00E5FF] text-slate-950' : 'border border-white/30'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.title[isArabic ? 'ar' : 'en']}</span>
                      </div>
                      <span className="font-bold text-[#00E5FF]">+SAR {addon.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Summary & Primary Reservation Button */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">
                {isArabic ? 'المجموع النهائي (شامل الضريبة)' : 'Total (incl. 15% VAT)'}
              </span>
              <div className="text-2xl font-black text-[#00E5FF] flex items-center gap-1">
                <span>SAR {calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReserve}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-[#00E5FF] text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>{isArabic ? 'احجز تذكرة الحفل الآن' : 'Secure Festival Pass Now'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isArabic
                  ? 'دخول فوري بالباركود • مشفر 100% • دفع سريع وآمن'
                  : 'Encrypted QR Access • Instant Delivery • Apple Pay'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
