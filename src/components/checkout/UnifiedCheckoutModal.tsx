'use client';

import React, { useState, useMemo } from 'react';
import { getAssetPath } from '@/lib/assets';
import {
  X,
  Check,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Lock,
  Anchor,
  QrCode as QrIcon,
  Download,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Share2,
  FileText,
  AlertCircle,
  Clock,
  ShieldAlert,
  Flame,
  CheckCircle,
  Compass,
  Mountain,
  Briefcase,
  Building,
  Crown,
  FileCheck,
  PhoneCall,
  Ticket,
} from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { useBookingStore } from '../../lib/bookingStore';
import { SaudiIdentityType, ServiceCategory } from '../../types/booking';
import { validateSaudiCustomer, formatSaudiPhoneNumber } from '../../lib/validation/checkoutValidation';
import { SaudiRiyalSymbol } from '../common/SaudiRiyalSymbol';

interface UnifiedCheckoutModalProps {
  locale?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function UnifiedCheckoutModal({
  locale = 'en',
  isOpen,
  onClose,
}: UnifiedCheckoutModalProps) {
  const isArabic = locale === 'ar';
  const {
    state,
    isCheckoutOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateCartItemQuantity,
    toggleCartAddOn,
    applyPromoCode,
    removePromoCode,
    syncLeadBookerToManifest,
    updateCustomer,
    addMaritimeGuest,
    removeMaritimeGuest,
    setPaymentMethod,
    pricing,
    clearCart,
    hasVoyages,
    hasAdventures,
    hasNightlife,
    hasCorporate,
    primaryCategory,
  } = useBookingStore();

  const activeIsOpen = isOpen !== undefined ? isOpen : isCheckoutOpen;
  const handleClose = () => {
    if (onClose) onClose();
    else setIsCheckoutOpen(false);
  };

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [orderRef, setOrderRef] = useState<string>('');
  const [applePayLoading, setApplePayLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Validation & Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [postBookingManifest, setPostBookingManifest] = useState(false);

  // Category specific compliance agreements
  const [adventureWaiverAgreed, setAdventureWaiverAgreed] = useState(true);
  const [nightlifeCodeAgreed, setNightlifeCodeAgreed] = useState(true);
  const [corporateVatNumber, setCorporateVatNumber] = useState('');
  const [corporateOrgName, setCorporateOrgName] = useState('');

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Card Simulator inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('999');
  const [stcPhone, setStcPhone] = useState(state.customer.phone || '+966 5');

  // Maritime Guest input state for Step 2
  const [guestName, setGuestName] = useState('');
  const [guestIdType, setGuestIdType] = useState<SaudiIdentityType>('national_id');
  const [guestIdNumber, setGuestIdNumber] = useState('');
  const [guestError, setGuestError] = useState('');

  const cartCategories = useMemo(() => {
    const set = new Set<ServiceCategory>();
    state.cart.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [state.cart]);

  // Contextual Upsells Catalog (Tailored per category)
  const contextualUpsells = useMemo(() => {
    const list: Array<{
      id: string;
      category: ServiceCategory;
      titleEn: string;
      titleAr: string;
      descEn: string;
      descAr: string;
      price: number;
      badgeEn?: string;
      badgeAr?: string;
    }> = [];

    if (hasAdventures || cartCategories.includes('adventures')) {
      list.push({
        id: 'up-trekking-poles',
        category: 'adventures',
        titleEn: 'Carbon Trekking Poles & Headlamp Pack',
        titleAr: 'عصي هايكنج كربونية وكشاف رأس ليلي',
        descEn: 'Premium ergonomic trekking poles + LED night headlamp',
        descAr: 'عصي مشي مريحة ومقاومة للصدمات مع كشاف LED ليلي',
        price: 65,
        badgeEn: 'Recommended',
        badgeAr: 'موصى به للمسار',
      });
      list.push({
        id: 'up-stargazing-session',
        category: 'adventures',
        titleEn: 'Private High-Power Telescope Astronomy Guide',
        titleAr: 'جلسة رصد فلكي خاصة بالتلسكوب العملاق',
        descEn: 'Dedicated astronomer guide for celestial photography',
        descAr: 'مرشد فلكي مخصص لرصد وتصوير الكواكب والنجوم',
        price: 120,
      });
      list.push({
        id: 'up-gopro-photo',
        category: 'adventures',
        titleEn: '4K Summit Drone & Photography Pack',
        titleAr: 'باقة توثيق وتصوير بالدرون لقمة الجبل',
        descEn: 'High-res photos and video reel delivered to WhatsApp',
        descAr: 'صور ومقاطع فيديو عالية الدقة تصلك عبر الواتساب',
        price: 150,
      });
    }

    if (hasNightlife || cartCategories.includes('nightlife')) {
      list.push({
        id: 'up-backstage-vip',
        category: 'nightlife',
        titleEn: 'Backstage Deck & Artist Meet-and-Greet',
        titleAr: 'تصريح كواليس المسرح ولقاء منسقي الموسيقى',
        descEn: 'Access behind the main DJ stage with photos',
        descAr: 'دخول خلف مسرح الـ DJ الرئيسي والتصوير مع الفنانين',
        price: 250,
        badgeEn: 'VIP Access',
        badgeAr: 'حصرية كبار الشخصيات',
      });
      list.push({
        id: 'up-valet-vip',
        category: 'nightlife',
        titleEn: 'VIP Fast-Track Valet Parking Lane',
        titleAr: 'خدمة صف السيارات ومسار VIP المباشر',
        descEn: 'Drop off directly at the private festival entrance',
        descAr: 'الوصول المباشر للبوابة الخاصة مع تسليم المفتاح',
        price: 120,
      });
      list.push({
        id: 'up-sparkler-table',
        category: 'nightlife',
        titleEn: 'Celebratory Sparkler & Artisan Mocktails',
        titleAr: 'خدمة الشموع الفوارة وموكتيلات الشاطئ',
        descEn: 'Table celebration with illuminated mocktail bowl',
        descAr: 'احتفالية خاصة لطاولتك مع موكتيلات فاخرة',
        price: 180,
      });
    }

    if (hasCorporate || cartCategories.includes('corporate')) {
      list.push({
        id: 'up-corp-drone',
        category: 'corporate',
        titleEn: '4K Drone Video Recap & Highlight Reel',
        titleAr: 'توثيق فيديو وإنتاج سينمائي 4K بطائرات درون',
        descEn: 'Executive event highlight film with company branding',
        descAr: 'فيديو احترافي يوثق فعاليات الفريق مع هوية الشركة',
        price: 3500,
        badgeEn: 'Enterprise',
        badgeAr: 'باقة الشركات',
      });
      list.push({
        id: 'up-corp-transport',
        category: 'corporate',
        titleEn: 'Executive VIP Chauffeur Fleet (Jeddah)',
        titleAr: 'أسطول سيارات VIP مع سائقين من جدة للموقع',
        descEn: 'Roundtrip luxury transit for your team and leadership',
        descAr: 'نقل فاخر ذهاب وعودة لفريق العمل والقيادات',
        price: 4800,
      });
    }

    if (hasVoyages || cartCategories.includes('voyages')) {
      list.push({
        id: 'up-jetski',
        category: 'voyages',
        titleEn: '30-Min Yamaha Jet Ski Rental',
        titleAr: 'دراجة مائية جت سكي ياماها (٣٠ دقيقة)',
        descEn: 'Delivered directly to your yacht at Bayada Reef',
        descAr: 'توصيل مباشر إلى يختك في خليج بياضة',
        price: 400,
        badgeEn: 'Popular',
        badgeAr: 'الأكثر طلباً',
      });
      list.push({
        id: 'up-caviar',
        category: 'voyages',
        titleEn: 'Private Onboard Chef & Seafood Platter',
        titleAr: 'شيف خاص ومأكولات بحرية مثلجة',
        descEn: 'Fresh Red Sea catch prepared live on deck',
        descAr: 'صيد البحر الأحمر الطازج يُعد مباشرة أمامك',
        price: 550,
      });
    }

    if (cartCategories.includes('events') && list.length < 3) {
      list.push({
        id: 'up-fasttrack-gate',
        category: 'events',
        titleEn: 'Golden Fast-Track Entry Pass',
        titleAr: 'المسار الذهبي للدخول الفوري بدون انتظار',
        descEn: 'Direct gate entry without queuing',
        descAr: 'دخول مباشر للبوابة بدون طوابير الانتظار',
        price: 120,
        badgeEn: 'Fast Pass',
        badgeAr: 'دخول سريع',
      });
    }

    return list;
  }, [hasAdventures, hasNightlife, hasCorporate, hasVoyages, cartCategories]);

  // Handle Promo Code submission
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'BLUEHORSE10' || code === 'WHITE2026' || code === 'MOON2026' || code === 'REDSEA10' || code === 'JEDDAH10') {
      const discount = Math.round(pricing.subtotal * 0.1);
      applyPromoCode(code, discount);
      setPromoMessage({
        text: isArabic ? `تم تطبيق خصم 10% بنجاح (${discount.toLocaleString()} ر.س)` : `10% discount applied (${discount.toLocaleString()} SAR off)`,
        isError: false,
      });
    } else if (code === 'VIP500') {
      const discount = 500;
      applyPromoCode(code, discount);
      setPromoMessage({
        text: isArabic ? 'تم تطبيق خصم بقيمة 500 ر.س' : '500 SAR VIP discount applied',
        isError: false,
      });
    } else {
      setPromoMessage({
        text: isArabic ? 'رمز الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired promo code',
        isError: true,
      });
    }
  };

  // Step 2 Validation handler
  const handleProceedToPayment = () => {
    const validation = validateSaudiCustomer({
      fullName: state.customer.fullName,
      email: state.customer.email,
      phone: state.customer.phone,
      idType: state.customer.idType,
      idNumber: state.customer.idNumber,
      privacyAgreed,
      requiresPrivacyAgreement: true,
    });

    if (!validation.isValid) {
      const mappedErrors: Record<string, string> = {};
      Object.entries(validation.errors).forEach(([field, msg]) => {
        mappedErrors[field] = isArabic ? msg.ar : msg.en;
      });
      setFormErrors(mappedErrors);
      return;
    }

    if (!privacyAgreed) {
      setFormErrors({
        privacyAgreed: isArabic
          ? 'يرجى الموافقة على الشروط واللوائح للمتابعة.'
          : 'Please accept the terms and safety regulations to proceed.',
      });
      return;
    }

    if (hasAdventures && !adventureWaiverAgreed) {
      setFormErrors({
        adventureWaiver: isArabic
          ? 'يرجى الموافقة على إقرار السلامة وحماية البيئة لمسارات الهايكنج.'
          : 'Please agree to the hiking safety and wilderness preservation waiver.',
      });
      return;
    }

    if (hasNightlife && !nightlifeCodeAgreed) {
      setFormErrors({
        nightlifeCode: isArabic
          ? 'يرجى تأكيد الالتزام بالزي الأبيض الكامل وبلوغ سن 18 عاماً.'
          : 'Please confirm compliance with the All-White dress code and 18+ policy.',
      });
      return;
    }

    setFormErrors({});
    syncLeadBookerToManifest();
    setStep(3);
  };

  // Companion guest addition
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setGuestError(isArabic ? 'يرجى إدخال اسم المرافق' : 'Please enter guest name');
      return;
    }
    if (!guestIdNumber.trim()) {
      setGuestError(isArabic ? 'يرجى إدخال رقم الهوية / الجواز' : 'Please enter ID / Passport number');
      return;
    }

