'use client';

import React, { useState } from 'react';
import {
  Compass,
  Clock,
  Mountain,
  Users,
  Check,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText,
  Sparkles,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import { LuxuryProduct, TierOption } from '../../types/booking';
import { useBookingStore } from '../../lib/bookingStore';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface AdventurePurchaseProps {
  product: LuxuryProduct;
  locale?: string;
}

export function AdventurePurchase({ product, locale = 'en' }: AdventurePurchaseProps) {
  const isArabic = locale === 'ar';
  const { addToCart, setIsCheckoutOpen } = useBookingStore();

  const tiers = product.tiers || [];
  const [selectedTier, setSelectedTier] = useState<TierOption>(tiers[0] || ({} as TierOption));
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2026-10-24');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const specs = product.adventureSpecs;
  const itinerary = product.itinerary || [];
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
      category: 'adventures',
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
      {/* Left 2 Columns: Trail Specifications, Itinerary, Gear, and Waiver */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Adventure Spec Metrics Strip */}
        {specs && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-[#111A30] border border-white/10">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-[#E6AF2E]" />
                <span>{isArabic ? 'مستوى الصعوبة' : 'Trail Difficulty'}</span>
              </span>
              <p className="text-sm font-bold text-white capitalize">
                {specs.difficulty === 'moderate'
                  ? isArabic ? 'متوسط (معتدل)' : 'Moderate'
                  : specs.difficulty === 'easy'
                  ? isArabic ? 'سهل للمبتدئين' : 'Easy / Family'
                  : isArabic ? 'تحدي جبلي' : 'Challenging'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E6AF2E]" />
                <span>{isArabic ? 'مدة المغامرة' : 'Duration'}</span>
              </span>
              <p className="text-sm font-bold text-white">
                {specs.durationHours} {isArabic ? 'ساعات كاملة' : 'Hours'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E6AF2E]" />
                <span>{isArabic ? 'فارق الارتفاع' : 'Elevation Gain'}</span>
              </span>
              <p className="text-sm font-bold text-white">
                +{specs.elevationGainMeters}m
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#E6AF2E]" />
                <span>{isArabic ? 'مناسب للعائلات' : 'Family Friendly'}</span>
              </span>
              <p className="text-sm font-bold text-emerald-400">
                {specs.suitableForFamilies ? (isArabic ? 'نعم (10+ سنوات)' : 'Yes (Ages 10+)') : (isArabic ? 'للبالغين فقط' : 'Adults Only')}
              </p>
            </div>
          </div>
        )}

        {/* Meeting Location & Departure Alert */}
        {specs?.meetingPoint && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-[#E6AF2E] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">
                {isArabic ? 'نقطة التجمع ووقت الانطلاق' : 'Meeting Location & Departure Time'}
              </h4>
              <p className="text-xs text-slate-300">
                {specs.meetingPoint[isArabic ? 'ar' : 'en']} — {isArabic ? 'التجمع:' : 'Meeting at'} <strong className="text-[#E6AF2E]">{specs.meetingTime}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                {isArabic
                  ? 'يتم إرسال رابط خرائط Google ورقم هاتف المرشد الميداني فور تأكيد الحجز.'
                  : 'Live Google Maps pin and guide phone number will be delivered instantly upon booking.'}
              </p>
            </div>
          </div>
        )}

        {/* Trail Timeline Itinerary */}
        {itinerary.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#E6AF2E]" />
              <span>{isArabic ? 'جدول ومراحل مسار المغامرة' : 'Expedition Itinerary & Timeline'}</span>
            </h3>

            <div className="relative pl-6 rtl:pl-0 rtl:pr-6 border-l-2 rtl:border-l-0 rtl:border-r-2 border-white/10 space-y-6">
              {itinerary.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#E6AF2E] ring-4 ring-[#070D1E]" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#E6AF2E]">{step.time}</span>
                    <p className="text-sm text-slate-200 font-medium">
                      {step.activity[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gear Checklists: Included vs Required */}
        {specs && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Included Gear */}
            <div className="p-5 rounded-2xl bg-[#111A30] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isArabic ? 'الخدمات والمعدات المتضمنة' : 'Included with Your Pass'}</span>
              </h4>
              <ul className="space-y-2">
                {specs.includedGear.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item[isArabic ? 'ar' : 'en']}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Gear */}
            <div className="p-5 rounded-2xl bg-[#111A30] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{isArabic ? 'المعدات الواجب إحضارها' : 'What You Need to Bring'}</span>
              </h4>
              <ul className="space-y-2">
                {specs.requiredGear.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{item[isArabic ? 'ar' : 'en']}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Digital Liability Waiver Notice */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00E5FF] shrink-0" />
          <p className="text-xs text-slate-300">
            {isArabic
              ? 'تتطلب هذه المغامرة الموافقة على إقرار السلامة الرقمي وحماية البيئة الطبيعية، ويتم إتمامه بسهولة عبر الهاتف قبل الانطلاق.'
              : 'This adventure includes a mandatory digital safety and Leave-No-Trace waiver, completed securely on your mobile device.'}
          </p>
        </div>
      </div>

      {/* Right Column: Sticky Booking & Pass Selection Card */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 rounded-3xl bg-[#0D162B] border border-[#E6AF2E]/30 p-6 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E6AF2E]">
              {isArabic ? 'حجز تصاريح المغامرة المعتمدة' : 'Instant Pass Reservation'}
            </span>
            <h3 className="text-xl font-black text-white">
              {isArabic ? 'اختر فئة التذكرة' : 'Select Admission Tier'}
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
                      ? 'bg-[#E6AF2E]/15 border-[#E6AF2E] shadow-lg shadow-amber-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm text-white">
                      {t.name[isArabic ? 'ar' : 'en']}
                    </div>
                    <div className="text-sm font-extrabold text-[#E6AF2E]">
                      SAR {t.price}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t.description[isArabic ? 'ar' : 'en']}
                  </p>
                  <div className="mt-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>
                      {isArabic
                        ? `متبقي ${t.capacityRemaining} مقاعد متاحة`
                        : `${t.capacityRemaining} spots remaining`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Date Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#E6AF2E]" />
              <span>{isArabic ? 'تاريخ المغامرة' : 'Expedition Date'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { date: '2026-10-24', labelEn: 'Fri, Oct 24', labelAr: 'الجمعة 24 أكتوبر' },
                { date: '2026-10-25', labelEn: 'Sat, Oct 25', labelAr: 'السبت 25 أكتوبر' },
              ].map((slot) => (
                <button
                  key={slot.date}
                  type="button"
                  onClick={() => setSelectedDate(slot.date)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedDate === slot.date
                      ? 'bg-[#E6AF2E] text-slate-950 border-[#E6AF2E]'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {isArabic ? slot.labelAr : slot.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-slate-300">
              {isArabic ? 'عدد المغامرين / التذاكر' : 'Number of Hikers'}
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
                {isArabic ? 'ترقيات وإضافات اختيارية' : 'Optional Upgrades & Add-ons'}
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
                          ? 'bg-[#E6AF2E]/10 border-[#E6AF2E] text-white'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            isChecked ? 'bg-[#E6AF2E] text-slate-950' : 'border border-white/30'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.title[isArabic ? 'ar' : 'en']}</span>
                      </div>
                      <span className="font-bold text-[#E6AF2E]">+SAR {addon.price}</span>
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
              <div className="text-2xl font-black text-[#E6AF2E] flex items-center gap-1">
                <span>SAR {calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReserve}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E6AF2E] to-amber-500 hover:from-amber-400 hover:to-[#E6AF2E] text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>{isArabic ? 'احجز تصريح المغامرة الآن' : 'Book Adventure Pass Now'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {isArabic
                  ? 'حجز معتمد • استرجاع مرن • دفع آمن بمدى وأبل باي'
                  : 'Official Pass • Instant QR • mada & Apple Pay'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
