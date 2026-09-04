'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Ticket,
  Calendar,
  MapPin,
  QrCode as QrIcon,
  Compass,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Download,
  Share2,
  FileText,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { LuxuryNavbar } from '../../../components/luxury/LuxuryNavbar';
import { LuxuryFooter } from '../../../components/luxury/LuxuryFooter';

export default function UserDashboardPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isArabic = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'tickets' | 'itinerary' | 'waivers'>('tickets');
  const [selectedTicketModal, setSelectedTicketModal] = useState<string | null>(null);

  const myTickets = [
    {
      id: 'BH-90241',
      titleEn: 'Moon Mountain Sunset Hike & Stargazing',
      titleAr: 'هايكنج جبل القمر ورصد النجوم',
      tierEn: 'Explorer VIP Pass',
      tierAr: 'تذكرة المستكشف VIP',
      date: '2026-11-21',
      time: '04:30 PM - 10:30 PM',
      locationEn: 'Moon Mountain, Usfan Desert, Jeddah',
      locationAr: 'جبل القمر، صحراء عسفان، جدة',
      category: 'adventures',
      status: 'active',
      qrCodeData: 'https://bluehorse.sa/verify/BH-90241',
      waiverSigned: true,
    },
    {
      id: 'BH-88412',
      titleEn: 'White Night Beach Festival — All-White Party',
      titleAr: 'مهرجان الوايت نايت الشاطئي — ليلة باللون الأبيض',
      tierEn: 'VIP Raised Deck Lounge',
      tierAr: 'منصة كبار الشخصيات VIP',
      date: '2026-11-28',
      time: '08:00 PM - 02:30 AM',
      locationEn: 'Private Beach Coastline, North Obhur, Jeddah',
      locationAr: 'مسرح الشاطئ الخاص، أبحر الشمالية، جدة',
      category: 'nightlife',
      status: 'active',
      qrCodeData: 'https://bluehorse.sa/verify/BH-88412',
      waiverSigned: true,
    },
  ];

  const moonMountainTimeline = [
    {
      time: '04:30 PM',
      titleEn: 'Base Camp Arrival & Check-In',
      titleAr: 'الوصول لمخيم القاعدة وتسجيل الدخول',
      descEn: 'Scan your digital QR pass, receive your trekking wristband, and meet the certified guide.',
      descAr: 'مسح الباركود الرقمي، استلام سوار المسار، والالتقاء بالمرشد المعتمد.',
    },
    {
      time: '05:15 PM',
      titleEn: 'Guided Trail Ascent to Summit',
      titleAr: 'انطلاق الهايكنج نحو قمة جبل القمر',
      descEn: 'Trek across scenic granite rock formations with regular hydration stops.',
      descAr: 'المسير عبر التكوينات الصخرية الخلابة مع توقفات لشرب المياه.',
    },
    {
      time: '06:30 PM',
      titleEn: 'Golden Hour Sunset & Photos',
      titleAr: 'مشاهدة الغروب الذهبي وجلسة تصوير القمة',
      descEn: 'Reach the summit peak to witness the sunset over the desert expanse.',
      descAr: 'الوصول لأعلى القمة لمشاهدة مغيب الشمس وتوثيق اللحظة.',
    },
    {
      time: '07:45 PM',
      titleEn: 'Descent to Campfire & BBQ Dinner',
      titleAr: 'النزول إلى موقد النار والعشاء البدوي',
      descEn: 'Enjoy freshly grilled BBQ, hot Saudi coffee, tea, and dates around the open fire.',
      descAr: 'الاستمتاع بوجبة شواء طازجة، قهوة سعودية وشاي على الحطب.',
    },
    {
      time: '09:00 PM',
      titleEn: 'Telescope Astronomy Stargazing',
      titleAr: 'جلسة رصد النجوم والكواكب بالتلسكوب',
      descEn: 'Professional astronomy observation guided by space enthusiasts with laser pointers.',
      descAr: 'رصد فلكي احترافي للأجرام السماوية بمرافقة مختصين.',
    },
  ];

  const packingList = [
    {
      en: 'Sturdy hiking boots or gripping sneakers',
      ar: 'حذاء هايكنج مناسب ومريح للتسلق',
      required: true,
    },
    {
      en: 'Light evening jacket (desert gets breezy at night)',
      ar: 'سترة خفيفة (تنخفض درجات الحرارة ليلاً)',
      required: true,
    },
    {
      en: 'Small backpack & reusable water flask',
      ar: 'حقيبة ظهر صغيرة ومطارة مياه',
      required: true,
    },
    {
      en: 'Headlamp or smartphone flashlight',
      ar: 'كشاف رأس أو إضاءة جوال مشحونة',
      required: false,
    },
    {
      en: 'Power bank for photography & stargazing',
      ar: 'شاحن متنقل (باور بانك) للتصوير',
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#00E5FF] selection:text-[#060B18]">
      <LuxuryNavbar locale={locale} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 space-y-8">
        {/* User Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-500/20 shadow-md">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span>{isArabic ? 'بوابة المغامرين • بلو هورس' : 'Blue Horse Pass Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isArabic ? 'لوحة تذاكري ومغامراتي' : 'My Passes & Itineraries'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isArabic
                ? 'استعراض تصاريح الدخول، جداول مواعيد الهايكنج، وإقرارات السلامة الرقمية.'
                : 'Access your entry QR passes, hike timelines, and signed digital safety waivers.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/#events-discovery`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B132B] dark:bg-[#00E5FF] text-white dark:text-[#060B18] font-bold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>{isArabic ? 'حجز تجربة جديدة' : 'Book New Event'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Dashboard Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-[#0B132B] dark:bg-[#00E5FF] text-white dark:text-[#060B18] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{isArabic ? 'التذاكر النشطة' : 'Active Passes'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 dark:bg-black/20 font-black">
              {myTickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'itinerary'
                ? 'bg-[#0B132B] dark:bg-[#00E5FF] text-white dark:text-[#060B18] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isArabic ? 'جدول رحلة الهايكنج' : 'Hike Itinerary & Gear'}</span>
          </button>

          <button
            onClick={() => setActiveTab('waivers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'waivers'
                ? 'bg-[#0B132B] dark:bg-[#00E5FF] text-white dark:text-[#060B18] shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isArabic ? 'إقرارات السلامة الرقمية' : 'Digital Waivers'}</span>
          </button>
        </div>

        {/* TAB 1: PASSES & TICKETS */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-3xl bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-500/20 p-6 shadow-md hover:shadow-xl transition-all space-y-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                        ticket.category === 'adventures'
                          ? 'bg-[#E6AF2E]/15 text-[#C98E18] dark:text-[#F5D982] border border-[#E6AF2E]/30'
                          : 'bg-cyan-500/15 text-cyan-600 dark:text-[#00E5FF] border border-cyan-400/30'
                      }`}>
                        {ticket.category === 'adventures' ? (
                          <Compass className="w-3 h-3" />
                        ) : (
                          <Flame className="w-3 h-3" />
                        )}
                        <span>{isArabic ? ticket.tierAr : ticket.tierEn}</span>
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                        {isArabic ? ticket.titleAr : ticket.titleEn}
                      </h3>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/25 shrink-0">
                      {isArabic ? 'مؤكدة' : 'Confirmed'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 py-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>{ticket.date} • {ticket.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#E6AF2E] shrink-0" />
                      <span className="truncate">{isArabic ? ticket.locationAr : ticket.locationEn}</span>
                    </div>
                  </div>

                  {/* QR Code Presentation Box */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-white/10 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center shrink-0">
                        <QrIcon className="w-11 h-11 text-slate-950" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">
                          {isArabic ? 'رقم التذكرة' : 'PASS ID'}
                        </span>
                        <span className="text-xs font-black font-mono text-slate-900 dark:text-white tracking-wider">
                          {ticket.id}
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold mt-0.5">
                          ✓ {isArabic ? 'جاهز للمسح عند البوابة' : 'Ready for gate check-in'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(isArabic ? `تم تجهيز التذكرة ${ticket.id} للطباعة والتحميل.` : `Pass ${ticket.id} ready for download.`)}
                      className="p-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      title="Download Pass"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY & GEAR */}
        {activeTab === 'itinerary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Timeline Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-500/20 p-6 sm:p-8 shadow-md space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#E6AF2E] uppercase tracking-wider block">
                    {isArabic ? 'الجدول الزمني للرحلة' : 'Event Timeline'}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {isArabic ? 'هايكنج جبل القمر ورصد النجوم' : 'Moon Mountain Sunset & Stargazing'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {isArabic
                      ? 'يرجى الالتزام بمواعيد التجمع لضمان صعود القمة في الوقت المثالي للغروب.'
                      : 'Please arrive on time at the meeting point to ensure summit arrival before sunset.'}
                  </p>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:start-3.5 before:w-0.5 before:bg-cyan-500/25">
                  {moonMountainTimeline.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 ps-2">
                      <div className="w-6 h-6 rounded-full bg-[#00E5FF] text-slate-950 flex items-center justify-center font-black text-[10px] shrink-0 ring-4 ring-white dark:ring-[#121C38] shadow-xs">
                        {idx + 1}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-cyan-600 dark:text-[#00E5FF]">
                            {item.time}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {isArabic ? item.titleAr : item.titleEn}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-light">
                          {isArabic ? item.descAr : item.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packing List & Gear Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-500/20 p-6 sm:p-8 shadow-md space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isArabic ? 'قائمة التجهيزات المطلوبة' : 'What to Bring / Packing List'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {isArabic ? 'تجهيزات ضرورية لضمان راحتك وسلامتك أثناء الهايكنج.' : 'Essential items for comfort and safety during your hike.'}
                  </p>
                </div>

                <ul className="space-y-3">
                  {packingList.map((gear, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200/80 dark:border-white/5 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-slate-800 dark:text-slate-200 font-medium block">
                          {isArabic ? gear.ar : gear.en}
                        </span>
                        {gear.required && (
                          <span className="text-[10px] text-amber-600 dark:text-[#E6AF2E] font-bold">
                            {isArabic ? 'إلزامي للسلامة' : 'Mandatory for safety'}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/25 p-3.5 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    {isArabic
                      ? 'ممنوع ارتداء الأحذية المفتوحة (النعال أو الصنادل) أثناء الصعود لوعورة المسار الصخري.'
                      : 'Open-toe sandals or flip-flops are strictly prohibited on the trail due to rugged granite terrain.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL WAIVERS */}
        {activeTab === 'waivers' && (
          <div className="rounded-3xl bg-white dark:bg-[#121C38] border border-slate-200 dark:border-cyan-500/20 p-6 sm:p-8 shadow-md space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isArabic ? 'إقرارات السلامة والتنازل الرقمية' : 'Digital Safety & Liability Waivers'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isArabic
                  ? 'تم تسجيل موافقتك الرقمية على إقرارات السلامة لجميع التذاكر المرتبطة بحسابك.'
                  : 'Your electronic consent has been officially recorded for all adventure tickets.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isArabic ? 'إقرار سلامة الهايكنج وسياحة المغامرات' : 'Outdoor Hiking & Wilderness Liability Waiver'}
                    </h4>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">
                      ✓ {isArabic ? 'موقع إلكترونياً ومطابق للشروط' : 'Digitally signed & active'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(isArabic ? 'تم تحميل نسخة الإقرار بصيغة PDF.' : 'Waiver PDF downloaded.')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'تحميل نسخة PDF' : 'Download PDF Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isArabic ? 'إقرار السلامة لفروسية وركوب الخيل' : 'Equestrian & Beach Horse Riding Safety Protocol'}
                    </h4>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">
                      ✓ {isArabic ? 'موقع إلكترونياً ومطابق للشروط' : 'Digitally signed & active'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(isArabic ? 'تم تحميل نسخة الإقرار بصيغة PDF.' : 'Waiver PDF downloaded.')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'تحميل نسخة PDF' : 'Download PDF Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <LuxuryFooter locale={locale} />
    </div>
  );
}