    addMaritimeGuest({
      fullName: guestName.trim(),
      idType: guestIdType,
      idNumber: guestIdNumber.trim(),
      nationality: 'Saudi',
    });

    setGuestName('');
    setGuestIdNumber('');
    setGuestError('');
  };

  // 1-Click Apple Pay Express Checkout Trigger
  const handleExpressApplePay = async () => {
    setApplePayLoading(true);
    setPaymentMethod('apple_pay');

    if (!state.customer.fullName) {
      updateCustomer({
        fullName: 'Blue Horse VIP Guest',
        email: 'guest@bluehorse.sa',
        phone: '+966500000000',
        idType: 'national_id',
        idNumber: '1000000000',
      });
    }

    setTimeout(async () => {
      setApplePayLoading(false);
      await executeOrderSuccess();
    }, 1200);
  };

  // Final Payment Processing & Pass Issuance
  const executeOrderSuccess = async () => {
    setIsProcessing(true);
    const generatedOrderRef = `BH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedOrderRef);

    // ZATCA QR Compliant Payload
    const qrPayload = JSON.stringify({
      ref: generatedOrderRef,
      org: 'Blue Horse (بلو هورس) Jeddah Events & Adventures',
      vatNumber: '310928371900003',
      timestamp: new Date().toISOString(),
      total: pricing.grandTotal,
      vat: pricing.vatAmount,
      customer: state.customer.fullName || 'VIP Guest',
      category: primaryCategory,
      passType: 'BLUE_HORSE_OFFICIAL_GATE_PERMIT',
    });

    try {
      const url = await QRCode.toDataURL(qrPayload, {
        width: 300,
        margin: 2,
        color: { dark: '#070D1E', light: '#FFFFFF' },
      });
      setQrCodeUrl(url);
    } catch (e) {
      console.error('Failed to generate QR code', e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);

      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00E5FF', '#E6AF2E', '#FFFFFF', '#0B132B'],
        });
      } catch (e) {
        // Confetti failure safe
      }
    }, 1200);
  };

  if (!activeIsOpen) return null;

  const getCategoryBadge = (cat: ServiceCategory) => {
    switch (cat) {
      case 'adventures':
        return {
          icon: <Compass className="w-3.5 h-3.5 text-[#E6AF2E]" />,
          labelEn: 'Adventures',
          labelAr: 'مغامرات',
          className: 'bg-[#E6AF2E]/15 text-[#E6AF2E] border border-[#E6AF2E]/30',
        };
      case 'nightlife':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-[#00E5FF]" />,
          labelEn: 'Nightlife',
          labelAr: 'حفلات',
          className: 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30',
        };
      case 'corporate':
        return {
          icon: <Briefcase className="w-3.5 h-3.5 text-indigo-300" />,
          labelEn: 'Corporate',
          labelAr: 'شركات',
          className: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
        };
      case 'voyages':
        return {
          icon: <Anchor className="w-3.5 h-3.5 text-sky-400" />,
          labelEn: 'Voyages',
          labelAr: 'رحلات بحرية',
          className: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
        };
      case 'events':
        return {
          icon: <Ticket className="w-3.5 h-3.5 text-cyan-300" />,
          labelEn: 'Events',
          labelAr: 'فعاليات',
          className: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
        };
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />,
          labelEn: cat,
          labelAr: cat,
          className: 'bg-white/10 text-slate-300 border border-white/20',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0A1224] border border-cyan-500/30 shadow-2xl text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Header with Progress Steps & Close Button */}
        <div className="px-5 sm:px-6 py-4 border-b border-white/10 bg-[#070D1E] flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
            {[
              { num: 1, labelEn: '1. Review & Add-ons', labelAr: '١. السلة والترقيات' },
              { num: 2, labelEn: '2. Guest & Compliance', labelAr: '٢. بيانات الضيف والتصريح' },
              { num: 3, labelEn: '3. Payment & Pass', labelAr: '٣. الدفع والتصريح' },
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-2 whitespace-nowrap">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00E5FF] to-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/30 ring-2 ring-[#00E5FF]/40'
                        : isPast
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isActive ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {isArabic ? s.labelAr : s.labelEn}
                  </span>
                  {s.num < 3 && <ChevronRight className="w-3.5 h-3.5 text-white/20 rtl:rotate-180" />}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* ==================================================================== */}
          {/* STEP 1: CART REVIEW, EXPRESS APPLE PAY & CONTEXTUAL UPSELLS */}
          {/* ==================================================================== */}
          {step === 1 && !isCompleted && (
            <div className="space-y-5">
              {/* 1-Click Apple Pay Express Banner */}
              {state.cart.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-black via-slate-900 to-black text-white border border-white/15 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-base">
                      
                    </div>
                    <div>
                      <p className="text-xs font-bold">
                        {isArabic ? 'الدفع السريع بنقرة واحدة عبر Apple Pay' : '1-Click Express Checkout with Apple Pay'}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {isArabic ? 'تخطي النماذج وإصدار التصريح الفوري بحركة واحدة' : 'Skip the forms and get your gate pass immediately'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleExpressApplePay}
                    disabled={applePayLoading}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black hover:bg-slate-100 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                  >
                    {applePayLoading ? (
                      <span>{isArabic ? 'جاري التحقق...' : 'Authenticating...'}</span>
                    ) : (
                      <>
                        <span>Pay</span>
                        <span>{isArabic ? 'ادفع الآن' : 'Fast Checkout'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isArabic ? 'التجارب والتذاكر المختارة' : 'Selected Experiences & Passes'}
                  </h3>
                  <span className="text-xs font-semibold text-[#00E5FF]">
                    {state.cart.length} {isArabic ? 'عناصر' : 'item(s)'}
                  </span>
                </div>

                {state.cart.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <Sparkles className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">
                      {isArabic ? 'سلة الحجوزات فارغة حالياً' : 'Your reservation cart is empty'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isArabic ? 'تصفح باقات الهايكنج، الحفلات، أو خلوات الشركات واختر تذكرتك.' : 'Explore hiking adventures, nightlife festivals, or corporate retreats to add passes.'}
                    </p>
                  </div>
                ) : (
                  state.cart.map((item) => {
                    const badge = getCategoryBadge(item.category);
                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#111A30] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.coverImage}
                            alt={item.title[isArabic ? 'ar' : 'en']}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${badge.className}`}>
                                {badge.icon}
                                <span>{isArabic ? badge.labelAr : badge.labelEn}</span>
                              </span>
                              {item.tier && (
                                <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                                  {item.tier.name[isArabic ? 'ar' : 'en']}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-white">
                              {item.title[isArabic ? 'ar' : 'en']}
                            </h4>
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                              <span>📅 {item.selectedDate}</span>
                              <span>•</span>
                              <span>{item.locationName[isArabic ? 'ar' : 'en']}</span>
                            </p>
                          </div>
                        </div>

                        {/* Quantity & Item Pricing */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                            <button
                              type="button"
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-end font-bold text-sm text-[#00E5FF]">
                            SAR {(item.unitPrice * item.quantity).toLocaleString()}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Contextual Upgrades & Add-ons */}
              {contextualUpsells.length > 0 && state.cart.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>{isArabic ? 'ترقيات وإضافات حصرية مقترحة' : 'Tailored Experience Upgrades'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {contextualUpsells.slice(0, 4).map((up) => {
                      const firstItem = state.cart[0];
                      const isAdded = firstItem?.addOns.some((a) => a.id === up.id);

                      return (
                        <div
                          key={up.id}
                          onClick={() => {
                            if (firstItem) {
                              toggleCartAddOn(firstItem.id, {
                                id: up.id,
                                title: { en: up.titleEn, ar: up.titleAr },
                                price: up.price,
                              });
                            }
                          }}
                          className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-center justify-between gap-3 transition-all ${
                            isAdded
                              ? 'bg-cyan-500/15 border-[#00E5FF] text-white shadow-md shadow-cyan-500/10'
                              : 'bg-[#111A30] border-white/10 hover:border-white/25 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                                isAdded ? 'bg-[#00E5FF] text-slate-950' : 'border border-white/30'
                              }`}
                            >
                              {isAdded && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-white text-[11px]">
                                {isArabic ? up.titleAr : up.titleEn}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {isArabic ? up.descAr : up.descEn}
                              </p>
                            </div>
                          </div>

                          <span className="font-bold text-[#00E5FF] shrink-0 text-xs">
                            +SAR {up.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 2: GUEST DETAILS, VERIFICATION & CATEGORY COMPLIANCE */}
          {/* ==================================================================== */}
          {step === 2 && !isCompleted && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#00E5FF]" />
                  <span>
                    {hasAdventures
                      ? isArabic ? 'بيانات المشاركين وإقرار سلامة المسار' : 'Hiker KYC & Trail Safety Compliance'
                      : hasNightlife
                      ? isArabic ? 'بيانات الحضور والتحقق لإصدار تذكرة الحفل' : 'Attendee Verification & Gate Pass'
                      : hasCorporate
                      ? isArabic ? 'بيانات ممثل الشركة والفوترة الضريبية' : 'Corporate Representative & ZATCA Invoice'
                      : isArabic ? 'بيانات الضيف والتحقق المعتمد' : 'Guest Verification & Digital Clearance'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isArabic
                    ? 'وفق الأنظمة السعودية لإصدار الفواتير الضريبية وتصاريح البوابة الرسمية المشفرة بالباركود.'
                    : 'Required for official ZATCA Phase 2 tax invoices and encrypted instant QR gate passes.'}
                </p>
              </div>

              {/* Primary Contact Info Form */}
              <div className="p-4 rounded-2xl bg-[#111A30] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider block">
                    {isArabic ? 'بيانات الحاجز الرئيسي (المسؤول)' : 'Primary Booker Details'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isArabic ? '* جميع الحقول مطلوبة' : '* All fields required'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isArabic ? 'الاسم الثلاثي (مطابق للهوية) *' : 'Full Name (as in National ID) *'}
                    </label>
                    <input
                      type="text"
                      value={state.customer.fullName}
                      onChange={(e) => updateCustomer({ fullName: e.target.value })}
                      placeholder={isArabic ? 'مثال: فيصل بن خالد الغامدي' : 'e.g. Faisal Al-Ghamdi'}
                      className={`w-full bg-white/5 border rounded-xl p-2.5 text-white outline-none ${
                        formErrors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-[#00E5FF]'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-[10px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isArabic ? 'نوع الهوية *' : 'Identity Type *'}
                    </label>
                    <select
                      value={state.customer.idType}
                      onChange={(e) => updateCustomer({ idType: e.target.value as SaudiIdentityType })}
                      className="w-full bg-[#0D162B] border border-white/10 focus:border-[#00E5FF] rounded-xl p-2.5 text-white outline-none cursor-pointer"
                    >
                      <option value="national_id">{isArabic ? 'هوية وطنية سعودية (10 أرقام)' : 'Saudi National ID (10 Digits)'}</option>
                      <option value="iqama">{isArabic ? 'إقامة نظامية للمقيمين (10 أرقام)' : 'Saudi Iqama Resident (10 Digits)'}</option>
                      <option value="gcc_id">{isArabic ? 'هوية مواطني دول الخليج' : 'GCC National ID'}</option>
                      <option value="passport">{isArabic ? 'جواز سفر دولي للزوار' : 'International Passport'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isArabic ? 'رقم الهوية / الإقامة / الجواز *' : 'ID / Iqama / Passport Number *'}
                    </label>
                    <input
                      type="text"
                      value={state.customer.idNumber}
                      onChange={(e) => updateCustomer({ idNumber: e.target.value })}
                      placeholder={state.customer.idType === 'national_id' ? '1XXXXXXXXX' : state.customer.idType === 'iqama' ? '2XXXXXXXXX' : 'Document Number'}
                      className={`w-full bg-white/5 border rounded-xl p-2.5 text-white outline-none ${
                        formErrors.idNumber ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-[#00E5FF]'
                      }`}
                    />
                    {formErrors.idNumber && <p className="text-[10px] text-rose-500 mt-1">{formErrors.idNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isArabic ? 'رقم الجوال السعودي (+966 لإرسال التصريح) *' : 'Mobile Phone (for OTP & Pass) *'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={state.customer.phone}
                      onChange={(e) => updateCustomer({ phone: formatSaudiPhoneNumber(e.target.value) })}
                      placeholder="+966 50 123 4567"
                      className={`w-full bg-white/5 border rounded-xl p-2.5 text-white outline-none text-left ${
                        formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-[#00E5FF]'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-rose-500 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1 font-semibold">
                      {isArabic ? 'البريد الإلكتروني للفاتورة الضريبية وتذكرة Apple Wallet *' : 'Email for ZATCA Tax Invoice & Apple Pass *'}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={state.customer.email}
                      onChange={(e) => updateCustomer({ email: e.target.value })}
                      placeholder="name@domain.sa"
                      className={`w-full bg-white/5 border rounded-xl p-2.5 text-white outline-none text-left ${
                        formErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-[#00E5FF]'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-500 mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              </div>

              {/* 1. ADVENTURES COMPLIANCE: Trail Safety & Leave-No-Trace Waiver */}
              {hasAdventures && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E6AF2E]">
                    <Mountain className="w-4 h-4" />
                    <span>{isArabic ? 'إقرار السلامة والمحافظة على البيئة الفطرية للمسار' : 'Wilderness Trail Safety & Environmental Waiver'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="adventure-waiver"
                      checked={adventureWaiverAgreed}
                      onChange={(e) => setAdventureWaiverAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#E6AF2E] rounded border-white/30 focus:ring-[#E6AF2E] cursor-pointer shrink-0 accent-[#E6AF2E]"
                    />
                    <label htmlFor="adventure-waiver" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                      {isArabic
                        ? 'أقر بأنني والمرافقين في حالة صحية وبدنية مناسبة للمسار، وألتزم بارتداء حذاء المشي الجبلي المناسب، واتباع توجيهات المرشد الجبلي المعتمد ومبادئ «لا تترك أثر» البيئية.'
                        : 'I confirm that all participants possess suitable physical fitness for the summit hike, will wear sturdy hiking footwear, follow certified guide instructions, and abide by Leave-No-Trace environmental principles.'}
                    </label>
                  </div>
                  {formErrors.adventureWaiver && <p className="text-[10px] text-rose-500">{formErrors.adventureWaiver}</p>}
                </div>
              )}

              {/* 2. NIGHTLIFE COMPLIANCE: Dress Code & 18+ Verification */}
              {hasNightlife && (
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00E5FF]">
                    <Flame className="w-4 h-4" />
                    <span>{isArabic ? 'إقرار شروط دخول الحفل والزي الأبيض الكامل' : 'All-White Dress Code & Age Verification'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="nightlife-code"
                      checked={nightlifeCodeAgreed}
                      onChange={(e) => setNightlifeCodeAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#00E5FF] rounded border-white/30 focus:ring-[#00E5FF] cursor-pointer shrink-0 accent-[#00E5FF]"
                    />
                    <label htmlFor="nightlife-code" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                      {isArabic
                        ? 'أقر بأن جميع حاملي التذاكر بعمر 18 سنة فما فوق ويحملون هوية سارية، وسيلتزمون بارتداء الزي الأبيض الأنيق بالكامل عند بوابات الدخول.'
                        : 'I confirm that all attendees are 18+ with valid photo identification and will strictly comply with the mandatory All-White dress code policy at gate entry.'}
                    </label>
                  </div>
                  {formErrors.nightlifeCode && <p className="text-[10px] text-rose-500">{formErrors.nightlifeCode}</p>}
                </div>
              )}

              {/* 3. CORPORATE COMPLIANCE: ZATCA Phase 2 Tax E-Invoicing */}
              {hasCorporate && (
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4" />
                      <span>{isArabic ? 'بيانات الفوترة الضريبية الرسمية للشركات (ZATCA)' : 'ZATCA Phase 2 Corporate Tax Details'}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      ضريبي معتمد
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">
                        {isArabic ? 'الاسم التجاري الرسمي للمنشأة' : 'Official Registered Corporate Name'}
                      </label>
                      <input
                        type="text"
                        value={corporateOrgName}
                        onChange={(e) => setCorporateOrgName(e.target.value)}
                        placeholder={isArabic ? 'مثال: شركة أرامكو السعودية' : 'e.g. Acme Saudi Arabia Ltd.'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#00E5FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">
                        {isArabic ? 'الرقم الضريبي للمنشأة (15 رقم)' : '15-Digit ZATCA Tax / VAT Number'}
                      </label>
                      <input
                        type="text"
                        value={corporateVatNumber}
                        onChange={(e) => setCorporateVatNumber(e.target.value)}
                        placeholder="300000000000003"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#00E5FF] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. VOYAGES COMPLIANCE: Coast Guard Passenger Manifest */}
              {hasVoyages && (
                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-[#00E5FF]" />
                      <span className="text-xs font-bold text-cyan-200">
                        {isArabic ? 'بيان ركاب الإبحار (حرس الحدود السعودي)' : 'Coast Guard Maritime Passenger Manifest'}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-300 font-bold bg-cyan-900/50 px-2 py-0.5 rounded-full w-fit">
                      {state.maritimeManifest.length} {isArabic ? 'ركاب مسجلين' : 'Passengers Logged'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-cyan-500/20 text-xs flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">
                        {isArabic ? 'إرسال رابط إكمال بيانات المرافقين عبر الواتساب لاحقاً' : 'Share companion manifest link via WhatsApp later'}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {isArabic ? 'يمكنك إتمام الحجز الآن وإدخال بيانات باقي الضيوف قبل موعد الرحلة' : 'Complete booking now and let your guests submit their IDs before departure'}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={postBookingManifest}
                      onChange={(e) => setPostBookingManifest(e.target.checked)}
                      className="w-4 h-4 text-cyan-600 rounded border-white/30 focus:ring-cyan-500 cursor-pointer shrink-0"
                    />
                  </div>

                  {!postBookingManifest && (
                    <form onSubmit={handleAddGuest} className="space-y-2 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                        <input
                          type="text"
                          placeholder={isArabic ? 'اسم المرافق' : 'Companion Full Name'}
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="bg-black/40 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-[#00E5FF]"
                        />
                        <select
                          value={guestIdType}
                          onChange={(e) => setGuestIdType(e.target.value as SaudiIdentityType)}
                          className="bg-[#0D162B] border border-white/10 rounded-lg p-2 text-white outline-none"
                        >
                          <option value="national_id">{isArabic ? 'هوية وطنية' : 'National ID'}</option>
                          <option value="iqama">{isArabic ? 'إقامة' : 'Iqama'}</option>
                          <option value="passport">{isArabic ? 'جواز سفر' : 'Passport'}</option>
                        </select>
                        <input
                          type="text"
                          placeholder={isArabic ? 'رقم الهوية / الجواز' : 'ID / Passport Number'}
                          value={guestIdNumber}
                          onChange={(e) => setGuestIdNumber(e.target.value)}
                          className="bg-black/40 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-[#00E5FF]"
                        />
                        <button
                          type="submit"
                          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-lg p-2 text-xs transition-colors cursor-pointer"
                        >
                          {isArabic ? '+ إضافة مرافق' : '+ Add Guest'}
                        </button>
                      </div>
                      {guestError && <p className="text-[10px] text-rose-500">{guestError}</p>}
                    </form>
                  )}
                </div>
              )}

              {/* General Privacy & Entry Terms */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="privacy-terms"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#00E5FF] rounded border-white/30 focus:ring-[#00E5FF] cursor-pointer shrink-0 accent-[#00E5FF]"
                />
                <label htmlFor="privacy-terms" className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                  {isArabic
                    ? 'أوافق على سياسة الخصوصية والشروط والأحكام واللوائح المعتمدة لتنظيم الفعاليات والمغامرات لدى بلو هورس.'
                    : 'I agree to the privacy policy, terms & conditions, and event attendance regulations of Blue Horse.'}
                </label>
              </div>
              {formErrors.privacyAgreed && (
                <p className="text-[10px] text-rose-500">{formErrors.privacyAgreed}</p>
              )}
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 3: PAYMENT & ZATCA TAX BREAKDOWN */}
          {/* ==================================================================== */}
          {step === 3 && !isCompleted && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#00E5FF]" />
                  <span>{isArabic ? 'وسيلة الدفع والفاتورة الضريبية ZATCA' : 'Payment & ZATCA Tax Breakdown'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isArabic ? 'دفع إلكتروني فوري وآمن 100% مع إصدار فوري للتذاكر وتصاريح البوابة المشفرة' : 'Instant 100% encrypted checkout with real-time digital pass generation'}
                </p>
              </div>

              {/* Promo Code Input Box */}
              <div className="p-3.5 rounded-2xl bg-[#111A30] border border-white/10">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="BLUEHORSE10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-[#00E5FF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#00E5FF] to-cyan-400 text-slate-950 hover:from-cyan-300 hover:to-[#00E5FF] rounded-xl text-xs font-black transition-colors cursor-pointer"
                  >
                    {isArabic ? 'تطبيق الخصم' : 'Apply Code'}
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-[11px] font-semibold mt-1.5 ${promoMessage.isError ? 'text-rose-500' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Itemized Price Breakdown Card */}
              <div className="p-4 rounded-2xl bg-[#111A30] border border-white/10 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>{isArabic ? 'المجموع الفرعي للخدمات' : 'Subtotal'}</span>
                  <span className="font-semibold text-white inline-flex items-center gap-1">
                    <span>{pricing.subtotal.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400 font-semibold">
                    <span>{isArabic ? `خصم الكوبون (${state.appliedPromoCode})` : `Promo Discount (${state.appliedPromoCode})`}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>- {pricing.discountAmount.toLocaleString()}</span>
                      <SaudiRiyalSymbol size="xs" />
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span>{isArabic ? 'ضريبة القيمة المضافة (15% ZATCA)' : 'Saudi VAT (15% ZATCA Compliant)'}</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/20">ضريبي</span>
                  </span>
                  <span className="font-semibold text-white inline-flex items-center gap-1">
                    <span>{pricing.vatAmount.toLocaleString()}</span>
                    <SaudiRiyalSymbol size="xs" />
                  </span>
                </div>
                <div className="pt-2.5 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">{isArabic ? 'المبلغ الإجمالي المستحق' : 'Total Amount Due'}</span>
                  <div className="text-xl font-black text-[#00E5FF] inline-flex items-center gap-1">
                    <span>SAR {pricing.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Saudi Payment Methods Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  {isArabic ? 'اختر وسيلة الدفع الإلكتروني' : 'Select Saudi Payment Method'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {[
                    { id: 'mada', label: 'Mada', logo: '/payments/Mada_Logo.png' },
                    { id: 'apple_pay', label: 'Apple Pay', logo: '/payments/Apple_Pay.png' },
                    { id: 'stc_pay', label: 'STC Pay', logo: '/payments/Stc_pay.png' },
                    { id: 'credit_card', label: 'Visa / MC', logo: '/payments/Visa_Logo.png' },
                    { id: 'tamara', label: 'Tamara', logo: '/payments/taamara.png' },
                    { id: 'tabby', label: 'Tabby', logo: '/payments/tabby-logo.png' },
                  ].map((method) => {
                    const isSelected = state.paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative bg-white/5 ${
                          isSelected
                            ? 'border-[#00E5FF] bg-cyan-500/15 shadow-lg shadow-cyan-500/20 text-[#00E5FF]'
                            : 'border-white/10 text-slate-300 hover:border-white/30'
                        }`}
                      >
                        <div className="h-6 flex items-center justify-center">
                          <img
                            src={method.logo}
                            alt={method.label}
                            className="max-h-5 max-w-full object-contain filter brightness-105"
                            onError={(e) => {
                              // Fallback text if image not found
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <span className="text-[10px]">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Payment Details Panel */}
              <div className="p-4 rounded-2xl bg-[#111A30] border border-white/10 space-y-3">
                {state.paymentMethod === 'apple_pay' && (
                  <div className="text-center py-2 space-y-2">
                    <p className="text-xs text-slate-300">
                      {isArabic ? 'سيتم تأكيد الدفع فورياً عبر Apple Pay بالبصمة أو التعرف على الوجه.' : 'Confirm payment instantly using Touch ID or Face ID with Apple Pay.'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-black font-extrabold text-xs">
                      <span>Pay Fast Checkout</span>
                    </div>
                  </div>
                )}

                {state.paymentMethod === 'stc_pay' && (
                  <div className="space-y-2 text-xs">
                    <label className="block text-slate-300 font-semibold">
                      {isArabic ? 'رقم جوال حساب STC Pay' : 'STC Pay Registered Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={stcPhone}
                      onChange={(e) => setStcPhone(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white outline-none text-left focus:border-[#00E5FF]"
                    />
                    <p className="text-[10px] text-slate-400">
                      {isArabic ? 'سيصلك إشعار دفع فوري على تطبيق STC Pay للموافقة.' : 'You will receive an instant payment request in your STC Pay app.'}
                    </p>
                  </div>
                )}

                {(state.paymentMethod === 'mada' || state.paymentMethod === 'credit_card') && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-300 font-semibold">
                          {isArabic ? 'رقم البطاقة البنكية' : 'Card Number'}
                        </label>
                        {state.paymentMethod === 'mada' && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                            بطاقة مدى معتمدة
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        dir="ltr"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 font-mono text-white outline-none text-left focus:border-[#00E5FF]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">{isArabic ? 'تاريخ الانتهاء' : 'Expiry Date'}</label>
                        <input
                          type="text"
                          dir="ltr"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 font-mono text-white outline-none text-left focus:border-[#00E5FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">{isArabic ? 'رمز الأمان (CVV)' : 'CVV Code'}</label>
                        <input
                          type="text"
                          dir="ltr"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 font-mono text-white outline-none text-left focus:border-[#00E5FF]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(state.paymentMethod === 'tamara' || state.paymentMethod === 'tabby') && (
                  <div className="text-center py-2 space-y-1.5 text-xs">
                    <p className="text-slate-300">
                      {isArabic
                        ? `قسّم فاتورتك على 4 دفعات ميسرة بقيمة ${Math.round(pricing.grandTotal / 4).toLocaleString()} ر.س/شهرياً بدون فوائد.`
                        : `Split your purchase into 4 interest-free payments of ${(pricing.grandTotal / 4).toFixed(2)} SAR/month.`}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      {isArabic ? 'متوافق مع الشريعة الإسلامية 100%' : '100% Sharia Compliant'}
                    </span>
                  </div>
                )}
              </div>

              {/* Security & Guarantee Badges */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-300">
                    {isArabic ? 'إصدار فوري لتصريح الدخول وفاتورة ZATCA الضريبية' : 'Instant Digital Pass & ZATCA Tax Invoice'}
                  </p>
                  <p className="text-slate-300 text-[11px]">
                    {isArabic
                      ? 'فور إتمام الدفع، يتم تفعيل باركود البوابة وحفظ التذكرة في محفظة Apple Wallet مباشرة.'
                      : 'Your secure gate barcode and Apple Wallet pass will be ready immediately upon payment.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* SUCCESSFUL CONFIRMATION VIEW (DIGITAL PASS & SHARING) */}
          {/* ==================================================================== */}
          {isCompleted && (
            <div className="space-y-6 text-center py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-in zoom-in-75 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isArabic ? 'تم تأكيد الحجز وإصدار التصريح بنجاح!' : 'Booking Confirmed & Gate Pass Issued!'}
                </h3>
                <p className="text-xs text-[#00E5FF] font-bold">
                  {isArabic ? `رقم المرجع: ${orderRef}` : `Order Reference: ${orderRef}`}
                </p>
              </div>

              {/* Official Blue Horse Digital Gate Pass Card */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-b from-white to-slate-100 text-slate-950 shadow-2xl border border-white/20 text-center space-y-4">
                <div className="border-b border-slate-200 pb-3 flex flex-col items-center">
                  <img src={getAssetPath('/brand/bluehorse-logo.png')} alt="Blue Horse" className="w-12 h-12 object-contain mb-1.5" />
                  <span className="text-[10px] font-black tracking-widest text-slate-900 uppercase block">
                    BLUE HORSE (بلو هورس) • OFFICIAL PASS
                  </span>
                  <h4 className="text-base font-black text-slate-950 mt-1">
                    {state.customer.fullName || 'VIP Guest Pass'}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {state.customer.idNumber && `ID: ${state.customer.idNumber} • `}
                    {new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                  </p>
                </div>

                {/* QR Code Canvas */}
                {qrCodeUrl && (
                  <div className="flex justify-center p-3 bg-white rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
                    <img src={qrCodeUrl} alt="Gate Pass QR" className="w-44 h-44 mx-auto" />
                  </div>
                )}

                <div className="text-[11px] text-slate-600 space-y-1">
                  <p className="font-bold text-emerald-800">
                    {hasAdventures
                      ? '✓ Valid for Trail Gate Fast-Track & Usfan Base Camp Inspection'
                      : hasNightlife
                      ? '✓ Valid for Festival Fast-Track Gate & VIP Raised Lounge Access'
                      : hasCorporate
                      ? '✓ Official Corporate Offsite Pass & ZATCA Tax Invoice'
                      : hasVoyages
                      ? '✓ Valid for Marina Pier Gate & Saudi Coast Guard Clearance'
                      : '✓ Official Blue Horse Fast-Track Gate Pass'}
                  </p>
                  <p className="font-medium text-slate-700">
                    <span>Total Paid: SAR {pricing.grandTotal.toLocaleString()} (incl. 15% ZATCA VAT)</span>
                  </p>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => alert(isArabic ? 'تم حفظ التذكرة في Apple Wallet بنجاح!' : 'Apple Wallet Pass (.pkpass) added successfully!')}
                    className="py-2.5 px-3 rounded-xl bg-black hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span></span>
                    <span>{isArabic ? 'إضافة إلى Apple Wallet' : 'Add to Apple Wallet'}</span>
                  </button>

                  <button
                    onClick={() => alert(isArabic ? 'تم تحميل الفاتورة الضريبية ZATCA المعتمدة بصيغة PDF!' : 'ZATCA Tax Invoice & Pass PDF downloaded!')}
                    className="py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'تحميل الفاتورة PDF' : 'Download Invoice'}</span>
                  </button>
                </div>

                <a
                  href={`https://wa.me/966500000000?text=My%20Blue%20Horse%20Booking%20Ref:%20${orderRef}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#25D366]/30 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'إرسال تفاصيل التذكرة إلى WhatsApp' : 'Send Pass to WhatsApp'}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#070D1E] flex items-center justify-between gap-3">
          {!isCompleted ? (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as any)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                >
                  {isArabic ? 'السابق' : 'Back'}
                </button>
              ) : (
                <div />
              )}

              {step === 1 && (
                <button
                  type="button"
                  disabled={state.cart.length === 0}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-[#00E5FF] text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isArabic ? 'المتابعة لبيانات الضيف' : 'Continue to Guest Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-[#00E5FF] text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-transform active:scale-95 cursor-pointer"
                >
                  <span>{isArabic ? 'المتابعة لخطوة الدفع' : 'Proceed to Payment'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={executeOrderSuccess}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-[#E6AF2E] hover:from-cyan-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 transition-transform hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span className="inline-flex items-center gap-1">
                    {isProcessing ? (
                      <span>{isArabic ? 'جاري المعالجة والتشفير...' : 'Processing Secure Payment...'}</span>
                    ) : isArabic ? (
                      <>
                        <span>ادفع {pricing.grandTotal.toLocaleString()} ر.س</span>
                        <span>وأصدر التصريح</span>
                      </>
                    ) : (
                      <>
                        <span>Pay SAR {pricing.grandTotal.toLocaleString()}</span>
                        <span>& Get Pass</span>
                      </>
                    )}
                  </span>
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                clearCart();
                setIsCompleted(false);
                setStep(1);
                handleClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg hover:from-cyan-300 hover:to-[#00E5FF]"
            >
              {isArabic ? 'إغلاق والعودة لتصفح التجارب' : 'Done & Return to Experiences'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
