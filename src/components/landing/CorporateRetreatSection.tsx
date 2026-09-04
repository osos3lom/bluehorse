'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Award, Users, CheckCircle2, MessageSquare, PhoneCall, Send, Sparkles } from 'lucide-react';

interface CorporateRetreatSectionProps {
  locale: string;
}

export function CorporateRetreatSection({ locale }: CorporateRetreatSectionProps) {
  const isArabic = locale === 'ar';
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [attendeesCount, setAttendeesCount] = useState('20-50');
  const [preferredExperience, setPreferredExperience] = useState('desert_retreat');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="corporate" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-24">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#121C38] to-[#1C2541] border border-cyan-500/20 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        {/* Background Decorative Rings */}
        <div className="absolute -end-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -start-24 -bottom-24 w-96 h-96 rounded-full bg-[#E6AF2E]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isArabic ? 'خدمات الشركات والفعاليات الخاصة' : 'Corporate Events & Custom Offsites'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              {isArabic ? (
                <>
                  خلوات استثنائية لفرق العمل <span className="font-extrabold bg-gradient-to-r from-cyan-300 via-[#00E5FF] to-white bg-clip-text text-transparent">في قلب طبيعة جدة</span>
                </>
              ) : (
                <>
                  Elevate Your Team With <span className="font-extrabold bg-gradient-to-r from-cyan-300 via-[#00E5FF] to-white bg-clip-text text-transparent">Bespoke Desert Retreats</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {isArabic
                ? 'نصمم للشركات تجارب بناء فرق عمل استثنائية تمزج بين تحدي الهايكنج في جبل القمر، الفروسية على الشاطئ، وورش العمل في مخيمات مجهزة بأحدث وسائل الراحة والصوتيات.'
                : 'From high-impact leadership hikes across Moon Mountain to beach galas and private festival productions. We provide turnkey event logistics, licensed security, and gourmet catering.'}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isArabic ? 'إنتاج وتنظيم متكامل' : 'Turnkey Event Production'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {isArabic ? 'من المسرح والصوتيات إلى التصاريح الرسمية' : 'Full staging, permits, AV and talent booking'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E6AF2E]/15 border border-[#E6AF2E]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#E6AF2E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isArabic ? 'فوترة ضريبية معتمدة' : 'ZATCA E-Invoicing Compliant'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {isArabic ? 'فواتير نظامية معتمدة ومطابقة للشروط' : 'Official VAT receipts and transparent corporate billing'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://wa.me/966500000000?text=Hello%20Blue%20Horse%20Team%2C%20we%20are%20inquiring%20about%20a%20corporate%20retreat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isArabic ? 'محادثة سريعة عبر واتساب' : 'Chat with Corporate Lead'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Custom Quote Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {isArabic ? 'تم استلام طلبكم بنجاح!' : 'Inquiry Received!'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {isArabic
                      ? 'سيتواصل معكم مستشار الفعاليات في بلو هورس خلال 24 ساعة لتقديم عرض مخصص.'
                      : 'Our corporate event consultant will contact you within 24 hours with a custom proposal.'}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    {isArabic ? 'إرسال استفسار آخر' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {isArabic ? 'طلب عرض أسعار مخصص' : 'Request a Custom Proposal'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isArabic ? 'احصل على برنامج مفصل وعرض مالي لفريقك.' : 'Get a personalized retreat itinerary and quote.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      {isArabic ? 'اسم المنشأة / الشركة' : 'Company / Organization Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={isArabic ? 'شركة...' : 'Acme Inc.'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        {isArabic ? 'اسم المسؤول' : 'Contact Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={isArabic ? 'الاسم الكريم' : 'Your Name'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        {isArabic ? 'رقم الجوال' : 'Phone / Mobile'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        {isArabic ? 'نوع التجربة المطلوبة' : 'Preferred Experience'}
                      </label>
                      <select
                        value={preferredExperience}
                        onChange={(e) => setPreferredExperience(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                      >
                        <option value="desert_retreat" className="bg-[#0B132B]">
                          {isArabic ? 'خلوة جبل القمر (هايكنج وتخييم)' : 'Moon Mountain Retreat'}
                        </option>
                        <option value="beach_equestrian" className="bg-[#0B132B]">
                          {isArabic ? 'فروسية شاطئية وبحر' : 'Beach Equestrian Event'}
                        </option>
                        <option value="private_festival" className="bg-[#0B132B]">
                          {isArabic ? 'تنظيم مهرجان / حفل خاص' : 'Private Brand Festival'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        {isArabic ? 'العدد المتوقع' : 'Estimated Guests'}
                      </label>
                      <select
                        value={attendeesCount}
                        onChange={(e) => setAttendeesCount(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                      >
                        <option value="10-25" className="bg-[#0B132B]">10 - 25</option>
                        <option value="25-50" className="bg-[#0B132B]">25 - 50</option>
                        <option value="50-100" className="bg-[#0B132B]">50 - 100</option>
                        <option value="100+" className="bg-[#0B132B]">100+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-[#060B18] font-black text-xs shadow-lg shadow-cyan-500/30 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isArabic ? 'إرسال طلب العرض المخصص' : 'Submit Retreat Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
