import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, MessageCircle, UserCheck, BellRing } from 'lucide-react';
import { dataService } from '../lib/dataService';
import { BusinessSettings } from '../types';
import { sendNotificationEmail, getWhatsAppUrl, getPhoneUrl, OWNER_CONFIG } from '../lib/notificationService';

export const Contact: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    event_type: 'Weddings',
    event_date: '',
    event_location: '',
    guest_count: '',
    budget_range: '',
    message: '',
  });

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer_name || !form.phone) return;

    setIsSubmitting(true);
    const submissionPayload = {
      customer_name: form.customer_name,
      phone: form.phone,
      email: form.email || 'N/A',
      event_type: form.event_type,
      event_date: form.event_date || 'TBD',
      event_location: form.event_location || 'त्योंथर / रीवा',
      guest_count: form.guest_count || 'N/A',
      required_services: ['General Contact Enquiry'],
      budget_range: form.budget_range || 'Flexible',
      message: form.message,
      status: 'New' as const,
      admin_notes: `Direct inquiry received for ${form.customer_name} (${form.phone})`,
    };

    try {
      // 1. Save to database / local storage
      await dataService.submitEnquiry(submissionPayload);

      // 2. Dispatch direct email notification to owner email (dwivedibandhavesh@gmail.com) via FormSubmit
      await sendNotificationEmail({
        subject: `🔔 नई टेंट बुकिंग पूछताछ: ${form.customer_name} (${form.phone})`,
        name: form.customer_name,
        phone: form.phone,
        email: form.email,
        eventType: form.event_type,
        date: form.event_date,
        location: form.event_location,
        guests: form.guest_count,
        budget: form.budget_range,
        message: form.message,
        source: 'संपर्क पेज (Contact Page Form)',
      });

      setLastSubmittedData(submissionPayload);
      setIsSuccess(true);
      setForm({
        customer_name: '',
        phone: '',
        email: '',
        event_type: 'Weddings',
        event_date: '',
        event_location: '',
        guest_count: '',
        budget_range: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ownerPhone = '9229903308';
  const secondaryPhone = '7489467539';
  const ownerEmail = settings?.email || 'dwivedibandhavesh@gmail.com';
  const ownerAddress = settings?.address || 'वार्ड नं. 1, त्योंथर, रीवा, मध्य प्रदेश';

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white text-[#111827]">
      {/* Header Banner with Hindi Typography */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <MessageSquare className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>सीधा संपर्क एवं परामर्श (Direct Contact & Consultation)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>अपने मांगलिक कार्य की तैयारी के लिए </span>
          <span className="gradient-text-gold">सीधे बात करें</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
          चाहे भव्य शादी का वाटरप्रूफ पंडाल हो, सुंदर फूलों का मंडप हो या धार्मिक भागवत कथा का आयोजन — <span className="font-semibold text-[#1F74BA]">संस्थापक श्री प्रदीप शर्मा एवं हमारी टीम आपकी सेवा में 24x7 सदैव तत्पर हैं।</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-hover-lift rounded-3xl p-7 sm:p-8 space-y-6 bg-gradient-to-br from-blue-50/40 via-white to-amber-50/20 border border-gray-200/90 hover:border-[#1F74BA]/40 shadow-md transition-all duration-300">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                कार्यालय एवं संचालक विवरण
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                हेल्पलाइन एवं संपर्क <span className="text-xs sm:text-sm font-bold text-[#1F74BA] font-sans block sm:inline">(Official Details)</span>
              </h3>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-gray-700">
              {/* Founder & Owner */}
              <li className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white transition-colors duration-200 bg-amber-50/50 border border-amber-200/60">
                <div className="w-9 h-9 rounded-xl bg-[#F8D706] text-black border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs font-black">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">संस्थापक एवं संचालक (Founder & Owner)</span>
                  <span className="text-amber-950 font-black text-sm">
                    {settings?.founder_name || 'श्री प्रदीप शर्मा (Pradeep Sharma)'}
                  </span>
                </div>
              </li>

              {/* Office Address */}
              <li className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1F74BA] border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">पता (Office Address)</span>
                  <span className="text-gray-700 font-bold leading-relaxed">{ownerAddress}</span>
                </div>
              </li>

              {/* Phone Numbers */}
              <li className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#F09120] border border-amber-100 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">फ़ोन नंबर (Direct Call)</span>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <a href={`tel:${ownerPhone}`} className="text-[#1F74BA] font-extrabold text-base hover:underline">
                      +91 {ownerPhone}
                    </a>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <a href={`tel:${secondaryPhone}`} className="text-[#1F74BA] font-extrabold text-base hover:underline">
                      +91 {secondaryPhone}
                    </a>
                  </div>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0B4F8A] border border-blue-100 flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">ईमेल (Direct Notification Email)</span>
                  <a href={`mailto:${ownerEmail}`} className="text-[#1F74BA] font-extrabold text-sm hover:underline">
                    {ownerEmail}
                  </a>
                </div>
              </li>

              {/* Business Hours */}
              <li className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">संपर्क समय (Working Hours)</span>
                  <span className="text-emerald-700 font-extrabold">24x7 सदैव उपलब्ध — सातों दिन 24 घंटे</span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={`https://wa.me/91${ownerPhone}?text=${encodeURIComponent('नमस्ते प्रदीप शर्मा जी, मुझे त्योंथर/रीवा में टेंट व डेकोरेशन व्यवस्था के लिए बात करनी है।')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp पर तुरंत चैट करें (+91 {ownerPhone}) →</span>
              </a>

              <a
                href={`tel:${ownerPhone}`}
                className="w-full py-3 rounded-xl bg-[#1F74BA] hover:bg-[#185e97] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>सीधा कॉल करें (Call Now)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="card-hover-lift rounded-3xl p-8 sm:p-10 bg-white border border-gray-200/90 shadow-md relative">
            {isSuccess ? (
              <div className="text-center py-10 space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    आपका संदेश सफलतापूर्वक भेज दिया गया है!
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 px-4 rounded-full inline-block border border-emerald-200">
                    📧 सूचना ईमेल: {ownerEmail} पर प्रेषित कर दी गई है
                  </p>
                </div>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
                  धन्यवाद! आपके कार्यक्रम का विवरण श्री प्रदीप शर्मा एवं प्रबंधन टीम को प्राप्त हो गया है। हम शीघ्र ही आपसे संपर्क करेंगे।
                </p>

                {lastSubmittedData && (
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/91${ownerPhone}?text=${encodeURIComponent(
                        `नमस्ते शर्माजी टेंट हाउस,\n\nमैंने वेबसाइट से फॉर्म भेजा है:\n• नाम: ${lastSubmittedData.customer_name}\n• फोन: ${lastSubmittedData.phone}\n• कार्यक्रम: ${lastSubmittedData.event_type}\n• स्थान: ${lastSubmittedData.event_location}\n• तिथि: ${lastSubmittedData.event_date}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md hover:bg-emerald-500 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp पर भी कन्फर्मेशन भेजें →</span>
                    </a>
                  </div>
                )}

                <div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs transition"
                  >
                    दूसरा संदेश भेजें (Send Another)
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 mb-2">
                  <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                    ऑनलाइन परामर्श व बुकिंग फॉर्म
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    कार्यक्रम का विवरण भेजें <span className="text-xs sm:text-sm font-bold text-[#1F74BA] font-sans block sm:inline">(Inquiry Form)</span>
                  </h3>
                  <p className="text-[11px] text-gray-500 font-bold">
                    ⚡ फॉर्म सबमिट करते ही नोटिफिकेशन सीधे हमारे ईमेल व सिस्टम पर पहुंचेगा।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">आपका पूरा नाम (Your Name) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राजेश शर्मा"
                      value={form.customer_name}
                      onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">मोबाइल नंबर (Phone Number) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="उदा. 9229903308"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">ईमेल (Email Address)</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">कार्यक्रम का प्रकार (Event Type)</label>
                    <select
                      value={form.event_type}
                      onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                    >
                      <option value="Weddings">शुभ विवाह एवं रिसेप्शन (Weddings)</option>
                      <option value="Religious Events">धार्मिक कथा / भागवत / सत्संग</option>
                      <option value="Parties & Celebrations">हल्दी, मेहंदी, संगीत एवं पार्टी</option>
                      <option value="Corporate Events">सम्मेलन एवं कॉर्पोरेट मीट्स</option>
                      <option value="Political Events">जनसभा एवं विशाल रैली</option>
                      <option value="Festivals">त्योहार एवं पारिवारिक उत्सव</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">कार्यक्रम की तारीख (Event Date)</label>
                    <input
                      type="date"
                      value={form.event_date}
                      onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">अनुमानित मेहमान संख्या (Guest Count)</label>
                    <input
                      type="text"
                      placeholder="उदा. 500 से 1000 लोग"
                      value={form.guest_count}
                      onChange={(e) => setForm({ ...form, guest_count: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-700 font-extrabold">कार्यक्रम स्थल / गांव / शहर (Event Venue)</label>
                  <input
                    type="text"
                    placeholder="उदा. त्योंथर / रीवा / निकटवर्ती क्षेत्र"
                    value={form.event_location}
                    onChange={(e) => setForm({ ...form, event_location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-700 font-extrabold">आपकी आवश्यकताएं (Requirements)</label>
                  <textarea
                    rows={3}
                    placeholder="टेंट का आकार, मंडप का डिज़ाइन, वीआईपी सोफा, लाइटिंग या डीजे जैसी विशेष जरूरतें लिखें..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm text-[#111827] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-sm shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>भेजा जा रहा है...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>पूछताछ विवरण भेजें (Submit Inquiry) →</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
