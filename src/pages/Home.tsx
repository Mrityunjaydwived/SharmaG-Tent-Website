import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Tent, 
  Armchair, 
  Flower2, 
  Lightbulb, 
  Disc, 
  CheckCircle2, 
  Crown, 
  Calendar, 
  Users, 
  Star,
  ChevronRight,
  Music,
  Zap,
  Flame,
  ShieldCheck,
  Award,
  Truck,
  UtensilsCrossed,
  ChevronLeft,
  Pause,
  Play
} from 'lucide-react';
import { TentCanvas } from '../components/3d/TentCanvas';
import { ServiceShowcase3D } from '../components/3d/ServiceShowcase3D';
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider';
import { LightboxModal } from '../components/ui/LightboxModal';
import { dataService } from '../lib/dataService';
import { BusinessSettings, EventCategory, GalleryItem, Testimonial, ServiceCategory, ServiceItem } from '../types';



export const Home: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeLightingMood, setActiveLightingMood] = useState<'royal' | 'sangeet' | 'spiritual'>('royal');

  useEffect(() => {
    const load = async () => {
      const [s, g, t, cats, srvs] = await Promise.all([
        dataService.getSettings(),
        dataService.getGallery(),
        dataService.getTestimonials(),
        dataService.getCategories(),
        dataService.getServices(),
      ]);
      setSettings(s);
      setGallery(g);
      setTestimonials(t);
      setCategories(cats);
      setServices(srvs);
    };
    load();
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden bg-white text-[#111827]">
      {/* Hero Section with 3D Royal Tent */}
      <section className="relative min-h-[90vh] flex items-center pt-28 lg:pt-20 bg-white">
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/60 via-white to-white pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-[#1F74BA]/25">
              <Sparkles className="w-4 h-4 text-[#1F74BA]" />
              <span className="text-xs font-bold text-[#1F74BA] uppercase tracking-wider">
                मांगलिक एवं भव्य आयोजनों की पहली पसंद
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-[1.15] tracking-tight text-[#111827]">
              <span>हम सजाते हैं पंडाल,</span>
              <br />
              <span>आप बनाते हैं </span>
              <span className="gradient-text-gold">यादगार पल।</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              शर्माजी टेंट हाउस — वाटरप्रूफ शाही टेंट, मंडप सजावट, जगमगाती रोशनी, और सम्पूर्ण शादी व मांगलिक आयोजनों के कुशल सूत्रधार।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFE347] to-[#F09120] text-black font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>तुरंत कोटेशन बनाएं (Get Quote)</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-[#1F74BA]/30 text-[#1F74BA] font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                <span>हमारी सुविधाएं देखें</span>
              </Link>
            </div>

            {/* Micro Trust badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200 text-left">
              <div>
                <div className="text-2xl font-extrabold font-serif-luxury text-[#1F74BA]">100%</div>
                <div className="text-xs text-gray-600 font-medium">वाटरप्रूफ जर्मन टेंट</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-serif-luxury text-[#1F74BA]">5000+</div>
                <div className="text-xs text-gray-600 font-medium">मेहमानों की क्षमता</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-serif-luxury text-[#F09120]">शाही</div>
                <div className="text-xs text-gray-600 font-medium">पारंपरिक मंडप कला</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Royal Pavilion */}
          <div className="lg:col-span-6 relative">
            <div className="glass-card-gold rounded-3xl p-3 relative overflow-hidden bg-white border border-[#1F74BA]/20 shadow-xl">
              {/* Clean Flipkart-style Royal Pavilion Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#1F74BA]/30 text-xs text-[#1F74BA] shadow-md">
                <Crown className="w-3.5 h-3.5 text-[#F8D706]" />
                <span className="font-bold tracking-wide">3D शाही टेंट दृश्य (3D View)</span>
              </div>
              <TentCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Statistics (Prompt Section 13: Animated Stats & Counter feel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl p-8 sm:p-10 border border-gray-200 bg-gradient-to-r from-blue-50/50 via-white to-amber-50/40 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-md card-hover-lift">
          <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-blue-100 shadow-xs">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F74BA] font-serif-luxury tracking-tight">15+</div>
            <div className="text-sm font-bold text-[#111827]">वर्षों का अटूट विश्वास</div>
            <p className="text-xs text-gray-500 font-medium">विश्वसनीय सेवा एवं अनुभव</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-blue-100 shadow-xs">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4F8A] font-serif-luxury tracking-tight">2,500+</div>
            <div className="text-sm font-bold text-[#111827]">सफल मांगलिक आयोजन</div>
            <p className="text-xs text-gray-500 font-medium">विवाह, कथा एवं उत्सव</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-amber-100 shadow-xs">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F09120] font-serif-luxury tracking-tight">50,000+</div>
            <div className="text-sm font-bold text-[#111827]">वर्ग फीट टेंट सामग्री</div>
            <p className="text-xs text-gray-500 font-medium">वाटरप्रूफ जर्मन हैंगर व शामियाना</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-amber-100 shadow-xs">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F74BA] font-serif-luxury tracking-tight">100%</div>
            <div className="text-sm font-bold text-[#111827]">समय पर पूर्ण तैयारी</div>
            <p className="text-xs text-gray-500 font-medium">संतुष्टि की पक्की गारंटी</p>
          </div>
        </div>
      </section>

      {/* 3D Interactive Royal Services Showcase (Integrated Directly into Home Page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-[#1F74BA]/20 text-[#1F74BA] text-xs font-bold uppercase tracking-wider shimmer-badge">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              शाही उत्सव इंफ्रास्ट्रक्चर एवं सेवाएं (Royal Event Services)
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-luxury text-[#111827] text-royal-gradient">
              सम्पूर्ण मांगलिक व्यवस्था — एक ही छत के नीचे
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
              वाटरप्रूफ जर्मन हैंगर, 3D नक्काशीदार वरमाला स्टेज, बरात डीजे गाड़ी, फैंसी रोड लाइट, शाही आतिशबाजी और विंटेज फूड स्टॉल्स। श्रेणी चुनें और लाइव 3D मॉडल व वास्तविक फोटो देखें।
            </p>
          </div>

          <Link
            to="/services"
            className="px-5 py-3 rounded-2xl bg-[#1F74BA] hover:bg-[#185e97] text-white font-extrabold text-xs shadow-md transition flex items-center gap-2 shrink-0 hover:scale-105"
          >
            <span>सम्पूर्ण सेवा कैटलॉग (Full Catalog)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Category Pill Selectors */}
        <div className="flex items-center gap-2.5 flex-wrap justify-start">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-[#1F74BA] text-white ring-2 ring-[#1F74BA]/30 scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>🌟 सभी सेवाएं (All Infrastructure)</span>
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1F74BA] text-white ring-2 ring-[#1F74BA]/30 scale-105'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Showcase Banner + Active Service Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md">
          {/* Left: 3D Animated Canvas with Floating Sparkles */}
          <div className="lg:col-span-6 relative">
            <ServiceShowcase3D
              categoryIcon={
                selectedCategory === 'cat-tent'
                  ? 'Tent'
                  : selectedCategory === 'cat-seating'
                  ? 'Armchair'
                  : selectedCategory === 'cat-sound'
                  ? 'Disc'
                  : selectedCategory === 'cat-catering-infra'
                  ? 'UtensilsCrossed'
                  : 'Flower2'
              }
              categoryName={
                categories.find((c) => c.id === selectedCategory)?.name || 'शाही मांगलिक टेंट व मंडप'
              }
            />
          </div>

          {/* Right: Category Description & Key Specs */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold text-[#1F74BA] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {selectedCategory === 'all' ? 'टर्नकी उत्सव समाधान' : 'विशेष सेवा विनिर्देश'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                {categories.find((c) => c.id === selectedCategory)?.name || 'सम्पूर्ण टेंट, डेकोरेशन व लाइटिंग'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {categories.find((c) => c.id === selectedCategory)?.description ||
                  'शर्माजी टेंट हाउस द्वारा इन-हाउस प्रशिक्षित कारीगरों, क्रेन एवं आधुनिक उपकरणों के साथ 100% समय पर तैयार किए जाने वाले भव्य मंडप, डीजे वाहन व डाइनिंग कैनोपी।'}
              </p>
            </div>

            {/* Quick Guarantees Badge Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 font-medium">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#1F74BA] shrink-0" />
                <span>100% वाटरप्रूफ जर्मन संरचना</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#1F74BA] shrink-0" />
                <span>RCF हाई-बास व शार्पी बीम्स</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#1F74BA] shrink-0" />
                <span>विंटेज थीम फूड स्टॉल हट्स</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#1F74BA] shrink-0" />
                <span>24/7 ऑन-साइट तकनीकी टीम</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/quote"
                className="px-6 py-3 rounded-xl bg-[#F8D706] hover:bg-[#ebd005] text-black font-extrabold text-xs shadow-md transition hover:scale-105"
              >
                इस सेवा की बुकिंग करें →
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition"
              >
                और विवरण देखें
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-[#1F74BA]/20 text-[#1F74BA] text-xs font-bold uppercase tracking-wider mb-2">
            ग्राहकों का विश्वास
          </div>
          <h2 className="text-3xl font-extrabold font-serif-luxury text-[#111827]">परिवारों और आयोजकों की राय</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#F8D706]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F8D706]" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="text-sm font-bold text-[#111827] font-serif-luxury">{t.client_name}</div>
                <div className="text-[11px] text-[#1F74BA] font-semibold">{t.event_type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Cinematic CTA (Prompt Section 18: Dark Navy #071A2B, Blue Glow, Golden Accents) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-b from-[#071A2B] via-[#0B2540] to-[#071A2B] border border-[#1F74BA]/40 shadow-[0_0_50px_rgba(31,116,186,0.35)] text-center space-y-6 text-white card-hover-lift">
          {/* Subtle moving ambient light rays */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#1F74BA]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F8D706]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#1F74BA]/30 border border-[#F8D706]/40 mx-auto flex items-center justify-center backdrop-blur-md shadow-lg">
              <Crown className="w-8 h-8 text-[#F8D706]" />
            </div>
            
            <div className="space-y-5 pt-2 pb-2">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-extrabold text-[#F8D706] uppercase tracking-widest bg-white/10 px-5 py-2 rounded-full border border-[#F8D706]/40 shadow-inner">
                  Your Event Deserves to Be Extraordinary
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-luxury max-w-3xl mx-auto leading-tight text-white drop-shadow-md pt-2">
                क्या आप अपने उत्सव को भव्य और यादगार बनाना चाहते हैं?
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              शर्माजी टेंट हाउस से आज ही संपर्क करें। हम आपके स्थल की माप, 3D लेआउट और पारदर्शी बजट योजना बनाकर देंगे।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-sm shadow-[0_4px_25px_rgba(248,215,6,0.45)] hover:scale-105 transition-all"
              >
                योजना शुरू करें (Start Planning) →
              </Link>
              <a
                href={`tel:${settings?.phone || ''}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm transition-all"
              >
                सीधी सलाह के लिए कॉल करें
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />
    </div>
  );
};
