import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ZoomIn, 
  Eye, 
  Filter, 
  Image as ImageIcon, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Search,
  Camera
} from 'lucide-react';
import { LightboxModal } from '../components/ui/LightboxModal';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { dataService } from '../lib/dataService';
import { GalleryItem, BusinessSettings } from '../types';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  useEffect(() => {
    dataService.getGallery().then(setItems);
    dataService.getSettings().then(setSettings);
  }, []);

  const categories = [
    { id: 'All', label: 'सभी 56+ तस्वीरें (All Photos)', emoji: '✨' },
    { id: 'Weddings', label: 'शाही विवाह व मंडप (Weddings)', emoji: '🎪' },
    { id: 'Parties', label: 'हल्दी, मेहंदी व संगीत (Parties)', emoji: '🎉' },
    { id: 'Stage Decoration', label: 'वरमाला स्टेज व बैकड्रॉप (Stage Decor)', emoji: '🌸' },
    { id: 'Reception', label: 'रिसेप्शन व शाही डाइनिंग (Reception)', emoji: '👑' },
    { id: 'Religious Events', label: 'धार्मिक कथा व सत्संग (Spiritual)', emoji: '🛕' },
    { id: 'Lighting', label: 'रोशनी, लेजर व आतिशबाजी (Lighting & FX)', emoji: '💡' },
    { id: 'DJ', label: '3D एलईडी डांस फ्लोर व डीजे (DJ & Sound)', emoji: '🔊' },
    { id: 'Tents', label: 'वाटरप्रूफ जर्मन हैंगर्स (German Hangars)', emoji: '🌧️' },
    { id: 'Before/After', label: 'रूपांतरण (Before & After)', emoji: '⚡' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category Match
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Before/After') {
          matchesCategory = item.category === 'Before/After' || !!(item.before_image && item.after_image);
        } else {
          matchesCategory = item.category.toLowerCase().includes(selectedCategory.toLowerCase());
        }
      }

      // Search Query Match
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText = item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [items, selectedCategory, searchQuery]);

  const activeItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white text-[#111827]">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Camera className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>50+ भव्य भारतीय उत्सव फ़ोटो गैलरी (HD Celebration Gallery)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>शाही पंडाल, विवाह मंडप एवं </span>
          <span className="gradient-text-gold block sm:inline">उत्सव दीर्घा</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto font-normal">
          शाही विवाह, हल्दी-मेहंदी, 3D वरमाला स्टेज, जगमगाती बरात डीजे गाड़ी, और वाटरप्रूफ जर्मन हैंगर्स का <span className="font-bold text-[#1F74BA]">50+ वास्तविक एचडी फोटो संग्रह</span>।
        </p>

        {/* Quick Highlights Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-bold text-gray-600">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1F74BA] border border-blue-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F74BA]" />
            कुल {items.length} भव्य उत्सव तस्वीरें
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F09120]" />
            100% वास्तविक ऑन-साइट फोटोग्राफी
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            फुलस्क्रीन ज़ूम व WhatsApp बुकिंग
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card-hover-lift rounded-3xl p-5 border border-gray-200/90 bg-white shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="तस्वीर, हल्दी, मंडप, डीजे या पंडाल खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 transform active:scale-95 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#1F74BA] border border-transparent hover:border-blue-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Before / After Dedicated Transformation Section */}
      {selectedCategory === 'Before/After' && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-3xl p-6 sm:p-10 space-y-5 bg-gradient-to-b from-blue-50/40 via-white to-amber-50/30 border border-[#1F74BA]/25 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F09120] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>साइट ट्रांसफॉर्मेशन (Site Transformation)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827] pt-1">
                  खाली जमीन से भव्य राजमहल का 48 घंटे में रूपांतरण
                </h3>
              </div>
              <span className="text-xs font-bold text-[#1F74BA] bg-white px-3 py-1.5 rounded-full border border-blue-200 shadow-xs self-start sm:self-auto">
                इंटरएक्टिव स्लाइडर (Drag to Compare)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              नीचे दिए गए स्लाइडर को बाएं-दाएं ड्रैग करके देखें कि शर्माजी टेंट हाउस की कुशल टीम कैसे किसी भी खाली मैदान को 48 घंटे में भव्य वातानुकूलित मंडप में बदल देती है।
            </p>

            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              beforeLabel="खाली मैदान (0 घंटे)"
              afterLabel="शाही विवाह मंडप (48 घंटे बाद)"
            />
          </div>
        </div>
      )}

      {/* Gallery Grid (56+ Photos) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 font-bold px-1">
          <span>दिखाई जा रही तस्वीरें: {filteredItems.length}</span>
          <span>(किसी भी फोटो पर क्लिक करके फुलस्क्रीन व विवरण देखें)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveModalIndex(index)}
              className="group card-hover-lift relative rounded-3xl overflow-hidden bg-white border border-gray-200/90 hover:border-[#1F74BA]/50 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="h-72 sm:h-80 overflow-hidden relative bg-gray-100">
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                {/* Dynamic Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/95 via-[#071A2B]/35 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 text-[#1F74BA] text-[11px] font-extrabold shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F8D706]" />
                  <span>{item.category}</span>
                </div>

                {/* Zoom Action Icon Button with Gold Hover */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 flex items-center justify-center text-[#1F74BA] group-hover:bg-[#F8D706] group-hover:text-black transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Bottom Overlay Info on Hover */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white transform transition-transform duration-300">
                  <h3 className="text-base sm:text-lg font-bold font-serif-luxury leading-snug drop-shadow-sm group-hover:text-[#F8D706] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mt-1 font-normal opacity-90">
                    {item.description || 'शाही विवाह एवं मांगलिक उत्सव सजावट'}
                  </p>

                  <div className="pt-3 mt-2 border-t border-white/15 flex items-center justify-between text-xs text-amber-300 font-extrabold">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>एचडी फोटो देखें</span>
                    </span>
                    <span className="text-[10px] text-gray-300 bg-white/10 px-2 py-0.5 rounded-md">
                      # {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen HD Inspection */}
      {activeModalIndex !== null && activeItem && (
        <LightboxModal
          item={activeItem}
          onClose={() => setActiveModalIndex(null)}
          onNext={() => setActiveModalIndex((activeModalIndex + 1) % filteredItems.length)}
          onPrev={() => setActiveModalIndex((activeModalIndex - 1 + filteredItems.length) % filteredItems.length)}
          hasNext={filteredItems.length > 1}
          hasPrev={filteredItems.length > 1}
        />
      )}

      {/* Bottom Consultation Banner */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-[#1F74BA]/40 card-hover-lift">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F8D706] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>कस्टम डिज़ाइन व ऑन-साइट विजिट</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-white">
            क्या आपको अपनी पसंद का कोई विशेष मंडप डिज़ाइन चाहिए?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-normal max-w-xl">
            Pinterest, Instagram या अपनी पसंद का कोई भी फोटो हमारे साथ WhatsApp पर शेयर करें, हम आपके बजट में वैसा ही भव्य पंडाल तैयार करेंगे।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
          <a
            href="https://wa.me/919876543210?text=नमस्ते%20SharmaG%20Tent%20House,%20मैं%20गैलरी%20देखकर%20एक%20विशेष%20पंडाल%20डिज़ाइन%20के%20बारे%20में%20बात%20करना%20चाहता%20हूँ।"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp पर फोटो भेजें</span>
          </a>

          <Link
            to="/quote"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFE347] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>कोटेशन बनाएं</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
