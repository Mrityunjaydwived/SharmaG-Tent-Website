import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Award,
  Search,
  Check,
  X,
  MessageCircle,
  Calendar,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { dataService } from '../lib/dataService';
import { allOccasionServices, OccasionServiceCategory } from '../data/eventServicesData';

export const Services: React.FC = () => {
  const [occasions, setOccasions] = useState<OccasionServiceCategory[]>(allOccasionServices);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<OccasionServiceCategory | null>(null);
  const [modalSearch, setModalSearch] = useState<string>('');

  useEffect(() => {
    dataService.getOccasionServices().then((data) => {
      if (data && data.length > 0) {
        setOccasions(data);
      }
    });
  }, []);

  const filterGroups = [
    { id: 'all', label: 'सभी उत्सव व सुविधाएं (All Categories)', emoji: '✨' },
    { id: 'wedding', label: 'मांगलिक विवाह व सगाई (Weddings)', emoji: '🎪' },
    { id: 'party', label: 'पारिवारिक व पार्टियां (Parties)', emoji: '🎉' },
    { id: 'religious', label: 'धार्मिक कथा व सत्संग (Spiritual)', emoji: '🛕' },
    { id: 'corporate', label: 'कॉर्पोरेट व सार्वजनिक (Corporate)', emoji: '🏢' },
    { id: 'production', label: 'उत्पादन, लाइट व साउंड (Production)', emoji: '💡' },
  ];

  const filteredOccasions = useMemo(() => {
    return occasions.filter((item) => {
      const matchesGroup = selectedGroup === 'all' || item.categoryGroup === selectedGroup;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesGroup;

      const matchesTitle = item.titleHindi.toLowerCase().includes(query) ||
        item.titleEnglish.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);

      const matchesSubServices = item.services.some((srv) => srv.toLowerCase().includes(query));

      return matchesGroup && (matchesTitle || matchesSubServices);
    });
  }, [selectedGroup, searchQuery]);

  const filteredModalServices = useMemo(() => {
    if (!activeModalItem) return [];
    const query = modalSearch.toLowerCase().trim();
    if (!query) return activeModalItem.services;
    return activeModalItem.services.filter((srv) => srv.toLowerCase().includes(query));
  }, [activeModalItem, modalSearch]);

  const handleOpenModal = (item: OccasionServiceCategory) => {
    setActiveModalItem(item);
    setModalSearch('');
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
    setModalSearch('');
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white text-[#111827]">
      {/* Header Banner with Luxury Hindi Typography & English Sub-label */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>संपूर्ण उत्सव एवं इंफ्रास्ट्रक्चर सेवाएं (20+ Occasion Services)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>हर मांगलिक उत्सव के अनुसार </span>
          <span className="gradient-text-gold block sm:inline">शाही टेंट व सम्पूर्ण व्यवस्था</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-3xl mx-auto">
          शाही विवाह, भागवत कथा, सगाई, जन्मदिन, कॉर्पोरेट सम्मेलन से लेकर भव्य रैलियों तक — <span className="font-semibold text-[#1F74BA]">प्रत्येक आयोजन के लिए विशेष टेंट, स्टेज, लाइट, साउंड व सिटिंग व्यवस्था</span> एक ही स्थान पर।
        </p>

        {/* Quick Summary Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-bold text-gray-600">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1F74BA] border border-blue-100 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1F74BA]" />
            20 विशेष उत्सव श्रेणियां
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F09120]" />
            250+ इन-हाउस सेवाएं उपलब्ध
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            100% वाटरप्रूफ व सुरक्षित संरचना
          </span>
        </div>
      </div>

      {/* Live Search & Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="उत्सव या सेवा खोजें (उदा. मंडप, डीजे, कथा, हवन, 360°, सोफा, लाइट)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-gray-50/90 border border-gray-200 text-sm text-[#111827] placeholder-gray-400 focus:bg-white focus:border-[#1F74BA] focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap pt-2">
          {filterGroups.map((grp) => {
            const isSelected = selectedGroup === grp.id;
            return (
              <button
                key={grp.id}
                onClick={() => setSelectedGroup(grp.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 transform active:scale-95 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#1F74BA] border border-transparent hover:border-blue-200'
                }`}
              >
                <span>{grp.emoji}</span>
                <span>{grp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2 border-b border-gray-100 pb-3">
        <span>उपलब्ध उत्सव एवं सेवाएं ({filteredOccasions.length})</span>
        <span className="text-[#1F74BA]">कार्ड पर क्लिक करके सभी शामिल सेवाएं देखें</span>
      </div>

      {/* Occasion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOccasions.map((occ) => (
          <div
            key={occ.id}
            onClick={() => handleOpenModal(occ)}
            className="group card-hover-lift rounded-3xl bg-white border border-gray-200/90 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#1F74BA]/50 transition-all duration-500 cursor-pointer"
          >
            {/* Top Photo with Smooth Zoom, Emoji & Included Count Badge */}
            <div className="h-64 overflow-hidden relative bg-gray-100">
              <img
                src={occ.image_url}
                alt={occ.titleHindi}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Category Group Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#071A2B]/85 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/20 shadow-xs flex items-center gap-1.5">
                <span>{occ.emoji}</span>
                <span>{occ.categoryGroupHindi}</span>
              </div>

              {/* Total Services Count Badge */}
              <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#F8D706] text-black text-[11px] font-extrabold shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-black" />
                <span>{occ.badge}</span>
              </div>

              {/* Occasion Title on Image bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                <h3 className="text-xl font-extrabold font-serif-luxury text-white group-hover:text-[#F8D706] transition-colors leading-snug drop-shadow-sm">
                  {occ.titleHindi}
                </h3>
                <p className="text-[11px] text-gray-200 font-bold uppercase tracking-wider">
                  {occ.titleEnglish}
                </p>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                {/* Tagline / Subtitle */}
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs font-bold text-[#1F74BA]">
                  {occ.tagline}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {occ.description}
                </p>

                {/* Key Sub-Services Preview (Top 5 items) */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-gray-700">
                    <span className="text-[#1F74BA] uppercase tracking-wider">प्रमुख सुविधाएं (Key Services):</span>
                    <span className="text-xs text-gray-400">+{occ.services.length - 5} और</span>
                  </div>

                  <div className="space-y-1.5">
                    {occ.services.slice(0, 5).map((srv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <div className="w-4 h-4 rounded-full bg-blue-50 border border-[#1F74BA]/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#1F74BA]" />
                        </div>
                        <span className="truncate">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(occ);
                  }}
                  className="text-xs font-extrabold text-[#1F74BA] hover:text-[#0B4F8A] flex items-center gap-1 group-hover:underline"
                >
                  <span>विस्तार से सभी देखें ({occ.services.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/quote"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black text-xs font-extrabold shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>कोटेशन बनाएं</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Detail Modal (Displays ALL sub-services for clicked event) */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div 
            className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image Banner */}
            <div className="h-48 sm:h-56 relative overflow-hidden bg-gray-900 shrink-0">
              <img
                src={activeModalItem.image_url}
                alt={activeModalItem.titleHindi}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badges & Title */}
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold">
                    {activeModalItem.emoji} {activeModalItem.categoryGroupHindi}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#F8D706] text-black text-[11px] font-extrabold">
                    {activeModalItem.badge}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-white">
                  {activeModalItem.titleHindi}
                </h2>
                <p className="text-xs text-gray-300 font-bold uppercase tracking-wider">
                  {activeModalItem.titleEnglish}
                </p>
              </div>
            </div>

            {/* Modal Body with All Sub-Services */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Tagline & Overview */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-blue-50 border border-[#1F74BA]/20 text-xs sm:text-sm font-bold text-[#1F74BA]">
                  ✨ {activeModalItem.tagline}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {activeModalItem.description}
                </p>

                {/* Additional Event Photos Gallery Preview if available */}
                {activeModalItem.gallery_images && activeModalItem.gallery_images.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                      📸 उत्सव एवं सजावट फोटो झलकियां (Event Photo Gallery):
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {activeModalItem.gallery_images.map((img, idx) => (
                        <div key={idx} className="h-24 sm:h-28 rounded-xl overflow-hidden border border-gray-200 shadow-2xs group/img relative">
                          <img
                            src={img}
                            alt={`${activeModalItem.titleHindi} ${idx + 1}`}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-Services Search Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold font-serif-luxury text-[#111827] uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#1F74BA]" />
                    <span>शर्माजी टेंट हाउस द्वारा प्रदान की जाने वाली संपूर्ण सुविधाएं ({activeModalItem.services.length}):</span>
                  </h4>
                </div>

                {activeModalItem.services.length > 8 && (
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="इस उत्सव की सुविधाएं फिल्टर करें..."
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                    />
                  </div>
                )}

                {/* Sub-Services Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {filteredModalServices.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-gray-50/80 hover:bg-blue-50/60 border border-gray-200/80 hover:border-[#1F74BA]/30 transition-colors flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#1F74BA] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 leading-snug">{srv}</span>
                    </div>
                  ))}
                </div>

                {filteredModalServices.length === 0 && (
                  <p className="text-center text-xs text-gray-500 py-4">
                    कोई सेवा नहीं मिली। कृपया दूसरा शब्द खोजें।
                  </p>
                )}
              </div>
            </div>

            {/* Modal Bottom CTA Footer */}
            <div className="p-5 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-bold text-gray-500 block">क्या आप इस आयोजन की योजना बना रहे हैं?</span>
                <span className="text-xs font-extrabold text-[#111827]">पारदर्शी बजट व 3D लेआउट उपलब्ध</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(`नमस्ते SharmaG Tent House, मुझे ${activeModalItem.titleHindi} (${activeModalItem.titleEnglish}) के आयोजन की बुकिंग एवं कोटेशन के बारे में जानकारी चाहिए।`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp चैट</span>
                </a>

                <Link
                  to="/quote"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>कोटेशन प्लानर</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Quality Guarantees */}
      <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-blue-50/40 via-white to-amber-50/30 border border-[#1F74BA]/20 shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-3 p-4 rounded-2xl hover:bg-white transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-[#1F74BA]/30 flex items-center justify-center mx-auto shadow-xs text-[#1F74BA]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-base text-[#111827] font-serif-luxury">
            100% आंधी-तूफान सुरक्षा
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-normal">
            हैवी लोड टेस्टेड जर्मन हैंगर्स और वाटरप्रूफ संरचनाएं जो हर विषम मौसम में पूरी तरह सुरक्षित व मजबूत रहती हैं।
          </p>
        </div>

        <div className="space-y-3 p-4 rounded-2xl hover:bg-white transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-[#F09120]/30 flex items-center justify-center mx-auto shadow-xs text-[#F09120]">
            <Clock className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-base text-[#111827] font-serif-luxury">
            समय से पूर्व पूर्ण सेटअप
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-normal">
            समारोह शुरू होने से कई घंटे पहले संपूर्ण पंडाल, लाइट और साउंड की अंतिम जांच के साथ हैंडओवर।
          </p>
        </div>

        <div className="space-y-3 p-4 rounded-2xl hover:bg-white transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-[#1F74BA]/30 flex items-center justify-center mx-auto shadow-xs text-[#1F74BA]">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-base text-[#111827] font-serif-luxury">
            स्वयं का विशाल भंडार (100% In-House)
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-normal">
            बिना किसी बिचौलिये के सीधे हमारे वेयरहाउस से उच्च गुणवत्ता वाले कपड़े, महाराजा सोफा, लाइट व साउंड का उपयोग।
          </p>
        </div>
      </div>

      {/* Direct Call / Custom Consultation Help Banner */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-[#1F74BA]/40 card-hover-lift">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#F8D706] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>कस्टम लेआउट व साइट विजिट (On-Site Consultation)</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold font-serif-luxury text-white">
            क्या आपको अपने प्लॉट या लॉन के लिए विशेष माप की आवश्यकता है?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-normal">
            हमारे तकनीकी विशेषज्ञ आपके स्थल का मुआयना करके 3D लेआउट और पारदर्शी कोटेशन तैयार करेंगे।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            to="/quote"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all text-center"
          >
            कोटेशन प्लानर खोलें →
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs transition-all text-center"
          >
            सीधी बात करें
          </Link>
        </div>
      </div>
    </div>
  );
};
