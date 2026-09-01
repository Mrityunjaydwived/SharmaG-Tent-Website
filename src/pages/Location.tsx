import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, Phone, Clock, Sparkles, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { dataService } from '../lib/dataService';
import { BusinessSettings } from '../types';

export const Location: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  const googleMapSrc = settings?.google_maps_embed_url || 
    'https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white text-[#111827]">
      {/* Header Banner with Color Palettes & Hindi Typography */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <MapPin className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>हमारा पता और सेवा क्षेत्र (Location & Service Area)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>शर्माजी टेंट हाउस — आपके शहर में </span>
          <span className="gradient-text-gold">सर्वोत्तम सेवा उपलब्ध</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
          हम हर प्रकार के मांगलिक कार्यों, भव्य विवाह, श्रीमद् भागवत कथा और पारिवारिक उत्सवों के लिए संपूर्ण वाटरप्रूफ टेंट, डेकोरेशन और लाइटिंग की सेवा <span className="font-semibold text-[#1F74BA]">सीधे आपके द्वार तक</span> पहुंचाते हैं।
        </p>
      </div>

      {/* Grid: Map + Location Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map View */}
        <div className="lg:col-span-7 card-hover-lift rounded-3xl p-3 sm:p-4 overflow-hidden bg-white border border-gray-200/90 shadow-md">
          <div className="w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden relative shadow-inner">
            <iframe
              title="SharmaG Tent House Location Map"
              src={googleMapSrc}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* Location Info & Service Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-hover-lift rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-50/40 via-white to-amber-50/20 border border-gray-200/90 hover:border-[#1F74BA]/40 shadow-md space-y-6 transition-all duration-300">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider">
                <Building className="w-3.5 h-3.5 text-[#F8D706]" />
                <span>प्रधान कार्यालय</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                कार्यालय एवं गोदाम <span className="text-xs sm:text-sm font-bold text-[#1F74BA] font-sans block sm:inline">(Head Office & Depot)</span>
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1F74BA] border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">हमारा पता (Address)</span>
                  <span className="text-gray-600 leading-relaxed">{settings?.address || '[BUSINESS ADDRESS]'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#F09120] border border-amber-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">मुख्य पहचान (Landmark)</span>
                  <span className="text-gray-600">{settings?.landmark || '[NEARBY LANDMARK]'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0B4F8A] border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">सेवा क्षेत्र (Service Area)</span>
                  <span className="text-gray-600">{settings?.service_area || '[REGIONAL SERVICE RADIUS & DISTRICTS]'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white transition-colors duration-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-[#111827] block">कार्यालय का समय (Timing)</span>
                  <span className="text-gray-600">{settings?.business_hours || 'सोमवार से रविवार: सुबह 9:00 बजे से रात 9:00 बजे तक'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href={settings?.google_maps_embed_url ? settings.google_maps_embed_url.replace('/embed', '') : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-black" />
                <span>गूगल मैप पर रास्ता देखें (Get Directions) →</span>
              </a>
              <a
                href={`tel:${settings?.phone || ''}`}
                className="w-full py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-[#1F74BA]/30 text-[#1F74BA] font-extrabold text-xs text-center transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#1F74BA]" />
                <span>आने से पहले कॉल करें (Call Us)</span>
              </a>
            </div>
          </div>

          {/* Regional Mobilization Note */}
          <div className="card-hover-lift rounded-3xl p-6 text-xs text-gray-700 space-y-2.5 bg-gradient-to-r from-blue-50 via-white to-amber-50 border border-[#1F74BA]/25 shadow-sm">
            <div className="flex items-center gap-2 font-extrabold text-[#1F74BA]">
              <Sparkles className="w-4 h-4 text-[#F8D706]" />
              <span className="text-sm">बाहरी क्षेत्रों, फार्म हाउस व गांवों में भी पूर्ण व्यवस्था</span>
            </div>
            <p className="leading-relaxed text-gray-600 font-normal">
              क्या आप शहर से बाहर, फार्म हाउस या पैतृक गांव में शादी या कथा का आयोजन कर रहे हैं? हमारे पास अपनी मालवाहक गाड़ियाँ और अनुभवी कारीगर हैं जो समय से पूर्व पहुँचकर पूरा पंडाल सजाते हैं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
